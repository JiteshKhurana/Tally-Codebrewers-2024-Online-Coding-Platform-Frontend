import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
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
import Output from "./Output";
import { Separator } from "./ui/separator";

const ProblemDescription = () => {
  const editorRef = useRef();
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState("javascript");
  const languages = Object.entries(LANGUAGE_VERSIONS);
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
      <div>
        <div className="flex flex-wrap justify-center">
          <div className="coverimage w-full h-[250px] bg-[url('https://res.cloudinary.com/dvmteldw0/image/upload/v1722359230/iijlpvxuxvaxetfsr9fu.jpg')] bg-cover bg-no-repeat"></div>
          <div className="w-full max-w-[1800px] grid grid-cols-8 lg:grid-cols-12 gap-6 mx-3 lg:mx-32 my-5">
            <div className="col-span-8 space-y-2">
              <div className="flex gap-5 p-5 bg-white dark:bg-black shadow-xl border rounded-lg">
                <div className="flex flex-col space-y-2 overflow-hidden">
                  <h1 className="text-4xl font-semibold">{problem.title}</h1>
                  <span className="text-gray-500 font-semibold text-xl">
                    {problem.author_id}
                  </span>
                </div>
              </div>

              <div className=" bg-white dark:bg-black shadow-xl border rounded-lg p-5 space-y-5">
                <div className="flex flex-col gap-3">
                  <h2 className="font-semibold text-xl">
                    All that you need to know about {problem.title}
                  </h2>
                  <span className="event-description ">
                    {problem.description}
                  </span>
                  <h3 className="font-medium text-gray-500 text-sm">
                    Note: The organizers reserve the right to change the
                    opportunity details.
                  </h3>
                </div>
                {problem.test_cases && (
                  <div>
                    <Separator />
                    <h2 className="font-semibold text-xl mb-2">
                      Rewards & Prizes:
                    </h2>
                    {problem.test_cases.map((testcase, i) => (
                      <div key={i} className="flex flex-col my-1">
                        <span className="font-medium text-lg">
                          {testcase.name}
                        </span>
                        <span className="">{testcase.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 border-t border-white">
        <Editor
          height="85vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          value={value}
          onChange={(value) => setValue(value)}
          defaultValue={CODE_SNIPPETS["javascript"]}
          onMount={onMount}
          language={language}
        />
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default ProblemDescription;
