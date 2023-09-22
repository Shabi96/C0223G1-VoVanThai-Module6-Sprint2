import axios from "axios";

export async function getContractDetailsByIdDress(id, headers) {
    const res = await axios.get("http://localhost:8080/contracts/list-details/" + id, { headers });
    return res.data;
}
export async function getContractDetailsByIdVest(id, headers) {
    const res = await axios.get("http://localhost:8080/contracts/list-details-vest/" + id, { headers });
    return res.data;
}