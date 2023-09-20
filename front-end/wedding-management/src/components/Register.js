import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createNewEmployee } from "../services/EmployeeService";

export default function Register() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Đăng kí'
    },[])

    return (
        <main className="main-content mt-2">
            <div className="page-header d-flex align-items-start min-vh-100 justify-content-center align-items-center mt-4" style={{
                backgroundImage: 'url("https://static01.nyt.com/images/2023/07/28/fashion/28OPEN-THREAD/28OPEN-THREAD-videoSixteenByNine3000.jpg")',
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'
            }}>
                <span className="mask bg-gradient-dark opacity-6" />
                <div className="container my-auto mt-3">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3">
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Đăng kí tài khoản</h4>
                                        <div className="row">
                                            <div className="col-3"></div>
                                            <div className="col-3 text-center">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                    <i class="fa-brands fa-facebook text-white text-lg"></i></a>
                                            </div>
                                            <div className="col-3 text-center">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                    <i class="fa-brands fa-google text-white text-lg"></i></a>
                                            </div>
                                            <div className="col-3"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Formik initialValues={{
                                        nameEmployee: '',
                                        phone: '',
                                        email: '',
                                        flagDelete: false,
                                        address: '',
                                        password: '',
                                        continuePassword: ''
                                    }}
                                        validationSchema={yup.object({
                                            nameEmployee: yup.string().min(3, "Họ và tên tối thiểu 3 ký tự.").max(100, "Họ và tên tối đa 100 ký tự. ").required("Vui lòng nhập họ và tên."),
                                            phone: yup.string().matches(/^(\+84|0)[1-9][0-9]{8}$/, "Không chứa các kí tự đặc biệt").required("Vui lòng nhập số điện thoại."),
                                            email: yup.string().email().required("Địa chỉ email theo định dạng xxx@xxx.xxx"),
                                            address: yup.string().min(10, "Địa chỉ tối thiểu 10 kí tự.").max(100, "Địa chỉ tối đa chỉ 100 kí tự.").required("Vui lòng nhập địa chỉ."),
                                            password: yup.string().required("Vui lòng nhập mật khẩu!!!!"),
                                            continuePassword: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu nhập lại không đúng!!!!').required("Vui lòng nhập lại mật khẩu!!!!")
                                        })}
                                        onSubmit={async (values) => {
                                            console.log(values);
                                            try {
                                                await createNewEmployee(values);
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Đăng kí thành công!!!!',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                                navigate('/');
                                            } catch (error) {
                                                Swal.fire({
                                                    icon: 'warning',
                                                    title: 'Email đã được đăng kí!!!!',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                                return
                                            }
                                        }}>
                                        <Form>
                                            <div className="input-group input-group-outline my-3">
                                                <Field type="text" name='nameEmployee' placeholder="Họ và tên" className="form-control" />
                                                <ErrorMessage name="nameEmployee" component='div' className="error" />
                                            </div>
                                            <div className="input-group input-group-outline mb-3">
                                                <Field type="text" name='phone' placeholder="Số điện thoại" className="form-control" />
                                                <ErrorMessage name="phone" component='div' className="error" />
                                            </div>
                                            <div className="input-group input-group-outline my-3">
                                                <Field type="text" name='address' placeholder="Địa chỉ" className="form-control" />
                                                <ErrorMessage name="address" component='div' className="error" />
                                            </div>
                                            <div className="input-group input-group-outline my-3">
                                                <Field type="email" name='email' placeholder="Email" className="form-control" />
                                                <ErrorMessage name="email" component='div' className="error" />
                                            </div>
                                            <div className="input-group input-group-outline my-3">
                                                <Field type="password" name='password' placeholder="Mật khẩu" className="form-control"></Field>
                                                <ErrorMessage name="password" component='div' className="error" />
                                            </div>
                                            <div className="input-group input-group-outline my-3">
                                                <Field type="password" name='continuePassword' placeholder="Nhập lại mật khẩu" className="form-control" />
                                                <ErrorMessage name="continuePassword" component='div' className="error" />
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn bg-gradient-primary font-weight-bold w-100 my-4" style={{ color: 'white' }}>Tạo tài khoản</button>
                                            </div>
                                            <p className="text-sm text-center">
                                                <Link to={`/login`} className="text-gradient font-weight-bold" style={{ color: '#866ec7' }}>Đăng nhập</Link>
                                            </p>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}