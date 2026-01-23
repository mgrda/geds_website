"use client";

import dynamic from "next/dynamic";

const GoldChatWidget = dynamic(() => import("./GoldChatWidget"), { ssr: false });
const Libras = dynamic(() => import("./Libras"), { ssr: false });

export default function ClientLayoutExtras() {
  return (
    <>
      <GoldChatWidget />
      <Libras />
    </>
  );
}
