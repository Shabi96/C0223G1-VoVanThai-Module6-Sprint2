import React, { useEffect, useState } from "react";
import moment from 'moment';
import {getAllStatus, getListDress } from "../services/DressService";
import Swal from "sweetalert2";

export default function ListStandard() {
    const [luxuries, setLuxuries] = useState([]);
    const [nameDress, setNameDress] = useState('');
    const [nameTypeDress, setNameTypeDress] = useState('LUXURY');
    const [nameStatus, setNameStatus] = useState('');
    const [page, setPage] = useState(0);
    const [statusList, setStatusList] = useState([]);



    const getAllStands = async (page, nameDress, nameTypeDress, nameStatus) => {
        try {
            const data = await getListDress(page, nameDress, nameTypeDress, nameStatus);
            setLuxuries(data);
        } catch (error) {
            console.log("Không có dữ liệu!!!!");
        }
    }

    const getStatus = async () => {
        try {
            const data = await getAllStatus();
            setStatusList(data);    
        } catch (error) {
            console.log("Không có dữ liệu");
        }
    }

    const setPageFunction = async (page) => {
        setPage(page);
    }

    const setNameDressFunction = async (nameDressSearch) => {
        setNameDress(nameDressSearch);
    }

    const setNameTypeDressFunction = async (nameTypeDressSearch) => {
        setNameTypeDress(nameTypeDressSearch);
    }

    const setNameStatusFunction = async (nameStatusSearch) => {
        setNameStatus(nameStatusSearch);
    }

    const handleSearch = async () => {
        try {
            const data = await getListDress(page, nameDress, nameTypeDress, nameStatus);
            setLuxuries(data);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: 'Không tìm thấy!!!!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        
    }
    const nextPage = async () => {
        console.log("da vao nextPage");
        page += 1;
        if(page < luxuries.totalPages) {
            await setPageFunction(page).then(setLuxuries(await getListDress(page, nameDress, nameTypeDress, nameStatus)));
        } else {
            page -= 1;
        }
    }

    const previousPage = async () => {
        if(page >= 1) {
            page -= 1;
        }
        await setPageFunction(page).then(setLuxuries(await getListDress(page, nameDress, nameTypeDress, nameStatus)));
    }

    console.log(luxuries);
    useEffect(() => {
        getAllStands(page, nameDress, nameTypeDress, nameStatus);
        getStatus()
    }, []);

    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white font-weight-bolder text-capitalize ps-3" style={{ textAlign: 'center' }}>LUXURY</h6>
                            </div>
                        </div>
                        <div className="card-body pb-2">
                        <div className="form-search">
                                <input type="text" className="input-search" placeholder="Nhập tên" onChange={(e) => setNameDress(e.target.value)}/>
                                {
                                    statusList.length > 0 &&
                                    <select className="select-search" onChange={(e) => setNameStatus(e.target.value)}>
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
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Mã váy</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Tên váy</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Trạng thái</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ngày thuê</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ngày trả</th>
                                            <th className="text-secondary opacity-7" />
                                        </tr>
                                    </thead>
                                    {luxuries.length != 0 ?
                                        <tbody>
                                            {luxuries.content.map((st, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="d-flex px-2 py-1">
                                                                {/*                      <div>*/}
                                                                {/*                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">*/}
                                                                {/*                      </div>*/}
                                                                <div className="d-flex flex-column justify-content-center">
                                                                    <h6 className="mb-0 text-sm">LUX-{st.idDress}</h6>
                                                                    {/*                        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>*/}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p className="text-xs font-weight-bold mb-0">{st.nameDress}</p>
                                                        </td>
                                                        <td className="align-middle text-center text-sm">
                                                            <span className="badge badge-sm bg-gradient-success">{st.itemStatus.nameStatus}</span>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                                        </td>
                                                        <td className="align-middle text-center">
                                                            <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                                        </td>
                                                        <td className="align-middle">
                                                            <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                                Chỉnh sửa
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                        :
                                        <tbody>
                                            <div><h1>Không có dữ liệu</h1></div>
                                        </tbody>}
                                </table>
                            </div>
                        </div>
                    </div>
                    {luxuries.length != 0 ?
                        <div className="flex flex-col xs:flex-row xs:justify-between np-page">
                            <div className="inline-flex mt-2 xs:mt-0">
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
                                    {page + 1}/{luxuries.totalPages}
                                </button>

                                {page != luxuries.totalPages - 1 ?
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
        </div>
    )
}
