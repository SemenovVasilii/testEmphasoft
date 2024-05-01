import { FC, useState } from 'react';
import './EditUser.scss'
import { editUserSchema } from '../../lib';
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import Close from "../../ui/img/close.svg"
import { editUserQuery } from '../../actions/User';
import { SetEditUser } from '../../store/userReducer';

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

interface IEditUserProps {
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const EditUser: FC<IEditUserProps> = ({ setIsEdit }) => {

    const editUser = useSelector((state: RootState) => state.user.editUser)

    const [formState, setFormState] = useState<IFormState>({
        formData: {
            login: editUser.username,
            firstname: editUser.first_name,
            lastname: editUser.last_name,
            password: editUser.password,
            isActive: editUser.is_active
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
            await editUserSchema.validate(formState.formData, { abortEarly: false });
            const token: string | null = localStorage.getItem('token')
            if (token) {
                const isActive = (formState.formData.isActive === "true")
                editUserQuery(editUser.id, formState.formData.login, formState.formData.firstname, formState.formData.lastname, formState.formData.password, isActive, token)
                setIsEdit(false)
                store.dispatch(SetEditUser({}))
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
        <div className="edituser">
            <div className="edituser__row">
                <div className='edituser__form'>
                    <button className='edituser__return' onClick={() => setIsEdit(false)}>
                        <img alt="#" src={Close} className='return__img' />
                    </button>
                    <div className='edituser__enter'>Редактировать <br />пользователя</div>
                    <div className='edituser__login'>Логин</div>
                    <input
                        type="text"
                        name="login"
                        value={formState.formData.login}
                        onChange={handleChange}
                        placeholder=""
                        className='edituser__login-input'
                    />
                    {formState.errors.login && <div className="authorization__errors">{formState.errors.login}</div>}
                    <div className='edituser__firstname'>Имя</div>
                    <input
                        type="text"
                        name="firstname"
                        value={formState.formData.firstname}
                        onChange={handleChange}
                        placeholder=""
                        className='edituser__firstname-input'
                    />
                    {formState.errors.firstname && <div className="authorization__errors">{formState.errors.firstname}</div>}
                    <div className='edituser__lastname'>Фамилия</div>
                    <input
                        type="text"
                        name="lastname"
                        value={formState.formData.lastname}
                        onChange={handleChange}
                        placeholder=""
                        className='edituser__lastname-input'
                    />
                    {formState.errors.lastname && <div className="authorization__errors">{formState.errors.lastname}</div>}
                    <div className='edituser__password'>Пароль</div>
                    <input
                        type="password"
                        name="password"
                        value={formState.formData.password}
                        onChange={handleChange}
                        placeholder="******"
                        className='edituser__password-input'
                    />
                    {formState.errors.password && <div className="authorization__errors">{formState.errors.password}</div>}
                    <div className='edituser__active'>Активность</div>
                    <div className='edituser__active-input'>
                        <input
                            type="radio"
                            name="isActive"
                            value={"true"}
                            checked={formState.formData.isActive === "true"}
                            onChange={handleChange}
                        />
                        <label htmlFor="active" style={{ marginLeft: 5 }}>Активен</label>
                    </div>
                    <div className='edituser__active-input'>
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
                    <button className='edituser__button' onClick={handleSubmit}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}

export { EditUser }
