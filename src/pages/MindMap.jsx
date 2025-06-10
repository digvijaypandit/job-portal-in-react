import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ToastContainer,
  toast
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";
import Navbar from "../components/comman/Navbar";

const nodeWidth = 200;
const nodeHeight = 80;
const colors = ['#fde68a', '#a7f3d0', '#bfdbfe', '#fca5a5', '#c4b5fd'];

const API_URL = import.meta.env.VITE_BASE_URL;

const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };
    return node;
  });

  return { nodes: layoutedNodes, edges };
};

export default function Roadmap() {
  const [inputLabel, setInputLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullTree, setFullTree] = useState(null);
  const [expandedNodeIds, setExpandedNodeIds] = useState(new Set(["1"]));

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [hoveredNodeLabel, setHoveredNodeLabel] = useState("");
  const [wikiSummary, setWikiSummary] = useState("");
  const abortControllerRef = useRef(null);

  const rebuildGraph = useCallback((treeRoot, expandedSet) => {
    let idCounter = 1;
    let nodeList = [];
    let edgeList = [];

    function traverse(node, parentId = null, depth = 0) {
      const nodeId = `${idCounter++}`;

      const isExpanded = expandedSet.has(nodeId);
      nodeList.push({
        id: nodeId,
        data: {
          label: `${node.label} ${node.children?.length ? (isExpanded ? "[-]" : "[+]") : ""}`,
        },
        position: { x: 0, y: 0 },
        style: {
          padding: 12,
          borderRadius: 10,
          border: "2px solid #1d4ed8",
          backgroundColor: colors[depth % colors.length],
          fontWeight: "600",
          minWidth: nodeWidth,
          textAlign: "center",
          cursor: "pointer",
          boxShadow: "0 8px 16px rgba(30, 64, 175, 0.2)",
          transition: "transform 0.3s, box-shadow 0.3s",
        },
      });

      if (parentId) {
        edgeList.push({
          id: `e${parentId}-${nodeId}`,
          source: parentId,
          target: nodeId,
          animated: true,
          style: { stroke: "#1d4ed8", strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#1d4ed8",
          },
        });
      }

      if (expandedSet.has(nodeId) && node.children?.length) {
        node.children.forEach((child) => traverse(child, nodeId, depth + 1));
      }
    }

    traverse(treeRoot);

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodeList,
      edgeList
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [setNodes, setEdges]);

  const fetchRoadmap = useCallback(async () => {
    if (!inputLabel.trim()) {
      toast.error("Please enter a job title or skill.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/roadmap/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodeLabel: inputLabel }),
      });

      if (!res.ok) throw new Error("Failed to fetch roadmap");

      const data = await res.json();
      setFullTree(data.node);
      const initialExpanded = new Set(["1"]);
      setExpandedNodeIds(initialExpanded);
      rebuildGraph(data.node, initialExpanded);
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
      setNodes([]);
      setEdges([]);
    } finally {
      setLoading(false);
    }
  }, [inputLabel, rebuildGraph]);

  const handleNodeClick = useCallback((event, node) => {
    const label = node.data.label;
    const isExpandable = label.includes("[+]") || label.includes("[-]");

    if (!isExpandable) return;

    const nodeId = node.id;
    setExpandedNodeIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      if (fullTree) {
        rebuildGraph(fullTree, newSet);
      }
      return newSet;
    });
  }, [fullTree, rebuildGraph]);

  const handleNodeHover = useCallback(async (event, node) => {
    const cleanLabel = node.data.label.replace(/\[\+\]|\[\-\]/g, "").trim();
    setHoveredNodeLabel(cleanLabel);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanLabel)}`,
        { signal: controller.signal }
      );

      if (!response.ok) throw new Error("No summary found");
      const data = await response.json();
      setWikiSummary(data.extract);
    } catch (error) {
      setWikiSummary("No summary available.");
    }
  }, []);

  const handleNodeLeave = useCallback(() => {
    setHoveredNodeLabel("");
    setWikiSummary("");
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  useEffect(() => {
    if (inputLabel.trim()) {
      fetchRoadmap();
    }
  }, []); // optionally auto-load

  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen px-8 py-6 bg-gradient-to-br from-blue-50 to-white mt-8">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold text-blue-800 tracking-tight">
                Career Roadmap Explorer
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                Enter a role or skill to generate your custom roadmap.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <input
                type="text"
                value={inputLabel}
                onChange={(e) => setInputLabel(e.target.value)}
                placeholder="e.g. Software Developer, Data Scientist"
                className="w-full sm:w-96 border border-blue-300 rounded-lg px-5 py-3 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-shadow shadow-md"
              />
              <button
                onClick={fetchRoadmap}
                disabled={loading}
                className="bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Generate"}
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow border border-blue-100 rounded-2xl shadow-2xl bg-white overflow-hidden relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-60">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-700" />
            </div>
          )}

          {hoveredNodeLabel && (
            <div className="absolute top-4 right-4 w-96 bg-white p-4 shadow-xl border border-gray-300 rounded-lg z-20">
              <h2 className="text-lg font-bold mb-2 text-blue-700">{hoveredNodeLabel}</h2>
              <p className="text-gray-700 text-sm">{wikiSummary || "Loading summary..."}</p>
            </div>
          )}

          {nodes.length === 0 && !loading ? (
            <div className="flex items-center justify-center h-full text-gray-400 text-xl font-medium">
              Start by entering a job title or skill above.
            </div>
          ) : (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
              attributionPosition="bottom-left"
              nodesDraggable={true}
              nodesConnectable={false}
              selectNodesOnDrag={true}
              zoomOnScroll={true}
              zoomOnPinch={true}
              panOnScroll={true}
              onNodeClick={handleNodeClick}
              onNodeMouseEnter={handleNodeHover}
              onNodeMouseLeave={handleNodeLeave}
            >
              <Controls />
              <Background color="#e2e8f0" gap={20} />
            </ReactFlow>
          )}
        </main>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}
