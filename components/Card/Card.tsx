import { ComponentPropsWithoutRef } from 'react'

export const Card = ({
    children,
    onClick,
    disabled,
    nr,
}: ComponentPropsWithoutRef<'div'> & { disabled: boolean; nr: number }) => {
    return (
        <div
            className={`card
            border-4 border-primary
            cursor-pointer

            hover:bg-primary-focus
            
            
            ${disabled && 'cursor-not-allowed pointer-events-none border-primary-focus text-error-content'}
            `}
            aria-disabled={disabled}
            onClick={onClick}
        >
            <div className="card-body text-center">
                <div className="flex">
                    {nr && <kbd className="kbd text-sm">{nr}</kbd>}

                    <span className="text-3xl font-semibold break-all flex-1">{children}</span>
                    {nr && <kbd className="kbd invisible">0</kbd>}
                </div>
            </div>
        </div>
    )
}
