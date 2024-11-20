import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

function CountdownTimer({ endTime }) {
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeRemaining(getTimeRemaining());
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    function getTimeRemaining() {
        const now = new Date().getTime();
        const end = new Date(endTime).getTime();
        const remaining = end - now;

        if (remaining <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    return (
        <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>
            {timeRemaining.days} days {timeRemaining.hours} hours {timeRemaining.minutes} minutes {timeRemaining.seconds}
        </Typography>
    );
}

export default CountdownTimer;
