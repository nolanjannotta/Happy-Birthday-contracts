import React, {useState} from 'react'
import EthGift from "./EthGift"
import ERC20Gift from "./ERC20Gift"
import ERC721Gift from "./ERC721Gift"
import Thanks from "./Thanks"
import "./Gift.css"


function Gift(props) {



    const [content, setContent] = useState(<EthGift></EthGift>)
    return (
        <div className="gift-input-container">
          <Thanks>

            </Thanks>

            
            <div className="gift-buttons">
                
            <button className="asset-button" onClick={() => { setContent(<EthGift></EthGift>) }}>Eth</button>
            <button className="asset-button" onClick={() => { setContent(<ERC20Gift></ERC20Gift>) }}>ERC20</button>
            <button className="asset-button" onClick={() => { setContent(<ERC721Gift></ERC721Gift>) }}>ERC721</button>
        </div>
        
        <div>
          {content}      
        </div>

        </div>
    )
}

export default Gift
