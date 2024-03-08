import React from "react";
import { Handle } from "reactflow";
import { TiMessage } from "react-icons/ti";

const CustomNode = ({ data }) => {
  return (
    <div style={{}}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#B2F0E5",
          color: "#fff",
          borderRadius: 10,
          padding: "0px 5px",
        }}
      >
        <TiMessage style={{ marginRight: 5 }} />
        <p style={{ fontSize: "10px", display: "inline", fontWeight:"bold" }}>Send Message</p>
      </div>
      <h6 style={{textAlign:"center", margin: '10px 0px', fontWeight:"bold"}}>{data.label}</h6>
      <Handle type="source" position="left" style={{ left: 0 }} />
      <Handle type="target" position="right" style={{ right: 0 }} />
    </div>
  );
};

export default CustomNode;
