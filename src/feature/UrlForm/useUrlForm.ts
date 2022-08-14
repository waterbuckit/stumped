import { Link } from "@prisma/client";
import { FormEvent, SyntheticEvent, useCallback, useState } from "react";
import { trpc } from "../../utils/trpc";

const useUrlForm = () => {
  const [url, setUrl] = useState<string>("");
  const [link, setLink] = useState<Link | null>(null);

  const {
    mutate,
    isLoading,
    error: createURLError,
  } = trpc.useMutation(["links.create-link"], {
    onSuccess: (data: Link) => setLink(data),
  });

  const handleChangeUrl = (e: FormEvent<HTMLInputElement>) =>
    setUrl(e.currentTarget.value);

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      mutate({ url });
    },
    [mutate, url]
  );

  return {
    urlFormProps: {
      url,
      handleSubmit,
      handleChangeUrl,
      error: createURLError?.data?.zodError?.fieldErrors["url"]?.[0],
      isLoading
    },
    link,
    setLink
  };
};

export default useUrlForm;
