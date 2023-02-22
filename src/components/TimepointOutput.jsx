import dayjs from 'dayjs'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

const TimepointOutput = ({ timepointData = [] }) => {
  const [bestTimePointData = {}] = timepointData

  const {
    timepoints,
    lunchStartTime,
    lunchDuration,
    closestTimeDiff
  } = bestTimePointData

  // for some reason the timepoints are losing their dayjs functions, so we reinvigorate them here
  const fixedTimepoints = useMemo(() => timepoints && (
    timepoints.map((timepointArray) => (
      timepointArray.map((timepoint) => (
        dayjs(timepoint.$d)
      ))
    ))
  ), [timepoints])

  const firstTime = fixedTimepoints[0][0]
  const formattedFirstTime = firstTime.format('HH:mm')

  const fixedLunchTime = dayjs(lunchStartTime.$d)
  const formattedLunchTime = fixedLunchTime.format('HH:mm')

  return (
    <div>
      {/* lunch & seperation data */}
      <div className="mb-3">
        <p>
          Starting at&nbsp;
          <span className="font-bold">{formattedFirstTime}</span>
          , the best time to start lunch is&nbsp;
          <span className="font-bold">{formattedLunchTime}</span>
          &nbsp;lasting&nbsp;
          <span className="font-bold">{lunchDuration} minutes</span>.
        </p>

        <p className="mt-1">
          The closest time between two points is&nbsp;
          <span className="font-bold">{closestTimeDiff} minutes</span>.
        </p>
      </div>

      {/* timepoints display table */}
      <h1 className="font-title text-center mb-2">Timepoints</h1>
      <div className="grid grid-cols-3">
        {fixedTimepoints.map((timepointArray) => (
          <div
            key={`${timepointArray[0].format('HH:mm')}-column`}
            className="first:border-r last:border-l border-gray-300"
          >
            {timepointArray.map((timepoint) => {
              const timepointString = timepoint.format('HH:mm:ss')

              return (
                <p
                  key={`${timepointString}`}
                  className="text-center first:font-bold first:text-xl"
                >
                  {timepointString}
                </p>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

TimepointOutput.propTypes = {
  timepointData: PropTypes.arrayOf(PropTypes.shape({
    timepoints: PropTypes.arrayOf(PropTypes.array),
    lunchDuration: PropTypes.number,
    closestTimeDiff: PropTypes.number
  }))
}

export { TimepointOutput }
