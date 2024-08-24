const fetchAppwriteData = async (fn) => {
    setLoading(true);
    
    try {
        const response = await fn();
        const data = [response, response, response, response];  // Mocked data processing
        return {data}
    } catch (err) {
        Alert.alert("Error", err.message);
    } finally {
        setLoading(false);
    }
};

const makeRequest = async (fn) => {
    const data = await fetchAppwriteData(fn)
    console.log("makeRequest", data)

    const refetch = () => fetchAppwriteData(fn)

    return {data, refetch}
}

export default makeRequest