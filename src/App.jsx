import React, { useState } from 'react'
import { TimepointOutput } from './components/TimepointOutput'
import { useTimepointCalculator } from './utils/timepoints/use-timepoint-calculator'
import { getTimeInputIsValid, getTimeIsValid } from './utils/validation/time-validation'

const INITIAL_TIME = '10:00'

const App = () => {
  const [startTime, setStartTime] = useState(INITIAL_TIME)
  const [errorMessage, setErrorMessage] = useState(null)

  const { isCalculating, timepointData, runCalculation } = useTimepointCalculator()

  // validate & set time in state
  const handleTimeChange = (event) => {
    const time = event.target.value
    const inputValid = getTimeInputIsValid(time)

    if (!inputValid) {
      return false
    }

    setStartTime(time)
  }

  const handleConfirm = () => {
    setErrorMessage(null)
    const error = getTimeIsValid(startTime)

    if (error) {
      setErrorMessage(error)
      return
    }

    runCalculation(startTime)
  }

  return (
    <div className='flex flex-col items-center min-h-full min-w-full bg-slate-200 font-body text-gray-700 px-5'>
      <div className='w-full max-w-[450px]'>
        <h1 className='mt-5 text-[6vw] sm:text-[2em] font-title text-center'>Dissolution Timepoint Calculator</h1>

        {/* input zone */}
        <form
          className='flex flex-col mt-5 w-full'
          onSubmit={(event) => {
            event.preventDefault()
            handleConfirm()
          }}
        >
          <label className='text-bas mb-0.5' htmlFor='start-time'>Dissolution Start Time (24h)</label>
          <input
            value={startTime}
            onChange={handleTimeChange}
            className='text-lg drop-shadow-xl appearance-none rounded py-2 px-3 focus:outline-none'
            type='text'
            id='start-time'
            placeholder='hh:mm'
          />

          <button
            className='text-lg drop-shadow-xl bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors rounded mt-2 py-1 text-white appearance-none disabled:bg-red-300'
            onClick={handleConfirm}
            disabled={isCalculating}
          >
            Calculate
          </button>

          {!!errorMessage && (
            <p className='text-red-500 mt-1 text-center'>{errorMessage}</p>
          )}
        </form>

        {/* output zone */}
        {(isCalculating || timepointData) && (
          <div className='w-full mt-6 p-3 bg-white rounded shadow-xl mb-5'>
            {
              isCalculating
                ? <p>Calculating...</p>
                : <TimepointOutput timepointData={timepointData} />
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default App
