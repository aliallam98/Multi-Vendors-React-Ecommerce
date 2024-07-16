import { useState, useEffect } from "react";
import moment from "moment";

const SaleCountDown = () => {
  const expiredData = moment().add(2, "days"); // Calculate expired date

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const timeRemaining = moment.duration(expiredData.diff(now));
      // console.log(timeRemaining);

      setDays(timeRemaining.days());
      setHours(timeRemaining.hours());
      setMinutes(timeRemaining.minutes());
      setSeconds(timeRemaining.seconds());

      if (timeRemaining.asMilliseconds() <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Conditional rendering based on sale ending
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return <p>Sale has ended!</p>;
  }

  return (
    <section>
      <div className="container flex overflow-x-scroll">
        <div className="flex gap-4">
          <p className="flex flex-col items-center justify-center text-neutral-400 border rounded-md w-16 h-16">
            {days} <span>Days</span>
          </p>
          <p className="flex flex-col items-center justify-center text-neutral-400 border rounded-md w-16 h-16">
            {hours} <span>Hours</span>
          </p>
          <p className="flex flex-col items-center justify-center text-neutral-400 border rounded-md w-16 h-16">
            {minutes} <span>Mins</span>
          </p>
          <p className="flex flex-col items-center justify-center text-neutral-400 border rounded-md w-16 h-16">
            {seconds} <span>Sec</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SaleCountDown;
