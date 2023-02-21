import { TIMEPOINT_INTERVALS } from './timepoint-constants'

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

export {
  calculateTimepoints,
  formatTimepoints,
  getHasClashes,
  getStartTimesSeperated
}