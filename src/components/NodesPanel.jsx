import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div style={{border:"1px solid #ccc", height: '80vh', borderRadius:20}}>
      <div
        style={{
          border: "1px solid blue",
          display: "flex",
          alignItems: "center",
          flexDirection:"column", 
          borderRadius:"20px"
        }}
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        <BiMessageRoundedDetail style={{ color: "blue", fontSize: "50px" }} />
        <h6 style={{ color: "blue", fontSize: "14px" }}>Message</h6>
      </div>
      </div>
    </aside>
  );
};
