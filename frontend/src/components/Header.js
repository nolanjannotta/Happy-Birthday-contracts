import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import useContract from "../hooks/useContract"
import useEventListener from "../hooks/useEventListener"
import "./Header.css"


function Header() {
    const { signer } = useContract()
    const [address, setAddress] = useState("")
    

    
    

    const truncate = (string) => {
        try {
            return string.substring(0,6) + "..." + string.substring(string.length - 4, string.length)
  
        }
        catch (error) {
            console.log("yoooooo")
        }
    }

    const connect = () => {

        window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    const getAddress = async () => {
            try {
             const address = await signer.getAddress()
            setAddress(address)   
            } catch (error) {
                console.error(error)
                setAddress(null)
                throw 'myException';
            }
            
    }

    useEventListener(getAddress)
    
    useEffect(() => {
        getAddress()
        
    }, [])
    return (
        <div>
            <div className="container">
                <div className="header-buttons">                    
                    {window.location.pathname === "/open" && (<Link className="page-toggle" to="/gift">switch to gift page </Link>)}
                    {window.location.pathname === "/about" && (<Link className="page-toggle" to="/gift">switch to gift page </Link>)}
                    {window.location.pathname === "/gift" && (<Link className="page-toggle" to="/open">switch to open page </Link>)}
                </div>
                <div>
                    <Link
                        to="/about"
                        className="info-button">
                      how does this work?  
                    </Link>
                    
                </div>
                <h1>
                   Gifties  
                </h1>

                <div className="address-section">

                    {address && truncate(address)}
                    {!address && (<button onClick={() => { connect() }}>connect</button>)}
                </div>
                

                

                

            </div>

            

            
            
        </div>
    )
}

export default withRouter(Header)
// export default Header
