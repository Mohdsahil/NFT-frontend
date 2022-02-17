import React, { useState, useEffect } from 'react'
import axios from "axios";
const { REACT_APP_API, REACT_APP_PUBLIC_KEY } = process.env

const CreateNft = (props) => {
  let { account, actionCancel, web3 } = props
  const [nftForm, setNftForm] = useState({
      name: "",
      description: "",
      account: "",
      myImage: ""
  })
  const [gas, setGas] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(account) {
        setNftForm({
            ...nftForm,
            account: account
        })
    }
  }, [account])

  const inputChangeHandler = (e) => {
    setNftForm({
        ...nftForm,
        [e.target.name]: e.target.value
    })
  }

  const fileChangeHandler = (e) => {
      setNftForm({
        ...nftForm,
        [e.target.name]: e.target.files[0]
      })
  }

  const actionSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append("name", nftForm.name)
    formData.append("description", nftForm.description)
    formData.append("account", account)
    formData.append("myImage", nftForm.myImage)
    setLoading(true)
    try {
        const response = await axios.post(`${REACT_APP_API}/v1/create-nft-request`, formData)
        
        setGas(response.data.data)
        web3.eth.sendTransaction({ from: account, to: REACT_APP_PUBLIC_KEY, value: response.data.data  })
            .then(async (response) => {
                
                console.log("response: ", response)
                 await axios.post(`${REACT_APP_API}/v1/create-nft`, formData)
                 setLoading(false)
                 actionCancel()
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
        // const response = await axios.post(`${REACT_APP_API}/v1/create-nft`, formData)
       
        // actionCancel()
    } catch (error) {
        setLoading(false)
        console.log(error)
    }

  }

  return (
    <div className='nft-form'>
        {loading && "Uploading......."}
        <form onSubmit={actionSubmit}>
            <div className="form-item">
                <label>Name: </label>
                <input 
                    type="text"
                    name="name" 
                    vlaue={nftForm.name} 
                    onChange={inputChangeHandler} 
                />
            </div>
            <div className="form-item">
                <label>description: </label>
                <input 
                    type="text"
                    name="description" 
                    vlaue={nftForm.description} 
                    onChange={inputChangeHandler} 
                />
            </div>
            <div className="form-item">
                <label>description: </label>
                <input 
                    type="file"
                    name="myImage" 
                    vlaue={nftForm.myImage} 
                    onChange={fileChangeHandler} 
                />
            </div>
            <div className='form-item'>
                <button>
                    Create Nft                    
                </button>
            </div>
        </form>
        <button onClick={actionCancel}>
            Cancel
        </button>
    </div>
  )
}

export default CreateNft