import axios, { AxiosError } from 'axios'
import { Logout, SetAuth, SetUsers } from '../store/userReducer'
import { store } from '../store'

export const authorizationQuery = async (login: string, password: string) => {
    try {
        const response = await axios.post('https://test-assignment.emphasoft.com/api/v1/login/', {
            username: login,
            password: password
        })
        const token = response.data.token
        localStorage.setItem('token', token)
        store.dispatch(SetAuth())
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const errorResponse = e as AxiosError<{ message: string }>;
            alert(errorResponse.response?.data.message || 'Authorization error');
        } else {
            alert('Something went wrong');
        }
    }
}

export const getUsersQuery = async (token: string) => {
    try {
        const response = await axios.get('https://test-assignment.emphasoft.com/api/v1/users/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        store.dispatch(SetUsers(response.data))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const errorResponse = e as AxiosError<{ message: string }>;
            alert(errorResponse.response?.data.message || 'Get users error');
        } else {
            alert('Something went wrong');
        }
    }
}

export const deleteUserQuery = async (id: number, token: string) => {
    try {
        await axios.delete(`https://test-assignment.emphasoft.com/api/v1/users/${id}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return getUsersQuery(token)
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const errorResponse = e as AxiosError<{ message: string }>;
            alert(errorResponse.response?.data.message || 'Delete user error');
        } else {
            alert('Something went wrong');
        }
    }
}

export const addUserQuery = async (login: string, first_name: string, last_name: string, password: string, is_active: boolean, token: string) => {
    try {
        await axios.post(
            'https://test-assignment.emphasoft.com/api/v1/users/',
            {
                username: login,
                first_name: first_name,
                last_name: last_name,
                password: password,
                is_active: is_active
            },
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        );
        return getUsersQuery(token)
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const errorResponse = e as AxiosError<{ message: string }>;
            alert(errorResponse.response?.data.message || 'Add user error');
        } else {
            alert('Something went wrong');
        }
    }
}

export const editUserQuery = async (id: number, login: string, first_name: string, last_name: string, password: string, is_active: boolean, token: string) => {
    try {
        await axios.patch(
            `https://test-assignment.emphasoft.com/api/v1/users/${id}`,
            {
                username: login,
                first_name: first_name,
                last_name: last_name,
                password: password,
                is_active: is_active
            },
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            }
        );
        return getUsersQuery(token)
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const errorResponse = e as AxiosError<{ message: string }>;
            alert(errorResponse.response?.data.message || 'Edit user error');
        } else {
            alert('Something went wrong');
        }
    }
}


export const logout = () => {
    localStorage.clear()
    store.dispatch(Logout())
}   
