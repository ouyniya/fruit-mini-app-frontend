import { useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { AlertCircleIcon } from "lucide-react";
import { Button } from "../components/ui/button";

const ErrorRateLimitPage: React.FC = () => {
  const location = useLocation();
  const { errorsMsg } = location.state || { errorsMsg: "Something went wrong" };

  return (
    <div className="bg-primary-foreground min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <CardHeader>
          <CardTitle>
            <div className="flex flex-col gap-4 justify-center items-center w-full">
              <AlertCircleIcon size={75} />
              <p className="text-center text-3xl font-bold">
                Something Went Wrong
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-center">{errorsMsg}</span>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 justify-center w-full mt-6 text-center">
            <a
              href={`mailto:${import.meta.env.VITE_ADMIN_EMAIL}`}
              className="hover:underline font-semibold"
            >
              <Button className="hover:cursor-pointer">Contact Admin</Button>
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default ErrorRateLimitPage;
