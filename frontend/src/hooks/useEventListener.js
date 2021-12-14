import {useEffect, useState} from 'react'

const useEventListener = (handler) => {
    const [connectedAddress, setAddress] = useState("")

    useEffect(() => {
        window.ethereum.on('accountsChanged', handler)
    
    
    
        return () => {
            window.ethereum.removeListener('accountsChanged', handler)
        }
    
    },[])

    

    return { connectedAddress }
}

export default useEventListener

