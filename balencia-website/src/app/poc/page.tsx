import type { Metadata } from "next";
import { Experience } from "@/components/Experience";

export const metadata: Metadata = {
  title: "Balencia — proof of concept",
  description:
    "Design-first vertical slice: the cinematic scroll-scrub hero and the live, interactive Life Correlation Matrix.",
};

export default function Poc() {
  return <Experience />;
}
