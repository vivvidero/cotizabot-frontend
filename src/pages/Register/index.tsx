import { useContext, useState } from 'react'
import { LoginLayout } from '../../Layout'
import { AuthContext } from '../../context'
import api from '../../api'

export const Register = () => {

    const { error } = useContext(AuthContext)

    const [userRegister, setUserRegister] = useState({
        email: '',
        password: ''
    })

    const handleRegister = async (e) => {
        e.preventDefault()
        if (userRegister.email === '' || userRegister.password === '') {
            console.log('TOdos los campos obligatorios');
            return
        }

        try {
            const response = await api.post('/register', userRegister)
            console.log(response);

        } catch (error) {
            console.error(error);

        }

    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegister(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <LoginLayout>
            <div className='bg-blue-400 w-full h-screen flex items-center justify-center'>
                <form onSubmit={handleRegister} className='flex flex-col items-center xxl:my-16 w-1/3 gap-5'>
                    <label />
                    <input onChange={handleInputChange} name='email' type='email' placeholder='Ingresa tu correo de ingreso' className='w-2/3 xxl:w-full flex p-2 xxl:py-7 px-5 items-center rounded-full bg-gray-100 text-base xxl:text-2xl' />
                    <label />
                    <input onChange={handleInputChange} name='password' type='password' placeholder='Ingresa tu contraseña' className='w-2/3 xxl:w-full flex p-2 xxl:py-7 px-5 items-center rounded-full bg-gray-100 text-base xxl:text-2xl' />
                    <button className='w-2/3 xll:w-full flex py-3 xxl:py-7 px-5 items-center justify-center rounded-full bg-vivvi text-base xxl:text-2xl text-white my-4' >Registrate!</button>
                </form>

            </div>


        </LoginLayout>
    )
}
