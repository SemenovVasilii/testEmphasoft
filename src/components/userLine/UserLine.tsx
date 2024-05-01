import { FC } from 'react';
import './UserLine.scss'
import Delete from '../../ui/img/delete.svg'
import Edit from "../../ui/img/edit.svg"
import { deleteUserQuery } from '../../actions/User';
import { store } from '../../store';
import { SetEditUser } from '../../store/userReducer';


interface IUserProps {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    last_login: string;
    is_superuser: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const UserLine: FC<IUserProps> = ({ id, username, first_name, last_name, is_active, last_login, is_superuser, setIsEdit }) => {

    const handleDelete = (id: number) => {
        const token: string | null = localStorage.getItem('token')
        const ok: boolean = confirm('Точно удалить?')
        if (token && ok) {
            if (ok) {
                deleteUserQuery(id, token)
            }
        }
    }

    const isActive = is_active.toString()

    const handleEdit = (id: number, username: string, first_name: string, last_name: string, is_active: string) => {
        const token: string | null = localStorage.getItem('token')
        if (token) {
            store.dispatch(SetEditUser({
                id: id,
                username: username,
                first_name: first_name,
                last_name: last_name,
                is_active: is_active
            }))
            setIsEdit(true)
        }
    }

    return (
        <div className='userline'>
            <div className='userline__cell cell1'>{id}</div>
            <div className='userline__cell'>{username}</div>
            <div className='userline__cell'>{first_name ? first_name : "-"}</div>
            <div className='userline__cell'>{last_name ? last_name : "-"}</div>
            <div className='userline__cell'>{is_active ? "Да" : "Нет"}</div>
            <div className='userline__cell'>{last_login ? last_login : "-"}</div>
            <div className='userline__cell'>{is_superuser ? "Да" : "Нет"}</div>
            <button className='userline__cell' onClick={() => handleEdit(id, username, first_name, last_name, isActive)}>
                <img alt="#" src={Edit} className='cell__img' />
            </button>
            <button className='userline__cell' onClick={() => handleDelete(id)}>
                <img alt="#" src={Delete} className='cell__img' />
            </button>
        </div>
    )
}

export { UserLine }
