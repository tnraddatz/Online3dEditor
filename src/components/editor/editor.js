import React, {useState} from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import SplitPane, { Pane } from "react-split-pane";
import './editor.css'

const Editor =  () => {
  const [height, SetHeight] = useState(window.innerHeight - 50);
  function handleResize () {
    SetHeight(window.innerHeight - 50)
  }
  window.addEventListener('resize', handleResize)
  return (
    <SplitPane split="vertical" minSize={"50%"}>
      <div className={"editorContainer"}>
        <div className={"editorTitle"}>
          <Pane initialSize="50%" minSize="10%">
          <AceEditor
            mode={'javascript'}
            theme="monokai"
            name={'JavaScript'}
            fontSize={18}
            width={"100%"}
            showPrintMargin={true}
            showGutter={true}
            tabSize={2}
            height={height}
            setOptions={{ useWorker: false }}    
          />
          </Pane>
        </div>
      </div>
      <div className={"editorContainer"}>
        <div className={"editorTitle"}>
          <Pane initialSize="50%" minSize="10%">
            Preview
          </Pane>
        </div>
      </div>
    </SplitPane>
  );
};

export default Editor;