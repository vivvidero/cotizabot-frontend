import logo from "../../assets/images/Logo.png"
import menu from "../../assets/icons/menu.png"

export const Header = () => {
    return (
        <div className='flex justify-between px-16 py-5 bg-transparent fixed w-full z-10'>
            <div>
                <img src={menu} alt="menu-icon" />
            </div>
            <div>
                <img src={logo} />
            </div>
            <div className="flex justify-between items-center">
                <div className="rounded-full bg-white w-10 h-10 flex justify-center items-center mr-3 text-2xl" >
                    V
                </div>
                <h2 className="text-xl text-white">Valeria Castro</h2>
            </div>
        </div>
    )
}
