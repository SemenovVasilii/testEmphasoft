import { useState } from "react"
import "./Registration.scss"
import { Link } from "react-router-dom"
import * as Yup from "yup";
import { registrationSchema } from "../../lib";

interface IFormData {
    login: string;
    firstname: string;
    lastname: string;
    password: string;
}

interface IFormState {
    formData: IFormData;
    errors: { [key in keyof IFormData]?: string };
}

function Registration() {

    const [formState, setFormState] = useState<IFormState>({
        formData: {
            login: "",
            firstname: "",
            lastname: "",
            password: ""
        },
        errors: {}
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormState((prevState) => ({
            ...prevState,
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }))
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e?.preventDefault();
        try {
            await registrationSchema.validate(formState.formData, { abortEarly: false });
            console.log("Форма валидна, данные можно отправить");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const newErrors: IFormState["errors"] = {};
                error.inner.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path as keyof IFormData] = err.message;
                    }
                });
                setFormState((prevState) => ({
                    ...prevState,
                    errors: newErrors,
                }));
            }
        }
    }

    return (
        <div className="registration">
            <div className="registration__row">
                <div className='registration__form'>
                    <div className='registration__enter'>Регистрация(на будущее)</div>
                    <div className='registration__login'>Логин</div>
                    <input
                        type="text"
                        name="login"
                        value={formState.formData.login}
                        onChange={handleChange}
                        placeholder="Developer"
                        className='registration__login-input'
                    />
                    {formState.errors.login && <div className="authorization__errors">{formState.errors.login}</div>}
                    <div className='registration__firstname'>Имя</div>
                    <input
                        type="text"
                        name="firstname"
                        value={formState.formData.firstname}
                        onChange={handleChange}
                        placeholder="Василий"
                        className='registration__firstname-input'
                    />
                    {formState.errors.firstname && <div className="authorization__errors">{formState.errors.firstname}</div>}
                    <div className='registration__lastname'>Фамилия</div>
                    <input
                        type="text"
                        name="lastname"
                        value={formState.formData.lastname}
                        onChange={handleChange}
                        placeholder="Семенов"
                        className='registration__lastname-input'
                    />
                    {formState.errors.lastname && <div className="authorization__errors">{formState.errors.lastname}</div>}
                    <div className='registration__password'>Пароль</div>
                    <input
                        type="password"
                        name="password"
                        value={formState.formData.password}
                        onChange={handleChange}
                        placeholder="******"
                        className='registration__password-input'
                    />
                    {formState.errors.password && <div className="authorization__errors">{formState.errors.password}</div>}
                    <button className='registration__button' onClick={handleSubmit}>Продолжить</button>
                    <div className='toreg'>Есть аккаунт?<Link to='/'><a className='toreg__button'>Войти в аккаунт</a></Link></div>
                </div>
            </div>
        </div>
    )
}

export { Registration }