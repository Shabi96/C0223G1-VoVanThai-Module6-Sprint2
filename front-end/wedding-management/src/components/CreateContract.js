import React, { useEffect, useState } from "react";
import { getCustomerByPhone } from "../services/CustomerService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getAllCombo } from "../services/ComboService";
import { getAllDress, getDressById } from "../services/DressService";
import Select from 'react-select';
import { add } from 'date-fns';
import { findEmployeeByEmail } from "../services/EmployeeService";
import { getVestByDate, getVestById } from "../services/VestService";
import { debounce } from 'lodash';
import { getPayment } from "../services/PaymentService";
import CurrencyFormat from "./CurrencyFormat";
import image1 from '../vnpay.jpg';


// Kiểm tra số điện thoại khách hàng có tồn tại hay không? => ......
export default function CreateContract() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [combo, setCombo] = useState([]);
    const [selectedCombo, setSelectedCombo] = useState(0);
    const [listDress, setListDress] = useState([]);
    const [upgraded, setUpgraded] = useState(false);
    const [typeDress, setTypeDress] = useState("STANDARD");
    const [selectedDress, setSelectedDress] = useState(null);
    const [returnDate, setReturnDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [listVests, setListVests] = useState([]);
    const [selectedVest, setSelectedVest] = useState(null);
    const [idDress, setIdDress] = useState(null);
    const [idVest, setIdVest] = useState(null);
    const [idDress2, setIdDress2] = useState(null);
    const [idVest2, setIdVest2] = useState(null);
    const [listDress2, setListDress2] = useState([]);
    const [listVest2, setListVests2] = useState([]);
    const [selectedDress2, setSelectedDress2] = useState(null);
    const [selectedVest2, setSelectedVest2] = useState(null);
    const [filterSelectedDress, setFilterSelectedDress] = useState([]);
    const [filterSelectedVest, setFilterSelectedVest] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [selectContract, setSelectContract] = useState(null);
    const [dressImage, setDressImage] = useState(null);
    const [vestImage, setVestImage] = useState(null);
    const [dressImage2, setDressImage2] = useState(null);
    const [vestImage2, setVestImage2] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isOpenPayment, setIsOpenPayment] = useState(false);
    const [inputDe, setInputDe] = useState(0);
    const [phoneCreate, setPhoneCreate] = useState("");
    const [depositMoney, setDepositMoney] = useState(2000000);

    useEffect(() => {
        let tokenLogin = localStorage.getItem("token");
        if (tokenLogin == null) {
            navigate('/404')
        }
    }, [])
    const openModalPayment = () => {
        setIsOpenPayment(true);
    };

    const closeModalPayment = () => {
        setIsOpenPayment(false);
        openModal();
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const getPhoneCreate = async (phone) => {
        setPhoneCreate(phone);
        localStorage.removeItem('phoneCreate');
    }

    useEffect(() => {
        const phoneCreateLocal = localStorage.getItem('phoneCreate');
        if (phoneCreateLocal != null) {
            getPhoneCreate(phoneCreateLocal);
        }
    }, [])

    const getUser = async () => {
        const phone = document.getElementById("find-customer").value;
        try {
            const data = await getCustomerByPhone(phone, headers);
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
                    navigate("/create-customer/" + phone);
                } else {
                    return
                }
            })
        }
    }
    const handleEnter = async (e) => {
        const key = e.keyCode;
        if (key == 13) {
            getUser()
        }
    }

    const getUpgraded = () => {
        console.log(selectedCombo);
        setListDress([]);
        setListVests([]);
        setSelectedDress(null);
        setSelectedVest(null);
        setSelectedDress2(null);
        setSelectedVest2(null);
        setDressImage(null);
        setVestImage(null);
        setDressImage2(null);
        setVestImage2(null);
        if (upgraded) {
            setUpgraded(false);

        } else {
            setUpgraded(true);
        }

        setTypeDress("STANDARD");
    }

    const getCombo = async () => {
        try {
            const data = await getAllCombo(headers);
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

    const checkRentedDate = async () => {
        setListDress([]);
        setListVests([]);
        setSelectedDress(null);
        setSelectedVest(null);
        setSelectedDress2(null);
        setSelectedVest2(null);
        setDressImage(null);
        setVestImage(null);
        setDressImage2(null);
        setVestImage2(null);
        const inputDate = document.getElementById("find-date").value;
        try {
            const data = await getAllDress(typeDress, inputDate, headers);
            const listSelectDress = data.map((dr) => ({
                value: dr.idDress,
                label: dr.nameDress
            }))
            setListDress([...listSelectDress]);
            const dataVest = await getVestByDate(inputDate, headers);
            const listSelectVest = dataVest.map((vest) => ({
                value: vest.idVest,
                label: vest.nameVest
            }))
            setListVests([...listSelectVest]);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Chưa chọn ngày thuê!!!!",
                showConfirmButton: false,
                timer: 1500
            })
        }

    }
    const headers = {
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    }

    const handleChange = async (selectedOption) => {
        setSelectedDress(selectedOption);
        setIdDress(selectedOption?.value);
        setDressImage2(null);
        try {
            setDressImage(await getDressById(selectedOption?.value, headers));
        } catch (err) {
            console.log("chưa lấy được ảnh!!!!");
            setDressImage(null)
            return
        }

        handleFilterDress();
    }

    const handleFilterDress = async () => {
        const filterDress = listDress.filter((ft) => {
            return ft.value !== selectedDress?.value;
        })
        setFilterSelectedDress(filterDress);
    }

    const debouncedHandleFilter = debounce(handleFilterDress, 300);


    const handleChange2 = async (selectedOption) => {
        setSelectedDress2(selectedOption);
        setIdDress2(selectedOption?.value);
        try {
            setDressImage2(await getDressById(selectedOption?.value, headers));
        } catch (err) {
            console.log("chưa lấy được ảnh!!!!");
            setDressImage2(null)
            return
        }
    }

    const handleChangeVest = async (selectedVestRented) => {
        setSelectedVest(selectedVestRented);
        setIdVest(selectedVestRented?.value);
        setVestImage(null);
        try {
            setVestImage(await getVestById(selectedVestRented?.value, headers));
        } catch (err) {
            console.log("chưa lấy được ảnh!!!!");
            setVestImage(null)
            return
        }
        handleFilterVest();
    }

    const handleFilterVest = async () => {
        const filterVest = listVests.filter((ft) => {
            return ft.value !== selectedVest?.value;
        })
        setFilterSelectedVest(filterVest);
    }
    const debouncedHandleFilterVest = debounce(handleFilterVest, 300);


    const handleChangeVest2 = async (selectedVestRented) => {
        setSelectedVest2(selectedVestRented);
        setIdVest2(selectedVestRented?.value);
        try {
            setVestImage2(await getVestById(selectedVestRented?.value, headers));
        } catch (err) {
            console.log("chưa lấy được ảnh!!!!");
            setVestImage2(null);
            return
        }
    }

    const handleReturnDate = async (values) => {
        setListDress([]);
        setStartDate(values);
        let rentedDate = new Date(values);
        const endDate = add(rentedDate, { days: 3 });
        const formattedEndDate = endDate.toISOString().substring(0, 10);
        setReturnDate(formattedEndDate);
    }

    const handleSelectCombo = async (e) => {
        setSelectedCombo(e.target.value);
        setListDress([]);
        setListVests([]);
        setSelectedDress(null);
        setSelectedVest(null);
        setSelectedDress2(null);
        setSelectedVest2(null);
        setDressImage(null);
        setVestImage(null);
        setDressImage2(null);
        setVestImage2(null);
    }

    const handleCreateContract1 = async () => {
        console.log("đã vào");
        const inputDate = document.getElementById("find-date").value;
        if (inputDate == '') {
            Swal.fire({
                title: "Chưa chọn ngày thuê!!!!",
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (selectedDress == null || selectedVest == null) {
            Swal.fire({
                title: "Chưa chọn váy hoặc vest!!!!",
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            try {
                const employee = await findEmployeeByEmail(localStorage.getItem("username"), headers);
                const data = await getDressById(idDress, headers);
                const vestFind = await getVestById(idVest, headers);
                let price;
                if (typeDress == 'STANDARD') {
                    price = combo[0].priceCombo;
                } else if (typeDress == 'VIP') {
                    price = combo[0].priceCombo + 1000000;
                } else {
                    price = combo[0].priceCombo + 2000000;
                }
                setTotalPrice(price);
                const contract = {
                    startDate: startDate,
                    endDate: returnDate,
                    combo: {
                        idCombo: parseInt(selectedCombo)
                    },
                    customer: user,
                    employee: employee,
                    dress: data,
                    vest: vestFind,
                    dress1: null,
                    vest1: null,
                    totalPrice: price
                }
                setSelectContract(contract);
                openModal();
                console.log(contract);
            } catch (error) {
                Swal.fire({
                    title: "Thêm mới không thành công!!!!",
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }


    const handleCheckDeposit = async () => {
        const inputDeposit = document.getElementById('input-deposit').value * 1;
        if (inputDeposit < 2000000) {
            Swal.fire({
                icon: 'warning',
                title: 'Số tiền cọc phải từ 2.000.000 VNĐ!!!!',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (inputDeposit > totalPrice) {
            Swal.fire({
                icon: 'warning',
                title: 'Bạn sai số tiền rồi',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            setInputDe(inputDeposit);
            closeModal()
            openModalPayment();
        }

    }

    const handlePayment = async () => {
        Swal.fire({
            icon: 'question',
            title: 'Bạn có chắc chắn tiến hành làm hợp đồng????',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
            reverseButtons: true
        }).then(async (res) => {
            if (res.isConfirmed) {
                const newContract = { ...selectContract, deposit: inputDe }
                console.log(newContract);
                localStorage.setItem('createContract', JSON.stringify(newContract));
                await getPayment(newContract.deposit).then((res) => {
                    window.location.href = res;
                });
            } else {
                return
            }
        })

    }
    const handleCheckDeposit2 = async () => {
        const inputDeposit = document.getElementById('input-deposit').value * 1;
        if (inputDeposit < 2000000) {
            Swal.fire({
                icon: 'warning',
                title: 'Số tiền cọc phải từ 2.000.000 VNĐ!!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else if (inputDeposit > totalPrice) {
            Swal.fire({
                icon: 'warning',
                title: 'Bạn sai số tiền rồi',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            setInputDe(inputDeposit);
            closeModal()
            openModalPayment();
        }
    }

    const handleCreateContract2 = async () => {
        console.log("đã vào");
        const inputDate = document.getElementById("find-date").value;
        if (inputDate == '') {
            Swal.fire({
                title: "Chưa chọn ngày thuê!!!!",
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (selectedDress == null || selectedVest == null) {
            Swal.fire({
                title: "Chưa chọn váy hoặc vest ngày 1!!!!",
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (selectedDress2 == null || selectedVest2 == null) {
            Swal.fire({
                title: "Chưa chọn váy hoặc vest ngày 2!!!!",
                icon: 'warning',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            try {
                const employee = await findEmployeeByEmail(localStorage.getItem("username"), headers);
                const dress1 = await getDressById(idDress, headers);
                const dress2 = await getDressById(idDress2, headers);
                const vestFind1 = await getVestById(idVest, headers);
                const vestFind2 = await getVestById(idVest2, headers);
                let price;
                if (typeDress == 'STANDARD') {
                    price = combo[1].priceCombo;
                } else if (typeDress == 'VIP') {
                    price = combo[1].priceCombo + 1500000;
                } else {
                    price = combo[1].priceCombo + 3000000;
                }
                setTotalPrice(price);
                const contract1 = {
                    startDate: startDate,
                    endDate: returnDate,
                    combo: {
                        idCombo: parseInt(selectedCombo)
                    },
                    customer: user,
                    employee: employee,
                    dress: dress1,
                    vest: vestFind1,
                    dress1: dress2,
                    vest1: vestFind2,
                    totalPrice: price
                }
                console.log(contract1);
                setSelectContract(contract1);
                openModal();
            } catch (error) {
                Swal.fire({
                    title: "Thêm mới không thành công!!!!",
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }

    }

    useEffect(() => {
        document.title = 'Thêm Mới Hợp Đồng'
    }, [])

    useEffect(() => {
        debouncedHandleFilter();
    }, [selectedDress]);

    useEffect(() => {
        debouncedHandleFilterVest();
    }, [selectedVest]);

    useEffect(() => {
        getCombo()
    }, [selectedCombo, idDress, upgraded]);

    return (
        <main className="main-content" style={{
            backgroundImage: 'url("https://icdn.dantri.com.vn/zoom/1200_630/2022/07/14/wedding-fair-pr2docx-1657782815565.jpeg")',
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
        }}>

            <div className="page-header d-flex align-items-start min-vh-100 justify-content-center align-items-center pt-4" >
                <span className="opacity-6" />
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-10 col-md-10 col-12 mx-auto">
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
                                                <select className="form-control" onChange={(e) => handleSelectCombo(e)}>
                                                    <option value={null}>Chọn Combo</option>
                                                    {combo.map((c, index) => {
                                                        return (
                                                            <option key={index} onChange={(e) => setCombo(e.target.value)} value={c.idCombo}>{c.nameCombo}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            {(selectedCombo == 1 && combo.length > 0) ?
                                                <>
                                                    <h6 style={{ color: '#866ec7', fontWeight: 'bold' }}>Combo {combo[0].nameCombo}: &nbsp;
                                                        {typeDress == 'STANDARD' ?
                                                            <>
                                                                {<CurrencyFormat value={combo[0].priceCombo} />} VNĐ
                                                            </> : typeDress == 'VIP' ?
                                                                <>
                                                                    {<CurrencyFormat value={combo[0].priceCombo + 1000000} />} VNĐ
                                                                </> :
                                                                <>
                                                                    {<CurrencyFormat value={combo[0].priceCombo + 2000000} />} VNĐ
                                                                </>}

                                                    </h6>
                                                    <p>Bao gồm:<br />
                                                        - Trang điểm cô dâu.{"("}Có mặt tại nhà cô dâu 2h trước khi làm lễ{")"} <br />
                                                        - Hoa cưới cầm tay.{"("}Nhận cùng với đồ{")"} <br />
                                                        - 1 bộ vest chú rể.{"("}Đã bao gồm cà vạt{")"}<br />
                                                        - 1 váy cô dâu STANDARD.{"("}Có thể nâng hạng + phí{")"}
                                                    </p>
                                                    <div> <input type="checkbox" onClick={() => { getUpgraded() }} name='check-upgraded' id='check-upgraded' /> &nbsp;
                                                        <label htmlFor="check-upgraded" style={{ color: '#866ec7', fontWeight: 'bold' }}>Nâng hạng váy cô dâu</label> </div>

                                                    {
                                                        (upgraded == true && selectedCombo == 1) &&
                                                        <>
                                                            <input type="radio" onChange={(e) => setTypeDress(e.target.value)} id="vip" name="type-dress" value={"VIP"} /> &nbsp;
                                                            <label htmlFor="vip"> VIP + 1.000.000 VNĐ </label> <br />
                                                            <input type="radio" id="luxury" onChange={(e) => setTypeDress(e.target.value)} name="type-dress" value={"LUXURY"} /> &nbsp;
                                                            <label htmlFor="luxury"> LUXURY + 2.000.000 VNĐ  </label> <br />
                                                        </>

                                                    }

                                                    <div className="input-group input-group-outline">
                                                        <label htmlFor="find-date" style={{ color: '#866ec7', fontWeight: 'bold' }}>Chọn ngày thuê: </label>
                                                        <div className="choise-date">
                                                            <input id="find-date"
                                                                min={new Date().toISOString().split('T')[0]}
                                                                onChange={(e) => handleReturnDate(e.target.value)} style={{ width: '50%' }} type="date" className="form-control" />
                                                            <div className="check-date">
                                                                <button type="button" onClick={() => checkRentedDate()} style={{ color: 'white', fontWeight: 'bold' }}>Kiểm tra</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        (listDress.length > 0 && listVests.length > 0) &&
                                                        <div className="row select-select">
                                                            <div className="col-5 start-pointor">
                                                                <div className="row">
                                                                    <div className="start-pointor__title">Chọn váy:</div>
                                                                    <div>
                                                                        <Select className=""
                                                                            placeholder='Nhập tên váy'
                                                                            isClearable
                                                                            options={listDress}
                                                                            value={selectedDress}
                                                                            onChange={handleChange}
                                                                        >
                                                                        </Select>
                                                                    </div>
                                                                    {dressImage != null &&
                                                                        <div className="">
                                                                            <img src={dressImage.image} style={{ width: '100%', height: '250px' }}></img>
                                                                        </div>
                                                                    }
                                                                </div>

                                                            </div>

                                                            <div className="col-5 start-pointor">
                                                                <div className="start-pointor__title">Chọn VEST :</div>
                                                                <Select className=""
                                                                    placeholder='Nhập tên vest'
                                                                    isClearable
                                                                    options={listVests}
                                                                    value={selectedVest}
                                                                    onChange={handleChangeVest}
                                                                >
                                                                </Select>
                                                                {vestImage != null &&
                                                                    <div className="">
                                                                        <img src={vestImage.image} style={{ width: '100%', height: '250px' }}></img>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>

                                                    }
                                                    {
                                                        (idDress != null && returnDate != null && listDress.length > 0 && dressImage != null) &&
                                                        <div className="input-group input-group-outline my-3">
                                                            <label htmlFor="return-date" style={{ color: '#866ec7', fontWeight: 'bold' }}>Ngày trả: </label>
                                                            <input id="return-date" readOnly style={{ width: '50%' }} value={returnDate} type="date" className="form-control" />
                                                        </div>
                                                    }
                                                    <div className="row text-center">
                                                        <div className="col-2"></div>
                                                        <div className="col-8">
                                                            <button type="button" onClick={() => handleCreateContract1()} className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Thêm mới</button>
                                                        </div>
                                                        <div className="col-2"></div>
                                                    </div>
                                                </> : selectedCombo == 2 ?
                                                    <>
                                                        <h6 style={{ color: '#866ec7', fontWeight: 'bold' }}>Combo {combo[1].nameCombo}: &nbsp;
                                                            {typeDress == 'STANDARD' ?
                                                                <>
                                                                    {<CurrencyFormat value={combo[1].priceCombo} />} VNĐ
                                                                </> : typeDress == 'VIP' ?
                                                                    <>
                                                                        {<CurrencyFormat value={combo[1].priceCombo + 1500000} />} VNĐ
                                                                    </> :
                                                                    <>
                                                                        {<CurrencyFormat value={combo[1].priceCombo + 3000000} />} VNĐ
                                                                    </>}

                                                        </h6>
                                                        <p>Bao gồm:<br />
                                                            - Trang điểm cô dâu.{"("}Có mặt tại nhà cô dâu 2h trước khi làm lễ{")"} <br />
                                                            - Hoa cưới cầm tay.{"("}Nhận cùng với đồ{")"} <br />
                                                            - 2 bộ vest chú rể.{"("}Đã bao gồm cà vạt{")"}<br />
                                                            - 2 váy cô dâu STANDARD.{"("}Có thể nâng hạng + phí{")"}
                                                        </p>
                                                        <div> <input type="checkbox" onClick={() => { getUpgraded() }} name='check-upgraded' id='check-upgraded' /> &nbsp;
                                                            <label htmlFor="check-upgraded" style={{ color: '#866ec7', fontWeight: 'bold' }}>Nâng hạng váy cô dâu</label> </div>

                                                        {
                                                            (upgraded == true && selectedCombo == 2) &&
                                                            <>
                                                                <input type="radio" onChange={(e) => setTypeDress(e.target.value)} id="vip" name="type-dress" value={"VIP"} /> &nbsp;
                                                                <label htmlFor="vip"> VIP + 1.500.000 VNĐ </label> <br />
                                                                <input type="radio" id="luxury" onChange={(e) => setTypeDress(e.target.value)} name="type-dress" value={"LUXURY"} /> &nbsp;
                                                                <label htmlFor="luxury"> LUXURY + 3.000.000 VNĐ  </label> <br />
                                                            </>
                                                        }
                                                        <div className="input-group input-group-outline">
                                                            <label htmlFor="find-date" style={{ color: '#866ec7', fontWeight: 'bold' }}>Chọn ngày thuê 1: </label>
                                                            <div className="choise-date">
                                                                <input id="find-date"
                                                                    min={new Date().toISOString().split('T')[0]}
                                                                    onChange={(e) => handleReturnDate(e.target.value)} style={{ width: '50%' }} type="date" className="form-control" />
                                                                <div className="check-date">
                                                                    <button type="button" onClick={() => checkRentedDate()} style={{ color: 'white', fontWeight: 'bold' }}>Kiểm tra</button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {
                                                            (listDress.length > 0 && listVests.length > 0) &&
                                                            <>
                                                                <div className="row select-select">
                                                                    <h6 style={{ color: '#866ec7', fontWeight: 'bold' }}>Chọn váy và VEST ngày 1:</h6>
                                                                    <div className="col-5 start-pointor">
                                                                        <div className="start-pointor__title">Chọn váy : </div>
                                                                        <Select className=""
                                                                            placeholder='Nhập tên váy'
                                                                            isClearable
                                                                            options={listDress}
                                                                            value={selectedDress}
                                                                            onChange={handleChange}
                                                                        >
                                                                        </Select>
                                                                        {dressImage != null &&
                                                                            <div className="">
                                                                                <img src={dressImage.image} style={{ width: '100%', height: '250px' }}></img>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                    <div className="col-5 start-pointor">
                                                                        <div className="start-pointor__title">Chọn VEST : </div>
                                                                        <Select className=""
                                                                            placeholder='Nhập tên vest'
                                                                            isClearable
                                                                            options={listVests}
                                                                            value={selectedVest}
                                                                            onChange={handleChangeVest}
                                                                        >
                                                                        </Select>
                                                                        {vestImage != null &&
                                                                            <div className="">
                                                                                <img src={vestImage.image} style={{ width: '100%', height: '250px' }}></img>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {(selectedDress != null && selectedVest != null) &&
                                                                    <div className="row select-select">
                                                                        <h6 style={{ marginTop: '10px', color: '#866ec7', fontWeight: 'bold' }}>Chọn váy và VEST ngày 2:</h6>
                                                                        <div className="col-5 start-pointor">
                                                                            <div className="start-pointor__title">Chọn váy : </div>
                                                                            <Select className=""
                                                                                placeholder='Nhập tên váy'
                                                                                isClearable
                                                                                options={filterSelectedDress}
                                                                                value={selectedDress2}
                                                                                onChange={handleChange2}
                                                                            >
                                                                            </Select>
                                                                            {dressImage2 != null &&
                                                                                <div className="">
                                                                                    <img src={dressImage2.image} style={{ width: '100%', height: '250px' }}></img>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                        <div className="col-5 start-pointor">
                                                                            <div className="start-pointor__title">Chọn VEST : </div>
                                                                            <Select className=""
                                                                                placeholder='Nhập tên vest'
                                                                                isClearable
                                                                                options={filterSelectedVest}
                                                                                value={selectedVest2}
                                                                                onChange={handleChangeVest2}
                                                                            >
                                                                            </Select>
                                                                            {vestImage2 != null &&
                                                                                <div className="">
                                                                                    <img src={vestImage2.image} style={{ width: '100%', height: '250px' }}></img>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                }
                                                                {
                                                                    (idDress != null && returnDate != null && listDress.length > 0) &&
                                                                    <div className="input-group input-group-outline my-3">
                                                                        <label htmlFor="return-date" style={{ color: '#866ec7', fontWeight: 'bold' }}>Ngày trả: </label>
                                                                        <input id="return-date" readOnly style={{ width: '50%' }} value={returnDate} type="date" className="form-control" />
                                                                    </div>
                                                                }
                                                                <div className="row text-center">
                                                                    <div className="col-2"></div>
                                                                    <div className="col-8">
                                                                        <button type="button" onClick={() => handleCreateContract2()} className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Thêm mới</button>
                                                                    </div>
                                                                    <div className="col-2"></div>
                                                                </div>
                                                            </>
                                                        }
                                                    </> :
                                                    <></>
                                            }
                                        </div>

                                    </> : phoneCreate != "" ?
                                        <div className="card-body">
                                            <div className="input-group input-group-outline my-3">
                                                <input id="find-customer" value={phoneCreate} onChange={(e) => setPhoneCreate(e.target.value)} onKeyDown={(e) => handleEnter(e)} type="text" placeholder="Nhập số điện thoại khách hàng" className="form-control" />
                                            </div>
                                            <div className="text-center">
                                                <button type="button" onClick={() => getUser()} className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Kiểm tra</button>
                                            </div>
                                        </div>
                                        :
                                        <div className="card-body">
                                            <div className="input-group input-group-outline my-3">
                                                <input id="find-customer" onKeyDown={(e) => handleEnter(e)} type="text" placeholder="Nhập số điện thoại khách hàng" className="form-control" />
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
                {
                    isOpenPayment &&
                    <div className="modal">
                        <div className="modal_overlay">
                        </div>
                        <div className="modal_body_deposit">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 mb-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>Xác nhận thanh toán</h6>
                                </div>
                            </div>
                            <div className="modal_inner" >
                                <h5 style={{ textAlign: 'center' }}>Số tiền thanh toán: <CurrencyFormat value={inputDe} /> VNĐ </h5>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src={image1} style={{ width: '200px' }}></img>
                                </div>

                                <div className="form-btn" style={{ marginTop: '20px' }}>
                                    <div className="row detail-deposit">
                                        <div className="col-5">
                                            <button className="submit-btn home-btn" onClick={() => { handlePayment() }}>Xác nhận</button>
                                        </div>
                                        <div className="col-5">
                                            <button onClick={() => closeModalPayment()} className="submit-btn back-btn">Trở về
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                }
            </div>
            {(isOpen && selectContract != null && selectedCombo == 1) ?
                <div className="modal">
                    <div className="modal_overlay">
                    </div>
                    <div className="modal_body">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 mb-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>Xác nhận hợp đồng</h6>
                            </div>
                        </div>
                        <div className="modal_inner">
                            <div className="row space-around">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Khách hàng: </span>
                                        <input className='form-control'
                                            value={user.nameCustomer} readOnly>
                                        </input>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Combo đã chọn: </span>
                                        <input className='form-control' value={selectedCombo}
                                            readOnly>
                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className="row space-around">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Ngày thuê: </span>
                                        <input value={selectContract.startDate} className="form-control" type="date"
                                            readOnly />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Ngày trả: </span>
                                        <input value={selectContract.endDate} className="form-control" type="date"
                                            readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="row space-around">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Váy </span>
                                        <input className="form-control"
                                            value={selectContract.dress.nameDress}
                                            required
                                        >

                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Vest</span>
                                        <input className="form-control"
                                            value={selectContract.vest.nameVest}
                                            required>

                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="row space-around">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Tiền cọc:  </span>
                                        <input className="form-control"
                                            id='input-deposit'
                                            required
                                            value={depositMoney}
                                            onChange={(e) => setDepositMoney(e.target.value)}
                                        >
                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Tổng tiền:  </span>
                                        <p className="form-control"
                                        >
                                            <CurrencyFormat value={selectContract.totalPrice} /> VNĐ

                                        </p>


                                        <span className="select-arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-btn">
                                <div className="row space-around">
                                    <div className="col-5">
                                        <button className="submit-btn home-btn" onClick={() => { handleCheckDeposit() }}>Xác nhận</button>
                                    </div>
                                    <div className="col-5">
                                        <button onClick={() => closeModal()} className="submit-btn back-btn">Trở về
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> : (isOpen && selectContract != null && selectedCombo == 2) &&
                <div className="modal">
                    <div className="modal_overlay">
                    </div>
                    <div className="modal_body1">
                        <div className="modal_inner">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 mb-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>Xác nhận hợp đồng</h6>
                                </div>
                            </div>
                            <div className="row space-around">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Khách hàng: </span>
                                        <input className='form-control'
                                            value={user.nameCustomer} readOnly>
                                        </input>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Combo đã chọn: </span>
                                        <input className='form-control' value={selectedCombo}
                                            readOnly>
                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className="row space-around">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Ngày thuê: </span>
                                        <input value={selectContract.startDate} className="form-control" type="date"
                                            readOnly />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Ngày trả: </span>
                                        <input value={selectContract.endDate} className="form-control" type="date"
                                            readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="row space-around">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Váy ngày 1: </span>
                                        <input className="form-control"
                                            value={selectContract.dress.nameDress}
                                            required
                                        >

                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Vest ngày 1</span>
                                        <input className="form-control"
                                            value={selectContract.vest.nameVest}
                                            required>

                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="row space-around">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Váy ngày 2: </span>
                                        <input className="form-control"
                                            value={selectContract.dress1.nameDress}
                                            required
                                        >

                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Vest ngày 2</span>
                                        <input className="form-control"
                                            value={selectContract.vest1.nameVest}
                                            required>

                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="row space-around">
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Tiền cọc:  </span>
                                        <input className="form-control"
                                            id='input-deposit'
                                            required
                                            value={depositMoney}
                                            onChange={(e) => setDepositMoney(e.target.value)}
                                        >

                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="form-group">
                                        <span className="form-label">Tổng tiền:  </span>
                                        <p className="form-control">
                                            <CurrencyFormat value={selectContract.totalPrice} /> VNĐ
                                        </p>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-btn">
                                <div className="row">
                                    <div className="col-6">
                                        <button className="submit-btn home-btn" onClick={() => { handleCheckDeposit2() }}>Xác nhận</button>
                                    </div>
                                    <div className="col-6">
                                        <button onClick={() => closeModal()} className="submit-btn back-btn">Trở về
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            }
        </main>
    )
}