import axios from "axios";

export async function getListDress(page, nameDress, nameTypeDress, nameStatus) {
    const res = await axios.get(`http://localhost:8080/dress/list?page=${page}&&nameDress=${nameDress}&&nameTypeDress=${nameTypeDress}&&nameStatus=${nameStatus}`);
    return res.data;
}

export async function getDressByName(name) {
    const res = await axios.get('http://localhost:8080/dress/' + name);
    return res.data;
}

export async function getAllDress(date) {
    const res = await axios.get('http://localhost:8080/dress/date/' + date);
    return res.data;
}