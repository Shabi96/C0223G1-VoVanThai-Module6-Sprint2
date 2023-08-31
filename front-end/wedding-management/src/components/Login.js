import React from "react";

export default function Login() {
    return (
        <main className="main-content  mt-0">
            <div className="page-header d-flex align-items-start min-vh-100 justify-content-center align-items-center" style={{
                backgroundImage: 'url("https://static01.nyt.com/images/2023/07/28/fashion/28OPEN-THREAD/28OPEN-THREAD-videoSixteenByNine3000.jpg")',
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
            }}>
                <span className="mask bg-gradient-dark opacity-6" />
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Đăng nhập</h4>
                                        <div className="row mt-3">
                                            <div className="col-2 text-center ms-auto">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                <i class="fa-brands fa-facebook text-white text-lg"></i>                                                </a>
                                            </div>
                                            <div className="col-2 text-center px-1">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                <i class="fa-brands fa-github text-white text-lg"></i>
                                                </a>
                                            </div>
                                            <div className="col-2 text-center me-auto">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                <i class="fa-brands fa-google text-white text-lg"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form role="form" className="text-start">
                                        <div className="input-group input-group-outline my-3">
                                            <input type="email" placeholder="Email" className="form-control" />
                                        </div>
                                        <div className="input-group input-group-outline mb-3">
                                            <input type="password" placeholder="Mật khẩu" className="form-control" />
                                        </div>
                                        <div className="text-center">
                                            <button type="button" className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{color: 'white'}}>Đăng nhập</button>
                                        </div>
                                        <p className="mt-4 text-sm text-center">
                                            Bạn chưa có tài khoản?
                                            <a href="#" className="text-gradient font-weight-bold" style={{color: '#866ec7'}}>Đăng kí</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}