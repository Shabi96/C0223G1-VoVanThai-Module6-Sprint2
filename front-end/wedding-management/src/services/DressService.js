import axios from "axios";

export async function getListDress(page, nameDress, nameTypeDress, nameStatus) {
    const res = await axios.get(`http://localhost:8080/dress/list?page=${page}&&nameDress=${nameDress}&&nameTypeDress=${nameTypeDress}&&nameStatus=${nameStatus}`);
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