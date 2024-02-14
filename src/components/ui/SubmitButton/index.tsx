import React, { FC } from "react"

interface Props{
    bg: string,
    children: React.ReactNode
    handle: () => void,
    loading: boolean
}

export const SubmitButton: FC<Props> = ({bg, handle, loading, children}) => {

    const backgroundColor = bg === 'green' ? 'bg-vivvi text-white border-vivvi' : bg === 'golden' ? 'bg-dorado text-vivvi border-vivvi' : 'bg-transparent text-vivvi border-vivvi'


  return (
    <button type="submit" disabled={loading} onClick={handle} className={`flex items-center justify-center gap-2 py-2 w-52 h-8 rounded-full text-base font-roboto font-[500] hover:scale-95 duration-200 border ${backgroundColor}`}>
        {children}
    </button>
  )
}
