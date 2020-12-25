import React from "react"
import { Form, Input } from "antd"

import { validateField } from "utils/helpers"

const FormField = ({
    name,
    placeholder,
    prefix,
    type,
    touched,
    errors,
    handleBlur,
    handleChange,
    values,
}) => {
    return (
        <Form.Item
            validateStatus={validateField(name, touched, errors)}
            help={!touched[name] ? " " : errors[name]}
            hasFeedback
        >
            <Input
                value={values}
                id={name}
                prefix={prefix}
                placeholder={placeholder}
                size="large"
                type={type}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </Form.Item>
    )
}

export default FormField
