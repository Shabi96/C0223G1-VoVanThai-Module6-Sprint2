import axios from "axios";


export async function createNewContract(contract, headers) {
    await axios.post("http://localhost:8080/contracts/", contract, { headers });
}

export async function getAllContract(page, nameCustomer, phone, status, headers) {
    const res = await axios.get(`http://localhost:8080/contracts?page=${page}&&nameCustomer=${nameCustomer}&&phone=${phone}&&status=${status}`, { headers });
    return res.data;
}

export async function getContractDetailsByContractId(id, headers) {
    const res = await axios.get(`http://localhost:8080/contracts/details/${id}`, { headers });
    return res.data;
}

export async function getContractById(id, headers) {
    const res = await axios.get(`http://localhost:8080/contracts/${id}`, { headers })
    return res.data;
}

export async function endContract(id, price, headers) {
    await axios.patch(`http://localhost:8080/contracts/${id}/${price}`, null, { headers });
}
export async function cancelContract(id, headers) {
    await axios.patch(`http://localhost:8080/contracts/cancel/` + id, null, { headers });
}


// export async function getAllLists(page, nameCustomer) {
//     const res = await axios.get(`http://localhost:8080/contracts/all?page=${page}&&nameCustomer=${nameCustomer}`);
//     return res.data;
// }

