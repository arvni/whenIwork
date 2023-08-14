export const fetchData = async (url, data = {}) => {
    const res = await axios.get(url, {data});
    return res.data;
}
