import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div>
        <h2>Error 404</h2>
        <p>Page Does Not Exist.</p>
        <Link to={"/"}>
          <Button>Back to Home</Button>
        </Link>
      </div>
    </>
  );
}
