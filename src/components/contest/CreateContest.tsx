import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  createContestFormFields,
  createContestSchema,
} from "../schemas/schema";

const CreateContest = () => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<createContestFormFields>({
    resolver: zodResolver(createContestSchema),
  });

  const onSubmit: SubmitHandler<createContestFormFields> = async (data) => {
    // Convert start_date and end_date to Unix timestamps
    const startTimestamp = Math.floor(data.start_time.getTime() / 1000);
    const endTimestamp = Math.floor(data.end_time.getTime() / 1000);

    await axios
      .post(
        "https://worldwide-coders-production.up.railway.app/contests/create",
        {
          title: data.title,
          description: data.title,
          start_time: startTimestamp,
          end_time: endTimestamp,
          problems: data.problems,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast("Contest Created Sucessfully!! 🥳");
      })
      .catch((error) =>
        setError("root", {
          message: error.message,
        })
      );
  };

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="title">Contest Title</Label>
          <Input
            {...register("title")}
            type="text"
            placeholder="Contest Title"
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
        </div>
        <div>
          <Label htmlFor="description">Contest Description</Label>
          <Textarea
            {...register("description")}
            placeholder="Description of the Contest."
          />
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
        </div>
        <div className="flex flex-row space-x-5 justify-between">
          <div className="w-1/2">
            <Label htmlFor="description">Start Date</Label>
            <Input
              {...register("start_time", { valueAsDate: true })}
              type="datetime-local"
            />
          </div>

          <div className="w-1/2">
            <Label htmlFor="description">End Date</Label>
            <Input
              {...register("end_time", { valueAsDate: true })}
              type="datetime-local"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="eligibility">problems</Label>
          <div className="flex flex-row flex-wrap gap-2">
            <Input
              className="w-full max-w-[400px]"
              type="text"
              {...register("problems.0")}
              placeholder="Problem #1"
            />
            <Input
              className="w-full max-w-[400px]"
              type="text"
              {...register("problems.1")}
              placeholder="Problem #2"
            />
            <Input
              className="w-full max-w-[400px]"
              type="text"
              {...register("problems.2")}
              placeholder="Problem #3"
            />
          </div>
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="py-3 px-10 w-full"
        >
          {isSubmitting ? "Loading..." : "Create Contest"}
        </Button>
        {errors.root && (
          <div className="text-red-500">{errors.root.message}</div>
        )}
      </form>
    </div>
  );
};

export default CreateContest;
