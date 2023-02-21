import { MIDDAY, TIMEPOINT_INTERVALS } from './timepoint-constants'

// calculate list of time points from a given start time using intervals
const calculateTimepoints = (startTime) => {
  const timepoints = TIMEPOINT_INTERVALS.map((point) => startTime.add(point, 'minute'))
  return timepoints
}

// formats timepoints to be human readable
const formatTimepoints = (times) => {
  const formattedTimes = times.map((time) => time.format('HH:mm:ss'))
  return formattedTimes
}

// function to check if there are any clashes in the provided list of lists of timepoints
const getHasClashes = (timepoints) => {
  // flatten & format all timepoints for the provided times
  // we format so that we can know if there are any duplicates
  const flattenedTimepoints = timepoints.flat()
  const formattedTimepoints = formatTimepoints(flattenedTimepoints)

  // check if there are any duplicates in the list of timepoints
  return new Set(formattedTimepoints).size !== formattedTimepoints.length
}

// check whether the provided start times are at least the required separation apart
const getStartTimesSeperated = (times, requiredSeparation) => {
  const [firstTime, secondTime, thirdTime] = times

  const firstTimeDiff = secondTime.diff(firstTime, 'minute')
  const secondTimeDiff = thirdTime.diff(secondTime, 'minute')

  // ensure that the start times are at least the required separation apart
  return firstTimeDiff >= requiredSeparation && secondTimeDiff >= requiredSeparation
}

// function to calculate the score for a given list of timepoints
const calculateTimepointsScore = (timepoints) => {
  // flatten & sort the timepoints
  const flatTimepoints = timepoints.flat()
  const sortedTimepoints = flatTimepoints.sort((a, b) => a - b)

  /*
    work out the tightest time gap between any two timepoints
  */
  const closestTimeDiff = sortedTimepoints.reduce((acc, time, index) => {
    const nextTime = sortedTimepoints[index + 1]

    if (!nextTime) {
      return acc
    }

    const timeDiff = nextTime.diff(time, 'minute')

    return timeDiff < acc ? timeDiff : acc
  }, Infinity)

  /*
    work out the length of the lunch break
  */
  // get list of times between 12:00 and 12:15
  const lunchTimes = sortedTimepoints.filter((time) => (
    time.hour() === MIDDAY.hour() && time.minute() <= 15
  ))

  // get the last time in that list
  const lunchStartTime = lunchTimes[lunchTimes.length - 1]

  const lunchStartIndex = lunchStartTime ? sortedTimepoints.indexOf(lunchStartTime) : null
  const nextTime = lunchStartIndex ? sortedTimepoints[lunchStartIndex + 1] : null

  const lunchBreakLength = nextTime ? nextTime.diff(lunchStartTime, 'minute') : 0

  return {
    lunchBreakLength,
    closestTimeDiff,
    // score will be the length of the lunch break multiplied by the tightest time gap
    score: lunchBreakLength * closestTimeDiff
  }
}

export {
  calculateTimepoints,
  formatTimepoints,
  getHasClashes,
  getStartTimesSeperated,
  calculateTimepointsScore
}