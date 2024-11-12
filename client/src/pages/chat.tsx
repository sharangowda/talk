import React, { useEffect, useState } from "react";
import Layout from "./layout";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { RxClipboardCopy } from "react-icons/rx";
import { VscSend } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Body } from "@/types";
import { socket } from "@/socket";

export default function ChatPage() {
  return (
    <>
      <Layout children={<Chat />} title={"Messages"} />
    </>
  );
}

function Chat() {
  //states
  const [id, setID] = useState<string | undefined>("");
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { toast } = useToast();
  socket.connect();
  socket.on("connect", () => {
    setID(socket.id);
  });

  const handleCopyClick = async () => {
    try {
      await window.navigator.clipboard.writeText(id?.substring(0, 9));
      toast({
        title: "Copied",
        description: `${id?.substring(0, 9)}`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy content.",
        description: `${err}`,
      });
    }
  };

  const handleUserInput = (event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const handleRoomInput = (event: React.FormEvent<HTMLInputElement>) => {
    setRoom(event.currentTarget.value);
  };

  const handleMessages = (event: React.FormEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };

  const handleRoomSubmit = () => {
    socket.emit("join", room);
  };

  const handleMessageSubmit = async () => {
    const body: Body = {
      username: username,
      roomId: room,
      message: message,
      hour: new Date(Date.now()).getHours(),
      minutes: new Date(Date.now()).getMinutes(),
    };
    if (message !== "") {
      await socket.emit("message", body);
    }
  };

  useEffect(() => {
    socket.on("receive", (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <>
      <div className="ml-10 mt-8 mr-10 lg:ml-28 lg:flex lg: justify-between lg:w-full">
        <div>
          <Separator className="my-4" orientation="horizontal" />
          <div className="flex gap-5">
            <Input
              onChange={handleUserInput}
              autoComplete="false"
              placeholder="Username"
            />
            <Input
              onChange={handleRoomInput}
              autoComplete="false"
              placeholder="Room ID"
            />
            <Button onClick={handleRoomSubmit}>Join</Button>
          </div>
          <div className="flex my-6">
            <HoverCard>
              <HoverCardTrigger>Get Private Room ID</HoverCardTrigger>
              <HoverCardContent
                className="lg:w-[300px] lg:h-[60px]"
                side="bottom"
              >
                <div className="flex justify-between">
                  <p className="">{id?.substring(0, 9)}</p>
                  <Button
                    className="h-[25px] w-[20px]"
                    onClick={handleCopyClick}
                  >
                    <RxClipboardCopy />
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        <div>
          <div>
            <div>
              <ScrollArea className="h-[500px] w-[330px] rounded-md border p-4 lg:w-[750px] lg:h-[700px]">
                Jokester began sneaking into the castle in the middle of the
                night and leaving jokes all over the place: under the king's
                pillow, in his soup, even in the royal toilet. The king was
                furious, but he couldn't seem to stop Jokester. And then, one
                day, the people of the kingdom discovered that the jokes left by
                Jokester were so funny that they couldn't help but laugh. And
                once they started laughing, they couldn't stop.
              </ScrollArea>
            </div>
            <div className="flex gap-2 mt-3 lg:mt-4">
              <Input placeholder="Message" onChange={handleMessages}></Input>
              <Button onClick={handleMessageSubmit}>
                <VscSend />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
