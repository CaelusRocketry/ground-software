import React from "react";

const Block = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-lg mx-1 mt-1 mb-4 p-4 bg-gray-100">{children}</div>
);

export default Block;
