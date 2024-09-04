import axios from "axios";
import { LANGUAGE_VERSIONS, PISTON_API } from "./components/lib/constants";

const API = axios.create({
  baseURL: PISTON_API,
});

export const executeAPI = async (
  language: string,
  sourceCode: string,
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
