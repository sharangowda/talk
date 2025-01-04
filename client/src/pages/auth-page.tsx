import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import getAuth from "@/utils/getAuth";
import createUser from "@/utils/createUser";
import { useToast } from "@/hooks/use-toast";

export function AuthPageComponent() {
  type createData = {
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
    name: FormDataEntryValue | null;
    username?: string;
    emailVisibilty: boolean;
    passwordConfirm: FormDataEntryValue | null;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const isSignUp = formData.get("authType") === "sign-up";

    const data: createData = {
      email: email,
      password: password,
      name: name,
      passwordConfirm: password,
      emailVisibilty: true,
    };

    if (isSignUp) {
      try {
        await createUser(data);
        toast({
          title: "Your Account Is Now Created.",
          description: "Please log in to access your account.",
        });
      } catch {
        toast({
          title: "Account Not Created",
          description: "Please enter all fields to create your account.",
        });
      }
    } else {
      try {
        const response = await getAuth(email, password);
        if (response) {
          toast({
            title: "Welcome",
            description: "You are now logged in :)",
          });
        }
      } catch {
        toast({
          title: "Check Credentials",
          description:
            "Either your E-mail ID or Password is wrong. Please Check and Try Again.",
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center mt-52">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="sign-in" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <form onSubmit={onSubmit}>
              <TabsContent value="sign-in">
                {/* <CardContent className="flex flex-col space-y-4">
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Sign in with Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    Sign in with GitHub
                  </Button>
                </CardContent> */}
                <input type="hidden" name="authType" value="sign-in" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="sign-up">
                <input type="hidden" name="authType" value="sign-up" />
                {/* <CardContent className="flex flex-col space-y-4">
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Sign up with Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Github className="mr-2 h-4 w-4" />
                    Sign up with GitHub
                  </Button>
                </CardContent> */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required autoComplete="off" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                </div>
              </TabsContent>
              <CardFooter className="flex justify-between mt-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Submit"}
                </Button>
              </CardFooter>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
