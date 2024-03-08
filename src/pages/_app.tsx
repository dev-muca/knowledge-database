import { TutorialProvider } from "@/context/TutorialContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TutorialProvider>
      <Component {...pageProps} />
    </TutorialProvider>
  );
}
