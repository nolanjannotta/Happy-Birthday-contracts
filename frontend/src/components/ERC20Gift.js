import React, { useState, useEffect } from 'react'
import useContract from '../hooks/useContract'
import {ethers} from "ethers"

function ERC20Gift() {

    const [gift, setGift] = useState({})
    const [fee, setFee] = useState(0)
    const { contract, daiContract, signer } = useContract();

    useEffect(() => {
        const getFee = async() => {
            const _fee = await contract.fee()
            setFee(_fee)
        }

        getFee()

    },[])


    const approveERC20 = async() => {
        await daiContract.connect(signer).approve(contract.address, ethers.utils.parseEther(gift.amount))
    }

    const submitTransaction = async() => {
        await contract.connect(signer).giftErc20(gift.tokenAddress, ethers.utils.parseEther(gift.amount), gift.recipient, {value: fee})
    }

    return (
        <div className="gift-input">
            <h2>Gift ERC20</h2>
            <input
                className="gift-form"
                placeholder="token address"
                onChange={(e) => {setGift({
                    ...gift,
                    tokenAddress: e.target.value

                })}}
            >
            </input>
            <br/>
            <input
                className="gift-form"
                placeholder="recipient"
                onChange={(e) => {setGift({
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
                onChange={(e) => {setGift({
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
            <button className="send-button" onClick={approveERC20}>approve</button>
            <button className="send-button" onClick={submitTransaction}>Send Gift!</button>
            
            
        </div>
    )
}

export default ERC20Gift
