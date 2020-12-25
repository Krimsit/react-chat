import React from "react"
import { Form } from "antd"
import { MailOutlined, LockOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

import { Button, Block, FormField } from "components"

const LoginForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
    } = props
    return (
        <div>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
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
                    <Form.Item>
                        <Button
                            disabled={isSubmitting}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button button"
                            size="large"
                        >
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                    <Link className="auth__register-link" to="/signup">
                        Зарегистрироваться
                    </Link>
                </Form>
            </Block>
        </div>
    )
}

export default LoginForm
