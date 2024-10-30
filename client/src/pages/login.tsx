import { AuthPageComponent } from "@/pages/auth-page";
import { Toaster } from "@/components/ui/toaster";

function Login() {
  return (
    <>
      <AuthPageComponent />
      <Toaster />
    </>
  );
}

export default Login;
