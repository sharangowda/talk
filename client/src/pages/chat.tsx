import React, { FormEvent, useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types";
import { socket } from "@/socket";

export default function ChatPage() {
  return (
    <>
      <Layout children={<Chat />} title={"Messages"} />
    </>
  );
}

function Chat() {
  const [id, setID] = useState<string | undefined>("");
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const { toast } = useToast();
  socket.connect();
  socket.on("connect", () => {
    setID(socket.id);
  });

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

  const handleUserInput = (event: React.FormEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };

  const handleRoomInput = (event: React.FormEvent<HTMLInputElement>) => {
    setRoom(event.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const user: User = {
      username: username,
      roomId: room,
    };
    socket.emit("join", room);
    e.preventDefault();
  };
  return (
    <>
      <div className="ml-10 mt-8 lg:ml-28">
        <div>
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
          <Button onClick={handleSubmit}>Join</Button>
        </div>
      </div>
    </>
  );
}
