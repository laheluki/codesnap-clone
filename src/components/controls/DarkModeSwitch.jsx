import Store from "@/lib/store";
import { Switch } from "../ui/switch";

const DarkModeSwitch = () => {
  const darkMode = Store((state) => state.darkMode);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-500">
        Dark Mode
      </label>
      <Switch
        checked={darkMode}
        onCheckedChange={(checked) => Store.setState({ darkMode: checked })}
        className="my-1.5"
      />
    </div>
  );
};

export default DarkModeSwitch;
