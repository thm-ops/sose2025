"use client"

import useTimer from "./useTimer.hook";

export default function Timer() {
    const [time, reset] = useTimer();

    return <button onClick={reset}>{time}</button>
}