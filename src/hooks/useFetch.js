import { useState, useEffect } from "react";

const useFetch =(url) => {
    const [data, setData]=useState (null); //acá se guarda lo que la API nos responda
    const [loading, setLoading]= useState(true);//true porque inicialmente esperamos una respuesta
    const [error,setError]=useState(null);//guarda un posible error.
    const [retry,setRetry]=useState (0);
    useEffect(()=>{
        if(!url) return; //sale de UseEffect si ho hay una url
            setLoading(true);
            setError(null);
            console.log("la url es:",url);
            fetch(url)//hacemos una petición a la url.
            .then((response) => {
                if(!response.ok){
                    throw new Error ("Error al cargar los datos");
                }
                return response.json ();
            })
            .then ((data) => {
                setData(data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url, retry]);
    const refetch = () =>{
        setRetry((prev)=> prev+1);
    };
    return {data,loading,error,refetch};
};
export default useFetch;