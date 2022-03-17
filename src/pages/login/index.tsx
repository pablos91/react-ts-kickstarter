import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './login.scss';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),
    password: yup
        .string()
        .required(),
    // consents: yup.array().of(
    //     yup.object().shape({
    //         isRequired: yup.boolean(),
    //         consentValue: yup
    //             .boolean()
    //             .when("isRequired", {
    //                 is: true,
    //                 then: yup.boolean().isTrue("Consent required")
    //             }),
    //     })
    // )
});

export const LoginPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = data => console.log(data);

    console.log(watch("email"));

    return (
        <div className="login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input key="email" {...register("email")} />
                {errors.email && <span>{errors.email.message}</span>}

                <input key="password" {...register("password")} />
                {errors.password && <span>{errors.password.message}</span>}

                <input type="submit" />
            </form>
        </div>
    )
}