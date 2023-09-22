import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import { loginByAccount } from "../services/AccountService";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate();

    const getUser = async (user) => {
        if (user == '') {
            return;
        } else {
            navigate("/contract");
        }
    }

    useEffect(() => {
        document.title = 'Đăng nhập'
    },[])

    useEffect(() => {
        const user = localStorage.getItem("username");
        if (user) {
            getUser(user);
        } else {
            getUser('');
        }
    }, [])

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
                                            <div className="col-3"></div>
                                            <div className="col-3 text-center">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                    <i class="fa-brands fa-facebook text-white text-lg"></i>                                                </a>
                                            </div>
                                            <div className="col-3 text-center">
                                                <a className="btn btn-link px-3" href="javascript:;">
                                                    <i class="fa-brands fa-google text-white text-lg"></i>                                                </a>
                                            </div>
                                            <div className="col-3"></div>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Formik initialValues={{ username: '', password: '' }}
                                        validationSchema={yup.object({
                                            username: yup.string().required("Vui lòng nhập email"),
                                            password: yup.string().required("Vui lòng điền mật khẩu!!!!")
                                        })}
                                        onSubmit={async (values) => {
                                            try {
                                                const data = await loginByAccount(values);
                                                localStorage.setItem("token", data.jwtToken);
                                                localStorage.setItem("username", data.username);
                                                localStorage.setItem("role", data.nameRole);
                                                localStorage.setItem("nameUser", data.nameEmployee);
                                                console.log(localStorage);
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Đăng nhập thành công!!!!',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                                navigate('/contract');
                                            } catch (error) {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Đăng nhập thất bại!!!!',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                            }

                                        }}>
                                        <Form>
                                            <div className="input-group input-group-outline my-3">
                                                <Field type="text" name='username' placeholder="Email" className="form-control" />
                                                <ErrorMessage name="username" component='div' className="error" />
                                            </div>
                                            <div className="input-group input-group-outline mb-3">
                                                <Field type="password" name='password' placeholder="Mật khẩu" className="form-control" />
                                                <ErrorMessage name="password" component='div' className="error" />
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Đăng nhập</button>
                                            </div>
                                            <p className="mt-4 text-sm text-center">
                                                Bạn chưa có tài khoản?
                                                <Link to={`/register`} className="text-gradient font-weight-bold" style={{ color: '#866ec7' }}>Đăng kí</Link>
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