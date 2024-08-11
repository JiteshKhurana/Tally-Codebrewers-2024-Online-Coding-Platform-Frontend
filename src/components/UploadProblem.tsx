import { addProblemFormFields, addProblemSchema } from "./schemas/schema";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const UploadProblem = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<addProblemFormFields>({
    resolver: zodResolver(addProblemSchema),
  });

  const fieldArray = useFieldArray({
    name: "test_cases",
    control,
  });

  const onSubmit: SubmitHandler<addProblemFormFields> = async (data) => {
    await axios
      .post(
        "https://worldwide-coders-production.up.railway.app/problems/upload",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast("Sucessfully Added!! 🥳");
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex flex-row justify-between">
        <h1 className="font-semibold text-2xl my-5">Upload Problem</h1>
      </div>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="title">Problem Title</Label>
          <Input
            {...register("title")}
            type="text"
            placeholder="Problem Title"
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
        </div>
        <div>
          <Label htmlFor="description">Problem Description</Label>
          <Textarea
            {...register("description")}
            placeholder="Description of the problem."
          />
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
        </div>
        <div>
          <Label htmlFor="description">Problem constraints</Label>
          <Textarea
            {...register("constraints")}
            placeholder="constraints of the problem."
          />
          {errors.constraints && (
            <div className="text-red-500">{errors.constraints.message}</div>
          )}
        </div>

        <div>
          <Label>Test Cases</Label>
          <div className="flex flex-col space-y-5">
            {fieldArray.fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-12 space-x-5">
                <div className="col-span-10 space-y-2">
                  <Textarea
                    {...register(`test_cases.${index}.input` as const)}
                    placeholder={`Input ${index + 1}`}
                  />
                  <Textarea
                    {...register(`test_cases.${index}.output` as const)}
                    placeholder={`Output of Test Case ${index + 1}`}
                  />
                </div>

                <Button
                  className="col-span-2 my-auto"
                  type="button"
                  onClick={() => fieldArray.remove(index)}
                >
                  Remove test case
                </Button>
              </div>
            ))}
            <Button
              className="w-1/4"
              type="button"
              onClick={() =>
                fieldArray.append({
                  input: "",
                  output: "",
                })
              }
            >
              Add New Testcase
            </Button>
          </div>
          {errors.test_cases && (
            <div className="text-red-500">{errors.test_cases.message}</div>
          )}
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="py-3 px-10 w-full"
        >
          {isSubmitting ? "Loading..." : "Save Changes"}
        </Button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
};

export default UploadProblem;
