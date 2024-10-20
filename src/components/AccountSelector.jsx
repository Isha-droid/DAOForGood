// AccountSelector.js
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

let web3;

const AccountSelector = ({ setUserAccount }) => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState('');

    const loadWeb3 = async () => {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
        } else {
            alert('Please install MetaMask!');
        }
    };

    const loadAccounts = async () => {
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
        if (accounts.length > 0) {
            setSelectedAccount(accounts[0]);
            setUserAccount(accounts[0]); // Set the initial account
        }
    };

    useEffect(() => {
        loadWeb3();
        loadAccounts();

        // Listen for account changes
        window.ethereum.on('accountsChanged', (accounts) => {
            setAccounts(accounts);
            if (accounts.length > 0) {
                setSelectedAccount(accounts[0]);
                setUserAccount(accounts[0]); // Update user account
            } else {
                setUserAccount(null); // Clear account if none available
            }
        });
    }, []);

    const handleAccountChange = (e) => {
        const selected = e.target.value;
        setSelectedAccount(selected);
        setUserAccount(selected); // Update the selected account
    };

    return (
        <div>
            <h3>Select Account:</h3>
            <select value={selectedAccount} onChange={handleAccountChange} className="bg-white p-2 rounded border">
                {accounts.map((account, index) => (
                    <option key={index} value={account}>
                        {account}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default AccountSelector;
