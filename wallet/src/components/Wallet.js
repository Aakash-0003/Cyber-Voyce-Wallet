import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';
import { useEffect, useState } from 'react';
import { loadContract } from "../utils/load-contracts";
import { Link } from "react-router-dom";

export default function Wallet() {
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null
    })
    const [accounts, setAccounts] = useState({
        account: null,
        balance: 0
    });
    const [reload, shouldReload] = useState(false);

    const reloadEffect = () => shouldReload(!reload);
    useEffect(() => {

        const loadProvider = async () => {
            const provider = await detectEthereumProvider();
            const contract = await loadContract("Wallet", provider);
            console.log("contract is here", contract)
            if (provider) {

                console.log('Ethereum successfully detected!')

                // From now on, this should always be true:
                // provider === window.ethereum

                // Access the decentralized web!

                // Legacy providers may only have ethereum.sendAsync
                await provider.request({
                    method: 'eth_requestAccounts'
                });
                setWeb3Api({
                    provider: provider,
                    web3: new Web3(provider),
                    contract
                });

            } else {

                // if the provider is not detected, detectEthereumProvider resolves to null
                console.error('Please install MetaMask!');
            }
        }
        loadProvider();
    }, []);

    useEffect(() => {
        const getAccounts = async () => {
            const { web3, contract } = web3Api
            const accounts = await web3.eth.getAccounts();
            let balance = await contract.getBalance({ from: accounts[0] });
            balance = await web3.utils.fromWei(balance, 'ether');
            setAccounts({ account: accounts[0], balance });
            reloadEffect();
        }
        web3Api.web3 && getAccounts();
    }, [web3Api, reloadEffect])

    /* console.log(web3Api.web3); */
    return (
        <div className="App flex-column">
            <div className="card  text-center text-bg-dark ">
                <div className="card-header d-flex flex-row justify-content-between">
                    <div >CyberVoyce</div>
                    <div >Wallet</div>
                </div>
                <div className="card-body m-5 p-4">
                    <h2 className="card-title">Account</h2>
                    <h5 className="card-text">{accounts ? accounts.account : "Not Connected"}</h5>
                    <h3 className="card-text">Balance </h3>
                    <h5 className="card-text">{accounts.balance} Voyce</h5>

                    <Link to="/deposit" className="btn btn-outline-success p-3 m-4"  >DEPOSIT</Link>
                    <Link to="/send" className="btn btn-outline-primary p-3 m-4 " >SEND</Link>

                    {/* /* /*                     {/* <!-- Button trigger modal --> */}

                    <Link to="/withdraw" className="btn btn-outline-danger p-3 m-4">WITHDRAW</Link>


                </div>
                <div className="card-footer text-muted">
                    CyberVoyce
                </div>
            </div>
        </div>
    )
}
