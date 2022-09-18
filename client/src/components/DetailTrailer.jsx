/* eslint-disable */
import React from "react";
import YouTube from "react-youtube";
import dataFilm from "../fakeData/datafilm.json";
import { useEffect, useState } from "react";

function DetailTrailer(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataFilm.filter((item) => item.id == props.id)[0]);
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  function handleVideoReady(event) {
    event.target.pauseVideo();
  }

  function handleVideoPlay(event) {
    props.setIsVideoPlaying("play")
  }

  function handleVideoPause(event) {
    props.setIsVideoPlaying("pause")
  }

  return (
    <div
      className="d-flex justify-content-center bg-dark"
      style={{
        backgroundcolor: "black",
      }}
    >
      <YouTube
        videoId={data?.trailerId}
        opts={opts}
        onReady={handleVideoReady}
        onPlay={handleVideoPlay}
        onPause={handleVideoPause}
        className="w-100"
        style={{ backgroundColor: "black" }}
      />
    </div>
  );
}

export default DetailTrailer;
