import { useEffect, useState } from "react";

export default function useTimer(): [number, () => void] {
    const [time, setTime] = useState(0);

    useEffect(() => {
        setTime(Date.now);

        const id = setInterval(() => setTime(Date.now), 2000);

        return () => clearInterval(id);
    }, []);

    return [time, () => setTime(0)];
}
