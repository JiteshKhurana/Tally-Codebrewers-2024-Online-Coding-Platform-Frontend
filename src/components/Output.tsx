import { useState } from "react";
import { executeAPI } from "../api";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [input, setInput] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setisLoading(true);
      const { run } = await executeAPI(language, sourceCode, input);
      setOutput(run.output.split("\n"));
      setIsError(run.stderr ? true : false);
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
          className={`flex flex-row justify-between ${
            isError ? "text-red-500" : "text-gray-300"
          }`}
        >
          <h2>
            {output
              ? output.map((line, i) => <p key={i}>{line}</p>)
              : "Click Run Code to see the Output here"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Output;
