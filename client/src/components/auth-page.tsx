import { useEffect, useState } from "react";
//import { useRouter } from 'next/navigation'
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
  //const router = useRouter();

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

    console.log(isSignUp);
    if (isSignUp) {
      try {
        await createUser(data);
      } catch (e) {
        alert(e);
      }
    } else {
      try {
        const response = await getAuth(email, password);
        setIsLoading(response);
        alert("Logged In");
      } catch (e) {
        alert(e);
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center mt-60">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <form onSubmit={onSubmit}>
              <TabsContent value="sign-in">
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
