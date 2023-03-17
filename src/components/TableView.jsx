import React from 'react'
import PropTypes from 'prop-types'

const TableView = ({ timepoints }) => {
  return (
    <div className="grid grid-cols-3">
      {timepoints.map((timepointArray) => (
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
  )
}

TableView.propTypes = {
  timepoints: PropTypes.arrayOf(PropTypes.array)
}

export { TableView }
