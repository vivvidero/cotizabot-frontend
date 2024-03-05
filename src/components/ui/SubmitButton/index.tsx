import React, { FC, useContext } from "react"
import { LoadingContext } from "../../../context/LoadingContext"
import { Spinner } from ".."

interface Props {
  bg: string,
  children: React.ReactNode
  handle: (e: React.MouseEvent<HTMLButtonElement>) => void; // Cambiar el tipo de evento aquí
  
}

export const SubmitButton: FC<Props> = ({ bg, handle, children }) => {

  const backgroundColor = bg === 'green' ? 'bg-vivvi text-white border-vivvi' : bg === 'golden' ? 'bg-dorado text-vivvi border-vivvi' : 'bg-transparent text-vivvi border-vivvi'
  const { loading } = useContext(LoadingContext)

  return (
    <button type="submit" disabled={loading} onClick={handle} className={`flex items-center cursor-pointer justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border ${backgroundColor}`}>
      {loading ? <Spinner /> : children}
    </button>
  )
}
