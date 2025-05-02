"use client";

import { startSignalRConnection } from "@/core/signalRService";
import { useEffect } from "react";

const SignalRProvider = () => {
  useEffect(() => {
    startSignalRConnection();
  }, []);
  return null;
};

export default SignalRProvider;
