import React from "react";

import "./styles.css";

const Input = ({ name, label, placeholder, type }) => {
  return (
    <div className="input-block">
      <input
        name={name}
        type={type ? type : "text"}
        placeholder={placeholder}
        required
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Input;
