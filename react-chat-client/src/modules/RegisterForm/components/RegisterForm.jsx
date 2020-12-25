import React from "react"
import { Form } from "antd"
import {
    UserOutlined,
    LockOutlined,
    MailOutlined,
    InfoCircleTwoTone,
} from "@ant-design/icons"
import { Link } from "react-router-dom"

import { Button, Block, FormField } from "components"

const success = false

const RegisterForm = (props) => {
    const {
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        values,
    } = props
    return (
        <div>
            <div className="auth__top">
                <h2>Регистрация</h2>
                <p>Для входа в чат, вам нужно зарегистрироваться</p>
            </div>
            <Block>
                {!success ? (
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={handleSubmit}
                    >
                        <FormField
                            value={values}
                            placeholder="E-mail"
                            prefix={
                                <MailOutlined className="site-form-item-icon" />
                            }
                            name="email"
                            type="email"
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                        <FormField
                            value={values}
                            placeholder="Ваше имя"
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            name="fullname"
                            type="text"
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                        <FormField
                            value={values}
                            placeholder="Пароль"
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            name="password"
                            type="password"
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                        <FormField
                            value={values}
                            placeholder="Повторите пароль"
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            name="password_2"
                            type="password"
                            touched={touched}
                            errors={errors}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                        <Form.Item>
                            <Button
                                onClick={handleSubmit}
                                disabled={!isValid}
                                type="primary"
                                htmlType="submit"
                                className="login-form-button button"
                                size="large"
                            >
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                        <Link className="auth__register-link" to="/signin">
                            Войти в аккаунт
                        </Link>
                    </Form>
                ) : (
                    <div className="auth__success-block">
                        <div>
                            <InfoCircleTwoTone style={{ fontSize: "50px" }} />
                        </div>
                        <h2>Подтвердите свой аккаунт</h2>
                        <p>
                            На вашу почту отправленно письмо с ссылкой на
                            подтверждение аккаунта.
                        </p>
                    </div>
                )}
            </Block>
        </div>
    )
}

export default RegisterForm
