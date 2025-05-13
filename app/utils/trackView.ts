import { useEffect, useState, useRef } from "react";
import axios from "axios";

export const useTrackView = (userId: string | null) => {
  const [postIds, setPostIds] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const trackView = (postId: string) => {
    setPostIds((prev) => [...new Set([...prev, postId])]);
  };

  const sendAnalytics = async () => {
    if (!postIds.length) return;

    try {
      await axios.post("http://192.168.1.9:7002/api/sendanalytics", {
        userId,
        viewData: postIds, // send all at once
      });

      console.log("✅ Sent analytics:", postIds);
      setPostIds([]); // clear after send
    } catch (e) {
      console.error("❌ Error sending analytics:", e);
    }
  };

  useEffect(() => {
    if (postIds.length > 0) {
      // Timer send every 5 min
      timerRef.current = setInterval(() => {
        sendAnalytics();
      }, 5 * 60 * 1000); // 5 minutes

      // Send on page leave
      window.addEventListener("beforeunload", sendAnalytics);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
        window.removeEventListener("beforeunload", sendAnalytics);
      };
    }
  }, [postIds, userId]);

  return { trackView };
};

// export default useTrackView;
