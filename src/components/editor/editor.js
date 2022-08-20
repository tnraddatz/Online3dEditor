import React, {useState, useEffect} from "react";
import SplitPane, {Pane} from "react-split-pane";
import './editor.css'
import { useDebounce } from "../../utils/debounce";
import { JavascriptEditor, HtmlEditor } from "./editors";

const Editor =  () => {
  //visual effects
  const innerHeightSubtractionForTitles = 60;
  const [heightValue, setHeightValue] = useState(window.innerHeight/2);
  const previewTitle = "Preview";
  //--------------

  //HTML Document Output values 
  const [jsValue, setJsValue] = useState("");
  const [htmlValue, setHtmlValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const debouncedJs = useDebounce(jsValue, 1000);
  const debouncedHtml = useDebounce(htmlValue, 1000);

  useEffect(() => {
    const output = `<html>
                    <body>
                    ${debouncedHtml}
                    <script type="text/javascript">
                    ${debouncedJs}
                    </script>
                    </body>
                  </html>`;
    setOutputValue(output);
  }, [debouncedJs, debouncedHtml]);
  //----------------------------

  //Returned Component
  return (
    <SplitPane split="vertical" minSize={"50%"}>
      <SplitPane split="horizontal" minSize={"50%"} onDragFinished={(height) => {
        setHeightValue(height);
      }}>
        <Pane className={"none"}>
          <JavascriptEditor 
            height={(heightValue - innerHeightSubtractionForTitles).toString() + "px"}          
            value={jsValue}
            onChange={setJsValue}
          />
        </Pane>
        <Pane className={"none"}>
          <HtmlEditor
            height={(window.innerHeight - heightValue - innerHeightSubtractionForTitles).toString() + "px"}        
            value={htmlValue}
            onChange={setHtmlValue}
          />
        </Pane>
      </SplitPane>
      <div className={"editorContainer"}>
        <div className={"editorTitle"}>{previewTitle}</div>
        <iframe
          title={previewTitle} 
          srcDoc={outputValue}
          width={"99%"}
          height={(window.innerHeight - innerHeightSubtractionForTitles).toString() + "px"}
          scrolling="no"
          className={"iframe"} />
      </div>
    </SplitPane>
  );
  //-----------------
};

export default Editor;