import { useEffect, useState } from "react"

const useFetch = (url, propertyName = null) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        setIsLoading(true);

        (async () => {
            try {
                const result = await fetch(url, {signal: abortCont.signal});
    
                if (!result) throw Error("Could not fetch the data for that resource");
    
                const data = await result.json();
                const processedData = (propertyName) ? (data[propertyName]) : data;
                
                setData(processedData);
                setIsLoading(false);
                setError(null);
            } catch (err) {
                if (err.message === 'AbortError') console.log('fetch aborted');
                else {
                    setError(err.message);
                    setIsLoading(false);
                }
            }
        }) ()
    }, [url])
    return { data, isLoading, error }
}

export default useFetch;