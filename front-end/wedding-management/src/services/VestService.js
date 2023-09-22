import axios from "axios";

export async function getAllVest(page, nameVest, nameStatus, headers) {
    const res = await axios.get(`http://localhost:8080/vest/list?page=${page}&&nameVest=${nameVest}&&nameStatus=${nameStatus}`, { headers });
    return res.data;
}

export async function getVestByDate(date, headers) {
    const res = await axios.get("http://localhost:8080/vest/rented/" + date, {headers});
    return res.data;
}

export async function getVestById(id, headers) {
    const res = await axios.get("http://localhost:8080/vest/" + id, {headers});
    return res.data;
}