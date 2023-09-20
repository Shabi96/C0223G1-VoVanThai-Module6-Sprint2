import axios from "axios";

// const headers = {
//     Authorization: `Bearer ${localStorage.getItem("token")}`
// }

export async function createNewContract(contract) {
    await axios.post("http://localhost:8080/contracts/", contract);
}

export async function getAllContract(page, nameCustomer, phone, status, headers) {
    const res = await axios.get(`http://localhost:8080/contracts?page=${page}&&nameCustomer=${nameCustomer}&&phone=${phone}&&status=${status}`, { headers });
    return res.data;
}

export async function getContractDetailsByContractId(id) {
    const res = await axios.get(`http://localhost:8080/contracts/details/${id}`);
    return res.data;
}

export async function getContractById(id) {
    const res = await axios.get(`http://localhost:8080/contracts/${id}`)
    return res.data;
}

export async function endContract(id, price) {
    await axios.patch(`http://localhost:8080/contracts/${id}/${price}`);
}
export async function cancelContract(id) {
    await axios.patch(`http://localhost:8080/contracts/cancel/` + id);
}


// export async function getAllLists(page, nameCustomer) {
//     const res = await axios.get(`http://localhost:8080/contracts/all?page=${page}&&nameCustomer=${nameCustomer}`);
//     return res.data;
// }

