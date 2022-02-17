import React, { useState, useEffect } from 'react'
import axios from "axios";
const { REACT_APP_API } = process.env

export const NFT = (props) => {
  let { account } = props  
  const [nfts, setNfts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (account) {
        setLoading(true)
        fetchNfts()
    }
  }, [account])

  const fetchNfts = async () => {
    try {
        const response = await axios.get(`${REACT_APP_API}/v1/nft/${account}`)
        setLoading(false)
        setNfts(response.data.data)
    } catch(error) {
        setLoading(false)
        console.log(error)
    }
  }

  return (
      <div>
        <h3>Your Nft list</h3>
        {loading  && "Loading......."}
        <div className='nft-list'>
            {nfts.length > 0
            ? nfts.map((nft, key) => {
            return (
            <div className='nft-item' key={key}>
                <img src={nft.nftLink} style={{ width: "200px" }} />
            </div>
            )
            })
            : 
            <h3>You don't have any nft yet</h3>
            }
        </div>
    </div>
  )
}

export default NFT