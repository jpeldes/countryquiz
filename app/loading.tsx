import React from 'react'

import { Skeleton } from '@/components/ui/Skeleton'

const HomeLoading = () => {
    return (
        <main className="pt-6 lg:pt-12 px-4">
            <Skeleton.Animate>
                <div className="flex flex-col gap-8">
                    <Skeleton height="h-20" width="w-96" className="pt-4 self-center" />

                    <div className="flex flex-col gap-4">
                        <Skeleton className="h-24" repeat={4} />
                    </div>
                </div>
            </Skeleton.Animate>
        </main>
    )
}

export default HomeLoading
