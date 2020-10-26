import React from 'react';
import classes from './Label.module.scss';

const Label = (props) => {
    if (props.elementType === "label") {
        return <label className={classes.label} htmlFor={props.for}>{props.children}</label>
    }
}

export default Label;
