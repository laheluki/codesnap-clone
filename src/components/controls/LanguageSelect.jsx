import { languages } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Store from "@/lib/store";
import { WandIcon } from "lucide-react";

export default function LanguageSelect() {
  const language = Store((state) => state.language);
  const autoDetectLanguage = Store((state) => state.autoDetectLanguage);

  const handleChange = (language) => {
    if (language === "auto-detect") {
      Store.setState({ autoDetectLanguage: true, language: "plaintext" });
    } else {
      Store.setState({ autoDetectLanguage: false, language });
    }
  };
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-neutral-400">
        Language
      </label>
      <Select value={language} onValueChange={handleChange}>
        <SelectTrigger className="w-40">
          {autoDetectLanguage && <WandIcon className="mr-2" />}
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="dark max-h-[500px]">
          <SelectItem value="auto-detect">Auto Detect</SelectItem>
          {Object.entries(languages).map(([lang, name]) => (
            <SelectItem key={lang} value={lang}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
