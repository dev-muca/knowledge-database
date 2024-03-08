import Navbar from "@/components/Navbar";
import Search from "@/components/Search";
import Results from "@/components/Results";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Base De Conhecimento";
  }, []);

  return (
    <>
      <Head>
        <title>Base De Conhecimento</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <main className="container mx-auto mb-12">
        <Navbar />
        <Search />
        <Results />
      </main>
    </>
  );
}
