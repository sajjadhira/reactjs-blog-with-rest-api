import {useState,useEffect} from 'react';

let useFetech = (url) => {
    
        
    // let data = [];
    let [data,setData] = useState(null);
    let [error,setError] = useState(null);
    let [preloader,setPreloader] = useState(true);
    // creating custom hook
    useEffect(()=> {
        // let res = null;
        // console.log("Working");
        let abort = new AbortController();

                fetch(url, {signal: abort.signal }).then(
                    res => {

                        if(!res.ok){
                            throw Error("Couldn't fetch API request!");
                        }
                        return res.json();
                    }
                ).then(
                    (data) =>{
                        // console.log(data);
                        setPreloader(false);
                        setData(data);
                        setError(null);
                    }
                ).catch(
                    err =>{
                        setError(err.message);
                        setPreloader(false);
                        setData([]);
                    }
                )


        return () => {
            // console.log("Aborted");
            abort.abort();
        }

    }, [url]);

    return { data, preloader, error}
}

export default useFetech;