import { useEffect } from 'react'

function useDocumentEvent<GivenType>(eventType: string | 'keyup', eventHandler: (event: GivenType) => void) {
    useEffect(() => {
        const handleEvent = (event: Event) => {
            eventHandler(event as GivenType)
        }

        document.addEventListener(eventType, handleEvent)

        return () => {
            document.removeEventListener(eventType, handleEvent)
        }
    }, [eventType, eventHandler])
}

export default useDocumentEvent
