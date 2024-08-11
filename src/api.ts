import axios from "axios";
import { LANGUAGE_VERSIONS } from "./components/lib/constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeAPI = async (
  language: string,
  sourceCode: any,
  input: string
) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: input,
    run_timeout: 1000,
    compile_timeout: 1000,
  });
  return response.data;
};
