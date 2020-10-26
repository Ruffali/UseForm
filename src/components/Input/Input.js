import React from 'react';
import classes from './Input.module.scss';

const Input = (props) => {
    switch (props.elementType) {
        case ("input"):
            return (
                <input
                    className={classes.input}
                    id={props.id}
                    value={props.value}
                    onChange={props.changed}
                    {...props.config}
                />
            )
        case ("submit"):
            return (
                <input
                    className={!props.disabled ? classes.submit : classes.disabled}
                    disabled={props.disabled}
                    type={props.type}
                    value={props.value}
                />
            )
        default:
            return (
                <input
                    className={classes.input}
                    id={props.id}
                    value={props.value}
                    {...props.config}
                />
            )
    }
}

export default Input;
