import React from "react"
import propTypes from "prop-types"
import classNames from "classnames"

import "./Status.scss"

const Status = ({ online, fullname }) => (
    <div className="chat__dialog-header">
        <div className="chat__dialog-header-center">
            <b className="chat__dialog-header-username">{fullname}</b>
            <div className="chat__dialog-header-status">
                <span
                    className={classNames("status", {
                        "status--online": online,
                    })}
                >
                    {online ? "онлайн" : "офлайн"}
                </span>
            </div>
        </div>
    </div>
)

Status.propTypes = {
    online: propTypes.bool,
}

export default Status
