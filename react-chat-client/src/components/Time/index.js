import React, { Fragment } from "react"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import ruLocale from "date-fns/locale/ru"
import propTypes from "prop-types"

const Time = ({ date }) => (
    <Fragment>
        {formatDistanceToNow(date, { addSuffix: true, locale: ruLocale })}
    </Fragment>
)

Time.propTypes = {
    date: propTypes.instanceOf(Date),
}

export default Time
