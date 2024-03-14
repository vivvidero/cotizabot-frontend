import { useContext } from 'react'
import { LoginLayout, MiddleLayout } from '../../Layout'
import logo from '../../assets/images/Logo-verde.png'
import { AuthContext, AuthContextProps } from '../../context'
import { Navigate } from 'react-router-dom'
import { LoadingContext } from '../../context/LoadingContext'
import { Spinner } from '../../components'


export const Login = () => {

    const { user, setUser, signIn, error, token } = useContext<AuthContextProps>(AuthContext)
    const { loading } = useContext(LoadingContext)


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

    if (token) return <Navigate to={'/admin/projects'} replace />

    return (
        <LoginLayout>
            <MiddleLayout>
                <div className='flex flex-col items-center justify-around bg-white p-12 w-3/12   mt-40 '>
                    <div>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className='text-vivvi flex flex-col items-center justify-between'>

                        <form onSubmit={handleLogin} className='flex flex-col items-center my-4 w-full gap-5'>
                            <label htmlFor='email' />
                            <input autoComplete='current-password' onChange={handleInputChange} name='email' placeholder='Email' className='w-2/3 xl:w-full flex p-2 items-center rounded-full bg-gray-100 ' />
                            <label htmlFor='password' />
                            <input onChange={handleInputChange} name='password' type='password' autoComplete='current-password' placeholder='Contraseña' className='w-2/3 xl:w-full flex p-2 items-center rounded-full bg-gray-100' />
                            <button className='w-2/3 xl:w-full flex p-2 items-center justify-center rounded-full bg-vivvi text-base  text-white my-4 focus:bg-dorado' disabled={loading} >
                                {loading
                                    ?
                                    <Spinner />
                                    :
                                    "Ingresar"
                                }
                            </button>
                        </form>
                    </div>
                    {error && (<div className='p-4 bg-dorado'>
                        <p className='text-white'> {error} </p>
                    </div>)}
                </div>
            </MiddleLayout>
        </LoginLayout>
    )
}
