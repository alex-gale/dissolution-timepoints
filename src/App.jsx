import { useState } from "react";
import { getTimeInputIsValid, getTimeIsValid } from "./utils/validation";

const INITIAL_TIME = '10:00'

const App = () => {
  const [startTime, setStartTime] = useState(INITIAL_TIME)
  const [hasError, setHasError] = useState(false)
  
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
    setHasError(false)
    const isValid = getTimeIsValid(startTime)

    if (!isValid) {
      setHasError(true)
      return
    }
  }

  return (
    <div className="flex flex-col items-center min-h-full min-w-full bg-slate-200 font-body text-gray-700 px-5">
      <h1 className="mt-5 text-[6vw] sm:text-[2em] font-title">Dissolution Timepoint Calculator</h1>
      
      {/* input zone */}
      <div className="flex flex-col mt-5 w-full max-w-[435px]">
        <label className="text-bas mb-0.5" htmlFor="start-time">Dissolution Start Time (24h)</label>
        <input
          value={startTime}
          onChange={handleTimeChange}
          className="text-lg drop-shadow-xl appearance-none rounded py-2 px-3 focus:outline-none"
          type="text"
          id="start-time"
          placeholder="hh:mm"
        />

        <button
          className="text-lg drop-shadow-xl bg-red-500 hover:bg-red-600 active:bg-red-700 transition-colors rounded mt-2 py-1 text-white appearance-none"
          onClick={handleConfirm}
        >
          Calculate
        </button>

        {hasError && (
          <p className="text-red-500 mt-1 text-center">Please enter a valid time</p> 
        )}
      </div>

      {/* output zone */}
      <div>

      </div>
    </div>
  );
}

export default App;
