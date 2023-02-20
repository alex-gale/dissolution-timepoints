import dayjs from "dayjs"

const MIDDAY = dayjs().set('hour', 12).set('minute', 0).set('second', 0)

// each start time must be at least 15 minutes apart
const REQUIRED_START_TIME_SEPERATION = 15

export {
  MIDDAY,
  REQUIRED_START_TIME_SEPERATION,
}