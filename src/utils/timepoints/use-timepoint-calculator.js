import { useCallback, useState } from "react"

const useTimepointCalculator = () => {
  const [isCalculating, setIsCalculating] = useState(false)
  const [timepointData, setTimepointData] = useState(null)

  // when the calculation has finished (error or otherwise) set the data and terminate the worker thread
  const onCalculationFinish = useCallback((data, worker) => {
    setTimepointData(data)
    setIsCalculating(false)

    worker.terminate()
  }, [])

  const runCalculation = useCallback((startTime) => {
    setIsCalculating(true)

    // create a new worker to run the calculation on another thread
    const timepointWorker = new Worker(new URL('./timepoint-worker.js', import.meta.url))
    timepointWorker.postMessage(startTime)
    
    timepointWorker.onmessage = ({ data }) => onCalculationFinish(data, timepointWorker)
    timepointWorker.onerror = (error) => onCalculationFinish(null, timepointWorker)
  }, [onCalculationFinish])

  return {
    runCalculation,
    timepointData,
    isCalculating,
  }
}

export { useTimepointCalculator }