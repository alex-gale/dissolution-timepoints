import React from 'react'
import PropTypes from 'prop-types'
import { ColumnItem } from './ColumnItem'

const ColumnView = ({ timepoints }) => {
  const flatTimepoints = timepoints.flatMap((points, index) => {
    // add the experiment index to each point
    const updatedPoints = points.map((point) => ({
      point,
      experimentIndex: index
    }))

    return updatedPoints
  })

  // sort the points by time
  const sortedTimepoints = flatTimepoints.sort((a, b) => a.point - b.point)

  return (
    <div className="flex flex-col items-center">
      {sortedTimepoints.map((timepoint) => {
        const { point, experimentIndex } = timepoint

        const key = point.format()

        return (
          <ColumnItem
            key={key}
            experimentIndex={experimentIndex}
            timepoint={point}
          />
        )
      })}
    </div>
  )
}

ColumnView.propTypes = {
  timepoints: PropTypes.arrayOf(PropTypes.array)
}

export { ColumnView }
