import React from "react";
import moment from 'moment';

export default function ListStandard() {
    return (
        <div className="container-fluid py-4">
            <div className="row">
                <div className="col-12">
                    <div className="card my-4">
                        <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white font-weight-bolder text-capitalize ps-3" style={{textAlign:  'center'}}>STANDARD</h6>
                            </div>
                        </div>
                        <div className="card-body pb-2">
                            <div className="table-responsive p-0">
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Mã sản phẩm</th>
                                            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Mô tả</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Trạng thái</th>
                                            <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Ngày trả</th>
                                            <th className="text-secondary opacity-7" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    {/*                      <div>*/}
                                                    {/*                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">*/}
                                                    {/*                      </div>*/}
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">ST-001</h6>
                                                        {/*                        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>*/}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Trễ vai</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Có sẵn</span>
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
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    {/*                      <div>*/}
                                                    {/*                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">*/}
                                                    {/*                      </div>*/}
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">ST-002</h6>
                                                        {/*                        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>*/}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Trễ vai</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Có sẵn</span>
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
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    {/*                      <div>*/}
                                                    {/*                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">*/}
                                                    {/*                      </div>*/}
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">ST-003</h6>
                                                        {/*                        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>*/}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Trễ vai</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Có sẵn</span>
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
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    {/*                      <div>*/}
                                                    {/*                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">*/}
                                                    {/*                      </div>*/}
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">ST-004</h6>
                                                        {/*                        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>*/}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Trễ vai</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Có sẵn</span>
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
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    {/*                      <div>*/}
                                                    {/*                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">*/}
                                                    {/*                      </div>*/}
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">ST-005</h6>
                                                        {/*                        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>*/}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Trễ vai</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Có sẵn</span>
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
                                        <tr>
                                            <td>
                                                <div className="d-flex px-2 py-1">
                                                    {/*                      <div>*/}
                                                    {/*                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">*/}
                                                    {/*                      </div>*/}
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <h6 className="mb-0 text-sm">ST-006</h6>
                                                        {/*                        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>*/}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="text-xs font-weight-bold mb-0">Trễ vai</p>
                                            </td>
                                            <td className="align-middle text-center text-sm">
                                                <span className="badge badge-sm bg-gradient-success">Có sẵn</span>
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