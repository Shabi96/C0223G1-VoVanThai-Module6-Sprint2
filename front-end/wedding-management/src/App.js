import './App.css';
import '../src/css/nucleo-icons.css';
import '../src/css/material-dashboard.min.css';
import '../src/css/nucleo-svg.css';


function App() {
  return (
    <div className='row'>
      <div className='col-3'>
      <aside className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark" id="sidenav-main">
        <div className="sidenav-header">
          <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav" />
          <a className="navbar-brand m-0" href=" https://demos.creative-tim.com/material-dashboard/pages/dashboard " target="_blank">
            {/* <img src="css/img/logo-ct.png" className="navbar-brand-img h-100" alt="main_logo" /> */}
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
      </div>
      <div className="col-9">
        <main className="main-content border-radius-lg ">
          {/* Navbar */}
          <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
            <div className="container-fluid py-1 px-3">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                  <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Quản lý</a></li>
                  {/*          <li class="breadcrumb-item text-sm text-dark active" aria-current="page">index</li>*/}
                </ol>
                <h6 className="font-weight-bolder mb-0">Danh sách cho thuê</h6>
              </nav>
              <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                  <div className="input-group input-group-outline">
                    <label className="form-label">Tìm kiếm</label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <ul className="navbar-nav  justify-content-end">
                  {/*          <li class="nav-item d-flex align-items-center">*/}
                  {/*            <a class="btn btn-outline-primary btn-sm mb-0 me-3" target="_blank" href="https://www.creative-tim.com/builder?ref=navbar-material-dashboard">Online Builder</a>*/}
                  {/*          </li>*/}
                  {/*          <li class="mt-2">*/}
                  {/*            <a class="github-button" href="https://github.com/creativetimofficial/material-dashboard" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star creativetimofficial/material-dashboard on GitHub">Star</a>*/}
                  {/*          </li>*/}
                  <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                    <a href="javascript:" className="nav-link text-body p-0" id="iconNavbarSidenav">
                      <div className="sidenav-toggler-inner">
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                        <i className="sidenav-toggler-line" />
                      </div>
                    </a>
                  </li>
                  <li className="nav-item px-3 d-flex align-items-center">
                    <a href="javascript:" className="nav-link text-body p-0">
                      <i className="fa fa-cog fixed-plugin-button-nav cursor-pointer" />
                    </a>
                  </li>
                  <li className="nav-item dropdown pe-2 d-flex align-items-center">
                    <a href="javascript:" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa fa-bell cursor-pointer" />
                    </a>
                    <ul className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                      <li className="mb-2">
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                          <div className="d-flex py-1">
                            <div className="my-auto">
                              {/*                      <img src="./assets/img/team-2.jpg" class="avatar avatar-sm  me-3 ">*/}
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                <span className="font-weight-bold">New message</span> from Laur
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                <i className="fa fa-clock me-1" />
                                13 minutes ago
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li className="mb-2">
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                          <div className="d-flex py-1">
                            <div className="my-auto">
                              {/*                      <img src="./assets/img/small-logos/logo-spotify.svg" class="avatar avatar-sm bg-gradient-dark  me-3 ">*/}
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                <span className="font-weight-bold">New album</span> by Travis Scott
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                <i className="fa fa-clock me-1" />
                                1 day
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                          <div className="d-flex py-1">
                            <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto">
                              <svg width="12px" height="12px" viewBox="0 0 43 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"> <title>credit-card</title> <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g transform="translate(-2169.000000, -745.000000)" fill="#FFFFFF" fillRule="nonzero"> <g transform="translate(1716.000000, 291.000000)"> <g transform="translate(453.000000, 454.000000)"> <path className="color-background" d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z" opacity="0.593633743" /> <path className="color-background" d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z" /> </g> </g> </g> </g> </svg>
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                Payment successfully completed
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                <i className="fa fa-clock me-1" />
                                2 days
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item d-flex align-items-center">
                    <a href="#" className="nav-link text-body font-weight-bold px-0">
                      <i className="fa fa-user me-sm-1" />
                      <span className="d-sm-inline d-none">ADMIN</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          {/* End Navbar */}
          <div className="container-fluid py-4">
            <div className="row">
              <div className="col-12">
                <div className="card my-4">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                      <h6 className="text-white text-capitalize ps-3">Quản lý váy cưới</h6>
                    </div>
                  </div>
                  <div className="card-body px-0 pb-2">
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
                                  <h6 className="mb-0 text-sm">LUX-001</h6>
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
                              <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
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
                                  <h6 className="mb-0 text-sm">LUX-001</h6>
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
                              <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
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
                                  <h6 className="mb-0 text-sm">LUX-001</h6>
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
                              <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
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
                                  <h6 className="mb-0 text-sm">LUX-001</h6>
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
                              <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
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
                                  <h6 className="mb-0 text-sm">LUX-001</h6>
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
                              <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
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
                                  <h6 className="mb-0 text-sm">LUX-001</h6>
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
                              <span className="text-secondary text-xs font-weight-bold">23/04/18</span>
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
          <div className="container-fluid py-4">
            <footer className="footer py-4  ">
              <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                  <div className="col-lg-6 mb-lg-0 mb-4">
                    <div className="copyright text-center text-sm text-muted text-lg-start">
                      © ,
                      made with <i className="fa fa-heart" /> by
                      <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank">Wedding</a>
                      for a better web.
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                      <li className="nav-item">
                        <a href="#" className="nav-link text-muted" target="_blank">Wedding</a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link text-muted" target="_blank">About Us</a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link text-muted" target="_blank">Blog</a>
                      </li>
                      <li className="nav-item">
                        <a href="#" className="nav-link pe-0 text-muted" target="_blank">License</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </main>
        <div className="fixed-plugin">
          <a className="fixed-plugin-button text-dark position-fixed px-3 py-2">
            <i className="material-icons py-2">settings</i>
          </a>
          <div className="card shadow-lg">
            <div className="card-header pb-0 pt-3">
              <div className="float-start">
                <h5 className="mt-3 mb-0">Giao diện</h5>
              </div>
              <div className="float-end mt-4">
                <button className="btn btn-link text-dark p-0 fixed-plugin-close-button">
                  <i className="material-icons">clear</i>
                </button>
              </div>
              {/* End Toggle Button */}
            </div>
            <hr className="horizontal dark my-1" />
            <div className="card-body pt-sm-3 pt-0">
              {/* Sidebar Backgrounds */}
              {/*      <div>*/}
              {/*        <h6 class="mb-0">Sidebar Colors</h6>*/}
              {/*      </div>*/}
              {/*      <a href="javascript:void(0)" class="switch-trigger background-color">*/}
              {/*        <div class="badge-colors my-2 text-start">*/}
              {/*          <span class="badge filter bg-gradient-primary active" data-color="primary" onclick="sidebarColor(this)"></span>*/}
              {/*          <span class="badge filter bg-gradient-dark" data-color="dark" onclick="sidebarColor(this)"></span>*/}
              {/*          <span class="badge filter bg-gradient-info" data-color="info" onclick="sidebarColor(this)"></span>*/}
              {/*          <span class="badge filter bg-gradient-success" data-color="success" onclick="sidebarColor(this)"></span>*/}
              {/*          <span class="badge filter bg-gradient-warning" data-color="warning" onclick="sidebarColor(this)"></span>*/}
              {/*          <span class="badge filter bg-gradient-danger" data-color="danger" onclick="sidebarColor(this)"></span>*/}
              {/*        </div>*/}
              {/*      </a>*/}
              {/* Sidenav Type */}
              <div className="mt-3">
                <h6 className="mb-0">Thanh điều hướng</h6>
                <p className="text-sm">Thay đổi màu sắc</p>
              </div>
              <div className="d-flex">
                <button className="btn bg-gradient-dark px-3 mb-2 active" data-class="bg-gradient-dark" onclick="sidebarType(this)">Đen</button>
                <button className="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-success" onclick="sidebarType(this)">Xanh lá</button>
                <button className="btn bg-gradient-dark px-3 mb-2 ms-2" data-class="bg-white" onclick="sidebarType(this)">Trắng</button>
              </div>
              <p className="text-sm d-xl-none d-block mt-2">You can change the sidenav type just on desktop view.</p>
              {/* Navbar Fixed */}
              <div className="mt-3 d-flex">
                <h6 className="mb-0">Navbar Fixed</h6>
                <div className="form-check form-switch ps-0 ms-auto my-auto">
                  <input className="form-check-input mt-1 ms-auto" type="checkbox" id="navbarFixed" onclick="navbarFixed(this)" />
                </div>
              </div>
              <hr className="horizontal dark my-3" />
              <div className="mt-2 d-flex">
                <h6 className="mb-0">Sáng / Tối</h6>
                <div className="form-check form-switch ps-0 ms-auto my-auto">
                  <input className="form-check-input mt-1 ms-auto" type="checkbox" id="dark-version" onclick="darkMode(this)" />
                </div>
              </div>
              <hr className="horizontal dark my-sm-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
