import { useState, useEffect } from "react";

function Countdown({ hours = 0, minutes = 0, seconds = 0 }) {
  const [totalSeconds, setTotalSeconds] = useState(
    hours * 3600 + minutes * 60 + seconds
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prevTotalSeconds) =>
        prevTotalSeconds > 0 ? prevTotalSeconds - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hoursLeft = Math.floor(totalSeconds / 3600);
  const minutesLeft = Math.floor((totalSeconds % 3600) / 60);
  const secondsLeft = totalSeconds % 60;

  return (
    <div className="ml-3 md:ml-7 flex justify-center items-center">
      <span className="mr-2.5 rounded-sm p-1.5 md:p-2 text-sm md:text-base text-center font-medium bg-[#DC0F0F] text-primary-white">
        Ending in
      </span>
      <p className="rounded-sm p-1.5 md:p-2 text-sm md:text-base text-center w-8 text-primary-white bg-primary-red mr-1">
        {hoursLeft.toString().padStart(2, "0")}{" "}
      </p>
      <span className="text-primary-red px-0.5 hidden text-3xl">:</span>
      <p className="rounded-sm p-1.5 md:p-2 text-sm md:text-base text-center w-8 text-primary-white bg-primary-red mr-1">
        {minutesLeft.toString().padStart(2, "0")}
      </p>
      <span className="text-primary-red px-0.5 hidden text-3xl">:</span>
      <p className="rounded-sm p-1.5 md:p-2 text-sm md:text-base w-8 text-center text-primary-white bg-primary-red">
        {secondsLeft.toString().padStart(2, "0")}
      </p>
    </div>
  );
}

export default Countdown;
