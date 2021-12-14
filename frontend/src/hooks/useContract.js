import { useState, useEffect } from "react"
import { ethers } from "ethers";
import DaiABI from "../abi/DaiABI.json"
import ERC20ABI from "../abi/ERC20ABI.json"

import HappyBirthday from "../abi/HappyBirthday.json"
import Gifties from "../abi/Gifties.json"

const contractAddress = "0x4b6aB5F819A515382B0dEB6935D793817bB4af28";
const daiContractAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()
const daiContract = new ethers.Contract(daiContractAddress, ERC20ABI, provider)
const contract = new ethers.Contract(contractAddress, Gifties.abi, provider)

console.log(provider)


const useContract = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    

    // useEffect( () => {
    //     const fetchData = async () => {
            
            
    //     }

    //     fetchData()

        


    // }, [])

    
    
    return {daiContract, contract, loading, setLoading, data, setData, provider, signer}
}

export default useContract