import React, {useState, useEffect} from "react";
import SplitPane from "react-split-pane";
import './editor.css'
import { useDebounce } from "../../utils/debounce";
import { JavascriptEditor } from "./editors";

const Editor =  () => {
  //visual effects
  const innerHeightSubtraction = 60;
  const [height, setHeight] = useState(window.innerHeight - innerHeightSubtraction)
  const previewTitle = "Preview";

  // window.addEventListener('resize', function(event){
  //   setHeight(window.height - innerHeightSubtraction)
  // });
  //--------------

  //HTML Document Output values 
  const [jsValue, setJsValue] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const debouncedJs = useDebounce(jsValue, 1000);

  useEffect(() => {
    const output = `<!DOCTYPE html>
                    <html lang="en">
                      <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Virtual Visit</title>

                        <style>
                            html, body {
                                overflow: hidden;
                                width: 100%;
                                height: 100%;
                                margin: 0;
                                padding: 0;
                            }

                            #renderCanvas {
                                width: 100%;
                                height: 100%;
                                touch-action: none;
                            }
                        </style>

                        <script src="https://cdn.babylonjs.com/babylon.js"></script>
                        <script src="https://cdn.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
                        <script src="https://code.jquery.com/pep/0.4.3/pep.js"></script>
                      </head>
                    <body>
                    <canvas id="renderCanvas" touch-action="none"></canvas> <!-- touch-action="none" for best results from PEP -->
                    <script type="text/javascript">
                    //SETUP PLAYGROUND
                    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
                    const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
                    //---------------

                    //PLAYGROUND
                    ${debouncedJs}
 
                    //END PLAYGROUND
                    //-- RENDER SCENE --             
                    createScene().then(sceneToRender => {
                      engine.runRenderLoop(() => sceneToRender.render());
                    });

                    // Watch for browser/canvas resize events
                    window.addEventListener("resize", function () {
                            engine.resize();
                    });
                    </script>
                    </body>
                  </html>`;
    setOutputValue(output);
  }, [debouncedJs]);
  //----------------------------

  //Returned Component
  return (
    <SplitPane split="vertical" allowResize={false} minSize={"65%"}>
          <JavascriptEditor         
            value={jsValue}
            onChange={setJsValue}
            height={"92%"}
          />
      <div className={"editorContainer"}>
        <div className={"editorTitle"}>{previewTitle}</div>
        <iframe
          title={previewTitle} 
          srcDoc={outputValue}
          width={"99%"}
          height={"92%"}
          scrolling="no"
          className={"iframe"} />
      </div>
    </SplitPane>
  );
  //-----------------
};

export default Editor;