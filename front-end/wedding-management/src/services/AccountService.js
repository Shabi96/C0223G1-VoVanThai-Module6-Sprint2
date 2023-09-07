import axios from "axios";

export async function loginByAccount(user) {
    const res = await axios.post("http://localhost:8080/authenticate/" , user);
    return res.data;
}