"use client";
import { useEffect } from "react";
import { useAuthContext } from "@/app/auth/components/auth";
import { initSocket, disconnectSocket, socket } from "./socket";
import axios from "axios";
import { API } from "./helpers";

const SocketInitializer = () => {
  const { data } = useAuthContext();
  const userId = data?.id;
  // const [comIds, setComIds] = useState([]);
  // const getJoinedcomIds = () => {
  //   try {
  //     const res = axios.get(`${API}/getjoinedcom/${userId}`);
  //     setComIds(res?.data);
  //   } catch (e) {
  //     console.log(e, "error in getJoinedcomIds");
  //   }
  // };

  useEffect(() => {
    if (!userId) return;
    initSocket(userId);
    const fetchAndJoinRooms = async () => {
      const res = await axios.get(`${API}/getjoinedcom/${userId}`);
      const ids = res.data?.data;
      // setComIds(ids); // Join all community rooms
      ids.forEach((id: string) => {
        socket?.emit("join-room", { roomId: id });
      });
    };

    fetchAndJoinRooms();
    return () => {
      disconnectSocket();
    };
  }, [userId]);

  return null; // no UI needed
};

export default SocketInitializer;
