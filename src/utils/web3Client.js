// yourWeb3File.js
import Web3 from 'web3';
import ABI from '../contracts/ABI.json';

let web3;
let contract;
let userAccount = '';

export const loadWeb3 = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } else {
        alert('Please install MetaMask!');
    }
};

export const loadBlockchainData = async () => {
    const networkId = await web3.eth.net.getId();
    let networkIdNum = Number(networkId);

    contract = new web3.eth.Contract(ABI, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    
    const accounts = await web3.eth.requestAccounts();

        

        // Set userAccount to the first account
        userAccount = accounts[1];
};



export const getUserAccount = () => userAccount;

export const getStartFee = async () => {
    try {
        if (!contract) throw new Error('Contract is not loaded.');
        return await contract.methods.startFee().call({ from: userAccount });
    } catch (error) {
        console.error('Error fetching start fee:', error);
    }
};

export const getProjectCount = async () => {
    try {
        if (!contract) throw new Error('Contract is not loaded.');
        return await contract.methods.projectCount().call({ from: userAccount });
    } catch (error) {
        console.error('Error fetching project count:', error);
    }
};

export const payStartFee = async (amount) => {
    try {
        if (!contract) throw new Error('Contract is not loaded.');
        return await contract.methods.getStarted().send({ from: userAccount, value: amount });
    } catch (error) {
        console.error('Error paying start fee:', error);
    }
};

export const createProject = async (description, fundingGoal, duration, taskDescriptions) => {
    try {
        if (!contract) throw new Error('Contract is not loaded.');
        await contract.methods.createProject(description, fundingGoal, duration, taskDescriptions).send({ from: userAccount });
    } catch (error) {
        console.error('Error creating project:', error);
    }
};

export const vote = async (projectId, inFavour) => {
    try {
        if (!contract) throw new Error('Contract is not loaded.');
        await contract.methods.vote(projectId, inFavour).send({ from: userAccount });
    } catch (error) {
        console.error('Error voting on project:', error);
    }
};

export const getTotalStartFeeBalance = async () => {
    try {
        if (!contract) throw new Error('Contract is not loaded.');
        return await contract.methods.totalStartFeeBalance().call();
    } catch (error) {
        console.error('Error fetching total start fee balance:', error);
    }
};

export const getAllFundAllocation = async () => {
    try {
        if (!contract) throw new Error('Contract is not loaded.');
        return await contract.methods.getAllFundAllocations().call();
    } catch (error) {
        console.error('Error fetching fund allocations:', error);
    }
};

export const getContract = () => contract;
