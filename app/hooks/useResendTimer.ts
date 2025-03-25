import { useState, useEffect } from "react";

const useResendTimer = (initialTime = 50) => {
  const [canResend, setCanResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(initialTime);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!canResend && resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }

    return () => clearTimeout(timer);
  }, [canResend, resendTimer]);

  const resetTimer = async (resendCallback: () => Promise<void>) => {
    try {
      setCanResend(false);
      setResendTimer(initialTime);
      await resendCallback();
    } catch (error) {
      console.error("Error resending:", error);
    }
  };

  return { canResend, resendTimer, resetTimer };
};

export default useResendTimer;
