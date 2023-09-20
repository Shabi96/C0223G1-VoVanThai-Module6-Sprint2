import axios from "axios";

export async function getContractDetailsByIdDress(id) {
    const res = await axios.get("http://localhost:8080/contracts/list-details/" + id);
    return res.data;
}
export async function getContractDetailsByIdVest(id) {
    const res = await axios.get("http://localhost:8080/contracts/list-details-vest/" + id);
    return res.data;
}