import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { NoDataBox } from "../../../ui/NoDataBox"
import { deleteApu, fetchApus } from "../../../../api/apus"
import { LoadingContext } from "../../../../context/LoadingContext"
import { LinkButton } from "../../.."
import { IconButton, Menu, MenuItem, Pagination } from "@mui/material"
import { ApusTable } from "../../../../types/apus/ApusList"
import { MoreVert } from "@mui/icons-material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom"
import place from "../../../../assets/images/Logo-verde.png"

export const ApusList = () => {

    const [apusList, setApusList] = useState<ApusTable[]>([])
    const { loading, setLoading } = useContext(LoadingContext)

    const [totalPages, setTotalPages] = useState<number>(1)
    const [page, setPage] = useState(1);
    const [openApuId, setOpenApuId] = useState<null | number>(null);

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

    console.log(apusList);


    return (
        <article className="w-full flex flex-col gap-8">
            <div className='flex justify-between mt-6'>
                <LinkButton link={"/admin/budgets/apus/create/general-info"} bg="golden">
                    Nuevo APU
                </LinkButton>

            </div>
            {
                totalPages > 1 &&
                <Pagination count={totalPages} onChange={handlePage} />
            }

            <div className="w-full font-medium font-roboto ">
                <div className="grid grid-cols-7 rounded-lg overflow-hidden bg-vivvi text-white py-2">
                    <p className="col-span-1 flex justify-center items-center">Código</p>
                    <p className="col-span-2 flex justify-center items-center">Subcategoría</p>
                    <p className="col-span-1 flex justify-center items-center">Nombre/Actividad</p>
                    <p className="col-span-2 flex justify-center items-center">Unidad</p>
                    <p className="col-span-1 flex justify-center items-center">Precio tope</p>
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
                                        <ApuItem key={apu.id} apu={apu} setOpenApuId={setOpenApuId} openApuId={openApuId} />
                                    )
                                })
                    }
                </div>
            </div>
        </article>
    )
}


const ApuItem = ({ apu, setOpenApuId, openApuId }: { apu: ApusTable, openApuId: null | number, setOpenApuId: Dispatch<SetStateAction<null | number>> }) => {

    const { setLoading } = useContext(LoadingContext)

    const handleOpenApu = (id: number) => {
        if (openApuId === id) {
            setOpenApuId(null)
            return
        }
        setOpenApuId(id);
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteApu = () => {
        setLoading(true)
        deleteApu(apu.id)
            .then((data) => {
                console.log(data);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
        setAnchorEl(null)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-7 w-full items-center border border-platinum p-2 bg-white text-vivvi overflow-hidden rounded-lg grow hover:bg-honeydew px-8">
                <button onClick={() => handleOpenApu(apu.id)} className="border border-black rounded-full w-4 h-4 flex justify-center items-center absolute">+</button>
                <div className="flex ml-8 items-center col-span-1"> {apu.code} </div>
                <div className="flex justify-center col-span-2 items-center"> {apu.subCategory} </div>
                <div className="flex justify-center col-span-1"> {apu.name} </div>
                <div className="flex justify-center col-span-2"> {apu.unit} </div>
                <div className="flex justify-center col-span-1">
                    ${apu.unitPrice}
                </div>
                <div className='flex justify-center items-center absolute right-12'>
                    <IconButton
                        id="more"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}>
                        <MoreVert />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'more',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} >
                            <Link to={`/admin/budgets/apus/edit/${apu.id}/general-info`}>
                                <EditOutlinedIcon />
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleDeleteApu}>
                            <DeleteOutlineOutlinedIcon />
                        </MenuItem>
                    </Menu>
                </div>
            </div>
            {openApuId === apu.id
                ?
                <div className="grid grid-cols-7 w-full items-center">
                    <div className="col-span-1 flex items-center justify-evenly">
                        <div className="mr-4">
                            <img src={place} alt="apu image" className="w-8" />
                        </div>
                        <p> {apu.name} </p>
                    </div>
                    <p className="col-span-2 text-center"> {apu.unit} </p>
                    <p className="col-span-1 text-center"> ${apu.unitPrice} </p>
                    <p className="col-span-2 text-center"> ${apu.unitPrice} </p>
                    <p className="col-span-1 text-center"> ${apu.unitPrice} </p>

                </div>
                :
                null
            }


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