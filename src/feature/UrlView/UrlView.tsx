import { CheckIcon, DuplicateIcon, RefreshIcon } from "@heroicons/react/solid";
import { Link } from "@prisma/client";
import { FC, useCallback, useMemo, useState } from "react";
import Button from "../../shared/components/Button";

type UrlViewProps = {
  link: Link;
  handleBack: () => void
};

const UrlView: FC<UrlViewProps> = ({ link, handleBack }) => {
  const url = useMemo(
    () => `${process.env.NEXT_PUBLIC_DOMAIN}/${link.urlIndex}`,
    [link.urlIndex, process.env.NEXT_PUBLIC_DOMAIN]
  );

  const [copied, setCopied] = useState<boolean>(false);

  const copyUrl = useCallback(() => {
    if (copied) return;
    setCopied(true);
    navigator.clipboard.writeText(url);
    setTimeout(() => setCopied(false), 10000);
  }, [url, setCopied, copied]);

  return (
    <div>
      <div className="flex flex-col items-start sm:items-stretch sm:flex-row gap-2 mb-10">
        <div className="flex-grow sm:w-auto w-full border border-gray-700 rounded-md px-3 py-2">
          <p className="text-white text-lg truncate">{url}</p>
        </div>
        <Button
          onClick={copyUrl}
          icon={!copied ? <DuplicateIcon /> : <CheckIcon className="text-green-500" />}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      <Button onClick={handleBack} icon={<RefreshIcon />}>Stump another</Button>
    </div>
  );
};

export default UrlView;
