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

const CodeEditor = () => {
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
      <h1 className="my-2 text-3xl text-center">Coding Playground</h1>
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

export default CodeEditor;
