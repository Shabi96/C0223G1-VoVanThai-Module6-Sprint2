import axios from "axios";

export async function getCustomerByPhone(phone, headers) {
    const res = await axios.get("http://localhost:8080/customers/" + phone, { headers });
    return res.data;
}

export async function createCustomer(customer, headers) {
    await axios.post("http://localhost:8080/customers/", customer, { headers });
}