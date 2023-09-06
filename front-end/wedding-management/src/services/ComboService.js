import axios from "axios";

export async function getAllCombo() {
    const res = await axios.get("http://localhost:8080/combos");
    return res.data;
}