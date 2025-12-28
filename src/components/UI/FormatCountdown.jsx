import React, { useState, useEffect } from "react";

const FormatCountdown = ({ expiryDate }) => {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeLeft = expiryDate - currentTime;

  if (timeLeft <= 0) {
    return "0d 0h 0m 0s";
  }

  const days = Math.floor(timeLeft / 1000 / 60 / 60 / 24);
  const hours = Math.floor((timeLeft / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export default FormatCountdown;
