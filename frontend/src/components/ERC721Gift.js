import React, { useState, useEffect } from 'react'
import useContract from '../hooks/useContract';
import "./Gift.css"

function ERC721Gift() {

    const [gift, setGift] = useState({})
    const [fee, setFee] = useState(0)

    const { contract, signer } = useContract();

    useEffect(() => {
        const getFee = async() => {
            const _fee = await contract.fee()
            setFee(_fee)
        }

        getFee()

    },[])

    const submitTransaction = async() => {
        await contract.connect(signer).giftErc721(gift.tokenAddress, gift.recipient, gift.tokenId, {value: fee})
    }
    return (
        <div className="gift-input">
            <h2>Gift ERC721</h2>
            <input
                className="gift-form"
                placeholder="token address"
                onChange={(e) => {setGift({
                    tokenAddress: e.target.value

                })}}
            >
            </input>
            <br/>
         
            <input
                className="gift-form"
                placeholder="recipient"
                onChange={(e) => {setGift({
                    recipient: e.target.value

                })}}
            >
            </input>
            <br/>
         
            <input
                className="gift-form"
                placeholder="tokenId"
                type="number"
                onChange={(e) => {setGift({
                    tokenId: e.target.value

                })}}
            >
            </input>
            <br/>
            <input
                className="gift-form"
                placeholder="note -- finish later"
                type="number"
                // onChange={(e) => {
                //     setGift({
                //     ...gift,
                //     amount: e.target.value

                // })}}
            >
            </input>
            <br/>
     
            <button className="send-button" onClick={submitTransaction}>Send Gift!</button>
            
        </div>
    )
}

export default ERC721Gift
