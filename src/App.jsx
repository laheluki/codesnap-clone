import { useEffect, useRef, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Resizable } from "re-resizable";

// Utils
import { cn } from "@/lib/utils";
import Store from "@/lib/store";

// Constants
import { fonts, themes } from "@/constants";

// Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeEditor from "@/components/CodeEditor";
import ExportOptions from "./components/controls/ExportOptions";
import ThemeSelect from "./components/controls/ThemeSelect";
import LanguageSelect from "./components/controls/LanguageSelect";
import FontSelect from "./components/controls/FontSelect";
import FontSizeInput from "./components/controls/FontSizeInput";
import PaddingSlider from "./components/controls/PaddingSlider";
import BackgroundSwitch from "./components/controls/BackgroundSwitch";
import DarkModeSwitch from "./components/controls/DarkModeSwitch";
import WidthMeasurement from "./components/WidtMeasurement";

import "./App.css";
import CustomImage from "./components/controls/CustomImage";

function App() {
  const [width, setWidth] = useState("auto");
  const [showWidth, setShowWidth] = useState(false);

  const theme = Store((state) => state.theme);
  const padding = Store((state) => state.padding);
  const fontStyle = Store((state) => state.fontStyle);
  const showBackground = Store((state) => state.showBackground);
  // const image = Store((state) => state.image);

  const editorRef = useRef();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.size === 0) return;
    const state = Object.fromEntries(queryParams);

    Store.setState({
      ...state,
      code: state.code ? atob(state.code) : "",
      autoDetectLanguage: state.autoDetectLanguage === "true",
      darkMode: state.darkMode === "true",
      fontSize: Number(state.fontSize || 18),
      padding: Number(state.padding || 64),
    });
  }, []);

  return (
    <main className="dark min-h-screen flex justify-center items-center bg-zinc-600 text-white">
      <link
        rel="stylesheet"
        href={themes[theme].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle].src}
        crossOrigin="anonymous"
      />

      <Resizable
        enable={{ left: true, right: true }}
        minWidth={padding * 2 + 400}
        size={{ width }}
        onResize={(e, dir, ref) => setWidth(ref.offsetWidth)}
        onResizeStart={() => setShowWidth(true)}
        onResizeStop={() => setShowWidth(false)}
      >
        <div
          className={cn(
            "overflow-hidden mb-2 transition-all ease-out",
            showBackground ? themes[theme].background : "ring ring-neutral-900"
          )}
          style={{ padding }}
          ref={editorRef}
        >
          <CodeEditor />
        </div>
        <WidthMeasurement show={showWidth} width={width} />
        <div
          className={cn(
            "transition-opacity w-fit mx-auto -mt-4",
            showWidth || width === "auto"
              ? "invisible opacity-0"
              : "visible opacity-100"
          )}
        >
          <Button size="sm" onClick={() => setWidth("auto")} variant="ghost">
            <RefreshCw className="mr-2" />
            Reset Width
          </Button>
        </div>
      </Resizable>

      <Card className="fixed bottom-0 py-3 px-8 mx-6 bg-neutral-900/90 backdrop-blur">
        <CardContent className="flex flex-wrap gap-3 p-0">
          <ThemeSelect />
          <LanguageSelect />
          <FontSelect />
          <FontSizeInput />
          <CustomImage />
          <PaddingSlider />
          <BackgroundSwitch />
          <DarkModeSwitch />
          <div className="w-px bg-neutral-800" />
          <div className="place-self-center">
            <ExportOptions target={editorRef} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default App;
