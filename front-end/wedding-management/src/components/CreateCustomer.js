import React from "react";

export default function CreateCustomer() {
    return (
        <main className="main-content mt-0" style={{
            backgroundImage: 'url("https://icdn.dantri.com.vn/zoom/1200_630/2022/07/14/wedding-fair-pr2docx-1657782815565.jpeg")',
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
        }}>
            <div className="page-header d-flex align-items-start min-vh-100 justify-content-center align-items-center" >
                <span className="opacity-6" />
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Thêm mới khách hàng</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="input-group input-group-outline my-3">
                                        <input type="text" placeholder="Họ và tên" className="form-control" />
                                    </div>
                                    <div className="input-group input-group-outline mb-3">
                                        <input type="text" placeholder="Số điện thoại" className="form-control" />
                                    </div>
                                    <div className="input-group input-group-outline my-3">
                                        <input type="email" placeholder="Email" className="form-control" />
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Thêm</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}