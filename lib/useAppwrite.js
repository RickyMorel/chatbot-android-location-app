import { useEffect, useState } from 'react'

const useAppwrite = async (fn) => {
   const [data, setData] = useState([])
   const [isLoading, setIsLoading] = useState(true) 

   useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try {
                const response = await fn()

                setData([mockData, mockData, mockData, mockData])
            } catch(err) {
                Alert.alert("Error", err.message)
            } finally {
                setIsLoading(false)
            }
        }  

        fetchData()
   }, [])   

    console.log("dataaaaaaaaaa", data)
    return {data}
}

export default useAppwrite