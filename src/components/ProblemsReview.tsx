import { useEffect, useState } from "react";
import CardShimmer from "./CardShimmer";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Cookies from "universal-cookie";
import axios from "axios";

interface ProblemInterface {
  title: string;
  author_id: string;
  pid: string;
  description: string;
  constraints: string;
  test_cases?: {
    input?: string;
    output?: string;
  }[];
}

const ProblemsReview = () => {
  const [problems, setProblems] = useState<ProblemInterface[]>(null);
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  const fetchProblems = async () => {
    const response = await axios.get(
      import.meta.env.VITE_API_ENDPOINT + "problems/getnotvisible",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = response.data;
    setProblems(data);
  };
  useEffect(() => {
    fetchProblems();
  }, []);
  if (!problems) return <CardShimmer />;
  return (
    <div>
      <div className="my-32 flex flex-col items-center justify-start bg-[url('https://res.cloudinary.com/dvmteldw0/image/upload/v1722359227/g73yppeecnbrxpdbhc6q.svg')] bg-no-repeat bg-cover">
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
                      Problem {problem.pid} in review
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemsReview;
