import { Ion, Viewer, SplitDirection, Cesium3DTileset,IonResource,ScreenSpaceEventHandler,ScreenSpaceEventType,Transforms,Cartesian3 } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "../src/css/main.css"

// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token
//Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWU3MDNiMS1iNDM1LTRkYWQtYjI2MC04MzEyZTRlYTIzYjIiLCJpZCI6MTIzNzc2LCJpYXQiOjE2NzU3OTM2NDR9.5oAkrmu8dhJnyH0DA0ONl1zXp8P0WyirEL9CB1_GgD8';

//Removed Background
const viewer = new Viewer('cesiumContainer', {
  imageryProvider : false,
  baseLayerPicker : false,
  terrainProvider : false,
  skyBox : false,
  skyAtmosphere : false,
  animation : false,
  timeline : false,
  targetFrameRate : 120
});

const left = viewer.scene.primitives.add(
  new Cesium3DTileset({
    url: 'https://3dtilesetcesium.s3.eu-west-1.amazonaws.com/t9_agustos_pointcloud/tileset.json'
  })
);  
  

left.splitDirection = SplitDirection.LEFT;


const right = viewer.scene.primitives.add(
  new Cesium3DTileset({
    url: 'https://3dtilesetcesium.s3.eu-west-1.amazonaws.com/t9_kasim_pointcloud/tileset.json'
  })
);


right.splitDirection = SplitDirection.RIGHT;

viewer.zoomTo(left);

// Sync the position of the slider with the split position
const slider = document.getElementById("slider");
viewer.scene.splitPosition =
  slider.offsetLeft / slider.parentElement.offsetWidth;

const handler = new ScreenSpaceEventHandler(slider);

let moveActive = false;

function move(movement) {
  if (!moveActive) {
    return;
  }

  const relativeOffset = movement.endPosition.x;
  const splitPosition =
    (slider.offsetLeft + relativeOffset) /
    slider.parentElement.offsetWidth;
  slider.style.left = `${100.0 * splitPosition}%`;
  viewer.scene.splitPosition = splitPosition;
}

handler.setInputAction(function () {
  moveActive = true;
}, ScreenSpaceEventType.LEFT_DOWN);
handler.setInputAction(function () {
  moveActive = true;
}, ScreenSpaceEventType.PINCH_START);

handler.setInputAction(move, ScreenSpaceEventType.MOUSE_MOVE);
handler.setInputAction(move, ScreenSpaceEventType.PINCH_MOVE);

handler.setInputAction(function () {
  moveActive = false;
}, ScreenSpaceEventType.LEFT_UP);
handler.setInputAction(function () {
  moveActive = false;
}, ScreenSpaceEventType.PINCH_END);

