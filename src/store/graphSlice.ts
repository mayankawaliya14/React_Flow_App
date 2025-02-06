import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node, Edge } from '@xyflow/react';

interface GraphState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: string | null;
}

const initialNodes: Node[] = Array.from({ length: 10 }, (_, i) => ({
  id: `node-${i}`,
  type: 'custom',
  position: { 
    x: Math.cos(i * Math.PI * 2 / 10) * 200 + 300,
    y: Math.sin(i * Math.PI * 2 / 10) * 200 + 300
  },
  data: { 
    label: `Node ${i + 1}`,
    color: '#2563eb',
    fontSize: 14
  }
}));

const initialEdges: Edge[] = Array.from({ length: 10 }, (_, i) => ({
  id: `edge-${i}`,
  source: `node-${i}`,
  target: `node-${(i + 1) % 10}`,
  type: 'smoothstep'
}));

const initialState: GraphState = {
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null
};

export const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    updateNodePosition: (state, action: PayloadAction<{ id: string; position: { x: number; y: number } }>) => {
      const node = state.nodes.find(n => n.id === action.payload.id);
      if (node) {
        node.position = action.payload.position;
      }
    },
    updateNodeColor: (state, action: PayloadAction<{ id: string; color: string }>) => {
      const node = state.nodes.find(n => n.id === action.payload.id);
      if (node && node.data) {
        node.data.color = action.payload.color;
      }
    },
    updateNodeFontSize: (state, action: PayloadAction<{ id: string; fontSize: number }>) => {
      const node = state.nodes.find(n => n.id === action.payload.id);
      if (node && node.data) {
        node.data.fontSize = action.payload.fontSize;
      }
    },
    setSelectedNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNode = action.payload;
    }
  }
});

export const { 
  updateNodePosition, 
  updateNodeColor, 
  updateNodeFontSize,
  setSelectedNode 
} = graphSlice.actions;

export default graphSlice.reducer;