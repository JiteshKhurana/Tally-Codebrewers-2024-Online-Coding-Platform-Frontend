import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "./lib/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ModeToggle } from "./ui/mode-toggle";
import { useParams } from "react-router-dom";
import ProblemEditor from "./ProblemEditor";

const ProblemDescription = () => {
  const editorRef = useRef();
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState("javascript");
  const [problem, setProblem] = useState();
  const languages = Object.entries(LANGUAGE_VERSIONS);
  const { pid } = useParams();

  const fetchProblem = async () => {
    const response = await fetch(
      `https://worldwide-coders-production.up.railway.app/problems/get?id=` +
        pid
    );
    const data = await response.json();
    setProblem(data);
  };

  useEffect(() => {
    fetchProblem();
  }, []);

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div>
      <h1 className="my-2 text-3xl text-center">Coding Arena</h1>
      <div className="flex justify-between my-2 mx-5">
        <Select
          value={language}
          onValueChange={(language: string) => {
            setLanguage(language);
            setValue(CODE_SNIPPETS[language]);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {languages.map(([language, version]) => (
                <SelectItem value={language} key={language}>
                  {language} {version}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ModeToggle />
      </div>
      <div className="grid grid-cols-2">
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
        <div className="border border-gray-600">
          <Editor
            height="55vh"
            theme="vs-dark"
            defaultLanguage="javascript"
            value={value}
            onChange={(value) => setValue(value)}
            defaultValue={CODE_SNIPPETS["javascript"]}
            onMount={onMount}
            language={language}
          />
          <ProblemEditor
            editorRef={editorRef}
            language={language}
            problem={problem}
          />
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
