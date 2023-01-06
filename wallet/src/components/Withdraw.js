
import React, { useState, useEffect } from 'react'
import { loadContract } from "../utils/load-contracts";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';

export default function Withdraw() {
    const [web3Api, setWeb3Api] = useState({
        web3: null,
        contract: null
    })
    const [amount, setAmount] = useState(0
    );

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

    const handleChange = (evt) => {
        setAmount(
            evt.target.value
        );

    }

    const handleSubmit = (evt) => {
        console.log("submittting");
        evt.preventDefault();
        setAmount(evt.target.value);
        withdrawFund();
    }

    const withdrawFund = async () => {
        const { web3, contract } = web3Api;
        const wallet = new web3.eth.Contract(contract.abi, contract.address);
        const account = await web3.eth.getAccounts();
        const withdrawAmount = web3.utils.toWei(amount.toString(), "ether");
        await wallet.methods.withdraw(withdrawAmount).send({
            from: account[0],
        });

    };
    return (
        <div className="container d-flex">
            <div className="card bg-info" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title m-3 text-center text-bg-dark">WITHDRAW</h5>
                    <form>
                        <div className="m-3">
                            <label htmlFor="amount" className="form-label">Enter Amount </label>
                            <input type="number" className=" form-control" id="amount" name="amount" value={amount.value} onChange={handleChange} />
                        </div>
                        <a href="/" className="btn btn-danger m-3">Cancel</a>
                        <button type="button" className="btn btn-success m-3" onClick={handleSubmit} >Withdraw</button>
                    </form>

                </div>
            </div>
        </div >
    )
}

