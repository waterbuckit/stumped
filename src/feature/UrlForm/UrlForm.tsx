import { LinkIcon } from "@heroicons/react/solid";
import { FC, FormEvent, SyntheticEvent } from "react";
import Button from "../../shared/components/Button";
import TextField from "../../shared/components/TextField";

type UrlFormProps = {
  handleSubmit: (e: SyntheticEvent) => void;
  handleChangeUrl: (e: FormEvent<HTMLInputElement>) => void;
  url: string;
  error: string | undefined;
  isLoading: boolean;
};

const UrlForm: FC<UrlFormProps> = ({
  handleSubmit,
  handleChangeUrl,
  url,
  error,
  isLoading,
}) => (
  <form
    className="w-full flex items-center gap-7"
    noValidate
    onSubmit={handleSubmit}
  >
    <TextField
      onChange={handleChangeUrl}
      value={url}
      autoFocus
      placeholder="a really long url..."
      className="flex-1"
      label="URL"
      id="url"
      type="url"
      error={error}
    />
    <Button type="submit" loading={isLoading} icon={<LinkIcon />}>
      {isLoading ? "Stumping..." : "Stump it!"}
    </Button>
  </form>
);

export default UrlForm;
