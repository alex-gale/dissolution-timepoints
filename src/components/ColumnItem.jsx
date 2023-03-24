import React, { useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'

const experimentIndexColorMap = {
  0: ['bg-rose-400', 'bg-rose-300', 'bg-rose-200'],
  1: ['bg-sky-400', 'bg-sky-300', 'bg-sky-200'],
  2: ['bg-green-400', 'bg-green-300', 'bg-green-200']
}

const ColumnItem = ({ timepoint, timepointOffset, experimentIndex }) => {
  const [completed, setCompleted] = useState(false)
  const toggleCompleted = () => setCompleted(!completed)

  const formattedTime = timepoint.format('HH:mm:ss')
  const experimentNumber = experimentIndex + 1

  const [experimentColor, offsetColor, backgroundColor] = experimentIndexColorMap[experimentIndex]
  const className = `${backgroundColor} ${completed ? 'opacity-30' : 'opacity-100'} transition-opacity flex flex-row rounded-lg w-52 overflow-hidden mt-1 items-center cursor-pointer select-none`
  const experimentClassName = `${experimentColor} py-3 w-9 font-bold text-center`
  const offsetClassName = `${offsetColor} mr-4 py-3 w-9 text-center`

  return (
    <div className={className} onClick={toggleCompleted}>
      <div className={experimentClassName}>
        {experimentNumber}
      </div>

      <div className={offsetClassName}>
        {timepointOffset}
      </div>

      {formattedTime}
    </div>
  )
}

ColumnItem.propTypes = {
  timepoint: PropTypes.instanceOf(dayjs),
  timepointOffset: PropTypes.number,
  experimentIndex: PropTypes.number
}

export { ColumnItem }
