import express from "express";
import app from "./app";
import { Server } from "http";
import config from "./app/config";

const port = config.port;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log("Server closed");
      });
    }
    process.exit(1);
  };

  process.on("uncaughtException", (error) => {
    console.log(error);
    exitHandler();
  });

  process.on("unhandledRejection", (error) => {
    console.log(error);
    exitHandler();
  });
}

main();
