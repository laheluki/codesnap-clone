import Store from "@/lib/store";
import { Switch } from "@/components/ui/switch";

const BackgroundSwitch = () => {
  const showBg = Store((state) => state.showBackground);

  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-500">
        Background
      </label>
      <Switch
        checked={showBg}
        onCheckedChange={(checked) =>
          Store.setState({ showBackground: checked })
        }
        className="my-1.5"
      />
    </div>
  );
};

export default BackgroundSwitch;
