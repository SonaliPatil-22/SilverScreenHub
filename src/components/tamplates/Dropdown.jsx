import React from "react";

const Dropdown = ({ title, options, fun }) => {
  return (
    <div className="select ">
      <select
        defaultValue="0"
        name="format"
        id="format"
        onChange={fun}
        className=" bg-zinc-800   rounded-sm p-1 text-white hover:bg-[#6556CD]"
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
