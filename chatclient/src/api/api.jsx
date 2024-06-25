import axios from "axios";
import { baseURL } from "../constants/url";

const token = localStorage.getItem("token")

export const authAxios = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
})