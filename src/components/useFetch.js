import { useState, useEffect } from "react";



const useFetch = (url) => {
    const [wordle, setWordle] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setTimeout(() => {
            fetch('url')
            .then(res => {
                if(!res.ok) {
                    throw Error ('could not fetch the data for that ressource');
                }
                return res.json();
            })
            .then(wordle => {
                setWordle(wordle);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                setIsPending(false);
                setError(err.message);
            })
        }, 1000);
    }, [url]);
    return { wordle, isPending, error}
}


export default useFetch;