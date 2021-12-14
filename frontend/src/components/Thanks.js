import React, { useState, useEffect } from 'react'
import useContract from '../hooks/useContract'
import ThankedListItem from "./ThankedListItem"
import "./Thanks.css"

function Thanks() {
    const { signer, contract } = useContract();
    const [giftThanked, setGiftThanked] = useState([])


    useEffect(() => {
        const loadGift = async () => {
            

            // creates arrays that well fill in later
            const giftsThanked = []

            try {
                
            
                // get address of user
                const address = await signer.getAddress()
                const amountSent = await contract.addressToAmountSent(address)

                // for each gift:

                for (let i = 0; i < amountSent; i++) {
                    const sentGift = await contract.addressToIdSent(address, i)
                    const gift = await contract.giftIdtoGift(sentGift)
                    gift.isThanked && giftsThanked.push(gift)


        
                }
                setGiftThanked(giftsThanked)
            
            }
            catch (error) {
                console.error(error)
                
            }
        }

    
        loadGift()

    }, [])
    return (
        <div className="thanks-box">

            {giftThanked.map(function (gift, index) {
                return (<ThankedListItem
                    gift={gift}
                    key={index}
                >
                </ThankedListItem>) 
            
                
            })}


        </div>
    )
}

export default Thanks
