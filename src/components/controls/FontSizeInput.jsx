import Store from "@/lib/store";
import { Input } from "../ui/input";

export default function FontSizeInput() {
  const fontSize = Store((state) => state.fontSize);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Font Size
      </label>
      <Input
        type="number"
        className="!dark w-16 bg-transparent"
        min={6}
        value={fontSize}
        onChange={(e) => Store.setState({ fontSize: Number(e.target.value) })}
      />
    </div>
  );
}
