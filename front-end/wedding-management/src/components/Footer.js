import React from "react";

export default function Footer() {
    const getYear = new Date().getFullYear();
    return (
        <footer className="footer py-4  ">
            <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                        <div className="copyright text-center text-sm text-muted text-lg-start">
                            © {getYear}
                            ,
                            made with <i className="fa fa-heart" /> by
                            &nbsp;<a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank">Wedding</a>&nbsp;
                            for a better web.
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <a href="#" className="nav-link text-muted" target="_blank">Wedding</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link text-muted" target="_blank">Về chúng tôi</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link text-muted" target="_blank">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link pe-0 text-muted" target="_blank">Giấy phép</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}