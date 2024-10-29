import "./App.css";
import { AuthPageComponent } from "@/components/auth-page";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <AuthPageComponent />
      <Toaster />
    </>
  );
}

export default App;

//todo:
//add routes
//hash passwords and store hashed passwords in db
