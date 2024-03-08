import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  addEdge,
  getConnectedEdges,
} from "reactflow";
import "reactflow/dist/style.css";
import Sidebar from "./NodesPanel";
import Settings from "./Settings";
import CustomNode from "./CustomNode";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const nodeTypes = {
  default: CustomNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const UpdateNode = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null); // New state for tracking selected node ID
  const [nodeName, setNodeName] = useState("");

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  useEffect(() => {
    if (selectedNodeId) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNodeId) {
            node.data = {
              ...node.data,
              label: nodeName,
            };
          }
          return node;
        })
      );
    }
  }, [nodeName, selectedNodeId, setNodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const hasEmptyTargetHandle = (node, edges) => {
    // Check if the node has any incoming edges
    const hasIncomingEdge = edges.some((edge) => edge.target === node.id);
    return !hasIncomingEdge;
  };

  const countEmptyTargetHandles = (nodes, edges) => {
    let count = 0;
    nodes.forEach((node) => {
      if (hasEmptyTargetHandle(node, edges)) {
        count++;
      }
    });
    return count;
  };

  const handleSave = () => {
    const nodesWithEmptyTargetHandles = countEmptyTargetHandles(nodes, edges);
    if (nodes.length > 1) {
      if (nodes.length > 1 && nodesWithEmptyTargetHandles > 1) {
        // Show an error message
        toast("Error: There are more than one Node with empty target handles.");
      } else {
        // Save the flow
        toast("Flow saved successfully!");
      }
    }
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `Message ${id}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // New function to handle node selection
  const onNodeClick = useCallback((event, node) => {
    setSelectedNodeId(node.id);
    setNodeName(node.data.label);
  }, []);

  return (
    <div>
      <button
        onClick={handleSave}
        className="save-button"
      >
        Save Changes
      </button>
      <div
        className="dndflow"
        style={{ height: "80vh", border: "1px solid #ccc", borderRadius: 1 }}
      >
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onConnect={onConnect}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              defaultViewport={defaultViewport}
              minZoom={0.2}
              maxZoom={4}
              attributionPosition="bottom-left"
              onDrop={onDrop}
              onDragOver={onDragOver}
              onInit={setReactFlowInstance}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
            />
          </div>
          {selectedNodeId ? (
            <Settings
              setNodeName={setNodeName}
              nodeName={nodeName}
              selectedNodeId={setSelectedNodeId}
            />
          ) : (
            <Sidebar />
          )}
        </ReactFlowProvider>
        <ToastContainer />
      </div>
    </div>
  );
};

export default UpdateNode;
