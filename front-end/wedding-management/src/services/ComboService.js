import axios from "axios";

export async function getAllCombo(headers) {
    const res = await axios.get("http://localhost:8080/combos", { headers });
    return res.data;
}