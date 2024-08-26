import { fonts } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Store from "@/lib/store";

export default function FontSelect() {
  const fontStyle = Store((state) => state.fontStyle);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Font
      </label>
      <Select
        value={fontStyle}
        onValueChange={(fontStyle) => Store.setState({ fontStyle })}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Font" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          {Object.entries(fonts).map(([id, font]) => (
            <SelectItem key={id} value={id}>
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
