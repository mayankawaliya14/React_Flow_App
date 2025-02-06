
import { ReactFlow, Background, Controls, NodeTypes } from '@xyflow/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { updateNodePosition } from '../store/graphSlice';
import { addToPast } from '../store/historySlice';
import NodeCustomizationPanel from './NodeCustomizationPanel';
import '@xyflow/react/dist/style.css';

const nodeTypes: NodeTypes = {
  custom: NodeCustomizationPanel
};

const Graph = () => {
  const dispatch = useDispatch();
  const { nodes, edges } = useSelector((state: RootState) => state.graph);

  const onNodeDragStop = (_: any, node: any) => {
    const prevNode = nodes.find(n => n.id === node.id);
    if (prevNode) {
      dispatch(addToPast({
        id: node.id,
        type: 'position',
        prevValue: prevNode.position,
        newValue: node.position
      }));
    }
    dispatch(updateNodePosition({ id: node.id, position: node.position }));
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeDragStop={onNodeDragStop}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Graph;
