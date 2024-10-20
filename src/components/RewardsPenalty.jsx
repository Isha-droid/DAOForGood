import React from 'react';

const RewardsPenalty = () => {
    const tasks = [
        { id: 1, description: 'Successfully funded a community garden project', amount: 100, type: 'reward' },
        { id: 2, description: 'Proposed a project that did not meet community needs', amount: -50, type: 'penalty' },
        { id: 3, description: 'Conducted a successful voting campaign', amount: 150, type: 'reward' },
        { id: 4, description: 'Failed to report project progress on time', amount: -30, type: 'penalty' },
    ];

    const totalEarnings = tasks
        .filter(task => task.type === 'reward')
        .reduce((acc, task) => acc + task.amount, 0);

    const totalPenalties = tasks
        .filter(task => task.type === 'penalty')
        .reduce((acc, task) => acc + Math.abs(task.amount), 0);

    const netAmount = totalEarnings - totalPenalties;

    return (
        <div className="rewards-penalty-container bg-black bg-opacity-70 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Rewards & Penalties</h1>
            
            {/* Profit/Loss Indicator */}
            <div className={`text-center p-4 rounded-md mb-6 ${netAmount >= 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                <h2 className="text-lg font-semibold">
                    {netAmount >= 0 ? 'You are in Profit!' : 'You are in Loss!'}
                </h2>
                <p className="text-2xl font-bold">
                    {netAmount >= 0 ? `+${netAmount}` : netAmount}
                </p>
            </div>

            <div className="tasks-list space-y-4">
                {tasks.map(task => (
                    <div
                        key={task.id}
                        className={`p-4 rounded-md transition-transform transform hover:scale-105 flex justify-between items-center ${
                            task.type === 'reward' ? 'bg-gray-700' : 'bg-gray-600'
                        }`}
                    >
                        <p className={`text-lg ${task.type === 'reward' ? 'text-green-300' : 'text-red-300'}`}>
                            {task.description}
                        </p>
                        <span className={`font-bold ${task.type === 'reward' ? 'text-green-400' : 'text-red-400'}`}>
                            {task.amount > 0 ? `+${task.amount}` : task.amount}
                        </span>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default RewardsPenalty;
