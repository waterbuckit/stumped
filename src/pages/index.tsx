import type { NextPage } from "next";
import Head from "next/head";
import useUrlForm from "../feature/UrlForm/useUrlForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import UrlView from "../feature/UrlView/UrlView";
import UrlForm from "../feature/UrlForm/UrlForm";
import { useCallback } from "react";

const Home: NextPage = () => {
  const { urlFormProps, link, setLink } = useUrlForm();

  const handleBack = useCallback(() => setLink(null), [setLink]);

  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <>
      <Head>
        <title>stumped - link shortener</title>
        <meta name="description" content="A link shortening app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-8 md:p-4">
        <h1 className="text-5xl md:text-7xl text-transparent bg-clip-text font-bold bg-gradient-to-r from-red-600 to-amber-500 underline decoration-dotted decoration-white">
          stumpt
        </h1>
        <h2 className="font-medium">
          <span className="font-bold tracking-tighter">short</span> links
        </h2>
        <div
          className="mt-10 p-8 md:w-3/4 max-w-2xl w-full rounded-lg border-gray-700 border"
          ref={parent}
        >
          {!link && <UrlForm {...urlFormProps} />}
          {link && <UrlView link={link} handleBack={handleBack} />}
        </div>
      </main>
    </>
  );
};

export default Home;
