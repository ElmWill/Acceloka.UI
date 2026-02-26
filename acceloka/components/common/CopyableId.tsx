"use client";

import { useState } from "react";

interface Props {
  value: string;
  label?: string;
}

export default function CopyableId({
  value,
  label = "ID",
}: Props) {
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
      <p className="bg-black text-sm text-gray-500">{label}</p>

      <div className="flex items-center gap-3 bg-black border rounded-lg px-3 py-2">
        <span className="text-sm font-mono break-all text-gray-50">
          {value}
        </span>

        <button
          onClick={handleCopy}
          className="text-sm px-3 py-1 rounded-md border border-gray-600 bg-gray-900 text-gray-50 hover:bg-gray-800 transition"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </div>
  );
}
