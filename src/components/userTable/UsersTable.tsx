import './UsersTable.scss'
import { getUsersQuery } from '../../actions'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UserLine, AddUser, EditUser } from '../'

interface IUser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    last_login: string;
    is_superuser: boolean;
}

function UsersTable() {

    const users: [] = useSelector((state: RootState) => state.user.users)
    const [sortOrder, setSortOrder] = useState<string>('default');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)

    let sortedUsers = [...users];

    switch (sortOrder) {
        case 'id_asc':
            sortedUsers.sort((a: IUser, b: IUser) => a.id - b.id);
            break;
        case 'id_desc':
            sortedUsers.sort((a: IUser, b: IUser) => b.id - a.id);
            break;
        case 'name_asc':
            sortedUsers.sort((a: IUser, b: IUser) => a.first_name.localeCompare(b.first_name));
            break;
        case 'name_desc':
            sortedUsers.sort((a: IUser, b: IUser) => b.first_name.localeCompare(a.first_name));
            break;
        case 'surname_asc':
            sortedUsers.sort((a: IUser, b: IUser) => a.last_name.localeCompare(b.last_name));
            break;
        case 'surname_desc':
            sortedUsers.sort((a: IUser, b: IUser) => b.last_name.localeCompare(a.last_name));
            break;
        case 'username_asc':
            sortedUsers.sort((a: IUser, b: IUser) => a.username.localeCompare(b.username));
            break;
        case 'username_desc':
            sortedUsers.sort((a: IUser, b: IUser) => b.username.localeCompare(a.username));
            break;
        case 'active_true':
            sortedUsers = sortedUsers.filter((user: IUser) => user.is_active === true);
            break;
        case 'active_false':
            sortedUsers = sortedUsers.filter((user: IUser) => user.is_active === false);
            break;
        case 'admin_true':
            sortedUsers = sortedUsers.filter((user: IUser) => user.is_superuser === true);
            break;
        case 'admin_false':
            sortedUsers = sortedUsers.filter((user: IUser) => user.is_superuser === false);
            break;
    }

    const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value);
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    const filteredUsers = sortedUsers.filter((user: IUser) => user.username.toLowerCase().includes(searchQuery.toLowerCase()));

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token !== null) {
            getUsersQuery(token)
        }
    }, [])

    return (
        <div className='userstable'>
            <div className="userstable__main">
                <div className="userstable__search">
                    <select onChange={handleSort} className='search__filters'>
                        <option value="default" className=''>Фильтрация</option>
                        <option value="id_asc">Сортировать по ID (возрастание)</option>
                        <option value="id_desc">Сортировать по ID (убывание)</option>
                        <option value="username_asc">Сортировать по логину (А-Я)</option>
                        <option value="username_desc">Сортировать по логину (Я-А)</option>
                        <option value="name_asc">Сортировать по имени (А-Я)</option>
                        <option value="name_desc">Сортировать по имени (Я-А)</option>
                        <option value="surname_asc">Сортировать по фамилии (А-Я)</option>
                        <option value="surname_desc">Сортировать по фамилии (Я-А)</option>
                        <option value="active_true">Только активные</option>
                        <option value="active_false">Только неактивные</option>
                        <option value="admin_true">Только админы</option>
                        <option value="admin_false">Только пользователи</option>
                    </select>
                    <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Поиск по логину" className='search__search' />
                    <button onClick={() => setIsAdd(!isAdd)} className='search__add'>Добавить пользователя</button>
                </div>
                <div className="userstable__grid">
                    <div className="userstable__row">
                        <div className="userstable__cell cell1">id</div>
                        <div className="userstable__cell">Логин</div>
                        <div className="userstable__cell">Имя</div>
                        <div className="userstable__cell">Фамилия</div>
                        <div className="userstable__cell">Активен</div>
                        <div className="userstable__cell">Последний вход</div>
                        <div className="userstable__cell">Админ</div>
                        <div className="userstable__cell">Редактировать</div>
                        <div className="userstable__cell">Удалить</div>
                    </div>
                    {filteredUsers.map((user: IUser) => (
                        <UserLine
                            key={user.id}
                            id={user.id}
                            username={user.username}
                            first_name={user.first_name}
                            last_name={user.last_name}
                            is_active={user.is_active}
                            last_login={user.last_login}
                            is_superuser={user.is_superuser}
                            setIsEdit={setIsEdit}
                        />
                    ))}
                </div>
                {isAdd &&
                    <AddUser setIsAdd={setIsAdd} />
                }
                {isEdit &&
                    <EditUser setIsEdit={setIsEdit} />
                }
            </div>
        </div>
    )
}

export { UsersTable }
