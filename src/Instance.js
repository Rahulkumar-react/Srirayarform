import axios from "axios";
export const baseUrl="http://192.168.1.36:8080";
// export const baseUrl='http://127.0.0.1:5000'
export const instance=axios.create({
    baseURL:baseUrl,
    // headers: { "Access-Control-Allow-Origin": "*" },
})