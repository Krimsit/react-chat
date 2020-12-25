import React from 'react'
import propTypes from 'prop-types'
import { Button as BaseButton } from 'antd'
import classNames from 'classnames'

import './Button.scss'

const Button = props => (
    <BaseButton  {...props} className={classNames('button', props.className, { 'button--large': props.size === "large" })} />
)


Button.propTypes = {
    className: propTypes.string
}

export default Button
