// eslint-disable-next-line no-useless-escape
const inputRegex = /^\d{0,2}?\:?\d{0,2}$/
const timeRegex = /([01]?[0-9]|2[0-3]):[0-5][0-9]/

const getTimeInputIsValid = (time) => {
  const [hoursStr, minutesStr] = time.split(':')

  if (!inputRegex.test(time)) {
      return false
  }

  const hours = Number(hoursStr)
  const minutes = Number(minutesStr)

  const isValidHour = (hour) => Number.isInteger(hour) && hour >= 0 && hour < 24
  const isValidMinutes = (minutes) => (Number.isInteger(minutes) && hours >= 0 && hours < 24) || Number.isNaN(minutes)

  if (!isValidHour(hours) || !isValidMinutes(minutes)) {
      return false
  }

  if (minutes < 10 && Number(minutesStr[0]) > 5) {
      return false
  }

  const valArr = time.indexOf(':') !== -1
      ? time.split(':')
      : [time]

  // check mm and HH
  if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)) {
      return false
  }

  if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) {
      return false
  }

  return true
}

// validate the time, returning an error message if it's invalid
const getTimeIsValid = (time) => {
  const inputValid = getTimeInputIsValid(time)
  
  if (!inputValid || !timeRegex.test(time)) {
    return 'Please enter a valid time.'
  }

  const hour = Number(time.split(':')[0])
  const minute = Number(time.split(':')[1])
  if (hour > 12 || (hour === 12 && minute > 0)) {
    return 'Please enter a time before 12:00pm.'
  }

  return null
}

export {
  getTimeInputIsValid,
  getTimeIsValid,
}