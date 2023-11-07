import { ComponentPropsWithoutRef } from 'react'

export const Card = ({ children, onClick }: ComponentPropsWithoutRef<'div'>) => {
    return (
        <div className="card border-4 border-primary cursor-pointer hover:bg-primary-focus" onClick={onClick}>
            <div className="card-body text-center">
                <span className="text-3xl font-semibold break-all">{children}</span>
            </div>
        </div>
    )
}
