import React from 'react';
import classes from './Error.module.scss';

const Error = (props) => {
    switch (props.elementType) {
        case ("error"):
            return (
                <div className={classes.error}>{props.children}</div>
            )
        case ("qualityError"):
            return (
                <div className={classes.quality_error}>{props.children}</div>
            )
        default:
            return (
                <div className={classes.error}>{props.children}</div>
            )
    }
}

export default Error;
