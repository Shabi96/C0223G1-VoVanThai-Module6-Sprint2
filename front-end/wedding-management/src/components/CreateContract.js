import React from "react";
// Kiểm tra số điện thoại khách hàng có tồn tại hay không? => ......
export default function CreateContract() {
    return (
        <main className="main-content mt-3" style={{
            backgroundImage: 'url("https://icdn.dantri.com.vn/zoom/1200_630/2022/07/14/wedding-fair-pr2docx-1657782815565.jpeg")',
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
        }}>
            <div className="page-header d-flex align-items-start min-vh-100 justify-content-center align-items-center" >
                <span className="opacity-6" />
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Thêm mới hợp đồng</h4>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="input-group input-group-outline my-3">
                                        <input type="text" placeholder="Tên khách hàng" className="form-control" />
                                    </div>
                                    <div className="input-group input-group-outline mb-3">
                                        <input type="text" placeholder="Ngày thuê" className="form-control" />
                                    </div>
                                    <div className="input-group input-group-outline my-3">
                                        <input type="text" placeholder="Ngày trả" className="form-control" />
                                    </div>
                                    <div className="input-group input-group-outline mb-3">
                                        <input type="text" placeholder="Mã váy" className="form-control" />
                                    </div>
                                    <div className="text-center">
                                        <button type="button" className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Tạo</button>
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