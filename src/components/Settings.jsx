import React from "react";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  margin: "10px",
};

const labelStyle = {
  marginBottom: "5px",
  fontSize: "14px",
  color: "#333", // Dark gray text color
};

const inputStyle = {
  padding: "8px",
  fontSize: "16px",
  border: "1px solid #ccc", // Light gray border
  borderRadius: "5px",
  outline: "none", // Remove the outline on focus
};

const Settings = ({ setNodeName, nodeName, selectedNodeId }) => {
  return (
    <div style={{ border: "1px solid #ccc" }}>
      <h6 style={{ ...labelStyle, textAlign: "center" }}>Message</h6>
      <div style={containerStyle}>
        <label htmlFor="myInput" style={labelStyle}>
          Text:
        </label>
        <input
          type="text"
          id="myInput"
          placeholder="Type here..."
          style={inputStyle}
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
          onBlur={() => selectedNodeId(null)}
        />
      </div>
    </div>
  );
};

export default Settings;
