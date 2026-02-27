"use client";

import { useState } from "react";

interface Props {
  value: string;
  label?: string;
}

export default function CopyableId({ value, label = "ID" }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {label}
      </p>

      <div
        className="flex items-center justify-between gap-3
                    bg-white/80 dark:bg-gray-900/70
                    border border-gray-200 dark:border-gray-800
                    rounded-xl px-3 py-2.5
                    backdrop-blur-md"
      >
        <span
          className="text-sm font-mono break-all
                       text-gray-800 dark:text-gray-100"
        >
          {value}
        </span>

        <button
          onClick={handleCopy}
          className={`text-sm px-3 py-1.5 rounded-lg font-medium
                    border transition-all duration-200
                    ${
                      copied
                        ? "bg-green-600 text-white border-green-600"
                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </div>
  );
}
