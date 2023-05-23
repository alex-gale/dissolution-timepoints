import { useCallback, useState } from 'react'
import { MESSAGE_TYPE_CALCULATION_FINISHED, MESSAGE_TYPE_PROGRESS_UPDATE } from './timepoint-constants'

const useTimepointCalculator = () => {
  const [isCalculating, setIsCalculating] = useState(false)
  const [timepointData, setTimepointData] = useState(null)
  const [calculationProgress, setCalculationProgress] = useState(0)

  // when the calculation has finished (error or otherwise) set the data and terminate the worker thread
  const onCalculationFinish = useCallback((data, worker) => {
    setTimepointData(data)
    setIsCalculating(false)
    setCalculationProgress(0)

    worker.terminate()
  }, [])

  const runCalculation = useCallback((startTime) => {
    setIsCalculating(true)

    // create a new worker to run the calculation on another thread
    const timepointWorker = new Worker(new URL('./timepoint-worker.js', import.meta.url))
    timepointWorker.postMessage(startTime)

    timepointWorker.onmessage = ({ data }) => {
      const { type, payload } = data

      if (type === MESSAGE_TYPE_CALCULATION_FINISHED) {
        return onCalculationFinish(payload, timepointWorker)
      }

      if (type === MESSAGE_TYPE_PROGRESS_UPDATE) {
        return setCalculationProgress(payload)
      }
    }

    timepointWorker.onerror = () => onCalculationFinish(null, timepointWorker)
  }, [onCalculationFinish])

  return {
    runCalculation,
    timepointData,
    isCalculating,
    calculationProgress
  }
}

export { useTimepointCalculator }
