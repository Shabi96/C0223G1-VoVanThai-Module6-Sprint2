import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CurrencyFormat from "./CurrencyFormat";
import { useNavigate } from "react-router-dom";
import { createNewContract } from "../services/ContractService";
export default function Payment() {
    const [responseCode, setResponseCode] = useState(null);
    const [contract, setContract] = useState(null);
    const navigate = useNavigate();

    const headers = {
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    }

    console.log(headers);
    const getURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const responseCode = urlParams.get('vnp_ResponseCode');
        console.log(responseCode);
        setResponseCode(responseCode)
    }
    useEffect(() => {
        let tokenLogin = localStorage.getItem("token");
        if (tokenLogin == null) {
            navigate('/404')
        }
    }, [])

    const paymentSuccess = async () => {
        if (responseCode == '00') {
            const data = localStorage.getItem("createContract");
            console.log(JSON.parse(data));
            setContract(JSON.parse(data));
            localStorage.removeItem("createContract");
            await createNewContract(JSON.parse(data), headers).then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thanh toán thành công!!!!',
                    timer: 1500,
                    showConfirmButton: false
                })
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Thanh toán thất bại!!!!',
                timer: 1500,
                showConfirmButton: false
            }).then(async () => {
                const data = localStorage.getItem("createContract");
                console.log(JSON.parse(data));
                setContract(JSON.parse(data));
                localStorage.removeItem("createContract");
            })
        }
    }
    console.log(contract);

    useEffect(() => {
        if (responseCode != null) {
            paymentSuccess();
        }
    }, [responseCode])

    useEffect(() => {
        getURL();
    }, [])
    return (
        <>
            {
                (responseCode !== null && contract != null && contract?.combo.idCombo == 1) ?
                    <div className="mt-5">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 mt-3">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>THÔNG TIN THANH TOÁN</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Khách hàng: </span>
                                    <input className='form-control'
                                        value={contract.customer.nameCustomer} readOnly>
                                    </input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Combo đã chọn: </span>
                                    <input className='form-control' value={contract.combo.idCombo}
                                        readOnly>
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Ngày thuê: </span>
                                    <input value={contract.startDate} className="form-control" type="date"
                                        readOnly />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Ngày trả: </span>
                                    <input value={contract.endDate} className="form-control" type="date"
                                        readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Váy: </span>
                                    <input className="form-control"
                                        value={contract.dress.nameDress}
                                        readOnly
                                    >
                                    </input>
                                    <span className="select-arrow" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Vest</span>
                                    <input className="form-control"
                                        value={contract.vest.nameVest}
                                        readOnly>
                                    </input>
                                    <span className="select-arrow" />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Đã cọc:  </span>
                                    <p className="form-control"
                                    >
                                        <CurrencyFormat value={contract.deposit} /> VNĐ
                                    </p>
                                    <span className="select-arrow" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span className="form-label">Tổng tiền:  </span>
                                    <p className="form-control"
                                    >
                                        <CurrencyFormat value={contract.totalPrice} /> VNĐ
                                    </p>
                                    <span className="select-arrow" />
                                </div>
                            </div>
                        </div>
                        <div className="form-btn">
                            <div className="row ">
                                <div className="col-4"></div>
                                <div className="col-4">
                                    <button className="submit-btn home-btn" onClick={() => { navigate("/contract") }}>Xác nhận</button>
                                </div>
                                <div className="col-4"></div>

                            </div>
                        </div>
                    </div> : responseCode != null && contract != null && contract?.combo.idCombo == 2 ?
                        <div className="mt-5">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 mt-3">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>THÔNG TIN THANH TOÁN</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Khách hàng: </span>
                                        <input className='form-control'
                                            value={contract.customer.nameCustomer} readOnly>
                                        </input>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Combo đã chọn: </span>
                                        <input className='form-control' value={contract.combo.idCombo}
                                            readOnly>
                                        </input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Ngày thuê: </span>
                                        <input value={contract.startDate} className="form-control" type="date"
                                            readOnly />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Ngày trả: </span>
                                        <input value={contract.endDate} className="form-control" type="date"
                                            readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Váy ngày 1: </span>
                                        <input className="form-control"
                                            value={contract.dress.nameDress}
                                            readOnly
                                        >
                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Vest ngày 1:</span>
                                        <input className="form-control"
                                            value={contract.vest.nameVest}
                                            readOnly>
                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Váy ngày 2: </span>
                                        <input className="form-control"
                                            value={contract.dress1.nameDress}
                                            readOnly
                                        >
                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Vest ngày 2:</span>
                                        <input className="form-control"
                                            value={contract.vest1.nameVest}
                                            readOnly>
                                        </input>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Đã cọc:  </span>
                                        <p className="form-control"
                                        >
                                            <CurrencyFormat value={contract.deposit} /> VNĐ
                                        </p>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <span className="form-label">Tổng tiền:  </span>
                                        <p className="form-control"
                                        >
                                            <CurrencyFormat value={contract.totalPrice} /> VNĐ
                                        </p>
                                        <span className="select-arrow" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-btn">
                                <div className="row">
                                    <div className="col-4"></div>
                                    <div className="col-4">
                                        <button className="submit-btn home-btn" onClick={() => { navigate("/contract") }}>Xác nhận</button>
                                    </div>
                                    <div className="col-4"></div>
                                </div>
                            </div>
                        </div> :
                        <></>
            }
        </>
    )
}