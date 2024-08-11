import { useState } from "react";
import { executeAPI } from "../api";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const ProblemEditor = ({ editorRef, language, problem }) => {
  const [output, setOutput] = useState(null);
  const [input, setInput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setisLoading(true);
      const sampleTestCases = problem?.test_cases || [];
      const results = await Promise.all(
        sampleTestCases.map(async (testcase) => {
          const { run } = await executeAPI(
            language,
            sourceCode,
            testcase.input
          );
          return {
            input: testcase.input,
            output: run.output.split("\n"),
            expected: testcase.output,
            isCorrect: run.output.trim() === testcase.output.trim(),
          };
        })
      );
      setOutput(results);
      setIsError(results.some((res) => res.output.includes("stderr")));
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="grid my-2 mx-5">
        <Label htmlFor="message" className="text-xl my-2">
          Your Input
        </Label>
        <Textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Add your inputs here"
          id="message"
        />
      </div>
      <div className="my-2 mx-5">
        <div className="flex flex-row justify-between my-2">
          <h1 className="text-xl">Output</h1>
          <Button onClick={runCode}>
            {isLoading ? "Compiling" : "Run Code"}
          </Button>
        </div>
        <div
          className={`flex flex-col ${
            isError ? "text-red-500" : "text-gray-300"
          }`}
        >
          {output ? (
            output.map((result, i) => (
              <div key={i} className="my-2">
                <p>Input: {result.input}</p>
                <p>Output: {result.output.join("\n")}</p>
                <p>Expected: {result.expected}</p>
                <p>{result.isCorrect ? "Correct" : "Wrong"}</p>
              </div>
            ))
          ) : (
            <p>Click Run Code to see the Output here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemEditor;
