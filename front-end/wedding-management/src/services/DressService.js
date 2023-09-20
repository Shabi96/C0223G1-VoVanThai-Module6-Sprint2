import axios from "axios";
// const headers = {
//     Authorization: `Bearer ${localStorage.getItem("token")}`
// }

export async function getListDress(page, nameDress, nameTypeDress, nameStatus, headers) {
    const res = await axios.get(`http://localhost:8080/dress/list?page=${page}&&nameDress=${nameDress}&&nameTypeDress=${nameTypeDress}&&nameStatus=${nameStatus}`, { headers });
    return res.data;
}

export async function getDressById(id) {
    const res = await axios.get('http://localhost:8080/dress/' + id);
    return res.data;
}

export async function getAllDress(typeDress, date) {
    const res = await axios.get('http://localhost:8080/dress/rented/' + typeDress + "/" + date);
    return res.data;
}

export async function getAllStatus() {
    const res = await axios.get('http://localhost:8080/status');
    return res.data;
}