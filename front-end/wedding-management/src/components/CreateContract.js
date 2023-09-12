import React, { useEffect, useState } from "react";
import { getCustomerByPhone } from "../services/CustomerService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllCombo } from "../services/ComboService";
import { getAllDress, getDressById } from "../services/DressService";
import Select from 'react-select';
import { add, format } from 'date-fns';
import { findEmployeeByEmail } from "../services/EmployeeService";
import { getVestByDate, getVestById } from "../services/VestService";
import { createNewContract } from "../services/ContractService";


// Kiểm tra số điện thoại khách hàng có tồn tại hay không? => ......
export default function CreateContract() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [combo, setCombo] = useState([]);
    const [selectedCombo, setSelectedCombo] = useState(0);
    const [dress, setDress] = useState(null);
    const [listDress, setListDress] = useState([]);
    const [upgraded, setUpgraded] = useState(false);
    const [typeDress, setTypeDress] = useState("STANDARD");
    const [idDress, setIdDress] = useState(null);
    const [dress2, setDress2] = useState(null);
    const [selectedDress, setSelectedDress] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [selectVests, setSelectVests] = useState([]);
    const [selectedVest, setSelectedVest] = useState(null);
    const [idVest, setIdVest] = useState(null);



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


    const getUpgraded = () => {
        if (upgraded) {
            setUpgraded(false);
        } else {
            setUpgraded(true);
        }
        setTypeDress("STANDARD");
    }
    const getCombo = async () => {
        try {
            const data = await getAllCombo();
            setCombo(data);
        } catch (err) {
            Swal.fire({
                icon: 'info',
                title: 'Không tìm thấy combo nào!!!!',
                timer: 1500,
                showConfirmButton: false
            })
        }
    }

    const getDress = async () => {
        const data = await getDressById(idDress);
        setDress(data);
    }

    const checkRentedDate = async () => {
        const inputDate = document.getElementById("find-date").value;
        try {
            const data = await getAllDress(typeDress, inputDate);
            const listSelectDress = data.map((dr) => ({
                value: dr.idDress,
                label: dr.nameDress
            }))
            setListDress([...listSelectDress]);
            const dataVest = await getVestByDate(inputDate);
            const listSelectVest = dataVest.map((vest) => ({
                value: vest.idVest,
                label: vest.nameVest
            }))
            setSelectVests([...listSelectVest]);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Không có sản phẩm nào!!!!",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    console.log(listDress);
console.log(selectVests);
    const handleChange = (selectedOption) => {
        setSelectedDress(selectedOption);
        setIdDress(selectedOption?.value);
    };

    const handleChangeVest = (selectedVestRented) => {
        setSelectedVest(selectedVestRented);
        setIdVest(selectedVestRented?.value);
    }

    const handleReturnDate = async (values) => {
        setStartDate(values);
        let rentedDate = new Date(values);
        const endDate = add(rentedDate, { days: 3 });
        const formattedEndDate = endDate.toISOString().substring(0, 10);
        setReturnDate(formattedEndDate);
    }

    const handleCreateContract1 = async () => {
        console.log("đã vào");
        const employee = await findEmployeeByEmail(localStorage.getItem("username"));
        const data = await getDressById(idDress);
        const vestFind = await getVestById(idVest);
        const contract = {
            startDate: startDate,
            endDate: returnDate,
            combo: {
                idCombo: parseInt(selectedCombo)
            },
            customer: user,
            employee: employee,
            dress: data,
            vest: vestFind
        }
        console.log(contract);
        try {
            await createNewContract(contract).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: "Thêm mới thành công!!!!",
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: "Thêm mới thất bại!!!!",
                showConfirmButton: false,
                timer: 1500
            })
        }
        
    }

    const handleCreateContract2 = async () => {


    }

    useEffect(() => {
        getCombo()
    }, [selectedCombo, idDress]);

    return (
        <main className="main-content mt-5" style={{
            backgroundImage: 'url("https://icdn.dantri.com.vn/zoom/1200_630/2022/07/14/wedding-fair-pr2docx-1657782815565.jpeg")',
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
        }}>

            <div className="page-header d-flex align-items-start min-vh-100 justify-content-center align-items-center" >
                <span className="opacity-6" />
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-8 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3">
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
                                                            <option key={index} onChange={(e) => setCombo(e.target.value)} value={c.idCombo}>{c.nameCombo}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            {(selectedCombo == 1) ?
                                                <>
                                                    <h6>Combo 1 ngày cưới: 5.000.000 VNĐ</h6>
                                                    <p>Bao gồm:<br />
                                                        - Trang điểm cô dâu.{"("}Có mặt tại nhà cô dâu 2h trước khi làm lễ{")"} <br />
                                                        - Hoa cưới cầm tay.{"("}Nhận cùng với đồ{")"} <br />
                                                        - 1 bộ vest chú rể.{"("}Đã bao gồm cà vạt{")"}<br />
                                                        - 1 váy cô dâu STANDARD.{"("}Có thể nâng hạng + phí{")"}
                                                    </p>
                                                    <div> <input type="checkbox" onClick={() => { getUpgraded() }} name='check-upgraded' id='check-upgraded' /> &nbsp;
                                                        <label htmlFor="check-upgraded">Nâng hạng váy cô dâu</label> </div>

                                                    {
                                                        upgraded &&
                                                        <>
                                                            <input type="radio" onChange={(e) => setTypeDress(e.target.value)} id="vip" name="type-dress" value={"VIP"} /> &nbsp;
                                                            <label htmlFor="vip"> VIP + 1.000.000 VNĐ </label> <br />
                                                            <input type="radio" id="luxury" onChange={(e) => setTypeDress(e.target.value)} name="type-dress" value={"LUXURY"} /> &nbsp;
                                                            <label htmlFor="luxury"> LUXURY + 2.000.000 VNĐ  </label> <br />
                                                        </>
                                                    }
                                                    <div className="input-group input-group-outline my-3">
                                                        <label htmlFor="find-date">Chọn ngày thuê: </label>
                                                        <div className="choise-date">
                                                        <input id="find-date" onChange={(e) => handleReturnDate(e.target.value)} style={{ width: '50%' }} type="date" className="form-control" />
                                                        <div className="check-date">
                                                            <button type="button" onClick={() => checkRentedDate()} style={{ color: 'white', fontWeight: 'bold' }}>Kiểm tra</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        (listDress.length > 0 && selectVests.length > 0) &&
                                                        <>
                                                            <div className="input-group input-group-outline my-3">
                                                                <Select className="form-control"
                                                                    placeholder='Nhập tên váy'
                                                                    isClearable
                                                                    options={listDress}
                                                                    value={selectedDress}
                                                                    onChange={handleChange}
                                                                >
                                                                </Select>
                                                            </div>
                                                            <div className="input-group input-group-outline my-3">
                                                                <Select className="form-control"
                                                                    placeholder='Nhập tên vest'
                                                                    isClearable
                                                                    options={selectVests}
                                                                    value={selectedVest}
                                                                    onChange={handleChangeVest}
                                                                >
                                                                </Select>
                                                            </div>
                                                        </>

                                                    }
                                                    {
                                                        (idDress != null && returnDate != null) &&
                                                        <div className="input-group input-group-outline my-3">
                                                            <label htmlFor="return-date">Ngày trả: </label>
                                                            <input id="return-date" style={{ width: '50%' }} value={returnDate} type="date" className="form-control" />
                                                        </div>
                                                    }
                                                    <div className="text-center">
                                                        <button type="button" onClick={() => handleCreateContract1()} className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Thêm mới</button>
                                                    </div>
                                                </> : selectedCombo == 2 ?
                                                    <>
                                                        <h6>Combo 2 ngày cưới: 8.000.000 VNĐ</h6>
                                                        <p>Bao gồm:<br />
                                                            - Trang điểm cô dâu.{"("}Có mặt tại nhà cô dâu 2h trước khi làm lễ{")"} <br />
                                                            - Hoa cưới cầm tay.{"("}Nhận cùng với đồ{")"} <br />
                                                            - 2 bộ vest chú rể.{"("}Đã bao gồm cà vạt{")"}<br />
                                                            - 2 váy cô dâu STANDARD.{"("}Có thể nâng hạng + phí{")"}
                                                        </p>
                                                        <div> <input type="checkbox" onClick={() => { getUpgraded() }} name='check-upgraded' id='check-upgraded' /> &nbsp;
                                                            <label htmlFor="check-upgraded">Nâng hạng váy cô dâu</label> </div>

                                                        {
                                                            upgraded &&
                                                            <>
                                                                <input type="radio" onChange={(e) => setTypeDress(e.target.value)} id="vip" name="type-dress" value={"VIP"} /> &nbsp;
                                                                <label htmlFor="vip"> VIP + 1.000.000 VNĐ </label> <br />
                                                                <input type="radio" id="luxury" onChange={(e) => setTypeDress(e.target.value)} name="type-dress" value={"LUXURY"} /> &nbsp;
                                                                <label htmlFor="luxury"> LUXURY + 2.000.000 VNĐ </label> <br />
                                                            </>
                                                        }
                                                        <div className="input-group d-flex input-group-outline my-3">
                                                            <label htmlFor="find-date">Chọn ngày thuê: </label>
                                                            <input id="find-date" type="date" placeholder="Nhập ngày thuê" className="form-control" />
                                                        </div>

                                                        <div className="text-center">
                                                            <button type="button" onClick={() => checkRentedDate()} className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Kiểm tra</button>
                                                        </div>

                                                        {
                                                            listDress.length > 0 &&
                                                            <div className="input-group input-group-outline my-3">
                                                                <Select className="form-control"
                                                                    placeholder='Nhập tên váy'
                                                                    options={listDress} >
                                                                </Select>
                                                            </div>
                                                        }
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