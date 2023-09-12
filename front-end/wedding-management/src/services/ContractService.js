import axios from "axios";

export async function createNewContract(contract) {
    await axios.post("http://localhost:8080/contracts/", contract);
}