import React from "react";

export function Card2({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="border p-4 w-full">
      <h1 className="text-xl border-b pb-2">{title}</h1>
      {children}
    </div>
  );
}
