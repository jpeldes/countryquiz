import { PropsWithChildren } from 'react'

export const Card = ({ children }: PropsWithChildren) => {
    return (
        <div className="card bg-primary cursor-pointer hover:bg-primary-focus">
            <div className="card-body text-center">
                <span className="text-xl font-semibold break-all">{children}</span>
            </div>
        </div>
    )
}
