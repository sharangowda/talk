import { useEffect, useState } from "react";
import Layout from "./layout";
import { io } from "socket.io-client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { RxClipboardCopy } from "react-icons/rx";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function ChatPage() {
  return (
    <>
      <Layout children={<Chat />} title={"Messages"} />
    </>
  );
}

function Chat() {
  const [id, setID] = useState<string | undefined>("");
  const { toast } = useToast();

  const handleCopyClick = async () => {
    try {
      await window.navigator.clipboard.writeText(id);
      toast({
        title: "Copied",
        description: `${id}`,
      });
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };
  useEffect(() => {
    const socket = io("http://localhost:3000");

    const connection = socket.connect();
    connection.on("connect", () => {
      setID(connection.id);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <div className="ml-10 mt-8 lg:ml-28">
        <HoverCard>
          <HoverCardTrigger>Your Session ID</HoverCardTrigger>
          <HoverCardContent className="w-[300px] h-[60px]" side="right">
            <div className="flex justify-between">
              <p className="">{id}</p>
              <Button className="h-[25px] w-[20px]" onClick={handleCopyClick}>
                <RxClipboardCopy />
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </>
  );
}
