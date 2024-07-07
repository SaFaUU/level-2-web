import VideoCall from "@/components/UI/VideoCall/VideoCall";
import React from "react";

const VideoCalling = ({
  searchParams,
}: {
  searchParams: {
    videCallingId: string;
  };
}) => {
  const videoCallingId = searchParams.videCallingId;
  console.log(videoCallingId);
  return <VideoCall videoCallingId={videoCallingId} />;
};

export default VideoCalling;
