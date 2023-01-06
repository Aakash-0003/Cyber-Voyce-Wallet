
import React, { useState, useEffect } from 'react'
import { loadContract } from "../utils/load-contracts";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';


export default function Send() {
    const [web3Api, setWeb3Api] = useState({
        web3: null,
        contract: null
    })
    const [data, setData] = useState({
        address: null,
        amount: 0
    });
    useEffect(() => {

        const loadProvider = async () => {
            const provider = await detectEthereumProvider();
            const contract = await loadContract("Wallet", provider);

            setWeb3Api({
                web3: new Web3(provider),
                contract
            });


        }
        loadProvider();
    }, []);



    /*     const handleChange = (evt) => {
            setData({
                [evt.target.name]: evt.target.value
            });
    
        } */
    function handleChange(evt) {
        const value = evt.target.value;
        setData({
            ...data,
            [evt.target.name]: value
        });
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setData({
            [evt.target.name]: evt.target.value
        });
        sendFund();
    }

    const sendFund = async () => {
        const { web3, contract } = web3Api;
        const { amount, address } = data;
        const wallet = new web3.eth.Contract(contract.abi, contract.address);
        const account = await web3.eth.getAccounts();
        const sendAmount = web3.utils.toWei(amount.toString(), "ether");
        console.log("amount", sendAmount, data.address);
        await wallet.methods.transferTo(address, sendAmount).send({
            from: account[0],
        });
    };

    return (
        <div className="container  d-flex">
            <div className="card bg-info align-content-center  " style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title text-center text-bg-dark m-3">SEND</h5>
                    <form>
                        <div className="m-3">
                            <label htmlFor="address" className="form-label" >Account address</label>
                            <input type="text" className=" form-control" id="address" name="address" value={data.address} onChange={handleChange} />
                        </div>
                        <div className="m-3">
                            <label htmlFor="amount" className="form-label">Enter Amount </label>
                            <input type="number" className=" form-control" id="amount" name="amount" value={data.amount} onChange={handleChange} />
                        </div>
                    </form>
                    <a href="/" className="btn btn-danger m-3">Cancel</a>
                    <button type="button" className="btn btn-success m-3" onClick={handleSubmit}>Send</button>
                </div>
            </div>
        </div>
    )
}

