import { useState, useEffect } from "react"
import { ethers } from "ethers";
import ERC20ABI from "../abi/ERC20ABI.json"

import HappyBirthday from "../abi/HappyBirthday.json"
import Gifties from "../abi/Gifties.json"

const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()


const useContract = (tokenAddress) => {

    const ERC20Contract = new ethers.Contract(tokenAddress, ERC20ABI, provider)

    
    return {ERC20Contract, provider, signer}
}

export default useContract