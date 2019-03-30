import * as BABYLON from 'babylonjs';
import "isomorphic-fetch";
import moves from './moves';

/**
 * GraphicsEngine class for running BabylonJS
 * and rendering 3D rigged character on it
 */

let side = 1;
let itr = 0.5;
let shouldRecord = false; 
var gPose = "";
let renderCount = 0;
let renderThanosCount = -20;
let thanosDance = true;
let rotationJSON = {};
export function getPose(){
  return gPose;
}

export function startRecord(){
    shouldRecord = true;
}

export function stopRecord(){
    shouldRecord = false;
    console.log("STTTTOOOPPPP");
    fetch('http://localhost:3000/recordPose', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    rotationJSON
  })
    });
}

export default class GraphicsEngine {
    /**
     * the class constructor
     * @param {HTMLCanvasElement} _canvas 
     * @param {Joints} _joints 
     */
    constructor(_canvas, _joints){
        this.canvas = _canvas;
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.engine.displayLoadingUI();
        this.engine.loadingUIText = "Bablyon 3D Loading ...";
        this.joints = _joints;
        this.initScene();
        this.engine.hideLoadingUI();
    }

    /**
     * Initialez the scene, creates the character
     * and defines how should joints of the character be updated
     */
    initScene(){
        this.scene = new BABYLON.Scene(this.engine);
        this.scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
        const camera = this.setCamera();
        const sphere = BABYLON.MeshBuilder.CreateSphere('', { diameter: .0001 }, this.scene);
        BABYLON.SceneLoader.ImportMesh("", `/${process.env.BPATH}/Scenes/Dude/`, "Dude.babylon", this.scene, (newMeshes, particleSystems, skeletons) => {
            const mesh = newMeshes[0];
            const skeleton = skeletons[0];
            mesh.scaling = new BABYLON.Vector3(0.1, 0.1, 0.1);
            mesh.position = new BABYLON.Vector3(0, 0, 0);

            const head_bone = skeleton.bones[7];
            const right_shoulder_bone = skeleton.bones[13];
            const right_arm_bone = skeleton.bones[14];
            const left_shoulder_bone = skeleton.bones[32];
            const left_arm_bone = skeleton.bones[33];
            const right_thigh_bone = skeleton.bones[50];
            const right_calf_bone = skeleton.bones[51];
            const right_ankle_bone = skeleton.bones[52];
            const left_ankle_bone = skeleton.bones[56];
            const left_calf_bone = skeleton.bones[55];
            const left_thigh_bone = skeleton.bones[54];
            // const random_bone = skeleton.bones[0];
            console.log(skeleton.bones.length)

            const lookAtCtl = new BABYLON.BoneLookController(mesh, head_bone, sphere.position, { adjustYaw: Math.PI * .5, adjustRoll: Math.PI * .5 });

            this.scene.registerBeforeRender(() => {
                let data;
                if(thanosDance && renderThanosCount>=0 && renderThanosCount<41){
                    console.log("fetching from movess...");
                    console.log(renderThanosCount);
                    data = JSON.parse(JSON.stringify(moves["rotationJSON"][renderThanosCount]));
                    console.log(data);
                }else{
                    data = this.joints.data;
                }
                gPose = data
                // console.log(this.joints.data.rightShoulder)
                sphere.position.x = 0 + data.head.x;
                sphere.position.y = 6 + data.head.y;
                sphere.position.z = 5;

                lookAtCtl.update();

                right_shoulder_bone.rotation = new BABYLON.Vector3(0, 1 * data.rightShoulder, 0);
                right_arm_bone.rotation = new BABYLON.Vector3(0, -1* data.rightElbow, 0);
                left_shoulder_bone.rotation = new BABYLON.Vector3(0, -1 * data.leftShoulder, 0);
                left_arm_bone.rotation = new BABYLON.Vector3(0, data.leftElbow, 0);
                
                right_thigh_bone.rotation = new BABYLON.Vector3(0, (-3)+data.rightHip,0);
                right_calf_bone.rotation = new BABYLON.Vector3(0, -1*data.rightKnee,0);
                left_thigh_bone.rotation = new BABYLON.Vector3(0, (3)+(-1*data.leftHip),0);
                left_calf_bone.rotation = new BABYLON.Vector3(0, data.leftKnee,0);


                // random_bone.rotation = new BABYLON.Vector3(0, 0, itr);
                // right_thigh_bone
                // if (itr==3 ){
                //    side = -0.1
                // }else if(itr == 0){
                //    side = 0.1     
                // }
                // itr = itr + side    
                // console.log(right_shoulder_bone.rotation)


                if (shouldRecord){
                    rotationJSON[renderCount] = JSON.parse(JSON.stringify(data));
                    renderCount++;
                }
                renderThanosCount++;
            });
        });
    };

    /** BabylonJS render function that is called every frame */
    render(){
        const self = this;
        this.engine.runRenderLoop(() => {
            const self = this;
            if(self.scene) self.scene.render();
        });
    }

    /** Sets up 3d virtual cam for the scene */
    setCamera(){
        const camera = new BABYLON.ArcRotateCamera("camera", 0, 1, 20, BABYLON.Vector3.Zero(), this.scene);
        camera.setTarget(new BABYLON.Vector3(0, 4, 0));
        camera.setPosition(new BABYLON.Vector3(0, 5, 11))
        camera.attachControl(this.canvas, true);
        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.7;
        return camera;
    }

}