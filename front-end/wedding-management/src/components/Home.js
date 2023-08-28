import React from 'react';

export default function Home() {
    return (
        <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
                <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
                    <img src="css/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" />
                    <span className="ms-1 font-weight-bold text-white">Quản lý</span>
                </a>
            </div>
            <hr className="horizontal light mt-0 mb-2" />
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link text-white " href="#">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">dashboard</i>
                            </div>
                            <span className="nav-link-text ms-1">Danh sách váy</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white " href="#">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">table_view</i>
                            </div>
                            <span className="nav-link-text ms-1">Hợp đồng</span>
                        </a>
                    </li>
                    {/*      <li class="nav-item">*/}
                    {/*        <a class="nav-link text-white " href="#">*/}
                    {/*          <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">*/}
                    {/*            <i class="material-icons opacity-10">receipt_long</i>*/}
                    {/*          </div>*/}
                    {/*          <span class="nav-link-text ms-1">Billing</span>*/}
                    {/*        </a>*/}
                    {/*      </li>*/}
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
                        <a className="nav-link text-white " href="#">
                            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="material-icons opacity-10">login</i>
                            </div>
                            <span className="nav-link-text ms-1">Đăng nhập</span>
                        </a>
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