import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

interface FontSizeControlProps {
  fontSize: number;
  onChange: (size: number[]) => void;
}

const FontSizeControl: React.FC<FontSizeControlProps> = ({ fontSize, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="font-medium text-sm">Font Size</label>
      <div className="relative flex w-full touch-none select-none items-center">
        <SliderPrimitive.Root
          defaultValue={[fontSize]}
          min={12}
          max={24}
          step={1}
          onValueChange={onChange}
          className="relative flex w-full touch-none select-none items-center"
        >
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-300">
            <SliderPrimitive.Range className="absolute h-full bg-blue-500" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-blue-500 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
        </SliderPrimitive.Root>
      </div>
      <div className="text-sm text-gray-500">{fontSize}px</div>
    </div>
  );
};

export default FontSizeControl;
