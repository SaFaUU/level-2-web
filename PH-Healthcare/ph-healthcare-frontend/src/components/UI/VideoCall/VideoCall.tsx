"use client";
import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { Button, Stack } from "@mui/material";
import DuoIcon from "@mui/icons-material/Duo";
import Image from "next/image";
import { useRouter } from "next/navigation";

const VideoCall = ({ videoCallingId }: { videoCallingId: string }) => {
  const router = useRouter();
  const [startVideoCall, setStartVideoCall] = useState(false);
  const rtcProps = {
    appId: process.env.NEXT_PUBLIC_VIDEO_CALL_APP_ID || "",
    channel: videoCallingId || "test", // your agora channel
    token: null,
  };
  const callbacks = {
    EndCall: () => {
      setStartVideoCall(false);
      router.push("/dashboard");
    },
  };
  return startVideoCall ? (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} />
    </div>
  ) : (
    <Stack
      sx={{
        width: "100vw",
        maxWidth: 500,
        mx: "auto",
        direction: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        marginTop: 20,
      }}
    >
      <Button
        onClick={() => setStartVideoCall(true)}
        endIcon={<DuoIcon />}
        sx={{
          borderRadius: "25px",
        }}
      >
        Start Call
      </Button>
      <Image
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExb25jMWk1b3VxYWtjYTdpZXlnNGcwZHVqcGppejM3bDUybTl3aXQ0ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/PnHX3RAVHsjHXTO4qv/giphy.gif"
        width={500}
        height={500}
        alt="video call gif"
      />
    </Stack>
  );
};

export default VideoCall;
