import React from 'react'
import propTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faCheck } from '@fortawesome/free-solid-svg-icons'

const ReadedIcon = ({ isMe, isReaded }) => 
    isMe && (
        isReaded ? (
            <FontAwesomeIcon
                className="message__icon-readed"
                icon={faCheckDouble}
                color="#3674ff"
                alt="Readed icon"
            />) : (
                <FontAwesomeIcon
                    className="message__icon-readed"
                    icon={faCheck}
                    color="#3674ff"
                    alt="No readed icon"
                />
            )
    )

ReadedIcon.propTypes = {
    isMe: propTypes.bool,
    isReaded: propTypes.bool
}

export default ReadedIcon
