import axios from "axios";

export async function createNewEmployee(employee) {
    await axios.post("http://localhost:8080/register/", employee);
}

export async function findEmployeeByEmail(email, headers) {
    const res = await axios.get("http://localhost:8080/employees/" + email, { headers });
    return res.data;
}