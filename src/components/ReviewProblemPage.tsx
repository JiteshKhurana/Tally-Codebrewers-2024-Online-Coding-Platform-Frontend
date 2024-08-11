import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import Cookies from "universal-cookie";
import axios from "axios";
import { toast } from "sonner";

const ReviewProblemPage = () => {
  const { pid } = useParams();
  const [problem, setProblem] = useState();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const navigate = useNavigate();
  const fetchProblem = async () => {
    const response = await axios.get(
      `https://worldwide-coders-production.up.railway.app/problems/get?id=` +
        pid
    );
    const data = response.data;
    setProblem(data);
  };
  const approveProblem = async () => {
    await axios.post(
      `https://worldwide-coders-production.up.railway.app/problems/update/` +
        pid,
      { visibility: true },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    toast("Approved Successfully");
    navigate("/superadmin/reviewproblems");
  };

  useEffect(() => {
    fetchProblem();
  }, []);
  return (
    <div className="flex flex-col justify-center">
      <div className="border border-gray-600">
        {problem && (
          <div className="col-span-8 space-y-2">
            <div className="flex gap-5 p-5 bg-white dark:bg-black shadow-xl rounded-lg">
              <div className="flex flex-col space-y-2 overflow-hidden">
                <h1 className="text-4xl font-semibold">{problem.title}</h1>
                <span className="text-gray-500 font-semibold text-xl">
                  Contributed by - {problem.author_id}
                </span>
              </div>
            </div>

            <div className=" bg-white dark:bg-black shadow-xl rounded-lg p-5 space-y-5">
              <div className="flex flex-col gap-3">
                <h2 className="font-semibold text-xl">
                  All that you need to know about {problem.title}
                </h2>
                <span className="event-description ">
                  {problem.description}
                </span>
              </div>
              {problem.test_cases && (
                <div>
                  {problem.test_cases.map((testcase, i) => (
                    <div key={i} className="flex flex-col my-1">
                      <span className="font-medium text-lg my-2">
                        Sample Testcase {i}
                      </span>
                      <span>Input</span>
                      <span className="">{testcase.input}</span>
                      <span>Output</span>
                      <span className="">{testcase.output}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Button onClick={() => approveProblem()}>Approve</Button>
    </div>
  );
};

export default ReviewProblemPage;
