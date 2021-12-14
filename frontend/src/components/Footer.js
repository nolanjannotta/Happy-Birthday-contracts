import React, {useEffect, useState} from 'react'
import "./Footer.css"
import useContract from "../hooks/useContract"

function Footer() {

    const { contract } = useContract()
    const [owner, setOwner] = useState("")
    useEffect(() => {
        const getOwner = async () => {
            const owner = await contract.owner()
            console.log(owner)
            setOwner(owner)
        }
        try {
          getOwner()  
        }
        catch (e) {
            console.error(e)
        }
        
    },[])
    return (
        <div className="owner-address">
            owner/creater: {owner}
        </div>
    )
}

export default Footer
