import { FC, useContext } from 'react'
import logo from '../../assets/images/Logo-verde.png'
import './login.css'
import { AuthContext, AuthContextProps } from '../../context/AuthContext';
import { LoginLayout } from '../../Layout';
import { Navigate } from 'react-router-dom';


export const Login: FC = () => {

    const { user, setUser, signIn, error, isAuthenticated, token } = useContext<AuthContextProps>(AuthContext)

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        signIn(user)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    if (token) return <Navigate to={'/'} replace />

    return (
        <LoginLayout>
            <div className='w-full h-full grid grid-cols-2 '>
                <div className='w-full bg-login flex flex-col items-center justify-end p-8 xxl:p-16 text-white '>
                    <h2 className='font-outfit text-2xl xxl:text-4xl mb-5'>
                        Cotiza en tiempo real y guarda tus
                        cotizaciones
                    </h2>
                    <p className='font-roboto text-lg xxl:text-xl font-normal'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore  consectetur adipiscing elit, sed do</p>
                </div>
                <div className='flex flex-col items-center justify-around bg-white px-12 xxl:px-24'>
                    <div>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className='text-vivvi flex flex-col items-center justify-between'>
                        <h2 className='font-outfit text-2xl xxl:text-4xl mb-2 xxl:mb-4'>Es un gusto tenerte en Vivvidero</h2>
                        <p className='font-roboto text-base xxl:text-lg'>Inicia sesión para acceder a nuestra suite de herramientas para
                            tu remodelación</p>
                        <form onSubmit={handleLogin} className='flex flex-col items-center my-8 xxl:my-16 w-full gap-5'>
                            <label htmlFor='email' />
                            <input onChange={handleInputChange} name='email' type='email' placeholder='Ingresa tu correo de ingreso' className='w-2/3 xxl:w-full flex p-2 xxl:py-7 px-5 items-center rounded-full bg-gray-100 text-base xxl:text-2xl' />
                            <label htmlFor='password' />
                            <input onChange={handleInputChange} name='password' type='password' placeholder='Ingresa tu contraseña' className='w-2/3 xxl:w-full flex p-2 xxl:py-7 px-5 items-center rounded-full bg-gray-100 text-base xxl:text-2xl' />
                            <button className='w-2/3 xll:w-full flex py-3 xxl:py-7 px-5 items-center justify-center rounded-full bg-vivvi text-base xxl:text-2xl text-white my-4' >Empecemos!</button>
                        </form>
                    </div>
                    {error && (<div className='p-4 bg-dorado'>
                        <p className='text-white'> {error} </p>
                    </div>)}


                    <a className='underline cursor-pointer'>Ingresar como administrador</a>
                </div>
            </div>
        </LoginLayout>

    )
}                                                                     