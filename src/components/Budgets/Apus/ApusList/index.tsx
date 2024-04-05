import { ChangeEvent, useContext, useEffect, useState } from "react"
import { NoDataBox } from "../../../ui/NoDataBox"
import { fetchApus } from "../../../../api/apus"
import { LoadingContext } from "../../../../context/LoadingContext"
import {  LinkButton } from "../../.."
import { IconButton, Menu, Pagination } from "@mui/material"
import { ApusTable } from "../../../../types/apus/ApusList"
import { MoreVert } from "@mui/icons-material"

export const ApusList = () => {

    const [apusList, setApusList] = useState<ApusTable[]>([])
    const { loading, setLoading } = useContext(LoadingContext)

    const [totalPages, setTotalPages] = useState<number>(1)
    const [page, setPage] = useState(1);

    useEffect(() => {
        setLoading(true)
        fetchApus(page)
            .then((data) => {
                setApusList(data.data.apus)
                setTotalPages(data.data.totalPages)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)

            })
    }, [page, setLoading])

    const handlePage = (_: ChangeEvent<unknown>, page: number) => {
        setPage(page)
    }



    return (
        <article className="w-full flex flex-col gap-8">
            <div className='flex justify-between mt-6'>
                <LinkButton link={"/admin/budgets/apus/create/general-info"} bg="golden">
                    Nuevo APU
                </LinkButton>
                
            </div>
            <Pagination count={totalPages} onChange={handlePage} />
            <div className="w-full font-medium font-roboto ">
                <div className="grid grid-cols-5 rounded-lg overflow-hidden">
                    <div className="bg-vivvi text-white p-2">Código</div>
                    <div className="bg-vivvi text-white p-2">Subcategoría</div>
                    <div className="bg-vivvi text-white p-2">Nombre/Actividad</div>
                    <div className="bg-vivvi text-white p-2">Unidad</div>
                    <div className="bg-vivvi text-white p-2">Precio tope</div>
                </div>
                <div className="shadow-lg rounded-lg mt-4 flex flex-col gap-4 p-4">
                    {
                        loading
                            ?
                            [...Array(10)].map((_, index) => (<ApusListSkeleton key={index} />))
                            :
                            apusList.length <= 0
                                ?
                                <NoDataBox data={"APU"} link="/admin/budgets/apus/create/general-info" />
                                :
                                apusList.map((apu) => {
                                    return (
                                        <ApuItem key={apu.id} apu={apu} />
                                    )
                                })
                    }
                </div>
            </div>
        </article>
    )
}


const ApuItem = ({ apu }: { apu: ApusTable }) => {

    const [dropdownOpen, setDropdownOpen] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setDropdownOpen(event.currentTarget);
    };

    const handleClose = () => {
        setDropdownOpen(null);
    };
    return (
        <div className="flex gap-1 w-full items-center">
            <button className="border border-black rounded-full w-4 h-4 flex justify-center items-center">+</button>
            <div className="grid grid-cols-5 rounded-lg overflow-hidden border border-platinum p-2 bg-white grow hover:bg-honeydew">
                <div className="text-vivvi px-4"> {apu.code || "SP1000"} </div>
                <div className="text-vivvi px-4"> {apu.name} </div>
                <div className="text-vivvi px-4"> {apu.unit} </div>
                <div className="text-vivvi px-4"> ${apu.total_value} </div>
            </div> 
            <div className='col-span-1 flex flex-col items-center justify-end relative'>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={dropdownOpen ? 'long-menu' : undefined}
                    aria-expanded={dropdownOpen ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}>
                    <MoreVert />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={dropdownOpen}
                    open={Boolean(dropdownOpen)}
                    onClose={handleClose}
                >
                    {/*  <EditProjectButton project={project} />
                                                    <MenuItem onClick={() => { handleDelete(); handleClose(); }}>Eliminar </MenuItem> */}
                </Menu>
            </div>
        </div>
    )
}


const ApusListSkeleton = () => {
    return (
        <div className="flex gap-1 w-full items-center animate-pulse-fast">
            <button className="border border-black rounded-full w-4 h-4 flex justify-center items-center bg-gray-200"></button>
            <div className="grid grid-cols-4 rounded-lg overflow-hidden border border-platinum p-5 bg-white grow">
                <div className="text-vivvi px-4 bg-gray-200"></div>
                <div className="text-vivvi px-4 bg-gray-200"></div>
                <div className="text-vivvi px-4 bg-gray-200"></div>
                <div className="text-vivvi px-4 bg-gray-200"></div>
            </div>
            <div className='col-span-1 flex flex-col items-center justify-end relative bg-gray-200'></div>
        </div>
    )
}