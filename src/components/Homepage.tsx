import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import HomeNav from "./HomeNav";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mx-5 my-5 justify-end flex">
        <HomeNav />
      </div>
      <h1 className="text-5xl text-center my-20">Worldwide Coders🧑🏻‍💻</h1>
      <div className="flex flex-row mx-5 space-x-5 my-20">
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Coding Playground</CardTitle>
            <CardDescription>
              A place where users can play with code.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate("/codingplayground")}
              size="lg"
              variant="secondary"
            >
              Let's Go
            </Button>
          </CardContent>
        </Card>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Coding Arena</CardTitle>
            <CardDescription>
              A place where users can practice their coding skills by solving
              various problems available on the platform.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate("/codingarena")}
              size="lg"
              variant="secondary"
            >
              Let's Go
            </Button>
          </CardContent>
        </Card>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Coding Battleground</CardTitle>
            <CardDescription>
              A place where users can compete in ongoing contests hosted on the
              platform to showcase their skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => navigate("/codingbattleground")}
              size="lg"
              variant="secondary"
            >
              Let's Go
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
