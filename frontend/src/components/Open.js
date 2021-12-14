import React, {useEffect, useState} from 'react'
import useContract from '../hooks/useContract'
import GiftInfoCard from './GiftInfoCard'
import "./Open.css"

function Open() {

    const { contract, signer, provider, daiContract } = useContract()
    const [giftToOpen, setGiftToOpen] = useState([])
    const [giftToThank, setGiftToThank] = useState([])
    const [giftList, setGiftList] = useState([])
    const [notOpen, setNotOpen] = useState(0)
    const [totalGift, setTotalGift] = useState(0)

    useEffect(() => {
        const loadGift = async () => {
            // creates arrays that well fill in later
            const giftToOpenArr = []
            const giftToThankArr = []
            const giftList = []

            try {

            

                // get address of user
                const address = await signer.getAddress()

                // gets total amount of gifts received, opened and unopened
                const totalGift = await contract.balanceOf(address)
            

                setTotalGift(totalGift)

                // for each gift:

                for (let i = 0; i < totalGift; i++) {

                    // gets gift ID
                    const id = await contract.tokenOfOwnerByIndex(address, i)


                    // gets gift of that ID
                    const gift = await contract.giftIdtoGift(id)

                    // whether or not gift is opened
                    const isOpen = gift.isOpened

                
                    // puts un opened gift in the beginning of array
                    !isOpen && giftList.unshift(gift)

                    // puts opened gift in the end of array
                    isOpen && giftList.push(gift)


                    // whether or not receiver has thanked sender
                    const isThanked = gift.isThanked

                    // populates arrays we created earlier
                    !isOpen && giftToOpenArr.push(id.toNumber())
                    !isThanked && giftToThankArr.push(id.toNumber())
                
                
                    // GET URIS HERE?? for listing available gifts to open
                    // setGiftId(giftIdArr)

        
                }
                setGiftToOpen(giftToOpenArr)
                setGiftToThank(giftToThankArr)
                setNotOpen(giftToOpenArr.length)
                setGiftList(giftList)
            }
            catch (error) {
                console.error(error)
            }

        }

    
        loadGift()

    }, [])

    const openGift = async (id) => {
        console.log(id)

        await contract.connect(signer).open(id)
        // loadGiftData(id)
        // console.log(giftData.sender, "sent you", giftData.amount, giftData.giftType)
        
    }
    const sayThanks = async (id) => {
        await contract.connect(signer).sayThanks(id)

    }

    
    return (
        <div>
            <div className="main-box">
                
                <h2>Open</h2>

                {notOpen === 0 ? "You have no new gifts :(" : "you have received " + (notOpen.toString()) + " new gift(s) that are un opened!!"}

                <div className="gift-container">

                    {giftList.map(function (gift, index) {
                        return <GiftInfoCard
                            gift={gift}
                            open={openGift}
                            thanks={sayThanks}
                            key={index}
                        ></GiftInfoCard>
                    })}


             
                </div>
                
            </div>
            


            
        </div>
    )
}

export default Open
