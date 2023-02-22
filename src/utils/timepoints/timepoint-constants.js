import dayjs from 'dayjs'

const MIDDAY = dayjs().set('hour', 12).set('minute', 0).set('second', 0)

// each start time must be at least 15 minutes apart
const REQUIRED_START_TIME_SEPERATION = 15

// timepoint intervals in minutes from start time
const TIMEPOINT_INTERVALS = [0, 2.5, 5, 10, 15, 30, 60, 120, 180, 240]

export {
  MIDDAY,
  REQUIRED_START_TIME_SEPERATION,
  TIMEPOINT_INTERVALS
}
