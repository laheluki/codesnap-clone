import toast from "react-hot-toast";
import { Input } from "../ui/input";
import Store from "@/lib/store";

function CustomImage() {
  //   const image = Store((state) => state.image);
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (
      (file && file.type === "image/png") ||
      file.type === "image/svg+xml" ||
      file.type === "image/jpeg" ||
      file.type === "image/gif" ||
      file.type === "image/tiff" ||
      file.type === "image/webp" ||
      file.type === "image/bmp"
    ) {
      Store.setState({ image: URL.createObjectURL(file) });
      toast.success("Image loaded");
    } else {
      toast.error("Image type not supported");
    }
  };
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Custom Image
      </label>
      <Input
        type="file"
        accept="image/jpeg, image/png, image/gif, image/bmp, image/tiff, image/webp"
        className="!dark w-full bg-white"
        onChange={handleChange}
      />
    </div>
  );
}

export default CustomImage;
