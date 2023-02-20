import dayjs from 'dayjs'
import { generateNumberArray } from '../array/array-utils'
import { MIDDAY } from './timepoint-constants'

// function to calculate the best 3 start times for the experiments.
onmessage = ({ data: startTime }) => {
  // get the time as a dayjs object
  const [hour, minute] = startTime.split(':')
  const dayjsStartTime = dayjs().set('hour', hour).set('minute', minute).set('second', 0)

  // generate list of possible start times before midday
  const timeUntilMidday = MIDDAY.diff(dayjsStartTime, 'minute')
  const possibleInitialTimePoints = generateNumberArray(timeUntilMidday, 1).map((i) => dayjsStartTime.add(i, 'minute'))

  // generate a list of possible combinations of start times
  const possibleStartTimes = []

  for (let i = 0; i < possibleInitialTimePoints.length - 2; i++) {
    for (let j = i + 1; j < possibleInitialTimePoints.length - 1; j++) {
      const secondTime = possibleInitialTimePoints[i]
      const thirdTime = possibleInitialTimePoints[j]

      possibleStartTimes.push([dayjsStartTime, secondTime, thirdTime])
    }
  }

  postMessage(possibleStartTimes)
}