import ContestList from "./contest/Contests";
import CreateContest from "./contest/CreateContest";

const Codingbattleground = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Coding Battleground</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContestList />
      </div>
      <CreateContest />
    </div>
  );
};

export default Codingbattleground;
