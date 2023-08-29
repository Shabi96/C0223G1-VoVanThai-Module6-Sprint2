import React from "react";
import '../../src/css/nucleo-icons.css';
import '../../src/css/material-dashboard.min.css';
import '../../src/css/nucleo-svg.css';
import logo from '../../src/logo-ct.png';
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                <a className="navbar-brand m-0" href="#" target="_blank">
                    <img src={logo} className="navbar-brand-img h-100" alt="main_logo" />
                    <span className="ms-1 font-weight-bold text-white">Quản lý</span>
                </a>
            </div>
            <hr className="horizontal light mt-0 mb-2" />
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">dashboard</i>
                            </div>
                            <span className="nav-link-text ms-1">Dịch vụ</span>
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to={`/listStandard`}>STANDARD</Link></li>
                            <li><Link className="dropdown-item" to={`/listVip`}>VIP</Link></li>
                            <li><Link className="dropdown-item" to={`/listLuxury`}>LUXURY</Link></li>
                        </ul>
                        {/* <Link className="nav-link text-white " to={`/list`}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">dashboard</i>
                            </div>
                            <span className="nav-link-text ms-1">Dịch vụ</span>
                        </Link> */}
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " href="#">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">table_view</i>
                            </div>
                            <span className="nav-link-text ms-1">Hợp đồng</span>
                        </a>
                        
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " href="#">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">notifications</i>
                            </div>
                            <span className="nav-link-text ms-1">Thông báo</span>
                        </a>
                    </li>
                    <li className="nav-item mt-3">
                        <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">Tài khoản</h6>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " href="#">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">person</i>
                            </div>
                            <span className="nav-link-text ms-1">Cá nhân</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-white " to={`/login`}>
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">login</i>
                            </div>
                            <span className="nav-link-text ms-1">Đăng nhập</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " href="#">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">assignment</i>
                            </div>
                            <span className="nav-link-text ms-1">Đăng xuất</span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>

    )
}