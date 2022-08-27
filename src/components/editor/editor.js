import React, {useState, useEffect} from "react";
import SplitPane from "react-split-pane";
import './editor.css'
import { useDebounce } from "../../utils/debounce";
import { JavascriptEditor } from "./editors";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
const Editor =  () => {
  //visual effects
  const previewTitle = "Preview";
  const height = "80%";
  //HTML Document Output values 
  const [jsValue, setJsValue] = useState(`

  var createScene = async function () {
  
      await Ammo() 
      // This creates a basic Babylon Scene object (non-mesh)
      var scene = new BABYLON.Scene(engine);
  
      scene.clearColor = new BABYLON.Color3(0.31, 0.48, 0.64);
  
      //add an arcRotateCamera to the scene
      var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(125), BABYLON.Tools.ToRadians(70), 25, new BABYLON.Vector3(0, 3, 0), scene);
      camera.lowerRadiusLimit = 10;
      //camera.upperRadiusLimit = 40;
  
      // This attaches the camera to the canvas
      camera.attachControl(canvas, true);
  
      //enable physics in the scene
      scene.enablePhysics(new BABYLON.Vector3(0,-9.8,0), new BABYLON.AmmoJSPlugin());
  
      //array for holding the cannon and "paired" animation group
      var cannonAnimationPairings = {};
  
      //array for holding readyToPlay status for the cannons
      var cannonReadyToPlay = {};
  
      //create a cannonBall template to clone from, set it's visibility to off.
      var cannonBall = BABYLON.MeshBuilder.CreateSphere("cannonBall", {diameter: 0.3}, scene);
      var cannonBallMat = new BABYLON.StandardMaterial("cannonBallMaterial", scene);
      cannonBallMat.diffuseColor = BABYLON.Color3.Black();
      cannonBallMat.specularPower = 256;
      cannonBall.material = cannonBallMat;
      cannonBall.visibility = false;
  
      //create a large box far underneath the tower, that will act as a trigger to destroy the cannonballs.
      var killBox = BABYLON.MeshBuilder.CreateBox("killBox", {width:400, depth:400, height:4}, scene);
      killBox.position = new BABYLON.Vector3(0,-50,0);
      killBox.visibility = 0;
  
      //Load the tower assets
      const pirateFortImport = await BABYLON.SceneLoader.ImportMeshAsync("", "https://models.babylonjs.com/pirateFort/", "pirateFort.glb", scene);
      pirateFortImport.meshes[0].name = "pirateFort"
      scene.getMeshByName("sea").material.needDepthPrePass = true;
      scene.getLightByName("Sun").intensity = 12;
  
      //Load the cannon model and create clones
      const cannonImportResult = await BABYLON.SceneLoader.ImportMeshAsync("", "https://models.babylonjs.com/pirateFort/", "cannon.glb", scene);
      //remove the top level root node
      var cannon = cannonImportResult.meshes[0].getChildren()[0];
      cannon.setParent(null);
      cannonImportResult.meshes[0].dispose();
  
      //set the metadata of each mesh to filter on later
      var cannonMeshes = cannon.getChildMeshes();
      for (var i = 0; i < cannonMeshes.length; i++) {
          cannonMeshes[i].metadata = "cannon";
      }
  
      const importedAnimGroups = cannonImportResult.animationGroups;
  
      //loop through all imported animation groups and copy the animation curve data to an array.
      var animations = [];
      for (var i = 0; i < importedAnimGroups.length; i++) {
          importedAnimGroups[i].stop();
          animations.push(importedAnimGroups[i].targetedAnimations[0].animation);
          importedAnimGroups[i].dispose();
      }
  
      //create a new animation group and add targeted animations based on copied curve data from the "animations" array.
      var cannonAnimGroup = new BABYLON.AnimationGroup("cannonAnimGroup");
      cannonAnimGroup.addTargetedAnimation(animations[0], cannon.getChildMeshes()[1]);
      cannonAnimGroup.addTargetedAnimation(animations[1], cannon.getChildMeshes()[0]);
      
      //create a box for particle emission, position it at the muzzle of the cannon, turn off visibility and parent it to the cannon mesh
      var particleEmitter = BABYLON.MeshBuilder.CreateBox("particleEmitter", {size: 0.05}, scene);
      particleEmitter.position = new BABYLON.Vector3(0, 0.76, 1.05);
      particleEmitter.rotation.x = BABYLON.Tools.ToRadians(78.5);
      particleEmitter.isVisible = false;
      particleEmitter.setParent(cannon.getChildMeshes()[1]);
      
      //load particle system from the snippet server and set the emitter to the particleEmitter. Set its stopDuration.
      const smokeBlast = await BABYLON.ParticleHelper.CreateFromSnippetAsync("LCBQ5Y#6", scene);
      smokeBlast.emitter = particleEmitter;
      smokeBlast.targetStopDuration = 0.2;
  
      //load a cannon blast sound
      var cannonBlastSound = new BABYLON.Sound("music", "https://assets.babylonjs.com/sound/cannonBlast.mp3", scene);
  
      //position and rotation data for the placement of the cannon clones
      var cannonPositionArray = [
          [new BABYLON.Vector3(0.97, 5.52, 1.79), new BABYLON.Vector3(BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(180))],
          [new BABYLON.Vector3(1.08, 2.32, 3.05), new BABYLON.Vector3(BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(180))],
          [new BABYLON.Vector3(1.46, 2.35, -0.73), new BABYLON.Vector3(BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(180))],
          [new BABYLON.Vector3(1.45, 5.52, -1.66), new BABYLON.Vector3(BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(180))],
          [new BABYLON.Vector3(1.49, 8.69, -0.35), new BABYLON.Vector3(BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(180))],
          [new BABYLON.Vector3(-1.37, 8.69, -0.39), new BABYLON.Vector3(BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(-90), BABYLON.Tools.ToRadians(180))],
          [new BABYLON.Vector3(0.58, 4, -2.18), new BABYLON.Vector3(BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180))],
          [new BABYLON.Vector3(1.22, 8.69, -2.5), new BABYLON.Vector3(BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180))],
          [new BABYLON.Vector3(-1.31, 2.33, -2.45), new BABYLON.Vector3(BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(180), BABYLON.Tools.ToRadians(180))],
          [new BABYLON.Vector3(-3.54, 5.26, -2.12), new BABYLON.Vector3(BABYLON.Tools.ToRadians(0), BABYLON.Tools.ToRadians(-90), BABYLON.Tools.ToRadians(180))]
      ];
  
      //create 10 cannon clones, each with unique position/rotation data. Note that particle systems are cloned with parent meshes
      //also create 10 new animation groups with targeted animations applied to the newly cloned meshes
      for (var i = 0; i < 10; i++) {
          var cannonClone = cannon.clone("cannonClone" + i);
          cannonClone.position = cannonPositionArray[i][0];
          cannonClone.rotation = cannonPositionArray[i][1];
          var cannonAnimGroupClone = new BABYLON.AnimationGroup("cannonAnimGroupClone" + i);
          cannonAnimGroupClone.addTargetedAnimation(cannonAnimGroup.targetedAnimations[0].animation, cannonClone.getChildMeshes()[1]);
          cannonAnimGroupClone.addTargetedAnimation(cannonAnimGroup.targetedAnimations[1].animation, cannonClone.getChildMeshes()[0]);
  
          //store a key/value pair of each clone name and the name of the associated animation group name.
          cannonAnimationPairings[cannonClone.name] = cannonAnimGroupClone.name;
  
          //store key/value pair for the cannon name and it's readyToPlay status as 1;
          cannonReadyToPlay[cannonClone.name] = 1;
  
      }
      //dispose of the original cannon, animation group, and particle system
      cannon.dispose();
      cannonAnimGroup.dispose();
      smokeBlast.dispose();
  
      //create an array for all particle systems in the scene, loop through it and stop all systems from playing.
      var smokeBlasts = scene.particleSystems;
      for(var i = 0; i < smokeBlasts.length; i++){
          smokeBlasts[i].stop();
      }
  
      //logic of what happens on a click
      scene.onPointerDown = function (evt, pickResult) {
          //check if a mesh was picked and if that mesh has specific metadata
          if (pickResult.pickedMesh && pickResult.pickedMesh.metadata === "cannon") {
              //find the top level parent (necessary since the cannon is an extra layer below the clone root)
              var topParent = pickResult.pickedMesh.parent;
              if (topParent.parent) {
                  topParent = topParent.parent;
              }
  
              //wrap all 'play' elements into a check to make sure the cannon can be played.
              if(cannonReadyToPlay[topParent.name] === 1){
                  //set the readyToPlay status to 0
                  cannonReadyToPlay[topParent.name] = 0;
                  //loop through all of the animation groups in the scene and play the correct group based on the top level parent of the picked mesh.
                  var animationToPlay = cannonAnimationPairings[topParent.name];
                  for (var i = 0; i < scene.animationGroups.length; i++) {
                      if (scene.animationGroups[i].name === animationToPlay) {
                          scene.animationGroups[i].play();
                          //after the animation has finished, set the readyToPlay status for this cannon to 1;
                          scene.animationGroups[i].onAnimationGroupEndObservable.addOnce(() => {
                              cannonReadyToPlay[topParent.name] = 1;
                          });
                      }
                  }
                  //loop through all particle systems in the scene, loop through all picked mesh submeshes. if there is a matching mesh and particle system emitter, start the particle system.
                  var childMeshes = pickResult.pickedMesh.getChildMeshes();
                  for(var i = 0; i < smokeBlasts.length; i++){
                      for (var j = 0; j < childMeshes.length; j++){
                          if(childMeshes[j] === smokeBlasts[i].emitter){
                              smokeBlasts[i].start();
  
                              //clone the cannonBall, make it visible, and add a physics imposter to it. Finally apply a force by scaling the up vector of the particle emitter box
                              var cannonBallClone = cannonBall.clone("cannonBallClone")
                              cannonBallClone.visibility = 1;
                              cannonBallClone.position = childMeshes[j].absolutePosition;
                              cannonBallClone.physicsImpostor = new BABYLON.PhysicsImpostor(cannonBallClone, BABYLON.PhysicsImpostor.SphereImpostor, {mass:2, friction:0.5, restitution:0}, scene);
                              cannonBallClone.physicsImpostor.applyImpulse(childMeshes[j].up.scale(40), BABYLON.Vector3.Zero());
                              
                              //create an action manager for the cannonBallClone that will fire when intersecting the killbox. It will then dispose of the cannonBallClone.
                              cannonBallClone.actionManager = new BABYLON.ActionManager(scene);
                              cannonBallClone.actionManager.registerAction(
                                  new BABYLON.ExecuteCodeAction(
                                      {
                                      trigger:BABYLON.ActionManager.OnIntersectionEnterTrigger,
                                      parameter:killBox
                                      }, 
                                      function(){
                                          cannonBallClone.dispose();
                                      }
                                  )
                              );
                          }
                      }
                  }
                  cannonBlastSound.play();
              }
          }
      };
      await scene.createDefaultXRExperienceAsync();
      return scene;
  
  };`);
  const [outputValue, setOutputValue] = useState("");
  const debouncedJs = useDebounce(jsValue, 1500);

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
                        <script src="https://assets.babylonjs.com/generated/Assets.js"></script>
                        <script src="https://preview.babylonjs.com/earcut.min.js"></script>
                        <script src="https://preview.babylonjs.com/Oimo.js"></script>
                        <script src="https://preview.babylonjs.com/cannon.js"></script>
                        <script src="https://preview.babylonjs.com/recast.js"></script>
                        <script src="https://preview.babylonjs.com/ammo.js"></script>
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
                    </script>
                    </body>
                  </html>`;
    setOutputValue(output);
  }, [debouncedJs]);
  //----------------------------

  //Returned Component
  return (
    <div>
      <div className="optionsContainer"> 
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>Save</Button>
        <Button>Load</Button>
      </ButtonGroup>
      </div>
      <SplitPane split="vertical" allowResize={false} minSize={"65%"}>
            <JavascriptEditor         
              value={jsValue}
              onChange={setJsValue}
              height={height}
            />
        <div className={"editorContainer"}>
          <div className={"editorTitle"}>{previewTitle}</div>
          <iframe
            title={previewTitle} 
            srcDoc={outputValue}
            width={"99%"}
            height={height}
            scrolling="no"
            className={"iframe"} />
        </div>
      </SplitPane>
      </div>
  );
  //-----------------
};

export default Editor;