import React from "react";

const BlockHeader = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-bold">{children}</h3>
);

export default BlockHeader;
