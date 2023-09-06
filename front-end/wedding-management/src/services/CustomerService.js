import axios from "axios";

export async function getCustomerByPhone(phone) {
    const res = await axios.get("http://localhost:8080/customers/" + phone);
    return res.data;
}

export async function createCustomer(customer) {
    await axios.post("http://localhost:8080/customers/", customer);
}