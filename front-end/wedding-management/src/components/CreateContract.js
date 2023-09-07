import React, { useEffect, useState } from "react";
import { getCustomerByPhone } from "../services/CustomerService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllCombo } from "../services/ComboService";
import { getAllDress, getDressByName } from "../services/DressService";
import Select from 'react-select';

// Kiểm tra số điện thoại khách hàng có tồn tại hay không? => ......
export default function CreateContract() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [combo, setCombo] = useState([]);
    const [selectedCombo, setSelectedCombo] = useState(0);
    const [dress, setDress] = useState(null);
    const [listDress, setListDress] = useState([]);

    const getUser = async () => {
        const phone = document.getElementById("find-customer").value;
        try {
            const data = await getCustomerByPhone(phone);
            setUser(data);
        } catch (err) {
            Swal.fire({
                icon: 'info',
                title: 'Khách hàng không tồn tại',
                text: 'Bạn có muốn thêm mới khách hàng?',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không',
                reverseButtons: true
            }).then((res) => {
                if (res.isConfirmed) {
                    navigate("/create-customer");
                } else {
                    return
                }
            })
        }
    }

    const getCombo = async () => {
        try {
            const data = await getAllCombo();
            setCombo(data);
        } catch (err) {
            console.log("Không tìm thấy combo nào!!!!");
        }
    }

    const getDress = async () => {
        const name = document.getElementById("find-dress").value;
        const data = await getDressByName(name);
        setDress(data);
    }

    const checkRentedDate = async () => {
        const inputDate = document.getElementById("find-date").value;
        const data = await getAllDress(inputDate);
        const listSelectDress = data.map((dr) => ({
            value: dr.idDress,
            label: dr.nameDress
        }))
        setListDress(listSelectDress);
    }

    useEffect(() => {
        getCombo()
    }, [selectedCombo]);

    return (
        <main className="main-content mt-3" style={{
            backgroundImage: 'url("https://icdn.dantri.com.vn/zoom/1200_630/2022/07/14/wedding-fair-pr2docx-1657782815565.jpeg")',
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
        }}>

            <div className="page-header d-flex align-items-start min-vh-100 justify-content-center align-items-center" >
                <span className="opacity-6" />
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Thêm mới hợp đồng</h4>
                                    </div>
                                </div>
                                {user != null ?
                                    <>
                                        <div className="card-body">
                                            <div className="input-group input-group-outline my-3">
                                                <input type="text" value={user.nameCustomer} readOnly className="form-control" />
                                            </div>
                                            <div className="input-group input-group-outline mb-3">
                                                <select className="form-control" onChange={(e) => setSelectedCombo(e.target.value)}>
                                                    <option value={null}>Chọn Combo</option>
                                                    {combo.map((c, index) => {
                                                        return (
                                                            <option key={index} value={c.idCombo}>{c.nameCombo}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            {(selectedCombo == 1) ?
                                                <>
                                                    <div>
                                                        <div className="input-group input-group-outline my-3">
                                                            <label htmlFor="find-date">Chọn ngày thuê: </label>
                                                            <input id="find-date" type="date" placeholder="Nhập ngày thuê" className="form-control" />
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="button" onClick={() => checkRentedDate()} className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Kiểm tra</button>
                                                        </div>
                                                    </div>
                                                    {
                                                        listDress.length > 0 &&
                                                        <div className="input-group input-group-outline my-3">
                                                            <Select className="form-control"
                                                                placeholder='Nhập tên váy'
                                                                options={listDress}>
                                                            </Select>
                                                        </div>
                                                    }
                                                    {/* <div>
                                                        <div className="input-group input-group-outline my-3">
                                                            <input id="find-dress" type="text" placeholder="Nhập tên váy" className="form-control" />
                                                        </div>
                                                        {dress == null &&
                                                            <div className="text-center">
                                                                <button type="button" onClick={() => getDress()} className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Kiểm tra</button>
                                                            </div>
                                                        }
                                                    </div>
                                                    {dress != null ?
                                                        <div>
                                                            <div className="input-group input-group-outline my-3">
                                                                <label htmlFor="find-date">Chọn ngày thuê: </label>
                                                                <input id="find-date" type="date" placeholder="Nhập ngày thuê" className="form-control" />
                                                            </div>
                                                            <div className="text-center">
                                                                <button type="button" onClick={() => checkRentedDate()} className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Kiểm tra</button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <></>
                                                    } */}
                                                    {/* <div className="input-group input-group-outline mb-3">
                                                        <input type="date" placeholder="Ngày thuê" className="form-control" />
                                                    </div>
                                                    <div className="input-group input-group-outline my-3">
                                                        <input type="date" placeholder="Ngày trả" className="form-control" />
                                                    </div>
                                                    <div className="input-group input-group-outline mb-3">
                                                        <input type="text" placeholder="Mã váy" className="form-control" />
                                                    </div>
                                                    <div className="text-center">
                                                        <button type="button" className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Tạo</button>
                                                    </div> */}
                                                </> : selectedCombo == 2 ?
                                                    <>
                                                        <div className="input-group input-group-outline mb-3">
                                                            <input type="date" placeholder="Ngày cưới 1" className="form-control" />
                                                        </div>
                                                        <div className="input-group input-group-outline mb-3">
                                                            <input type="text" placeholder="Mã váy" className="form-control" />
                                                        </div>
                                                        <div className="input-group input-group-outline my-3">
                                                            <input type="date" placeholder="Ngày cưới 2" className="form-control" />
                                                        </div>
                                                        <div className="input-group input-group-outline mb-3">
                                                            <input type="text" placeholder="Mã váy" className="form-control" />
                                                        </div>
                                                        <div className="text-center">
                                                            <button type="button" className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Tạo</button>
                                                        </div>
                                                    </> :
                                                    <></>
                                            }
                                        </div>

                                    </> :
                                    <div className="card-body">
                                        <div className="input-group input-group-outline my-3">
                                            <input id="find-customer" type="text" placeholder="Nhập số điện thoại khách hàng" className="form-control" />
                                        </div>
                                        <div className="text-center">
                                            <button type="button" onClick={() => getUser()} className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Kiểm tra</button>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}