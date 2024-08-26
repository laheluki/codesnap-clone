/* eslint-disable react/prop-types */
import { DownloadIcon, ImageIcon, Link2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toBlob, toPng, toSvg } from "html-to-image";
import toast from "react-hot-toast";
import Store from "@/lib/store";
import { useHotkeys } from "react-hotkeys-hook";

const ExportOptions = ({ target }) => {
  const title = Store((state) => state.title);

  const copyImage = async () => {
    const loading = toast.loading("Copying...");
    console.log(target);

    try {
      const imgBlob = await toBlob(target.current, {
        pixelRatio: 2,
      });

      const img = new ClipboardItem({ "image/png": imgBlob });
      navigator.clipboard.write([img]);

      toast.remove(loading);
      toast.success("Image copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.remove(loading);
      toast.error("Something went wrong");
    }
  };

  const copyLink = () => {
    try {
      const state = Store.getState();
      const queryParams = new URLSearchParams({
        ...state,
        code: btoa(state.code),
      }).toString();

      navigator.clipboard.writeText(`${location.href}?${queryParams}`);
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const saveImage = async (name, format) => {
    const loading = toast.loading(`Saving ${format} image...`);

    try {
      let imgUrl, filename;
      switch (format) {
        case "PNG":
          imgUrl = await toPng(target.current, { pixelRatio: 2 });
          filename = `${name}.png`;
          break;
        case "SVG":
          imgUrl = await toSvg(target.current, { pixelRatio: 2 });
          filename = `${name}.svg`;
          break;

        default:
          return;
      }

      const a = document.createElement("a");
      a.href = imgUrl;
      a.download = filename;
      a.click();

      toast.remove(loading);
      toast.success("Image saved");
    } catch (error) {
      toast.remove(loading);
      toast.error("Something went wrong");
    }
  };

  useHotkeys("ctrl+c", copyImage);
  useHotkeys("shift+ctrl+c", copyLink);
  useHotkeys("ctrl+s", () => saveImage(title, "PNG"));
  useHotkeys("shift+ctrl+s", () => saveImage(title, "SVG"));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mr-2">Export</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark">
        <DropdownMenuItem className="gap-2" onClick={copyImage}>
          <ImageIcon />
          Copy Image
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" onClick={copyLink}>
          <Link2Icon />
          Copy Link
          <DropdownMenuShortcut>⇧⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, "PNG")}
        >
          <DownloadIcon />
          Save as PNG
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onClick={() => saveImage(title, "SVG")}
        >
          <DownloadIcon />
          Save as SVG
          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportOptions;
