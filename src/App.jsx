// src/components/App.js
import React, { useEffect, useState } from 'react';
import { loadWeb3, loadBlockchainData, getUserAccount, getContract, getStartFee } from './utils/web3Client';
import CreateProject from './components/CreateProject';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import FundAllocations from './components/AllocateFunds';
import Dashboard from './components/Dashboard';
import Web3Home from './components/Web3Home';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import RewardsPenalty from './components/RewardsPenalty';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import Instructions from './components/Instructions';

const App = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [startFee, setStartFee] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const initBlockchain = async () => {
            try {
                // Load web3 and connect to MetaMask
                await loadWeb3();
                await loadBlockchainData();

                // Get user account and contract instance
                const userAccount = await getUserAccount();
                const contractInstance = getContract();

                setAccount(userAccount);
                setContract(contractInstance);

                // Fetch the start fee from the contract
                const fee = await getStartFee();
                setStartFee(fee);

                setIsLoading(false);
            } catch (error) {
                console.error('Error loading blockchain data:', error);
                setError('Failed to load blockchain data.');
                setIsLoading(false);
            }
        };

        initBlockchain();
    }, []);

    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            minHeight: "100vh", // Ensure the container takes full height of the viewport
            backgroundImage: "url('../bgImage.jpeg')", // Make sure this path is correct
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed", // Keep background fixed during scroll
            padding: "20px",
            boxSizing: "border-box", // Include padding in width/height calculations
        },
    };

    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/web3-home" element={<Web3Home contract={contract} />} />

                    <Route path="/dashboard" element={<Dashboard contract={contract} />} />
                    <Route path="/allocate-funds" element={<FundAllocations contract={contract} />} />
                    <Route path="/create-project" element={<CreateProject contract={contract} />} />
                    <Route path="/view-projects" element={<Projects contract={contract} />} />
                    <Route path="/manage-projects" element={<Tasks contract={contract} />} />
                    <Route path="/navigation" element={<Navigation contract={contract} />} />
                    <Route path="/reward-penalty" element={<RewardsPenalty contract={contract} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/instructions" element={<Instructions/>} />

                </Routes>
        </Router>
    );
};

export default App;
