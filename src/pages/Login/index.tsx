import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginLayout, MiddleLayout } from '../../Layout';
import logo from '../../assets/images/Logo-verde.png';
import { AuthContext, AuthContextProps } from '../../context';
import { LoadingContext } from '../../context/LoadingContext';
import { Spinner } from '../../components';

export const Login = () => {
    // Obtener datos de autenticación y carga del contexto
    const { user, setUser, signIn, error, token } = useContext<AuthContextProps>(AuthContext);
    const { loading } = useContext(LoadingContext);

    // Función para manejar el inicio de sesión
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        signIn(user); // Llama a la función signIn del contexto de autenticación
    };

    // Función para manejar los cambios en los campos de entrada
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    // Redireccionar si el usuario ya está autenticado
    if (token) return <Navigate to={'/admin/projects'} replace />;

    // Renderizar el formulario de inicio de sesión
    return (
        <LoginLayout>
            <MiddleLayout>
                <div className='flex flex-col items-center justify-around bg-white p-12 w-3/12 mt-40'>
                    <img src={logo} alt='logo' />
                    <form onSubmit={handleLogin} className='flex flex-col items-center my-4 w-full gap-5'>
                        <input autoComplete='current-password' onChange={handleInputChange} name='email' placeholder='Email' className='w-2/3 xl:w-full flex p-2 items-center rounded-full bg-gray-100 ' />
                        <input onChange={handleInputChange} name='password' type='password' autoComplete='current-password' placeholder='Contraseña' className='w-2/3 xl:w-full flex p-2 items-center rounded-full bg-gray-100' />
                        <button className='w-2/3 xl:w-full flex p-2 items-center justify-center rounded-full bg-vivvi text-base text-white my-4 focus:bg-dorado' disabled={loading}>
                            {/* Mostrar un spinner mientras se está cargando */}
                            {loading ? <Spinner /> : "Ingresar"}
                        </button>
                    </form>
                    {/* Mostrar mensaje de error si existe */}
                    {error && <div className='p-4 bg-dorado'>
                        <p className='text-white'>{error}</p>
                    </div>}
                </div>
            </MiddleLayout>
        </LoginLayout>
    );
};
