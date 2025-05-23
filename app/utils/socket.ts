import { io, Socket } from "socket.io-client";

export let socket: Socket | null = null;

export const initSocket = (userId: string) => {
  if (socket && !userId) return;

  socket = io("http://localhost:3348", {
    transports: ["websocket"],
    withCredentials: true,
    auth: { token: userId },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket?.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });
};

export const initSocketCom = (comId: string) => {
  if (socket && !comId) return;

  socket = io("http://localhost:3348", {
    transports: ["websocket"],
    withCredentials: true,
    auth: { token: comId },
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected:", comId);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });
};

// recid - roomId
// export const sendMessage = (message: string, roomId: string) => {
//   socket?.connect();
//   console.log(socket, "socket", message, roomId);
//   if (!socket || !socket.connected) {
//     console.warn("Socket not initialized or connected.");
//     return;
//   }

//   socket.emit("send-message", { message, roomId });
// };
// export const sendMessage = (message: string, roomId: string) => {
//   if (!socket) {
//     console.warn("Socket not initialized.");
//     return;
//   }

//   if (!socket.connected) {
//     console.log("Socket not connected. Connecting...");
//     socket.connect();

//     socket.once("connect", () => {
//       console.log("Socket connected. Sending message.");
//       socket?.emit("send-message", { message, roomId });
//     });
//   } else {
//     console.log("Socket already connected. Sending message.");
//     socket.emit("send-message", { message, roomId });
//   }
// };
export const sendMessage = (msgData: {
  roomId: string;
  sender: string;
  text: string;
  date: number;
}) => {
  if (!socket) return console.warn("Socket not initialized.");

  if (!socket.connected) {
    console.log("Socket not connected. Connecting...");
    socket.connect();

    socket.once("connect", () => {
      console.log("Connected. Sending message.");
      socket?.emit("send-message", msgData);
    });
  } else {
    socket.emit("send-message", msgData);
  }
};

export const sendPublicMessage = (message: string, roomId: string) => {
  socket?.connect();
  if (!socket || !socket.connected) {
    console.warn("Socket not initialized or connected.");
    return;
  }

  socket.emit("send-public-message", { message, roomId });
};
export const sendMessageCom = (
  message: string,
  roomId: string,
  senderId: string,
  senderName: string,
  senderProfilePic: string
) => {
  if (!socket || !socket.connected) {
    console.warn("Socket not initialized or connected.");
    return;
  }

  socket.emit("send-message", {
    message,
    roomId,
    senderId,
    senderName,
    senderProfilePic,
  });
};

export const receiveMessageCom = (
  callback: (
    message: string,
    senderId: string,
    senderName: string,
    senderProfilePic: string,
    roomId: string
  ) => void
) => {
  if (!socket || !socket.connected) return;

  socket.on(
    "receive-message",
    ({ message, senderId, senderName, senderProfilePic, roomId }) => {
      callback(message, senderId, senderName, senderProfilePic, roomId);
    }
  );
};

// export const receiveMessage = (
//   event: string,
//   callback: (message: string, user: string) => void
// ) => {
//   if (!socket || !socket.connected) {
//     console.warn("Socket not initialized or connected.");
//     return;
//   }

//   socket.on(event, ({ message, user }) => {
//     callback(message, user);
//   });
// };

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// this apply in commmunitychat
// useEffect(() => {
//   receiveMessage((message, senderId, senderName, senderProfilePic, roomId) => {
//     console.log(`[Room ${roomId}] ${senderName} (${senderId}): ${message}`);
//     // Update chat UI with message, sender's name and profile picture
//   });
// }, []);
