import React, { useEffect, useState } from "react";
import moment from 'moment';
import { getAllVest, getVestById } from "../services/VestService";
import { getAllStatus } from "../services/DressService";
import Swal from "sweetalert2";
import { getContractDetailsByIdVest } from "../services/ContractDetailService";
import { useNavigate } from "react-router-dom";


export default function Vest() {
    const [vests, setVests] = useState([]);
    let [nameVest, setNameVest] = useState('');
    let [nameStatus, setNameStatus] = useState('');
    let [page, setPage] = useState(0);
    const [statusList, setStatusList] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [vest, setVest] = useState(null);
    const [listVestRented, setListVestRented] = useState([]);
    const navigate = useNavigate();

    const headers = {
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }


    const openModal = async () => {
        setIsOpen(true);
    };

    const closeModal = async () => {
        setIsOpen(false);
    };

    const handleGetVest = async (id) => {
        try {
            const data = await getVestById(id, headers);
            if (data.itemStatus.idStatus == 2) {
                try {
                    setListVestRented(await getContractDetailsByIdVest(id, headers));
                } catch (error) {
                    console.log("Không có ngày thuê");
                }
            } else {
                setListVestRented([]);
            }
            setVest(data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Không tìm thấy',
                showConfirmButton: false,
                timer: 1500
            })
        }
        openModal();
    }


    const getAllVests = async (page, nameVest, nameStatus) => {
        try {
            const data = await getAllVest(page, nameVest, nameStatus, headers);
            setVests(data);
        } catch (error) {
            console.log("Không có dữ liệu!!!!");
        }
    }

    const setNameVestFunction = async (nameDressSearch) => {
        setNameVest(nameDressSearch);
    }


    const setNameStatusFunction = async (nameStatusSearch) => {
        setNameStatus(nameStatusSearch);
    }

    const getStatus = async () => {
        try {
            const data = await getAllStatus(headers);
            setStatusList(data);
        } catch (error) {
            console.log("Không có dữ liệu");
        }
    }

    const handleSearch = async () => {
        try {
            const data = await getAllVest(page, nameVest.trim(), nameStatus, headers);
            setVests(data);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: 'Không tìm thấy!!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    const setPageFunction = async (pageAfter) => {
        setPage(pageAfter);
    }

    const handleEnter = async (e) => {
        const key = e.keyCode;
        if (key == 13) {
            handleSearch()
        }
    }
    useEffect(() => {
        let tokenLogin = localStorage.getItem("token");
        if (tokenLogin == null) {
            navigate('/404')
        }
    }, [])
    const nextPage = async () => {

        page += 1;

        if (page < vests.totalPages) {
            await setPageFunction(page).then(setVests(await getAllVest(page, nameVest, nameStatus, headers)));
        } else {
            setPage(page - 1);
        }
    }
    console.log(page);
    const previousPage = async () => {
        if (page >= 1) {
            page -= 1;
        }
        await setPageFunction(page).then(setVests(await getAllVest(page, nameVest, nameStatus, headers)));
    }

    useEffect(() => {
        document.title = "VEST";
    }, [])

    console.log(vests);
    useEffect(() => {
        getAllVests(page, nameVest, nameStatus);
        getStatus();
    }, []);

    return (
        <div className="py-1">
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white font-weight-bolder text-capitalize ps-3" style={{ textAlign: 'center' }}>VEST</h6>
                            </div>
                        </div>
                        <div className="card-body pb-2">
                            <div className="form-search">
                                <input type="text" className="input-search"
                                    onKeyDown={(e) => { handleEnter(e) }}
                                    placeholder="Nhập tên" onChange={(e) => setNameVest(e.target.value)} />
                                {
                                    statusList.length > 0 &&
                                    <select className="select-search"
                                        onKeyDown={(e) => { handleEnter(e) }}
                                        onChange={(e) => setNameStatus(e.target.value)}>
                                        <option value={''}>Trạng thái</option>
                                        {statusList.map((stt, index) => {
                                            return (
                                                <option key={index} value={stt.nameStatus}>{stt.nameStatus}</option>
                                            )
                                        })}
                                    </select>
                                }
                                <button type="button" onClick={() => handleSearch()}><i class="fa-solid fa-magnifying-glass"></i></button>
                            </div>
                            <div className="table-responsive table-striped p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>

                                        <tr style={{ color: '#866ec7' }}>
                                            <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">STT</th>
                                            <th className="text-uppercase text-xxs text-center font-weight-bolder opacity-7">Mã Vest</th>
                                            <th className="text-uppercase text-center text-xxs font-weight-bolder opacity-7 ps-2">Tên Vest</th>
                                            <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Trạng thái</th>
                                            <th className="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Hành động</th>
                                            {/* <th className="text-secondary opacity-7" /> */}
                                        </tr>

                                    </thead>
                                    {vests.length != 0 ?
                                        <tbody>
                                            {vests.content.map((st, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <p className="text-xs text-center font-weight-bold mb-0">{(index + 1) + (page * 5)}</p>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs text-center font-weight-bold mb-0">VEST-{st.idVest}</p>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs text-center font-weight-bold mb-0">{st.nameVest}</p>
                                                        </td>
                                                        {
                                                            st.itemStatus.idStatus == 1 ?
                                                                <td className="align-middle text-center text-sm">
                                                                    <span className="badge badge-sm bg-gradient-success">{st.itemStatus.nameStatus}</span>
                                                                </td> : st.itemStatus.idStatus == 2 ?
                                                                    <td className="align-middle text-center text-sm">
                                                                        <span className="badge badge-sm bg-gradient-information">{st.itemStatus.nameStatus}</span>
                                                                    </td> : st.itemStatus.idStatus == 3 ?
                                                                        <td className="align-middle text-center text-sm">
                                                                            <span className="badge badge-sm bg-gradient-secondary">{st.itemStatus.nameStatus}</span>
                                                                        </td> :
                                                                        <td className="align-middle text-center text-sm">
                                                                            <span className="badge badge-sm bg-gradient-warning">{st.itemStatus.nameStatus}</span>
                                                                        </td>
                                                        }
                                                        <td className="align-middle text-center">
                                                            <a href="javascript:;" onClick={() => handleGetVest(st.idVest)} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                <i class="fa-solid fa-circle-info" style={{ fontSize: '20px', color: '#866ec7' }}></i>
                                                            </a>
                                                        </td>
                                                        {/* <td className="align-middle text-center">
                                                            <a href="javascript:;" onClick={() => { }} className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                <i class="fa-solid fa-pen-to-square" style={{ fontSize: '20px', color: '#866ec7' }}></i>
                                                            </a>
                                                        </td> */}
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                        :

                                        <div><h1>Không có dữ liệu</h1></div>
                                    }
                                </table>
                            </div>
                        </div>
                    </div>
                    {vests.length != 0 ?
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
                                    {page + 1}/{vests.totalPages}
                                </button>

                                {page != vests.totalPages - 1 ?
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
                {isOpen && vest != null &&
                    <div className="modal">
                        <div className="modal_overlay_details">
                        </div>
                        <div className="modal_body_details">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                    <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>Chi tiết Vest {vest.nameVest} </h6>
                                </div>
                            </div>
                            <div className="modal_inner_details">
                                <div className="container">
                                    <div className="images">
                                        <img src={vest.image} />
                                    </div>
                                    <div className="product">
                                        <p>VEST</p>
                                        <p className="infoText" title={vest.information}>{vest.information}</p>
                                        <p>Trạng thái: {vest.itemStatus.nameStatus}</p>
                                        {
                                            listVestRented.length != 0 &&
                                            listVestRented.map((ren, index) => {
                                                return (
                                                    <>
                                                        <p key={index}>Ngày thuê: {moment(ren.contract.startDate).format('DD/MM/YYYY')} </p>
                                                        <p>Khách hàng: {ren.contract.customer.nameCustomer}</p>
                                                    </>
                                                )
                                            })
                                        }
                                        <p>Số lần vệ sinh: {vest.maintenanceTimes} </p>
                                        <div className="buttons" >
                                            <button className="add" onClick={() => closeModal()}>Trở về</button>
                                            <button className="like"><span>♥</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
