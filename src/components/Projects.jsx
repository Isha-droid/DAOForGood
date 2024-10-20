import React, { useEffect, useState } from 'react';
import { getUserAccount, vote } from '../utils/web3Client';

const Projects = ({ contract }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [votingStatus, setVotingStatus] = useState(null);
    const [pid, setPid] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectDetails = await contract.methods.getAllProjectsWithVotes().call();
                console.log(projectDetails);
                setProjects(projectDetails);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };

        if (contract) {
            fetchProjects();
        }
    }, [contract]);

    const handleVote = async (projectId, inFavor) => {
        setPid(projectId);
        setVotingStatus(`Voting on project ${projectId}...`);
        try {
            const accounts = await getUserAccount();
            await vote(projectId, inFavor);
            setVotingStatus(`Successfully voted ${inFavor ? 'in favor of' : 'against'} project ${projectId}.`);
        } catch (error) {
            console.error('Error voting:', error);
            setVotingStatus('Failed to cast vote.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-white text-xl animate-pulse">Loading projects...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-10 overflow-y-auto">
            <div className="bg-black bg-opacity-60 p-8 rounded-lg shadow-lg max-w-3xl w-full text-center transform transition-all duration-500 hover:scale-105 border border-white">
                <h1 className="text-3xl font-bold text-gold mb-6">Projects</h1>
                {votingStatus && <p className="text-white text-lg mb-4">{votingStatus}</p>}
                {projects.length > 0 ? (
                    <ul className="space-y-6 max-h-80 overflow-y-auto"> {/* Add max height and overflow */}
                        {projects.map((projectDetails, index) => (
                            <li
                                key={index}
                                className="bg-gray-800 p-6 border border-gold rounded-lg shadow-md transition-transform duration-200 hover:-translate-y-1"
                            >
                                <h2 className="text-2xl font-semibold text-gold mb-2">
                                    Project ID: {pid}
                                </h2>
                                <p className="text-white mb-1">
                                    <span className="font-bold">Description:</span> {projectDetails.project.description}
                                </p>
                                <p className="text-white mb-1">
                                    <span className="font-bold">Funding Goal:</span> {Number(projectDetails.project.fundingGoal)} ETH
                                </p>
                                <p className="text-white mb-1">
                                    <span className="font-bold">Funds Raised:</span> {Number(projectDetails.project.fundsRaised)} ETH
                                </p>
                                <p className="text-white mb-3">
                                    <span className="font-bold">Status:</span> {projectDetails.project.isClosed ? "Closed" : "Open"}
                                </p>
                                <h3 className="text-lg text-gold font-semibold mb-2">Votes:</h3>
                                <ul className="text-white space-y-1">
                                    {projectDetails.votes.map((voteData, voteIndex) => (
                                        <li key={voteIndex}>
                                            Voter: {voteData.voter} - Vote: {voteData.inFavor ? "In Favor" : "Against"}
                                        </li>
                                    ))}
                                </ul>
                                {!projectDetails.project.isClosed && (
                                    <div className="mt-4 space-x-4">
                                        <button
                                            onClick={() => handleVote(projectDetails.project.id, true)}
                                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
                                        >
                                            Vote In Favor
                                        </button>
                                        <button
                                            onClick={() => handleVote(projectDetails.project.id, false)}
                                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
                                        >
                                            Vote Against
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white text-lg">No projects found.</p>
                )}
            </div>
        </div>
    );
};

export default Projects;
