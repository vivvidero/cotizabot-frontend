import logoBlanco from "../../../assets/images/Logo.png"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../../context"
import { FormControl, MenuItem, Select } from "@mui/material"

export const Header = () => {

    const { nickname, logout } = useContext(AuthContext)
    
    


    return (
        <div className='flex justify-between bg-vivvi w-full h-16 '>
            <div className="flex">
                <Link to={"/admin/projects"} >
                    <div className={`bg-vivvi py-5 px-10 grid place-content-center`}>
                        <img src={logoBlanco} alt="logo" />
                    </div>

                </Link>
            </div>
            <div className="flex justify-between items-center px-10">
                <div className="rounded-full bg-white w-8 h-8 flex justify-center items-center text-xl " >
                    {nickname ? nickname[0].toUpperCase() : ''}
                </div>
                <h2 className="text-lg text-white mx-3"> {nickname} </h2>
                <FormControl size="small" >
                    <Select className="border-none">
                        <MenuItem onClick={logout}>Cerrar Sesión</MenuItem>
                    </Select>
                </FormControl>

            </div>
        </div>
    )
}
