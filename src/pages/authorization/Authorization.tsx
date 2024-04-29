import "./Authorization.scss"
import { Link } from "react-router-dom"
import { authorizationSchema } from "../../lib"
import { useState } from "react"
import * as Yup from "yup";
import { authorizationQuery } from "../../actions";

interface IFormData {
    login: string;
    password: string;
}

interface IFormState {
    formData: IFormData;
    errors: { [key in keyof IFormData]?: string };
}

function Authorization() {

    const [formState, setFormState] = useState<IFormState>({
        formData: {
            login: "",
            password: ""
        },
        errors: {}
    });

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
            await authorizationSchema.validate(formState.formData, { abortEarly: false });
            console.log("Форма валидна, данные можно отправить");
            authorizationQuery(formState.formData.login, formState.formData.password)
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
        <div className="authorization">
            <div className="authorization__row">
                <div className='authorization__form'>
                    <div className='authorization__enter'>Вход</div>
                    <div className='authorization__login'>Логин</div>
                    <input
                        type="text"
                        name="login"
                        value={formState.formData.login}
                        onChange={handleChange}
                        placeholder="Username"
                        className='authorization__login-input'
                    />
                    {formState.errors.login && <div className="authorization__errors">{formState.errors.login}</div>}
                    <div className='authorization__password'>Пароль</div>
                    <input
                        type="password"
                        name="password"
                        value={formState.formData.password}
                        onChange={handleChange}
                        placeholder="******"
                        className='authorization__password-input'
                    />
                    {formState.errors.password && <div className="authorization__errors">{formState.errors.password}</div>}
                    <button className='authorization__button' onClick={handleSubmit}>Продолжить</button>
                    <div className='toreg'>Нет аккаунта?<Link to='/registration'><a className='toreg__button'>Создать аккаунт</a></Link></div>
                </div>
            </div>
        </div>
    )
}

export { Authorization }
