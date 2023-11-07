import { ComponentPropsWithoutRef } from 'react'

type SkeletonProps = ComponentPropsWithoutRef<'div'> & {
    height?: string
    width?: string
    repeat?: number
}

type SkeletonWrapperProps = ComponentPropsWithoutRef<'div'> & {
    srOff?: boolean
}

export const Skeleton = ({ height = 'h-4', width = 'w-full', repeat = 1, className }: SkeletonProps) => {
    const combinedClassNames = `bg-gray-200 rounded-full dark:bg-gray-700 ${height} ${width} ${className}`

    const myArray = Array.from({ length: repeat }, (_, index) => index)

    return myArray.map((_, index) => <div key={'skeleton-' + index} className={combinedClassNames}></div>)
}

const Animate = ({ children, className, srOff }: SkeletonWrapperProps) => (
    <div role="status" className={`max-w-full animate-pulse ${className}`}>
        {children}
        {!srOff && <span className="sr-only">Loading...</span>}
    </div>
)

Skeleton.Animate = Animate
