import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
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
    consents: yup.array().of(
        yup.object().shape({
            isRequired: yup.boolean(),
            consentValue: yup
                .boolean()
                .when("isRequired", {
                    is: true,
                    then: yup.boolean().isTrue("Consent required")
                }),
        })
    )
});

export const LoginPage = () => {
    const { register, control, handleSubmit, watch, setError, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: "consents", // unique name for your Field Array
    });

    const onSubmit = (data) => {
        console.log(data);
        setError("consents.1.consentValue", { message: "Error from API call!" })
    };

    const consents = [
        {
            consentValue: false,
            isRequired: true,
            consentText: "Consent A",
            consentId: 1
        },
        {
            consentValue: false,
            isRequired: true,
            consentText: "Consent b",
            consentId: 2
        },
    ]

    React.useEffect(() => {
        consents.map((elem) => {
            append(elem);
        })
    }, [])

    console.log(watch("email"));

    return (
        <div className="login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input key="email" {...register("email")} />
                {errors.email && <span>{errors.email.message}</span>}

                <input key="password" {...register("password")} />
                {errors.password && <span>{errors.password.message}</span>}

                {fields.map((field: Record<"id" | "consentText" | "isRequired", any>, index) => (
                    <label key={field.id}>
                        <input
                            type="checkbox"
                            {...register(`consents.${index}.consentValue`)}
                        />
                        {field.consentText}{field.isRequired && "*"}
                        {errors.consents?.[index] && <span>{errors.consents?.[index].consentValue.message}</span>}
                    </label>

                ))}

                <input type="submit" />
            </form>
        </div>
    )
}