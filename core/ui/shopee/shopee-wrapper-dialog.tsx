import table from "data-base64:~assets/table.svg"
import type { PropsWithChildren } from "~node_modules/@types/react"
export const WrapperDialog = ({ isDone, openDialog, children }: PropsWithChildren & { isDone: boolean, openDialog: any }) => {
    return (
        <div className="p-4 w-full flex flex-col">
            {children}
        </div>
    )
}