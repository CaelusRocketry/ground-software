import React, { forwardRef } from "react";

type Props = {
  label: string;
  optionNames: Record<string | number, string>;
  options: Set<keyof Props["optionNames"]> | Array<keyof Props["optionNames"]>;
  onChange?: (ev: any) => void;
  value?: keyof Props["optionNames"];
};

const ButtonPaneSelector = (
  {
    label,
    options,
    optionNames,
    onChange = undefined,
    value = undefined,
  }: Props,
  ref: React.ForwardedRef<HTMLSelectElement>
) => (
  <div className="" style={{display: "inline"}}>
    <b>
      <label>{label}: </label>
    </b>
    {/* {console.log("OPTIONS")}
    {console.log(options)} */}
    <select
      ref={ref}
      onChange={onChange}
      value={value}
      className="ml-2 mr-4 border-2"
    >
      <option className="hidden" />
      {Array.from(options).map((option) => (
        <option value={option} key={option}>
          {console.log(option)}
          {console.log(optionNames[option])}
          {optionNames[option]}
        </option>
      ))}
    </select>
  </div>
);

export default forwardRef(ButtonPaneSelector);
