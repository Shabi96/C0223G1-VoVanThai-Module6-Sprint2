import axios from "axios";

export async function getListDress(page, nameDress, nameTypeDress, nameStatus, headers) {
    const res = await axios.get(`http://localhost:8080/dress/list?page=${page}&&nameDress=${nameDress}&&nameTypeDress=${nameTypeDress}&&nameStatus=${nameStatus}`, { headers });
    return res.data;
}

export async function getDressById(id, headers) {
    const res = await axios.get('http://localhost:8080/dress/' + id, { headers });
    return res.data;
}

export async function getAllDress(typeDress, date, headers) {
    const res = await axios.get('http://localhost:8080/dress/rented/' + typeDress + "/" + date, { headers });
    return res.data;
}

export async function getAllStatus(headers) {
    const res = await axios.get('http://localhost:8080/status', { headers });
    return res.data;
}