import * as signalR from "@microsoft/signalr";

export let connection: signalR.HubConnection | null = null;

export const startSignalRConnection = async (
  setProgress: (value: number) => void
) => {
  if (connection) return; //

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://websocket-api.classbon.com/hub") // API URL endpoint for SignalR
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Error)
    .build();

  try {
    await connection.start();
    console.log("SignalR connected");
  } catch (err) {
    console.log("SignalR connection error" + err);
  }
  connection.on("ReceiveProgress", (message: string) => {
    try {
      console.log(message);

      const progressValue = parseInt(message, 10);
      setProgress(progressValue);
    } catch (err) {
      console.log("Error parsing data", err);
    }
  });
};

export const startProgress = async () => {
  if (connection?.state === signalR.HubConnectionState.Connected) {
    try {
      await connection.invoke("StartLongRunningTask");
    } catch (err) {
      console.log("SignalR send message error:" + err);
    }
  }
};
