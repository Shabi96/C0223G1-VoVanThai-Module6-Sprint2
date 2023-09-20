import axios from "axios";

export async function getPayment(price) {
    const res = await axios.get(`http://localhost:8080/payment?price=${price}`);
    return res.data;
}