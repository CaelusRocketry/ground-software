import React from "react";

const BlockHeader = (props: { colors: string[]; children: string }) => {
  const colors = props.colors;
  const words = props.children.split(" ");

  return (
    <h3 className="text-lg font-bold">
      {words.map((word, index) => (
        <span style={{ color: colors[index] }}>{words[index] + " "}</span>
      ))}
    </h3>
  );
};

export default BlockHeader;
