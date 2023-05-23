import dayjs from 'dayjs'
import { generateNumberArray } from '../array/array-utils'
import { MESSAGE_TYPE_CALCULATION_FINISHED, MESSAGE_TYPE_PROGRESS_UPDATE, MIDDAY, REQUIRED_START_TIME_SEPERATION } from './timepoint-constants'
import { calculateTimepoints, calculateTimepointsScore, getHasClashes, getStartTimesSeperated } from './timepoint-utils'

// function to calculate the best 3 start times for the experiments.
onmessage = ({ data: startTime }) => {
  // get the time as a dayjs object
  const [hour, minute] = startTime.split(':')

  const firstTime = dayjs().set('hour', hour).set('minute', minute).set('second', 0)
  const firstTimepoints = calculateTimepoints(firstTime)

  // cache to store the results of full timepoint calculations for later use
  const timepointCache = {
    [firstTime.format('HH:mm')]: firstTimepoints
  }

  // function to get the timepoints for a given time using either the cache or a fresh calculation
  const getTimepoints = (time) => {
    const timeString = time.format('HH:mm')
    const cachedValue = timepointCache[timeString]

    // if the timepoints have already been calculated, return them from the cache
    if (cachedValue) {
      return cachedValue
    }

    // otherwise calculate the timepoints & add them to the cache
    const timepoints = calculateTimepoints(time)
    timepointCache[timeString] = timepoints
    return timepoints
  }

  // generate list of valid start times before midday
  const timeUntilMidday = MIDDAY.diff(firstTime, 'minute')
  const possibleInitialTimePoints = generateNumberArray(timeUntilMidday, 1).map((i) => firstTime.add(i, 'minute'))
  const possibleInitialTimePointsCount = possibleInitialTimePoints.length

  // generate a list of possible combinations of start times and their scores
  const possibleTimepoints = []

  for (let i = 0; i < possibleInitialTimePointsCount - 2; i++) {
    const progress = i / possibleInitialTimePointsCount

    // send a progress update to the main thread
    postMessage({
      type: MESSAGE_TYPE_PROGRESS_UPDATE,
      payload: progress
    })

    for (let j = i + 1; j < possibleInitialTimePoints.length - 1; j++) {
      /* get second and third time and their timepoints, from cache or otherwise */
      const secondTime = possibleInitialTimePoints[i]
      const secondTimepoints = getTimepoints(possibleInitialTimePoints[i])

      const thirdTime = possibleInitialTimePoints[j]
      const thirdTimepoints = getTimepoints(possibleInitialTimePoints[j])

      const timepoints = [firstTimepoints, secondTimepoints, thirdTimepoints]

      const hasClashes = getHasClashes([firstTimepoints, secondTimepoints, thirdTimepoints])
      const hasGoodSeperation = getStartTimesSeperated([firstTime, secondTime, thirdTime], REQUIRED_START_TIME_SEPERATION)

      // only add the times to the list if they include no clashes in timepoints & are seperated by at least 15 minutes
      if (!hasClashes && hasGoodSeperation) {
        const scoreData = calculateTimepointsScore(timepoints)

        possibleTimepoints.push({
          timepoints,
          ...scoreData
        })
      }
    }
  }

  // work out the best score and the timepoints that have that score
  const scores = possibleTimepoints.map(({ score }) => score)
  const bestScore = Math.max(...scores)
  const bestTimepoints = possibleTimepoints.filter(({ score }) => score === bestScore)

  // send the best timepoints back to the main thread
  postMessage({
    type: MESSAGE_TYPE_CALCULATION_FINISHED,
    payload: bestTimepoints
  })
}
