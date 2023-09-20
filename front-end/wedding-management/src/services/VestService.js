import axios from "axios";

export async function getAllVest(page, nameVest, nameStatus, headers) {
    const res = await axios.get(`http://localhost:8080/vest/list?page=${page}&&nameVest=${nameVest}&&nameStatus=${nameStatus}`, { headers });
    return res.data;
}

export async function getVestByDate(date) {
    const res = await axios.get("http://localhost:8080/vest/rented/" + date);
    return res.data;
}

export async function getVestById(id) {
    const res = await axios.get("http://localhost:8080/vest/" + id);
    return res.data;
}