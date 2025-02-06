import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateNodeColor, updateNodeFontSize, updateNodePosition } from "../store/graphSlice";
import { undo, redo, addToPast } from "../store/historySlice";
import { Position } from "../store/historySlice";
import ColorPicker from "../ColorPicker/ColorPicker";
import FontSizeControl from "../FontSizeControl/FontSizeControl";

const UndoRedoControls = () => {
  const dispatch = useDispatch();
  const selectedNode = useSelector((state: RootState) => state.graph.selectedNode);
  const nodes = useSelector((state: RootState) => state.graph.nodes);
  const history = useSelector((state: RootState) => state.history);
  const selectedNodeData = nodes.find((n) => n.id === selectedNode)?.data;

  const handleColorChange = (color: string) => {
    if (selectedNode && selectedNodeData) {
      const prevColor = selectedNodeData.color || "#2563eb";
      dispatch(addToPast({ id: selectedNode, type: "color", prevValue: prevColor, newValue: color }));
      dispatch(updateNodeColor({ id: selectedNode, color }));
    }
  };

  const handleFontSizeChange = (size: number[]) => {
    if (selectedNode && selectedNodeData) {
      const newSize = size[0];
      const prevSize = selectedNodeData.fontSize || 14;
      dispatch(addToPast({ id: selectedNode, type: "fontSize", prevValue: prevSize, newValue: newSize }));
      dispatch(updateNodeFontSize({ id: selectedNode, fontSize: newSize }));
    }
  };

  const handleUndo = () => {
    const lastAction = history.past[history.past.length - 1];
    if (lastAction) {
      if (lastAction.type === "color") {
        dispatch(updateNodeColor({ id: lastAction.id, color: lastAction.prevValue.toString() }));
      } else if (lastAction.type === "fontSize") {
        dispatch(updateNodeFontSize({ id: lastAction.id, fontSize: Number(lastAction.prevValue) }));
      } else if (lastAction.type === "position") {
        dispatch(updateNodePosition({ id: lastAction.id, position: lastAction.prevValue as Position }));
      }
      dispatch(undo());
    }
  };

  const handleRedo = () => {
    const nextAction = history.future[0];
    if (nextAction) {
      if (nextAction.type === "color") {
        dispatch(updateNodeColor({ id: nextAction.id, color: nextAction.newValue.toString() }));
      } else if (nextAction.type === "fontSize") {
        dispatch(updateNodeFontSize({ id: nextAction.id, fontSize: Number(nextAction.newValue) }));
      } else if (nextAction.type === "position") {
        dispatch(updateNodePosition({ id: nextAction.id, position: nextAction.newValue as Position }));
      }
      dispatch(redo());
    }
  };

  return (
    <div className="rounded-lg border bg-white text-gray-900 shadow-md p-6 w-72">
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleUndo}
          disabled={history.past.length === 0}
          className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          disabled={history.future.length === 0}
          className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Redo
        </button>
      </div>

      {selectedNode && (
        <div className="space-y-6">
          <ColorPicker color={selectedNodeData?.color || "#2563eb"} onChange={handleColorChange} />
          <FontSizeControl fontSize={selectedNodeData?.fontSize || 14} onChange={handleFontSizeChange} />
        </div>
      )}
    </div>
  );
};

export default UndoRedoControls;
