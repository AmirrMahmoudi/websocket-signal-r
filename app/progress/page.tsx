"use client";

import { startProgress } from "@/core/signalRService";
import { useEffect } from "react";

export default function ProgressPage() {
  useEffect(() => {
    startProgress();
  }, []);
  return <></>;
}
