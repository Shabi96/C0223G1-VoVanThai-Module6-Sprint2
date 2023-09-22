import React, { useEffect, useState } from "react";
import moment from 'moment';
import { cancelContract, endContract, getAllContract, getContractById, getContractDetailsByContractId } from "../services/ContractService";
import CurrencyFormat from "./CurrencyFormat";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import image1 from '../vnpay.jpg';

//20/9 check ngày hủy????
export default function Contract() {
    const [contracts, setContracts] = useState([]);
    let [page, setPage] = useState(0);
    let [nameCustomer, setNameCustomer] = useState('');
    let [status, setStatus] = useState('');
    const [contractDetails, setContractDetails] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [isOpenEnd, setIsOpenEnd] = useState(false);
    const [contract, setContract] = useState(null);
    const navigate = useNavigate();
    const [isOpenPayment, setIsOpenPayment] = useState(false);
    const [inputDe, setInputDe] = useState(0);
    let [phone, setPhone] = useState('');

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
        openModalEnd();
    };

    const headers = {
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    }

    const openModal = async () => {
        setIsOpen(true);
    };

    const closeModal = async () => {
        setIsOpen(false);
    };

    const openModalEnd = async () => {
        closeModal();
        setIsOpenEnd(true);
    };

    const closeModalEnd = async () => {
        setIsOpenEnd(false);
    };

    const getListContractsByStatus = async (page, nameCustomer, phone, status) => {
        try {
            const data = await getAllContract(page, nameCustomer, phone, status, headers);
            setContracts(data);
        } catch (error) {
            console.log(error);
            navigate('/404')
        }

    }


    const getContractDetails = async (id) => {
        try {
            const data = await getContractDetailsByContractId(id, headers);
            setContract(await getContractById(id, headers));
            setContractDetails(data);
            openModal();
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Có lỗi xảy ra!!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const handleSearch = async () => {
        const nameCustomer = document.getElementById("name-search").value;
        const phoneCustomer = document.getElementById("phone-search").value;
        setNameCustomer(nameCustomer);
        setPhone(phoneCustomer)
        console.log(nameCustomer);
        try {
            setPage(0);
            setContracts(await getAllContract(0, nameCustomer.trim(), phoneCustomer.trim(), status, headers));
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: 'Không tìm thấy!!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }

    }
    const handleEnter = async (e) => {
        const key = e.keyCode;
        if (key == 13) {
            handleSearch()
        }
    }

    const setStautusFunction = async () => {
        const data = document.getElementById("status-search").value;
        console.log(data);
        setStatus(data);
    }

    const setPageFunction = async (pageAfter) => {
        setPage(pageAfter);
    }

    const nextPage = async () => {
        page += 1;
        if (page < contracts.totalPages) {
            await setPageFunction(page).then(setContracts(await getAllContract(page, nameCustomer, phone, status, headers)));
        }
        else {
            setPage(page - 1);
        }
    }

    const previousPage = async () => {
        if (page >= 1) {
            page -= 1;
        }
        await setPageFunction(page).then(setContracts(await getAllContract(page, nameCustomer, phone, status, headers)));
    }

    const handlePayment = async () => {
        console.log(headers);
        Swal.fire({
            icon: 'question',
            title: 'Xác nhận thanh toán hợp đồng????',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then(async (res) => {
            if (res.isConfirmed) {
                if ((contractDetails.length == 1 && contractDetails[0].dress.maintenanceTimes < 50 && contractDetails[0].dress.maintenanceTimes < 50)
                    || (contractDetails.length == 2 && contractDetails[0].dress.maintenanceTimes < 50 && contractDetails[0].dress.maintenanceTimes < 50
                        && contractDetails[1].dress.maintenanceTimes < 50 && contractDetails[1].dress.maintenanceTimes < 50)) {
                    try {
                        await endContract(contract.idContract, inputDe, headers).then(async () => {
                            Swal.fire(({
                                icon: 'success',
                                title: 'Thanh toán thành công!!!!',
                                showConfirmButton: false,
                                timer: 1500
                            })).then(() => {
                                setIsOpenEnd(false);
                                setIsOpenPayment(false);
                                navigate("/contract");
                            })
                        })
                    } catch (error) {
                        Swal.fire(({
                            icon: 'warning',
                            title: 'Thanh toán không thành công!!!!',
                            showConfirmButton: false,
                            timer: 1500
                        }))
                    }
                }
                else if (contractDetails[0].dress.maintenanceTimes == 50 && contractDetails.length == 1 && contractDetails[0].vest.maintenanceTimes == 50) {
                    let nameStatus;
                    switch (contractDetails[0].dress.typeDress.idTypeDress) {
                        case 1:
                            nameStatus = "Ngưng cho thuê";
                            break;
                        case 2:
                            nameStatus = "STANDARD";
                            break;
                        case 3:
                            nameStatus = "VIP";
                            break;
                        default:
                            break;
                    }
                    Swal.fire({
                        icon: 'question',
                        title: 'Số lần bảo trì của váy ' + contractDetails[0].dress.nameDress + ' và vest ' +
                            contractDetails[0].vest.nameVest + ' là ' + contractDetails[0].dress.maintenanceTimes + ' lần!!!!',
                        text: 'Xác nhận chuyển váy sang ' + nameStatus + ' và vest sang trạng thái Ngưng cho thuê ????',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Có',
                        cancelButtonText: 'Không'
                    }).then(async (r) => {
                        if (r.isConfirmed) {
                            try {
                                await endContract(contract.idContract, inputDe, headers).then(async () => {
                                    Swal.fire(({
                                        icon: 'success',
                                        title: 'Thanh toán thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })).then(() => {
                                        setIsOpenEnd(false);
                                        setIsOpenPayment(false);
                                        navigate("/contract");
                                    })
                                })
                            } catch (error) {
                                Swal.fire(({
                                    icon: 'warning',
                                    title: 'Thanh toán không thành công!!!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                }))
                            }
                        }
                    })
                } else if (contractDetails.length == 1 && contractDetails[0].vest.maintenanceTimes == 50 && contractDetails[0].dress.maintenanceTimes < 50) {
                    Swal.fire({
                        icon: 'question',
                        title: 'Số lần bảo trì của vest ' + contractDetails[0].vest.nameVest + ' là ' + contractDetails[0].vest.maintenanceTimes + ' lần!!!!',
                        text: 'Xác nhận chuyển vest sang trạng thái ' + 'Ngưng cho thuê ?',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Có',
                        cancelButtonText: 'Không'
                    }).then(async (re) => {
                        if (re.isConfirmed) {
                            try {
                                await endContract(contract.idContract, inputDe, headers).then(async () => {
                                    Swal.fire(({
                                        icon: 'success',
                                        title: 'Thanh toán thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })).then(() => {
                                        setIsOpenEnd(false);
                                        setIsOpenPayment(false);
                                        navigate("/contract");
                                    })
                                })
                            } catch (error) {
                                Swal.fire(({
                                    icon: 'warning',
                                    title: 'Thanh toán không thành công!!!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                }))
                            }
                        }
                    })
                } else if (contractDetails.length == 1 && contractDetails[0].dress.maintenanceTimes == 50 && contractDetails[0].vest.maintenanceTimes < 50) {
                    let nameStatus;
                    switch (contractDetails[0].dress.typeDress.idTypeDress) {
                        case 1:
                            nameStatus = "Ngưng cho thuê";
                            break;
                        case 2:
                            nameStatus = "STANDARD";
                            break;
                        case 3:
                            nameStatus = "VIP";
                            break;
                        default:
                            break;
                    }
                    Swal.fire({
                        icon: 'question',
                        title: 'Số lần bảo trì của váy ' + contractDetails[0].dress.nameDress + ' là ' + contractDetails[0].dress.maintenanceTimes + ' lần!!!!',
                        text: 'Xác nhận chuyển váy sang ' + nameStatus + '????',
                        showConfirmButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Có',
                        cancelButtonText: 'Không'
                    }).then(async (r) => {
                        if (r.isConfirmed) {
                            try {
                                await endContract(contract.idContract, inputDe, headers).then(async () => {
                                    Swal.fire(({
                                        icon: 'success',
                                        title: 'Thanh toán thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })).then(() => {
                                        setIsOpenEnd(false);
                                        setIsOpenPayment(false);
                                        navigate("/contract");
                                    })
                                })
                            } catch (error) {
                                Swal.fire(({
                                    icon: 'warning',
                                    title: 'Thanh toán không thành công!!!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                }))
                            }
                        }
                    })
                }
                else if (contractDetails.length == 1 && contractDetails[0].dress.maintenanceTimes < 50 && contractDetails[0].vest.maintenanceTimes < 50) {
                    try {
                        await endContract(contract.idContract, inputDe, headers).then(async () => {
                            Swal.fire(({
                                icon: 'success',
                                title: 'Thanh toán thành công!!!!',
                                showConfirmButton: false,
                                timer: 1500
                            })).then(() => {
                                setIsOpenEnd(false);
                                setIsOpenPayment(false);
                                navigate("/contract");
                            })
                        })
                    } catch (error) {
                        Swal.fire(({
                            icon: 'warning',
                            title: 'Thanh toán không thành công!!!!',
                            showConfirmButton: false,
                            timer: 1500
                        }))
                    }
                }
                else if (contractDetails.length == 2) {
                    console.log(contractDetails[0].dress.maintenanceTimes);
                    console.log(contractDetails[0].vest.maintenanceTimes);
                    console.log(contractDetails[1].dress.maintenanceTimes);
                    console.log(contractDetails[1].vest.maintenanceTimes);
                    if (contractDetails[0].dress.maintenanceTimes == 50 && contractDetails[0].vest.maintenanceTimes == 50
                        && contractDetails[1].dress.maintenanceTimes < 50 && contractDetails[1].vest.maintenanceTimes < 50) {
                        let nameStatus;
                        switch (contractDetails[0].dress.typeDress.idTypeDress) {
                            case 1:
                                nameStatus = "Ngưng cho thuê";
                                break;
                            case 2:
                                nameStatus = "STANDARD";
                                break;
                            case 3:
                                nameStatus = "VIP";
                                break;
                            default:
                                break;
                        }
                        Swal.fire({
                            icon: 'question',
                            title: 'Số lần bảo trì của váy ' + contractDetails[0].dress.nameDress + ' và vest ' +
                                contractDetails[0].vest.nameVest + ' là ' + contractDetails[0].dress.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển váy sang ' + nameStatus + ' và vest sang trạng thái Ngưng cho thuê ????',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (r) => {
                            if (r.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    } else if (contractDetails[1].dress.maintenanceTimes == 50 && contractDetails[1].vest.maintenanceTimes == 50
                        && contractDetails[0].dress.maintenanceTimes < 50 && contractDetails[0].vest.maintenanceTimes < 50) {
                        let nameStatus;
                        switch (contractDetails[1].dress.typeDress.idTypeDress) {
                            case 1:
                                nameStatus = "Ngưng cho thuê";
                                break;
                            case 2:
                                nameStatus = "STANDARD";
                                break;
                            case 3:
                                nameStatus = "VIP";
                                break;
                            default:
                                break;
                        }
                        Swal.fire({
                            icon: 'question',
                            title: 'Số lần bảo trì của váy ' + contractDetails[1].dress.nameDress + ' và vest ' +
                                contractDetails[1].vest.nameVest + ' là ' + contractDetails[1].dress.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển váy sang ' + nameStatus + ' và vest sang trạng thái Ngưng cho thuê ????',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (r) => {
                            if (r.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    } else if (contractDetails[1].vest.maintenanceTimes == 50 && contractDetails[1].dress.maintenanceTimes < 50 &&
                        contractDetails[0].dress.maintenanceTimes < 50 && contractDetails[0].vest.maintenanceTimes < 50) {
                        Swal.fire({
                            icon: 'question',
                            title: 'Số lần bảo trì của vest ' + contractDetails[1].vest.nameVest + ' là ' + contractDetails[1].vest.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển vest sang trạng thái ' + 'Ngưng cho thuê ?',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    } else if (contractDetails[0].vest.maintenanceTimes == 50
                        && contractDetails[1].dress.maintenanceTimes < 50 &&
                        contractDetails[0].dress.maintenanceTimes < 50 && contractDetails[1].vest.maintenanceTimes < 50) {
                        Swal.fire({
                            icon: 'question',
                            title: 'Số lần bảo trì của vest ' + contractDetails[1].vest.nameVest + ' là ' + contractDetails[1].vest.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển vest sang trạng thái ' + 'Ngưng cho thuê ?',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    } else if (contractDetails[0].dress.maintenanceTimes == 50
                        && contractDetails[1].dress.maintenanceTimes < 50 &&
                        contractDetails[0].vest.maintenanceTimes < 50 && contractDetails[1].vest.maintenanceTimes < 50) {
                        let nameStatus;
                        switch (contractDetails[0].dress.typeDress.idTypeDress) {
                            case 1:
                                nameStatus = "Ngưng cho thuê";
                                break;
                            case 2:
                                nameStatus = "STANDARD";
                                break;
                            case 3:
                                nameStatus = "VIP";
                                break;
                            default:
                                break;
                        }
                        Swal.fire({
                            icon: 'question',
                            title: 'Số lần bảo trì của váy ' + contractDetails[0].dress.nameDress + ' là ' + contractDetails[0].dress.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển váy sang ' + nameStatus + '????',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (r) => {
                            if (r.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    } else if (contractDetails[1].dress.maintenanceTimes == 50
                        && contractDetails[0].dress.maintenanceTimes < 50 &&
                        contractDetails[1].vest.maintenanceTimes < 50 && contractDetails[0].vest.maintenanceTimes < 50) {
                        let nameStatus;
                        switch (contractDetails[1].dress.typeDress.idTypeDress) {
                            case 1:
                                nameStatus = "Ngưng cho thuê";
                                break;
                            case 2:
                                nameStatus = "STANDARD";
                                break;
                            case 3:
                                nameStatus = "VIP";
                                break;
                            default:
                                break;
                        }
                        Swal.fire({
                            icon: 'question',
                            title: 'Số lần bảo trì của váy ' + contractDetails[1].dress.nameDress + ' là ' + contractDetails[1].dress.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển váy sang ' + nameStatus + '????',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (r) => {
                            if (r.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    }
                    else if (contractDetails[0].dress.maintenanceTimes == 50 &&
                        contractDetails[1].dress.maintenanceTimes == 50 &&
                        contractDetails[0].vest.maintenanceTimes == 50 &&
                        contractDetails[1].vest.maintenanceTimes < 50) {
                        Swal.fire({
                            icon: 'question',
                            title: 'Có 3 sản phẩm có số lần bảo trì ' + ' là ' + contractDetails[0].vest.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển trạng thái của tất cả sang tương ứng!!!!',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    } else if (contractDetails[0].dress.maintenanceTimes == 50 &&
                        contractDetails[1].dress.maintenanceTimes == 50 &&
                        contractDetails[1].vest.maintenanceTimes == 50 &&
                        contractDetails[0].vest.maintenanceTimes < 50) {
                        Swal.fire({
                            icon: 'question',
                            title: 'Có 3 sản phẩm có số lần bảo trì ' + ' là ' + contractDetails[1].vest.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển trạng thái của tất cả sang tương ứng!!!!',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    } else if (contractDetails[1].dress.maintenanceTimes == 50 &&
                        contractDetails[1].vest.maintenanceTimes == 50 &&
                        contractDetails[0].vest.maintenanceTimes == 50 &&
                        contractDetails[0].dress.maintenanceTimes < 50) {
                        Swal.fire({
                            icon: 'question',
                            title: 'Có 3 sản phẩm có số lần bảo trì ' + ' là ' + contractDetails[1].vest.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển trạng thái của tất cả sang tương ứng!!!!',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    } else if (contractDetails[0].dress.maintenanceTimes == 50 &&
                        contractDetails[1].vest.maintenanceTimes == 50 &&
                        contractDetails[0].vest.maintenanceTimes == 50 &&
                        contractDetails[1].dress.maintenanceTimes < 50) {
                        Swal.fire({
                            icon: 'question',
                            title: 'Có 3 sản phẩm có số lần bảo trì ' + ' là ' + contractDetails[0].vest.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển trạng thái của tất cả sang tương ứng!!!!',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    }
                    else if (contractDetails[0].dress.maintenanceTimes == 50 &&
                        contractDetails[1].vest.maintenanceTimes == 50 &&
                        contractDetails[0].vest.maintenanceTimes == 50 &&
                        contractDetails[1].dress.maintenanceTimes == 50) {
                        Swal.fire({
                            icon: 'question',
                            title: 'Cả 4 sản phẩm đều có số lần bảo trì là ' + contractDetails[0].vest.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển trạng thái của tất cả sang tương ứng!!!!',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    }
                    else if (contractDetails[0].dress.maintenanceTimes == 50 && contractDetails[1].dress.maintenanceTimes == 50 &&
                        contractDetails[0].vest.maintenanceTimes < 50 && contractDetails[1].vest.maintenanceTimes < 50) {
                        let nameStatus1;
                        switch (contractDetails[0].dress.typeDress.idTypeDress) {
                            case 1:
                                nameStatus1 = "Ngưng cho thuê";
                                break;
                            case 2:
                                nameStatus1 = "STANDARD";
                                break;
                            case 3:
                                nameStatus1 = "VIP";
                                break;
                            default:
                                break;
                        }
                        let nameStatus2;
                        switch (contractDetails[1].dress.typeDress.idTypeDress) {
                            case 1:
                                nameStatus2 = "Ngưng cho thuê";
                                break;
                            case 2:
                                nameStatus2 = "STANDARD";
                                break;
                            case 3:
                                nameStatus2 = "VIP";
                                break;
                            default:
                                break;
                        }
                        Swal.fire({
                            icon: 'question',
                            title: 'Cả 2 váy ' + contractDetails[0].dress.nameDress + ' và ' + contractDetails[1].dress.nameDress + ' đều có số lần bảo trì là ' + contractDetails[0].dress.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển trạng thái của ' + contractDetails[0].dress.nameDress + ' sang ' + nameStatus1 + ', '
                                + contractDetails[1].dress.nameDress + ' sang ' + nameStatus2 + ' ????',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    }
                    else if (contractDetails[0].dress.maintenanceTimes == 50 && contractDetails[1].vest.maintenanceTimes == 50 &&
                        contractDetails[1].dress.maintenanceTimes < 50 && contractDetails[0].vest.maintenanceTimes < 50) {
                        let nameStatus1;
                        switch (contractDetails[0].dress.typeDress.idTypeDress) {
                            case 1:
                                nameStatus1 = "Ngưng cho thuê";
                                break;
                            case 2:
                                nameStatus1 = "STANDARD";
                                break;
                            case 3:
                                nameStatus1 = "VIP";
                                break;
                            default:
                                break;
                        }

                        Swal.fire({
                            icon: 'question',
                            title: 'Váy ' + contractDetails[0].dress.nameDress + ' và vest ' + contractDetails[1].vest.nameVest + ' đều có số lần bảo trì là ' + contractDetails[0].dress.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển trạng thái của ' + contractDetails[0].dress.nameDress + ' sang ' + nameStatus1 + ', '
                                + contractDetails[1].vest.nameVest + ' sang Ngưng cho thuê????',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    }
                    else if (contractDetails[0].dress.maintenanceTimes == 50 && contractDetails[0].vest.maintenanceTimes == 50 &&
                        contractDetails[1].dress.maintenanceTimes < 50 && contractDetails[1].vest.maintenanceTimes < 50) {
                        let nameStatus1;
                        switch (contractDetails[0].dress.typeDress.idTypeDress) {
                            case 1:
                                nameStatus1 = "Ngưng cho thuê";
                                break;
                            case 2:
                                nameStatus1 = "STANDARD";
                                break;
                            case 3:
                                nameStatus1 = "VIP";
                                break;
                            default:
                                break;
                        }

                        Swal.fire({
                            icon: 'question',
                            title: 'Váy ' + contractDetails[0].dress.nameDress + ' và vest ' + contractDetails[0].vest.nameVest + ' đều có số lần bảo trì là ' + contractDetails[0].dress.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển trạng thái của ' + contractDetails[0].dress.nameDress + ' sang ' + nameStatus1 + ', '
                                + contractDetails[0].vest.nameVest + ' sang Ngưng cho thuê????',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    }
                    else if (contractDetails[1].vest.maintenanceTimes == 50 && contractDetails[0].vest.maintenanceTimes == 50 &&
                        contractDetails[1].dress.maintenanceTimes < 50 && contractDetails[0].dress.maintenanceTimes < 50) {
                        Swal.fire({
                            icon: 'question',
                            title: 'Cả 2 vest ' + contractDetails[0].vest.nameVest + ' và vest ' + contractDetails[1].vest.nameVest + ' đều có số lần bảo trì là ' + contractDetails[0].vest.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển trạng thái của ' + contractDetails[0].vest.nameVest + ' và ' + contractDetails[1].vest.nameVest + ' sang Ngưng cho thuê????',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    }
                    else if (contractDetails[0].vest.maintenanceTimes == 50 && contractDetails[1].dress.maintenanceTimes == 50 &&
                        contractDetails[0].dress.maintenanceTimes < 50 && contractDetails[1].vest.maintenanceTimes < 50) {
                        let nameStatus1;
                        switch (contractDetails[1].dress.typeDress.idTypeDress) {
                            case 1:
                                nameStatus1 = "Ngưng cho thuê";
                                break;
                            case 2:
                                nameStatus1 = "STANDARD";
                                break;
                            case 3:
                                nameStatus1 = "VIP";
                                break;
                            default:
                                break;
                        }
                        Swal.fire({
                            icon: 'question',
                            title: 'Váy ' + contractDetails[1].dress.nameDress + ' và Vest ' + contractDetails[0].vest.nameVest + ' đều có số lần bảo trì là ' + contractDetails[0].vest.maintenanceTimes + ' lần!!!!',
                            text: 'Xác nhận chuyển trạng thái của ' + contractDetails[1].dress.nameDress + ' sang ' + nameStatus1 + ' và ' + contractDetails[0].vest.nameVest + ' sang Ngưng cho thuê????',
                            showConfirmButton: true,
                            showCancelButton: true,
                            confirmButtonText: 'Có',
                            cancelButtonText: 'Không'
                        }).then(async (re) => {
                            if (re.isConfirmed) {
                                try {
                                    await endContract(contract.idContract, inputDe, headers).then(async () => {
                                        Swal.fire(({
                                            icon: 'success',
                                            title: 'Thanh toán thành công!!!!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })).then(() => {
                                            setIsOpenEnd(false);
                                            setIsOpenPayment(false);
                                            navigate("/contract");
                                        })
                                    })
                                } catch (error) {
                                    Swal.fire(({
                                        icon: 'warning',
                                        title: 'Thanh toán không thành công!!!!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    }))
                                }
                            }
                        })
                    }
                }

            }
        })
    }

    const handleEndContract = async () => {
        setInputDe(contract.totalPrice - contract.deposit);
        closeModalEnd();
        openModalPayment();
    }

    const handleCancelContract = async (id) => {
        const data = await getContractDetailsByContractId(id, headers);
        const currentDate = moment();
        const formattedDate = currentDate.format('YYYY-MM-DD');
        if ((data[0].contract.startDate) >= formattedDate) {
            Swal.fire({
                icon: 'question',
                title: 'Xác nhận hủy hợp đồng khách hàng:  ' + data[0].contract.customer.nameCustomer,
                text: 'Lưu ý: Tiền cọc sẽ không được trả lại!!!!',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không'
            }).then(async (res) => {
                if (res.isConfirmed) {
                    try {
                        await cancelContract(id, headers).then(() => {
                            Swal.fire({
                                icon: 'success',
                                title: 'Hủy hợp đồng thành công!!!!',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                        navigate("/contract");
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hủy hợp đồng không thành công!!!!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }

                }
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Đã quá thời gian, không thể hủy!!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
    const location = useLocation();
    useEffect(() => {
        document.title = 'Hợp Đồng'
    }, [])

    useEffect(() => {
        getListContractsByStatus(page, nameCustomer, phone, status)
    }, [location]);
    return (
        <div className="py-1">
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>DANH SÁCH HỢP ĐỒNG</h6>
                            </div>
                        </div>
                        <div className="card-body pb-2">
                            <div className="form-search">
                                <input type="text" className="input-search" onKeyDown={(e) => { handleEnter(e) }}
                                    placeholder="Tên khách hàng..." id='name-search' />
                                <input type="text" style={{ marginLeft: '10px' }} className="input-search" onKeyDown={(e) => { handleEnter(e) }}
                                    placeholder="Số điện thoại..." id='phone-search' />
                                {
                                    <select className="select-search"
                                        onKeyDown={(e) => { handleEnter(e) }}
                                        onChange={() => setStautusFunction()} id="status-search">
                                        <option value={''}>Trạng thái</option>
                                        <option value={1}>Đang tiến hành</option>
                                        <option value={2}>Đã xong</option>
                                    </select>
                                }
                                <button type="button" onClick={() => handleSearch()}><i class="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                            <div className="table-responsive table-striped p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr style={{ color: '#866ec7' }}>
                                            <th className="text-uppercase text-center text-xxs font-weight-bolder opacity-7">STT</th>
                                            <th className="text-uppercase text-center text-xxs font-weight-bolder opacity-7">Mã hợp đồng</th>
                                            <th className="text-uppercase text-center text-xxs font-weight-bolder opacity-7 ps-2">Ngày thuê</th>
                                            <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Khách hàng</th>
                                            <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Dịch vụ</th>
                                            <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Trạng thái</th>
                                            <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Tiền cọc</th>
                                            <th className="text-secondary opacity-7" />
                                        </tr>
                                    </thead>
                                    {contracts.length != 0 ?
                                        <tbody>
                                            {contracts.content.map((ct, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="align-middle text-center">
                                                            <span className=" text-xs font-weight-bold">{(index + 1) + (page * 5)}</span>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <span className=" text-xs font-weight-bold">HD-{ct.idContract}</span>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <span className=" text-xs font-weight-bold">{moment(ct.startDate).format('DD/MM/YYYY')}</span>
                                                        </td>
                                                        {/* <td className="align-middle text-center">
                                                            <span className="text-secondary text-xs font-weight-bold">{moment(ct.endDate).format('DD/MM/YYYY')}</span>
                                                        </td> */}
                                                        <td>
                                                            <p className="text-xs text-center font-weight-bold mb-0">{ct.customer.nameCustomer}</p>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs text-center font-weight-bold mb-0">{ct.combo.nameCombo}</p>
                                                        </td>
                                                        {
                                                            ct.cancelContract ?
                                                                <td className="align-middle text-center text-sm">
                                                                    <span className="badge badge-sm bg-gradient-error"> Đã hủy</span>
                                                                </td> : !ct.statusContract ?
                                                                    <td className="align-middle text-center text-sm">
                                                                        <span className="badge badge-sm bg-gradient-success"> Đã cọc</span>
                                                                    </td> :
                                                                    <td className="align-middle text-center text-sm">
                                                                        <span className="badge badge-sm bg-gradient-details"> Đã xong</span>
                                                                    </td>
                                                        }
                                                        {
                                                            !ct.statusContract ?
                                                                <td>
                                                                    <p className="text-xs text-center font-weight-bold mb-0">{<CurrencyFormat value={ct.deposit} />} VNĐ</p>
                                                                </td> :
                                                                <td></td>
                                                        }

                                                        <td className="align-middle text-center">
                                                            <div className="row">
                                                                <div className="col-3">
                                                                    <a href="javascript:;" onClick={() => { getContractDetails(ct.idContract) }} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                        <i class="fa-solid fa-circle-info" style={{ fontSize: '20px', color: '#866ec7' }}></i>
                                                                    </a>
                                                                </div>
                                                                <div className="col-3">
                                                                    {
                                                                        !ct.statusContract && !ct.cancelContract &&
                                                                        <a href="javascript:;" onClick={() => { handleCancelContract(ct.idContract) }} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                            <i class="fa-solid fa-ban" style={{ fontSize: '20px', color: '#866ec7', marginLeft: '5px' }}></i>
                                                                        </a>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )

                                            })}

                                        </tbody> :
                                        <div><h1>Không có dữ liệu</h1></div>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                    {contracts.length != 0 ?
                        <div
                            className="xs:flex-row xs:justify-between np-page">
                            <div className="flex mt-2 xs:mt-0">
                                {page != 0 ? <button
                                    onClick={async () => {
                                        await previousPage()
                                    }}
                                    className="text-sm py-2 px-3 rounded-l"
                                    style={{ background: '#866ec7', color: '#ffffff' }}>
                                    Trước
                                </button> : <button
                                    onClick={async () => {

                                        await previousPage()
                                    }}
                                    className="text-sm py-2 px-3"
                                    style={{
                                        background: '#866ec7',
                                        color: '#ffffff',
                                        opacity: '0,6',
                                        cursor: 'not-allowed'
                                    }}>
                                    Trước
                                </button>}

                                <button className="text-sm py-2 px-3" style={{
                                    background: '#866ec7',
                                    color: '#ffffff',
                                    marginLeft: '5px'
                                }}>
                                    {page + 1}/{contracts.totalPages}
                                </button>

                                {page != contracts.totalPages - 1 ?
                                    <button onClick={async () => {

                                        await nextPage();
                                    }} className="text-sm   py-2 px-3 rounded-l" style={{
                                        background: '#866ec7',
                                        color: '#ffffff',
                                        marginLeft: '5px'
                                    }}>
                                        Sau
                                    </button>
                                    : <button onClick={async () => {

                                        await nextPage();
                                    }} className="text-sm   py-2 px-3 rounded-l" style={{
                                        background: '#866ec7',
                                        color: '#ffffff',
                                        marginLeft: '5px', opacity: '0,6', cursor: 'not-allowed'
                                    }}>
                                        Sau
                                    </button>}
                            </div>
                        </div>
                        : ""}
                </div>
            </div>
            {(isOpen && contractDetails.length != 0) &&
                <div className="modal">
                    <div className="modal_overlay_contract">
                    </div>
                    <div className="modal_body_contract">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>CHI TIẾT HỢP ĐỒNG</h6>
                            </div>
                        </div>
                        <div className="modal_inner_contract">
                            {/* <div className="card-body pb-2">
                                <div className="input-group input-group-outline">
                                    <p style={{ color: '#866ec7', fontWeight: 'bold' }}>Mã hợp đồng: {contractDetails[0].contract.idContract} </p>
                                    <p style={{ color: '#866ec7', fontWeight: 'bold' }}> Hợp đồng bao gồm: <br/> 
                                                                - Hoa cưới cầm tay. <br></br>
                                                                - Cà vạt chú rể. <br />
                                                                - Trang điểm cô dâu.
                                                            </p>
                                    <p style={{ color: '#866ec7', fontWeight: 'bold' }}>Tổng tiền: <CurrencyFormat value={contractDetails[0].contract.totalPrice} /> VNĐ</p>
                                    <p style={{ color: '#866ec7', fontWeight: 'bold' }}>Đã cọc: <CurrencyFormat value={contractDetails[0].contract.deposit} /> VNĐ</p>
                                    <p style={{ color: '#866ec7', fontWeight: 'bold' }}>
                                    <span className="text-secondary text-xs font-weight-bold">
                                            <img src={contractDetails[0].dress.image} style={{ width: '100px', height: '120px' }}></img>
                                        </span>
                                        <span className="text-secondary text-xs font-weight-bold">
                                            <img src={contractDetails[0].vest.image} style={{ width: '100px', height: '120px' }}></img>
                                        </span>
                                    </p>
                                </div>
                            </div> */}
                            <div className="card-body pb-2">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr style={{ color: '#866ec7' }}>
                                            <th className="text-uppercase text-center text-xxs font-weight-bolder opacity-7">Ngày cưới</th>
                                            <th className="text-uppercase text-center text-xxs font-weight-bolder opacity-7">Váy</th>
                                            <th className="text-uppercase text-center text-xxs font-weight-bolder opacity-7 ps-2">Vest</th>
                                            <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Dịch vụ đi kèm</th>
                                            <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Tổng tiền</th>
                                            <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Người làm hợp đồng</th>
                                            <th className="text-secondary opacity-7" />
                                        </tr>
                                    </thead>
                                    {(contractDetails.length != 0 && contractDetails.length == 1) ?
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className="text-xs text-center font-weight-bold mb-0">{moment(contractDetails[0].weddingDate).format('DD/MM/YYYY')}</p>
                                                </td>
                                                <td className="align-middle text-center">
                                                    <span className="text-secondary text-xs font-weight-bold">
                                                        <img src={contractDetails[0].dress.image} style={{ width: '100px', height: '120px' }}></img>
                                                    </span>
                                                </td>
                                                <td className="align-middle text-center">
                                                    <span className="text-secondary text-xs font-weight-bold">
                                                        <img src={contractDetails[0].vest.image} style={{ width: '100px', height: '120px' }}></img>
                                                    </span>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">
                                                        - Hoa cưới cầm tay. <br></br>
                                                        - Cà vạt chú rể. <br />
                                                        - Trang điểm cô dâu.
                                                    </p>
                                                </td>
                                                <td>
                                                    <p className="text-xs text-center font-weight-bold mb-0"><CurrencyFormat value={contractDetails[0].contract.totalPrice} /> VNĐ</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs text-center font-weight-bold mb-0">{contractDetails[0].contract.employee.nameEmployee}</p>
                                                </td>
                                            </tr>
                                        </tbody> :
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className="text-xs text-center font-weight-bold mb-0">{moment(contractDetails[0].weddingDate).format('DD/MM/YYYY')}</p>
                                                    {/* <p className="text-xs text-center font-weight-bold mb-0">{contractDetails[0].contract.startDate}</p> */}
                                                </td>
                                                <td className="align-middle text-center">
                                                    <span className="text-secondary text-xs font-weight-bold">
                                                        <img src={contractDetails[0].dress.image} style={{ width: '100px', height: '120px' }}></img>
                                                    </span>
                                                </td>
                                                <td className="align-middle text-center">
                                                    <span className="text-secondary text-xs font-weight-bold">
                                                        <img src={contractDetails[0].vest.image} style={{ width: '100px', height: '120px' }}></img>
                                                    </span>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">
                                                        - Hoa cưới cầm tay. <br></br>
                                                        - Cà vạt chú rể. <br />
                                                        - Trang điểm cô dâu.
                                                    </p>
                                                </td>
                                                <td>
                                                    <p className="text-xs text-center font-weight-bold mb-0"><CurrencyFormat value={contractDetails[0].contract.totalPrice} /> VNĐ</p>
                                                </td>
                                                <td>
                                                    <p className="text-xs text-center font-weight-bold mb-0">{contractDetails[0].contract.employee.nameEmployee}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="text-xs text-center font-weight-bold mb-0">{moment(contractDetails[1].weddingDate).format('DD/MM/YYYY')}</p>
                                                </td>
                                                <td className="align-middle text-center">
                                                    <span className="text-secondary text-xs font-weight-bold">
                                                        <img src={contractDetails[1].dress.image} style={{ width: '100px', height: '120px' }}></img>
                                                    </span>
                                                </td>
                                                <td className="align-middle text-center">
                                                    <span className="text-secondary text-xs font-weight-bold">
                                                        <img src={contractDetails[1].vest.image} style={{ width: '100px', height: '120px' }}></img>
                                                    </span>
                                                </td>
                                                <td>
                                                    <p className="text-xs font-weight-bold mb-0">
                                                        - Hoa cưới cầm tay. <br></br>
                                                        - Cà vạt chú rể. <br />
                                                        - Trang điểm cô dâu.
                                                    </p>
                                                </td>
                                                <td>
                                                    <p className="text-xs text-center font-weight-bold mb-0"></p>
                                                </td>
                                                <td>
                                                    <p className="text-xs text-center font-weight-bold mb-0"></p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    }
                                </table>
                            </div>
                            <div className="form-btn">
                                <div className="row remain-contract">
                                    {
                                        !contract.statusContract && !contract.cancelContract ?
                                            <div className="col-5">
                                                <button className="submit-btn home-btn" onClick={() => openModalEnd()}>Thanh toán</button>
                                            </div> : !contract.cancelContract ?
                                                <div className="col-5">
                                                    <button className="submit-btn home-btn"
                                                        style={{ cursor: 'not-allowed' }}
                                                        onClick={() => { }}>Đã xong</button>
                                                </div> :
                                                <div className="col-5">
                                                    <button className="submit-btn home-btn"
                                                        style={{ cursor: 'not-allowed' }}
                                                        onClick={() => { }}>Đã hủy</button>
                                                </div>
                                    }
                                    <div className="col-5">
                                        <button onClick={() => closeModal()} className="submit-btn back-btn">Trở về
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            }
            {(isOpenEnd && contract != null) &&
                <div className="modal">
                    <div className="modal_overlay_endContract">
                    </div>
                    <div className="modal_body_endContract">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>Thanh toán hợp đồng</h6>
                            </div>
                        </div>
                        <div className="modal_inner_endContract">
                            <div className="card-body pb-2">
                                <div className="input-group input-group-outline">
                                    <p style={{ color: '#866ec7', fontWeight: 'bold' }}>Mã hợp đồng: {contract.idContract} </p>
                                    <p style={{ color: '#866ec7', fontWeight: 'bold' }}>Khách hàng: {contract.customer.nameCustomer} </p>
                                    <p style={{ color: '#866ec7', fontWeight: 'bold' }}>Số điện thoại: {contract.customer.phone} </p>
                                    <p style={{ color: '#866ec7', fontWeight: 'bold' }}>Email: {contract.customer.email} </p>
                                    <p style={{ color: '#866ec7', fontWeight: 'bold' }}>Tổng tiền: <CurrencyFormat value={contract.totalPrice} /> VNĐ</p>
                                    <p htmlFor="find-date" style={{ color: '#866ec7', fontWeight: 'bold' }}>Đã cọc: <CurrencyFormat value={contract.deposit} /> VNĐ</p>
                                    <p htmlFor="find-date" style={{ color: '#866ec7', fontWeight: 'bold' }}>Số tiền phải thanh toán: <CurrencyFormat value={contract.totalPrice - contract.deposit} /> VNĐ</p>
                                </div>
                            </div>

                            <div className="form-btn-remain-contract">
                                <div className="row remain-contract">
                                    <div className="col-5">
                                        <button className="submit-btn home-btn" onClick={() => handleEndContract()}>Xác nhận</button>
                                    </div>
                                    <div className="col-5">
                                        <button onClick={() => closeModalEnd()} className="submit-btn back-btn">Trở về
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            }
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
    )
}