import React, {useEffect, useState} from 'react'
import "./GiftInfoCard.css"
import useERC20 from "../hooks/useERC20"

function GiftInfoCard(props) {
    const [giftValue, setGiftValue] = useState(0)
    const [name, setName] = useState("")


    const ERC20Name = async () => {
        const { ERC20Contract } = useERC20(props.gift.asset)
        const name = await ERC20Contract.symbol()
        setName(name)
    }
    const ERC721Name = async () => {
        const { ERC20Contract } = useERC20(props.gift.asset)
        const name = await ERC20Contract.symbol()
        setName(name)
    }

    props.gift.giftType === 1 && ERC20Name()
    
    

    const giftTypes = {
        0: "Eth",
        1: "ERC20",
        2: "ERC721"
    }

    const { ERC20Contract } = useERC20(props.gift.asset)

    // console.log(props.gift.amount.toString())


    

    const giftId = props.gift.tokenId.toNumber()
    
    
    

    // console.log(props.gift)
    return (
        <div className="box">

            <br/>
            {(props.gift.sender).substring(0, 6)} sent you a gift!
            <br/>
            <br/>
            
            {props.gift.isOpened === true && (
                <div>
                {(props.gift.amount / 1e18).toString()}
                {props.gift.symbol} !!
                </div>)}

            <div className="button-box">
            {props.gift.isOpened === false && (
                <button
                    className="button"
                    onClick={() => { props.open(giftId) }}>open
                </button>)}
            <br/>
            {props.gift.isThanked === false && (
                <button
                    className="button"
                    onClick={() => { props.thanks(giftId) }}>say thanks
                </button>)}
            </div>
        

            

            
        </div>
    )
}

export default GiftInfoCard
