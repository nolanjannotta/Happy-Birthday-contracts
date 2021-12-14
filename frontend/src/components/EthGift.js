import React, { useState, useEffect } from 'react'
import useContract from '../hooks/useContract';
import { ethers } from "ethers"
import "./Gift.css"

function EthGift() {

    const [gift, setGift] = useState({})
    const [fee, setFee] = useState(0)
    const { contract, signer } = useContract();
    
    useEffect(() => {
        const fee = async () => {
            const _fee = await contract.fee()
            setFee(_fee)
        }

        fee()
            

    },[])

    const submitTransaction = async () => {
        const price = ethers.utils.parseEther(gift.amount)
        // const fee = await contract.fee();
        await contract.connect(signer).giftEth(gift.recipient, ethers.utils.parseEther(gift.amount), { value: (ethers.utils.parseEther(gift.amount).add(fee))})

    }
    return (
        <div className="gift-input">

            <h2>Gift Eth</h2>

            <input
                className="gift-form"
                placeholder="recipient"
                onChange={(e) => {
                    setGift({
                    ...gift,
                    recipient: e.target.value

                })}}
            >
            </input>
            <br/>
      
            <input
                className="gift-form"
                placeholder="amount"
                type="number"
                onChange={(e) => {
                    setGift({
                    ...gift,
                    amount: e.target.value

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

export default EthGift
