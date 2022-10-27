import axios from "axios";
import Message from "./interface/message";

const fetchData = async (url: string): Promise<any> => {
    return axios.get<any>(url)
}
export { fetchData }