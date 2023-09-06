import axios from "axios";

export async function getListDress(page, nameDress, nameTypeDress, nameStatus) {
    const res = await axios.get(`http://localhost:8080/dress/list?page=${page}&&nameDress=${nameDress}&&nameTypeDress=${nameTypeDress}&&nameStatus=${nameStatus}`);
    return res.data;
}