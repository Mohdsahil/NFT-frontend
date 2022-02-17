import React, { useState, useEffect } from "react";
import axios from "axios";
import NFT from "./NFT"
import CreateNft from "./CreateNft"
import NftContract from "./contracts/NFT.json";
import getWeb3 from "./getWeb3";
import "./App.css";
const { REACT_APP_CONTRACT } = process.env

const App = () => {
  const [web3, setWeb3] = useState(null)
  const [account, setAccount] = useState(null)
  const [network, setNetwork] = useState(null)
  const [contract, setContract] = useState(null)
  const [openNftForm, setNftForm] = useState(false)

  useEffect(() => {
    updateEther()
  }, [])

  const updateEther = async () => {
    const Web3 = await getWeb3()
    const accounts = await Web3.eth.getAccounts()
    const networkId = await Web3.eth.net.getId()
    const instance = new Web3.eth.Contract(
      NftContract.abi,
      REACT_APP_CONTRACT
    )
    setWeb3(Web3)
    setAccount(accounts[0])
    setNetwork(networkId)
    setContract(instance)
  }

  const actionCancel = () => {
    setNftForm(false)
  }

  return (
    <>
    {!web3?
     <div>
       <h2>Loading web3, accounts and contract....</h2>
     </div>:
     <div className="container">
       <div className="heading">
        <h2>Account: {account}</h2>
        <button
          onClick={() => setNftForm(true)}
        >Create New Nft</button>
       </div>
       {openNftForm ?
       <CreateNft 
        web3={web3}
        account={account}
        actionCancel={actionCancel} 
       /> :
       <NFT account={account} />
       }
       
     </div>}
    </>
  )

}

export default App;
