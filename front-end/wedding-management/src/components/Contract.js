import React from "react";
import moment from 'moment';

export default function Contract() {
    return (
        <div className="container-fluid py-4">         
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize font-weight-bolder ps-3" style={{ textAlign: 'center' }}>DANH SÁCH HỢP ĐỒNG</h6>
                            </div>
                        </div>
                        <div className="card-body pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7">Mã hợp đồng</th>
                                            <th className="text-uppercase text-center text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Ngày thuê</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ngày trả</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Khách hàng</th>
                                            <th className="text-secondary opacity-7" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">HD-001</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td>
                                                <p className="text-xs text-center font-weight-bold mb-0">TaiMP</p>
                                            </td>

                                            <td className="align-middle text-center">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Chi tiết
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">HD-002</span>
                                            </td>

                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td>
                                                <p className="text-xs text-center font-weight-bold mb-0">KietNT</p>
                                            </td>

                                            <td className="align-middle text-center">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Chi tiết
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">HD-003</span>
                                            </td>

                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td>
                                                <p className="text-xs text-center font-weight-bold mb-0">NamPC</p>
                                            </td>

                                            <td className="align-middle text-center">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Chi tiết
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">HD-004</span>
                                            </td>

                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td>
                                                <p className="text-xs text-center font-weight-bold mb-0">HungLV</p>
                                            </td>

                                            <td className="align-middle text-center">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Chi tiết
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">HD-005</span>
                                            </td>

                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td>
                                                <p className="text-xs text-center font-weight-bold mb-0">SangTDN</p>
                                            </td>

                                            <td className="align-middle text-center">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Chi tiết
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">HD-006</span>
                                            </td>

                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td className="align-middle text-center">
                                                <span className="text-secondary text-xs font-weight-bold">{moment("2023/04/18").format('DD/MM/YYYY')}</span>
                                            </td>
                                            <td>
                                                <p className="text-xs text-center font-weight-bold mb-0">HoaLTY</p>
                                            </td>

                                            <td className="align-middle text-center">
                                                <a href="javascript:;" className="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
                                                    Chi tiết
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}