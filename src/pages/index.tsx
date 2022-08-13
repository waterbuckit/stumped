import type { NextPage } from "next";
import Head from "next/head";
import {
  FormEvent,
  FormEventHandler,
  SyntheticEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
// import { LinksRouterEndpoints } from "../server/router/linksRouter";
import Button from "../shared/components/Button";
import TextField from "../shared/components/TextField";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [url, setUrl] = useState<string>("");

  const {
    mutate,
    isLoading,
    error: createURLError,
  } = trpc.useMutation(["links.create-link"]);

  const handleChangeUrl = (e: FormEvent<HTMLInputElement>) =>
    setUrl(e.currentTarget.value);

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      mutate({ url });
    },
    [mutate, url]
  );

  return (
    <>
      <Head>
        <title>stumped - link shortener</title>
        <meta name="description" content="A link shortening app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-8 md:p-4">
        <h1 className="text-7xl text-transparent bg-clip-text font-bold bg-gradient-to-r from-cyan-500 to-blue-500">
          stumped
        </h1>
        <h2 className="font-semibold">short links</h2>

        <form
          className="mt-10 w-full flex flex-col items-center gap-4"
          noValidate
          onSubmit={handleSubmit}
        >
          <TextField
            onChange={handleChangeUrl}
            value={url}
            autoFocus
            className={"max-w-lg w-full"}
            label="URL"
            id="url"
            type="url"
            error={createURLError?.data?.zodError?.fieldErrors["url"]?.[0]}
          />
          <Button type="submit" loading={isLoading}>
            Stump it!
          </Button>
        </form>
      </main>
    </>
  );
};

export default Home;
