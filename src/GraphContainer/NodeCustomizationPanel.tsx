import { Handle, Position } from '@xyflow/react';
import { useDispatch } from 'react-redux';
import { setSelectedNode } from '../store/graphSlice';

interface NodeCustomizationPanelData {
  label: string;
  color: string;
  fontSize: number;
}

const NodeCustomizationPanel = ({ id, data }: { id: string, data: NodeCustomizationPanelData }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="custom-node"
      style={{
        background: data.color || '#2563eb',
        fontSize: `${data.fontSize || 14}px`,
        padding: '10px 20px',
        borderRadius: '8px',
        color: '#fff',
        cursor: 'pointer'
      }}
      onClick={() => dispatch(setSelectedNode(id))}
    >
      <Handle type="target" position={Position.Top} />
      {data.label}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default NodeCustomizationPanel;