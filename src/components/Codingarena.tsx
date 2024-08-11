import { useEffect, useState } from "react";
import CardShimmer from "./CardShimmer";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useNavigate } from "react-router-dom";

const Codingarena = () => {
  const [problems, setProblems] = useState<null | any[]>(null);

  const fetchProblems = async () => {
    const response = await fetch(
      "https://worldwide-coders-production.up.railway.app/problems/get"
    );
    const data = await response.json();
    setProblems(data);
  };
  useEffect(() => {
    fetchProblems();
  }, []);
  const navigate = useNavigate();
  if (!problems) return <CardShimmer />;
  return (
    <div>
      <div className=" flex flex-col items-center justify-start bg-[url('https://res.cloudinary.com/dvmteldw0/image/upload/v1722359227/g73yppeecnbrxpdbhc6q.svg')] bg-no-repeat bg-cover">
        <h1 className="my-10 text-4xl font-semibold text-center ">
          Coding Arena
        </h1>
        <div className="flex flex-wrap gap-5 sm:gap-10 justify-center max-w-[1900px]">
          {problems.map((problem) => (
            <Card
              key={problem.pid}
              className="w-[93vw] sm:w-[400px] bg-[url('https://res.cloudinary.com/dvmteldw0/image/upload/v1722359230/iijlpvxuxvaxetfsr9fu.jpg')] bg-no-repeat bg-cover shadow-2xl overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <div className="bg-black bg-opacity-30 text-center">
                <CardHeader>
                  <CardTitle>
                    <p>
                      {problem.description ? problem.title : "No description"}
                    </p>
                    <p className="text-base text-gray-400">
                      {problem.author_id}
                    </p>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mt-5">
                    <p className=" text-white text-lg font-semibold">
                      Problem {problem.pid}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => navigate("problems/" + problem.pid)}
                    className="w-full py-5 text-sm transition-all bg-opacity-70"
                    variant={"outline"}
                  >
                    Solve
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Codingarena;
