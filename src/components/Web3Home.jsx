import React, { useState, useEffect } from 'react';
import { loadWeb3, loadBlockchainData, getContract, getStartFee, payStartFee, getUserAccount } from '../utils/web3Client'; // Adjust the import path as necessary

const Web3Home = () => {
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [startFee, setStartFee] = useState(0);
    const [error, setError] = useState('');
    const [hasStarted, setHasStarted] = useState(false); // Track if user has clicked "Get Started"

    useEffect(() => {
        const initBlockchain = async () => {
            try {
                await loadWeb3();
                await loadBlockchainData();
                const userAccount = await getUserAccount();
                const contractInstance = getContract();

                if (!contractInstance) {
                    throw new Error('Failed to load contract instance.');
                }

                setAccount(userAccount);
                setContract(contractInstance);

                const fee = await getStartFee();
                setStartFee(fee);
            } catch (error) {
                console.error('Error loading blockchain data:', error);
                setError('Failed to load blockchain data.');
            } finally {
                setIsLoading(false);
            }
        };

        initBlockchain();
    }, []);

    const handleGetStarted = async () => {
        try {
            await payStartFee(startFee);
            alert("You'll soon be redirected to the community");
            setHasStarted(true); // Update the state to indicate the user has started
        } catch (error) {
            setError('Error paying start fee: ' + error.message);
        }
    };

    // Display loading message while initializing
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-black">
                <div className="text-xl text-white">Loading blockchain data...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-black bg-opacity-80 p-8 rounded-xl shadow-2xl max-w-lg w-full mx-4 text-center transform transition-all duration-500 hover:scale-105">
                <h2 className="text-4xl text-gold mb-4 font-bold">DAO for Good</h2>
                <p className="text-lg text-white mb-2">Account: <span className="font-semibold">{account}</span></p>
                <p className="text-lg text-white mb-4">Start Fee: <span className="font-semibold text-green-400">{startFee.toString()} ETH</span></p>
                {contract ? (
                    <p className="text-lg text-green-400 mb-4">Contract is loaded!</p>
                ) : (
                    <p className="text-lg text-red-400 mb-4">Failed to load contract.</p>
                )}
                
                {!hasStarted ? (
                    <button
                        onClick={handleGetStarted}
                        className="mt-4 w-full bg-gold hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition duration-300 shadow-md"
                    >
                        Get Started
                    </button>
                ) : (
                    <button
                        onClick={() => window.location.href='/navigation'} // Redirect to dashboard
                        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md"
                    >
                        Go to Dashboard
                    </button>
                )}

                {error && <p className="mt-4 text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default Web3Home;
