import React, { useEffect, useState } from "react";
import '../css/style.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from '../Wedding.png';
import { findEmployeeByEmail } from "../services/EmployeeService";


export default function NavBar() {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const [employee, setEmployee] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    const openModal = async () => {
        setIsOpen(true);
    };


    const closeModal = async () => {
        setIsOpen(false);
    };

    const getUser = async (username) => {
        setUser(username);
    }
    const headers = {
        "Authorization": 'Bearer ' + localStorage.getItem('token')
    }

    const getUserByEmail = async () => {
        openModal();
        setEmployee(await findEmployeeByEmail(user, headers));
    }

    useEffect(() => {
        const data = localStorage.getItem("username");
        if (data) {
            getUser(data);
        } else {
            getUser(null);
        }
    }, [location]);

    console.log(user);

    const getYear = new Date().getFullYear();
    return (
        <>
            {user != null ?
                <div className="hidden__show">
                    <nav id="sidebar">
                        <div className="custom-menu">
                            <button type="button" id="sidebarCollapse" className="btn btn-primary">
                                <i className="fa fa-bars" />
                                <span className="sr-only">Toggle Menu</span>
                            </button>
                        </div>
                        <div className="p-4 pt-4">
                            <div className="pb-2" style={{ display: "flex", justifyContent: 'center' }}>
                                <img src={image} style={{ width: '170px', borderRadius: '50%' }} />
                            </div>
                            <ul className="list-unstyled components mb-5">
                                <li className="active">
                                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                        <i className="fa-solid fa-list-check"></i>
                                        <span> Dress</span></a>
                                    <ul className="collapse list-unstyled" id="homeSubmenu">
                                        <li>
                                            <Link to={`/standard`}>Standard</Link>
                                        </li>
                                        <li>
                                            <Link to={`/vip`}>VIP</Link>
                                        </li>
                                        <li>
                                            <Link to={`/luxury`}>LUXURY</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to={`/vest`}><i class="fa-solid fa-person-half-dress"></i><span> Vest</span></Link>
                                </li>
                                <li>
                                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                        <i class="fa-solid fa-file-contract"></i>
                                        <span> Hợp đồng</span></a>
                                    <ul className="collapse list-unstyled" id="pageSubmenu">
                                        <li>
                                            <Link to={`/create-contract`}>Thêm mới</Link>
                                        </li>
                                        <li>
                                            <Link to={`/contract`}>Danh sách</Link>
                                        </li>
                                        {/* <li>
                                            <Link href="#">Đã xong</Link>
                                        </li> */}
                                    </ul>
                                </li>
                                <li>
                                    <a href="#pageSubmenu1" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
                                        <i class="fa-solid fa-user"></i>
                                        <span> Cá nhân</span></a>
                                    <ul className="collapse list-unstyled" id="pageSubmenu1">
                                        <li>
                                            <a onClick={() => getUserByEmail()}>Thông tin</a>
                                        </li>
                                        {/* <li>
                                            <a onClick={() => handleLogout()} >Đăng xuất</a>
                                        </li> */}
                                        {/* <li>
                                            <Link href="#">Đã xong</Link>
                                        </li> */}
                                    </ul>
                                </li>
                                {/* <li>
                                    <a href="#"><i class="fa-solid fa-user"></i><span> Cá nhân</span></a>
                                </li> */}
                            </ul>

                            <div className="footer">
                                <p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    Copyright © {getYear} <br></br>
                                    All rights reserved
                                    {/* | This template is made with <i className="icon-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a> */}
                                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
                            </div>
                        </div>
                        {
                            (isOpen && employee != null) &&
                            <div className="modal">
                                <div className="modal_overlay">
                                </div>
                                <div className="modal_body">
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 mb-2">
                                        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                            <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>Thông tin cá nhân</h6>
                                        </div>
                                    </div>
                                    <div className="modal_inner">
                                        <div className="row space-around">
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <span className="form-label">Tên: </span>
                                                    <input className='form-control'
                                                        value={employee.nameEmployee} readOnly>
                                                    </input>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <span className="form-label">Số điện thoại: </span>
                                                    <input className='form-control' value={employee.phone}
                                                        readOnly>
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row space-around">
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <span className="form-label">Email: </span>
                                                    <input value={employee.email} className="form-control" type="text"
                                                        readOnly />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <span className="form-label">Địa chỉ: </span>
                                                    <input value={employee.address} className="form-control" type="text"
                                                        readOnly />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-btn">
                                            <div className="row space-around">
                                                <div className="col-5">
                                                    <button className="submit-btn home-btn" onClick={() => closeModal()}>Xác nhận</button>
                                                </div>
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
                    </nav>
                </div> :
                <div>
                    <nav id="sidebar">
                        <div className="custom-menu">
                            <button type="button" id="sidebarCollapse" className="btn btn-primary">
                                <i className="fa fa-bars" />
                                <span className="sr-only">Toggle Menu</span>
                            </button>
                        </div>
                        <div className="p-4 pt-4">
                            <div className="pb-2" style={{ display: "flex", justifyContent: 'center' }}>
                                <img src={image} style={{ width: '170px', borderRadius: '50%' }} />
                            </div>
                            <h2 style={{ color: 'white' }}>Chào mừng bạn đến với hệ thống quản lý TK Wedding</h2>
                            <div className="footer">
                                <p>{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                    Copyright © {getYear} <br></br>
                                    All rights reserved
                                    {/* | This template is made with <i className="icon-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib.com</a> */}
                                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
                            </div>
                        </div>
               
                    </nav>

                </div>
            }
        </>
    )
}