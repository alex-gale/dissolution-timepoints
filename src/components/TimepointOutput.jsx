import dayjs from 'dayjs'
import React, { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { TableView } from './TableView'
import { ColumnView } from './ColumnView'

const VIEW_MODE_TABLE = 'table'
const VIEW_MODE_COLUMN = 'column'

const viewModeComponentMap = {
  [VIEW_MODE_TABLE]: TableView,
  [VIEW_MODE_COLUMN]: ColumnView
}

const TimepointOutput = ({ timepointData = [] }) => {
  const [viewMode, setViewMode] = useState(VIEW_MODE_TABLE)

  const toggleViewMode = () => {
    const newViewMode = viewMode === VIEW_MODE_TABLE ? VIEW_MODE_COLUMN : VIEW_MODE_TABLE
    setViewMode(newViewMode)
  }

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

  const toggleButtonText = viewMode === VIEW_MODE_TABLE ? 'Switch to column mode' : 'Switch to table mode'
  const TimepointRenderer = viewModeComponentMap[viewMode]

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
      <button
        type="button"
        className="mb-2 text-center w-full appearance-none py-1 rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors text-sm"
        onClick={toggleViewMode}
      >
        {toggleButtonText}
      </button>
      <TimepointRenderer timepoints={fixedTimepoints} />
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
