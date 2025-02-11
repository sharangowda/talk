import React, { useCallback, useEffect, useState } from "react";
import Layout from "./layout";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { VscSend } from "react-icons/vsc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Body } from "@/types";
import { socket } from "@/socket";
import ReactPlayer from "react-player";

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
  const [messageList, setMessageList] = useState<Body[]>([]);
  const [sourceStream, setSourceStream] = useState<MediaStream>();
  const [remoteStream, setRemoteStream] = useState<MediaStream>();
  const [remoteId, setRemoteId] = useState<string>("");

  // const { toast } = useToast();
  socket.connect();
  socket.on("connect", () => {
    setID(socket.id);
  });

  // const handleCopyClick = async () => {
  //   try {
  //     await window.navigator.clipboard.writeText(id?.substring(0, 9));
  //     toast({
  //       title: "Copied",
  //       description: `${id?.substring(0, 9)}`,
  //     });
  //   } catch (err) {
  //     toast({
  //       title: "Failed to copy content.",
  //       description: `${err}`,
  //     });
  //   }
  // };

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
      setMessageList((list) => [...list, body]);
    }
  };

  const createConnection = () => {
    const configuration = {
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    };
    const connection = new RTCPeerConnection(configuration);
    return connection;
  };

  const sourceConnection = createConnection();
  const remoteConnection = createConnection();

  const sourceCall = async () => {
    // const configuration = {
    //   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    // };
    // const peerConnection = new RTCPeerConnection(configuration);
    const offer = await sourceConnection.createOffer();
    await sourceConnection.setLocalDescription(offer);
    return offer;
  };

  const remoteCall = async (offer: RTCSessionDescriptionInit) => {
    // const configuration = {
    //   iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    // };
    // const remoteConnection = new RTCPeerConnection(configuration);
    remoteConnection.setRemoteDescription(offer);
    const answer = await remoteConnection.createAnswer();
    await remoteConnection.setLocalDescription(answer);
    return answer;
  };

  const handleNewUser = useCallback(
    async (id: React.SetStateAction<string>) => {
      console.log(`user ${id} joined.`);
      const offer = await sourceCall();
      socket.emit("call-user", { id, offer });
      setRemoteId(id);
    },
    [sourceCall, socket]
  );

  const handleIncomingCall = useCallback(
    async (data: { from: any; offer: any }) => {
      const { from, offer } = data;
      console.log(offer);
      const ans = await remoteCall(offer);
      socket.emit("call-accepted", { id: from, ans });
      setRemoteId(from);
    },
    [remoteCall, socket]
  );

  const handleCallAccepted = async (data: { ans: any }) => {
    const { ans } = data;
    console.log(`call got accepted ${ans}`);
    await sourceConnection.setRemoteDescription(ans);
  };

  const sendStream = async (stream: MediaStream) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      sourceConnection.addTrack(track, stream);
    }
  };

  const getUserMediaStream = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    // sendStream(stream);
    setSourceStream(stream);
  }, []);

  const handleTrackEvent = useCallback((event: { streams: any }) => {
    const streams = event.streams;
    setRemoteStream(streams[0]);
  }, []);

  const handleNego = useCallback(() => {
    const localOffer = remoteConnection.localDescription;
    socket.emit("call-user", { id: remoteId, offer: localOffer });
  }, []);

  useEffect(() => {
    socket.on("user-join", handleNewUser);
    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-accepted", handleCallAccepted);

    sourceConnection.addEventListener("track", handleTrackEvent);
    sourceConnection.addEventListener("negotiationneeded", handleNego);

    socket.on("receive", (data) => {
      setMessageList((list) => [...list, data]);
    });
    return () => {
      socket.off("user-join", handleNewUser);
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-accepted", handleCallAccepted);
      sourceConnection.removeEventListener("track", handleTrackEvent);
      sourceConnection.removeEventListener("negotiationneeded", handleNego);
    };
  }, [
    socket,
    handleNewUser,
    handleIncomingCall,
    handleCallAccepted,
    sourceConnection,
  ]);

  useEffect(() => {
    getUserMediaStream();
  }, [getUserMediaStream]);

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
          <div className="flex my-6 gap-x-10">
            <HoverCard>
              <HoverCardTrigger>Get Private Room ID</HoverCardTrigger>
              <HoverCardContent
                className="lg:w-[300px] lg:h-[60px]"
                side="bottom"
              >
                <div className="flex justify-between">
                  <p className="">{id?.substring(0, 9)}</p>
                  {/* <Button
                    className="h-[25px] w-[20px]"
                    onClick={handleCopyClick}
                  >
                    <RxClipboardCopy />
                  </Button> */}
                </div>
              </HoverCardContent>
            </HoverCard>
            <Button
              onClick={(_event) => {
                sendStream(sourceStream);
              }}
            >
              Start Video Call
            </Button>
          </div>
          <div className="gap-y-5">
            <ReactPlayer url={sourceStream} playing />
            <ReactPlayer url={remoteStream} playing />
          </div>
        </div>
        <div>
          <div>
            <div>
              <ScrollArea className="h-[500px] w-[330px] rounded-md border p-4 lg:w-[750px] lg:h-[700px]">
                {messageList.map((content) => {
                  return (
                    <div className={`mt-2 flex-col`}>
                      <div
                        className={`flex ${
                          content.username === username
                            ? "justify-end"
                            : "justify-start"
                        } items-start`}
                      >
                        <p
                          className={`rounded-sm px-3 py-2 text-white max-w-max ${
                            content.username === username
                              ? "bg-blue-800"
                              : "bg-green-800"
                          }`}
                          id={content.username === username ? "you" : "other"}
                        >
                          {content.message}
                        </p>
                      </div>
                      <div
                        className={`flex ${
                          content.username === username
                            ? "justify-end"
                            : "justify-start"
                        } items-start`}
                      >
                        <div className="flex gap-x-2 mt-1">
                          <p className="text-xs">{content.username}</p>
                          <p className="text-xs">{`${content.hour}:${content.minutes}`}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
