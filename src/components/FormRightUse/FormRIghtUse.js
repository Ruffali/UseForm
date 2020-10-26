import React from 'react';
import { useForm } from "react-hook-form";
import './FormRightUse.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { Schema } from "../../shema";

const FormRightUse = () => {
    const { register, handleSubmit, errors } = useForm({ mode: 'onChange', resolver: yupResolver(Schema) });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="form_right_use">
            <div className="top">Sign up with Use Form</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="input" name="email" id="email"
                        ref={register} />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="input" name="password" id="password"
                        ref={register} />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" className="input" name="confirmPassword" id="confirmPassword" ref={register} />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="text" className="input" name="age" id="age" ref={register} />
                    {errors.age && <span className="error">{errors.age.message}</span>}
                </div>
                <input className="submit" type="submit" value="Sugn up" />
            </form>
        </div>
    );
}

export default FormRightUse;
