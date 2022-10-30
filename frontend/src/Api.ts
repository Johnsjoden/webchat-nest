import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_WEBCHAT_API
const fetchData = (url: string): any => {
    try {
        return axios.get<any>(url)
    }
    catch (e) {
        console.log("error fetchData Api")
    }

}
export { fetchData }