import { useState } from "react";
import { getTimeInputIsValid } from "./utils/validation";

const INITIAL_TIME = '10:00'

const App = () => {
  const [startTime, setStartTime] = useState(INITIAL_TIME)

  console.log(startTime);

  const handleTimeChange = (event) => {
    const time = event.target.value

    if (!getTimeInputIsValid(time)) {
      return false
    }

    setStartTime(time)
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
        >
          Calculate
        </button>
      </div>

      {/* output zone */}
      <div>

      </div>
    </div>
  );
}

export default App;
