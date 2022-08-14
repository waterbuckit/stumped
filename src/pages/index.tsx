import type { NextPage } from "next";
import Head from "next/head";
import UrlForm from "../feature/UrlForm/urlForm";
import useUrlForm from "../feature/UrlForm/useUrlForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Home: NextPage = () => {
  const { urlFormProps, link, setLink } = useUrlForm();

  const [parent] = useAutoAnimate<HTMLDivElement>()

  return (
    <>
      <Head>
        <title>stumped - link shortener</title>
        <meta name="description" content="A link shortening app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-8 md:p-4">
        <h1 className="text-5xl md:text-7xl text-transparent bg-clip-text font-bold bg-gradient-to-r from-cyan-300 to-blue-500 underline decoration-pink-500">
          stumped
        </h1>
        <h2 className="font-medium">
          <span className="font-bold tracking-tighter">short</span> links
        </h2>
        <div className="mt-10 p-8 md:w-3/4 max-w-2xl w-full rounded-lg shadow-xl bg-slate-800" ref={parent}>
          {!link && <UrlForm {...urlFormProps} />}
        </div>
      </main>
    </>
  );
};

export default Home;
