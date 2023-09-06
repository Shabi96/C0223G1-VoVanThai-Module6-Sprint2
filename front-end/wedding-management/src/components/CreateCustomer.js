import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as yup from 'yup';
import { createCustomer } from "../services/CustomerService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function CreateCustomer() {
    const navigate = useNavigate();
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
                                    <Formik initialValues={{
                                        idCustomer: '',
                                        nameCustomer: '',
                                        phone: '',
                                        email: '',
                                        flagDelete: '',
                                        address: ''
                                    }}
                                        validationSchema={yup.object({
                                            nameCustomer: yup.string().required(),
                                            phone: yup.string().required(),
                                            email: yup.string().required(),
                                            address: yup.string().required()
                                        })}
                                        onSubmit={async (values) => {
                                            await createCustomer(values).then(() => {
                                                Swal.fire({
                                                    icon: 'success',
                                                    title: 'Thêm mới thành công!!!!',
                                                    showConfirmButton: false,
                                                    timer: 1500
                                                })
                                                navigate("/create-contract");
                                            })
                                        }}>
                                        <Form>
                                            <div className=" input-group input-group-outline my-3">
                                                <Field className="form-control"
                                                    type='text' placeholder='Họ và tên' name='nameCustomer' />
                                            </div>
                                            <ErrorMessage name="nameCustomer" component="div" className="error" />
                                            <div className="input-group input-group-outline mb-3">
                                                <Field type="text" name='phone' placeholder="Số điện thoại" className="form-control" />
                                            </div>
                                            <ErrorMessage name="phone" component="div" className="error" />
                                            <div className="input-group input-group-outline my-3">
                                                <Field type="email" placeholder="Email" name='email' className="form-control" />
                                            </div>
                                            <ErrorMessage name="email" component="div" className="error" />
                                            <div className="input-group input-group-outline mb-3">
                                                <Field type="text" name='address' placeholder="Địa chỉ" className="form-control" />
                                            </div>
                                            <ErrorMessage name="address" component="div" className="error" />
                                            <div className="text-center">
                                                <button type="submit" className="btn bg-gradient-primary font-weight-bold w-100 my-4 mb-2" style={{ color: 'white' }}>Thêm</button>
                                            </div>
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