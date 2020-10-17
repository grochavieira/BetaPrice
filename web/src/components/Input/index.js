import React from "react";

import "./styles.scss";

const Input = ({ name, label, placeholder, type, value, setValue }) => {
  return (
    <div className="input-block">
      <input
        name={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Input;
