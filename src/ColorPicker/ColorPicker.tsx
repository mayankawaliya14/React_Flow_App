import React from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="font-medium text-sm">Color</label>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded border border-gray-300 cursor-pointer"
      />
    </div>
  );
};

export default ColorPicker;
