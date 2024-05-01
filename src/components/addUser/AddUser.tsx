import './AddUser.scss'
import { createUserSchema } from '../../lib'
import { FC, useState } from 'react';
import * as Yup from "yup";
import { addUserQuery } from '../../actions';
import Close from "../../ui/img/close.svg"

interface IFormData {
    login: string;
    firstname: string;
    lastname: string;
    password: string;
    isActive: string;
}

interface IFormState {
    formData: IFormData;
    errors: { [key in keyof IFormData]?: string };
}

interface IAddUserProps {
    setIsAdd: React.Dispatch<React.SetStateAction<boolean>>
}

const AddUser: FC<IAddUserProps> = ({ setIsAdd }) => {

    const [formState, setFormState] = useState<IFormState>({
        formData: {
            login: "",
            firstname: "",
            lastname: "",
            password: "",
            isActive: "true"
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
            await createUserSchema.validate(formState.formData, { abortEarly: false });
            const token: string | null = localStorage.getItem('token')
            if (token) {
                const isActive = (formState.formData.isActive === "true")
                addUserQuery(formState.formData.login, formState.formData.firstname, formState.formData.lastname, formState.formData.password, isActive, token)
                setIsAdd(false)
            }
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
        <div className="adduser">
            <div className="adduser__row">
                <div className='adduser__form'>
                    <button className='adduser__return' onClick={() => setIsAdd(false)}>
                        <img alt="#" src={Close} className='return__img' />
                    </button>
                    <div className='adduser__enter'>Добавить<br /> пользователя</div>
                    <div className='adduser__login'>Логин</div>
                    <input
                        type="text"
                        name="login"
                        value={formState.formData.login}
                        onChange={handleChange}
                        placeholder="SemenovVasilii"
                        className='adduser__login-input'
                    />
                    {formState.errors.login && <div className="authorization__errors">{formState.errors.login}</div>}
                    <div className='adduser__firstname'>Имя</div>
                    <input
                        type="text"
                        name="firstname"
                        value={formState.formData.firstname}
                        onChange={handleChange}
                        placeholder="Василий"
                        className='adduser__firstname-input'
                    />
                    {formState.errors.firstname && <div className="authorization__errors">{formState.errors.firstname}</div>}
                    <div className='adduser__lastname'>Фамилия</div>
                    <input
                        type="text"
                        name="lastname"
                        value={formState.formData.lastname}
                        onChange={handleChange}
                        placeholder="Семенов"
                        className='adduser__lastname-input'
                    />
                    {formState.errors.lastname && <div className="authorization__errors">{formState.errors.lastname}</div>}
                    <div className='adduser__password'>Пароль</div>
                    <input
                        type="password"
                        name="password"
                        value={formState.formData.password}
                        onChange={handleChange}
                        placeholder="******"
                        className='adduser__password-input'
                    />
                    {formState.errors.password && <div className="authorization__errors">{formState.errors.password}</div>}
                    <div className='adduser__active'>Активен</div>
                    <div className='adduser__active-input'>
                        <input
                            type="radio"
                            name="isActive"
                            value={"true"}
                            checked={formState.formData.isActive === "true"}
                            onChange={handleChange}
                        />
                        <label htmlFor="active" style={{ marginLeft: 5 }}>Активен</label>
                    </div>
                    <div className='adduser__active-input'>
                        <input
                            type="radio"
                            name="isActive"
                            value="false"
                            checked={formState.formData.isActive === "false"}
                            onChange={handleChange}
                        />
                        <label htmlFor="notActive" style={{ marginLeft: 5 }}>Не активен</label>
                    </div>
                    {formState.errors.isActive && <div className="authorization__errors">{formState.errors.isActive}</div>}
                    <button className='adduser__button' onClick={handleSubmit}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export { AddUser }
