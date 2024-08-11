import React from "react";

interface Contest {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
}

const contests: Contest[] = [
  { id: 1, name: "Contest 1", startTime: "10:00 AM", endTime: "12:00 PM" },
  { id: 2, name: "Contest 2", startTime: "1:00 PM", endTime: "3:00 PM" },
];

const ContestList: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ongoing Contests</h2>
      <ul>
        {contests.map((contest) => (
          <li key={contest.id} className="mb-2">
            <div className="p-4 border border-gray-200 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{contest.name}</h3>
              <p>Starts: {contest.startTime}</p>
              <p>Ends: {contest.endTime}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContestList;
