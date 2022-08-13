/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon, MailIcon } from "@heroicons/react/solid";
import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import Loader from "./Loader";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  icon?: ReactNode;
};

const Button: FC<ButtonProps> = (
  { children, loading, icon, disabled, ...props } = { disabled: false, loading: false }
) => {
  return (
    <button
      type="button"
      className="inline-flex disabled:opacity-50 items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      disabled={loading ? true : disabled }
      {...props}
    >
      {children}
      {icon && (
        <div className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true">
          {!loading && icon}
          {loading && <Loader />}
        </div>
      )}
    </button>
  );
};

export default Button;
