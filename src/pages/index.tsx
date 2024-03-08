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
    <main className="container mx-auto mb-12">
      <Navbar />
      <Search />
      <Results />
    </main>
  );
}
