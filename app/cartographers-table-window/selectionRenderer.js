const assert = require('assert');
//gay pride! That's right fuckers
//red     RGB 228 003 003
//orange  RGB 255 140 000
//yellow  RGB 255 237 000
//green   RGB 000 128 038
//blue    RGB 000 077 255
//purple  RGB 117 007 135

let selectionCheckMargin = 6;
const selctionSquareWidth = selectionCheckMargin * 4/3;

const red = {
  red: 228,
  green: 003,
  blue: 003
}

const orange = {
  red: 255,
  green: 140,
  blue: 000
}

const yellow = {
  red: 255,
  green: 237,
  blue: 000
}

const green = {
  red: 000,
  green: 128,
  blue: 038
}

const blue = {
  red: 000,
  green: 077,
  blue: 255
}

const purple = {
  red: 117,
  green: 007,
  blue: 135
}

function getSelectionMultiplier() {
    return (shiftKeyIsDown) ? 1.375 : 1;
}

function drawSelectionSquare(selectionRainbowCtx, selectionHighlightCtx, point, room) {
    //console.log(x);
    //console.log(y);
    let myWidth = selctionSquareWidth * getSelectionMultiplier();
    selectionHighlightCtx.lineWidth = roomLineThickness * getSelectionMultiplier();
    selectionHighlightCtx.strokeStyle = "white";
    selectionHighlightCtx.fillStyle = "black";
    selectionHighlightCtx.beginPath();
    selectionHighlightCtx.roundedRect(point.x-myWidth/2, point.y-myWidth/2, myWidth, myWidth, myWidth/3);
    selectionHighlightCtx.fill();
    selectionHighlightCtx.stroke();

    if (room) {
        let angle = getCornerAngle(point, room);
        drawSelectionCircle(selectionRainbowCtx, point.x, point.y, angle.start, angle.end);
    } else {
        drawSelectionCircle(selectionRainbowCtx, point.x, point.y, 0.0, 1.0);
    }
}

function getCornerAngle(point, room) {
    let cornerIndex = geometry.getCorner(room, point);

    let width = room.rightX-room.leftX;
    let ceilingYDiff = Math.abs(room.leftCeilingY-room.rightCeilingY);
    let floorYDiff = Math.abs(room.leftFloorY-room.rightFloorY);
    switch (cornerIndex) {
      case 0:
        if (room.leftCeilingY < room.rightCeilingY) {
            return {
              start: 0.75,
              end: 0.75 + Math.atan(width/ceilingYDiff)/(2*Math.PI)
            };
        } else {
            return {
              start: -0.25,
              end: Math.atan(ceilingYDiff/width)/(2*Math.PI)
            };
        }

      case 1:
        if (room.leftCeilingY < room.rightCeilingY) {
            return {
              start: 0.5 - Math.atan(ceilingYDiff/width)/(2*Math.PI),
              end: 0.75
            };
        } else {
            return {
              start: 0.75 - Math.atan(width/ceilingYDiff)/(2*Math.PI),
              end: 0.75
            };
        }

      case 2:
        if (room.leftFloorY > room.rightFloorY) {
            return {
              start: 0.25,
              end: 0.5 + Math.atan(floorYDiff/width)/(2*Math.PI)
            };
        } else {
            return {
              start: 0.25,
              end: 0.25 + Math.atan(width/floorYDiff)/(2*Math.PI)
            };
        }

      case 3:
        if (room.leftFloorY > room.rightFloorY) {
            return {
              start: 0.25 - Math.atan(width/floorYDiff)/(2*Math.PI),
              end: 0.25
            };
        } else {
            return {
              start: -Math.atan(floorYDiff/width)/(2*Math.PI),
              end: 0.25
            };
        }
    }
}

CanvasRenderingContext2D.prototype.roundedRect = function(x, y, width, height, radius) {
  this.save();
  this.translate(x, y);
  this.moveTo(width / 2, 0);
  this.arcTo(width, 0, width, height, Math.min(height / 2, radius));
  this.arcTo(width, height, 0, height, Math.min(width / 2, radius));
  this.arcTo(0, height, 0, 0, Math.min(height / 2, radius));
  this.arcTo(0, 0, radius, 0, Math.min(width / 2, radius));

  // Draw a line back to the start coordinates
  this.lineTo(width / 2, 0);

  // Restore the state of the canvas to as it was before the save()
  this.restore();
}

const selctionCircleWidth = selectionCheckMargin * 2;
const selectionCircleRotationsPerSecond = 3/4;

function drawSelectionCircle(selectionRainbowCtx, x, y, thetaIn0, thetaIn1) {
    if (thetaIn0 >= 0) {
        let thetaFull0 = 1.0 - thetaIn1;
        let thetaFull1 = 1.0 - thetaIn0;
        drawSelectionCircleHalf(selectionRainbowCtx, x, y, thetaFull0, thetaFull1);
    } else {
        let thetaFull0 = 1.0 - thetaIn1;
        let thetaFull1 = 1.0;
        let thetaFull2 = 0.0;
        let thetaFull3 = -thetaIn0;
        drawSelectionCircleHalf(selectionRainbowCtx, x, y, thetaFull0, thetaFull1);
        drawSelectionCircleHalf(selectionRainbowCtx, x, y, thetaFull2, thetaFull3);
    }
}


function drawSelectionCircleHalf(selectionRainbowCtx, x, y, thetaFull0, thetaFull1) {
    let time = new Date();
    selectionRainbowCtx.lineWidth = 2.5 * getSelectionMultiplier();

    let resolution =  6*5;

    for (let i=0; i < resolution; i++) {

        let thetaSection0Discrete = i/resolution;
        let thetaSection1Discrete = thetaSection0Discrete + 1/resolution;

        if (thetaSection1Discrete < thetaFull0) {
            continue;
        }
        if (thetaSection0Discrete > thetaFull1) {
            continue;
        }

        let thetaSection0Continuous = Math.max(thetaSection0Discrete, thetaFull0);
        let thetaSection1Continuous = Math.min(thetaSection1Discrete, thetaFull1);

        let percentageActual = i/resolution;

        let milisecondsAfteFrame = ((time.getSeconds()*1000 + time.getMilliseconds())%(1000/selectionCircleRotationsPerSecond));
        let percentageAfterFrameStart = milisecondsAfteFrame / (1000/selectionCircleRotationsPerSecond);

        let percentageAnimation = (1.0 + percentageActual - percentageAfterFrameStart) % 1.0;
        let percentage = percentageAnimation;
        let mod = (percentage) % (1.0000001/6.0);

        let twoColorGradientPercentage = mod * 6;

        let color = null;
        if (percentage <= 1/6) {
            color = colorPercentage(twoColorGradientPercentage, red, orange);
        } else if (percentage <= 2/6) {
            color = colorPercentage(twoColorGradientPercentage, orange, yellow);
        } else if (percentage <= 3/6) {
            color = colorPercentage(twoColorGradientPercentage, yellow, green);
        } else if (percentage <= 4/6) {
            color = colorPercentage(twoColorGradientPercentage, green, blue);
        } else if (percentage <= 5/6) {
            color = colorPercentage(twoColorGradientPercentage, blue, purple);
        } else if (percentage <= 6/6) {
            color = colorPercentage(twoColorGradientPercentage, purple, red);
        }

        drawSelectionCirclePortion(selectionRainbowCtx, x, y, thetaSection0Continuous, thetaSection1Continuous, `rgb(${Math.floor(color.red)}, ${Math.floor(color.green)}, ${Math.floor(color.blue)})`)
    }
}

function colorPercentage(percentage, colorA, colorB) {
    let newRed = (1.0-percentage)*colorA.red + percentage*colorB.red;
    let newGreen = (1.0-percentage)*colorA.green + percentage*colorB.green;
    let newBlue = (1.0-percentage)*colorA.blue + percentage*colorB.blue;

    return {
      red: newRed,
      green: newGreen,
      blue: newBlue
    }
}

function drawSelectionCirclePortion(selectionRainbowCtx, x, y, theta0, theta1, color) {
    selectionRainbowCtx.strokeStyle = color;
    selectionRainbowCtx.beginPath();
    selectionRainbowCtx.arc(x, y, selctionCircleWidth * getSelectionMultiplier(), theta0 * 2 * Math.PI, theta1 * 2 * Math.PI);
    selectionRainbowCtx.stroke();
}

const selectionLineWidth = selectionCheckMargin;

function drawSelectionLine(selected) {
    let dashLength = selectionCheckMargin / 4;

    let rise = selected.end.y - selected.start.y;
    let run = selected.end.x - selected.start.x;
    let lineLength = Math.sqrt(rise*rise+run*run);

    let dashCountFractional = lineLength / dashLength;
    let dashCountRemainder = dashCountFractional - Math.floor(dashCountFractional);
    let dashCountWhole = Math.ceil(dashCountFractional);

    let time = new Date();
    let milisecondsAfteFrame = ((time.getSeconds()*1000 + time.getMilliseconds())%(1000/selectionCircleRotationsPerSecond*2));
    let percentageAfterFrameStart = milisecondsAfteFrame / (1000/selectionCircleRotationsPerSecond);
    //console.log(percentageAfterFrameStart);

    let begniningNegative = -1.0/dashCountFractional-1.0 - (1000/selectionCircleRotationsPerSecond*2);
    //console.log("\n\n\n\n\n\n\n\n");
    for (let i=begniningNegative; i < dashCountWhole; i++) {
        let startPercent = (i+percentageAfterFrameStart) / dashCountFractional;
        let stopPercent = startPercent + 1.0/dashCountFractional;
        if (startPercent > 1.0) {
            continue;
        }
        if (stopPercent < 0.0 ) {
          continue;
        }
        let startPercentActual = Math.max(startPercent, 0.0);
        let stopPercentActual = Math.min(stopPercent, 1.0);
        //console.log(`${i} ${startPercentActual} ${stopPercentActual}`)
        let colorIndex = i-begniningNegative;
        let percentageActual = colorIndex/dashCountFractional;

        let percentageAnimation = (1.0 + percentageActual - percentageAfterFrameStart) % 1.0;
        let percentage = percentageAnimation;
        let mod = (percentage) % (1.0000001/6.0);

        let twoColorGradientPercentage = mod * 6;

        let color = null;
        if (percentage <= 1/6) {
            color = colorPercentage(twoColorGradientPercentage, red, orange);
        } else if (percentage <= 2/6) {
            color = colorPercentage(twoColorGradientPercentage, orange, yellow);
        } else if (percentage <= 3/6) {
            color = colorPercentage(twoColorGradientPercentage, yellow, green);
        } else if (percentage <= 4/6) {
            color = colorPercentage(twoColorGradientPercentage, green, blue);
        } else if (percentage <= 5/6) {
            color = colorPercentage(twoColorGradientPercentage, blue, purple);
        } else if (percentage <= 6/6) {
            color = colorPercentage(twoColorGradientPercentage, purple, red);
        }

        drawSeclectionLineSegment(
          selected.start,
          rise,
          run,
          lineLength,
          startPercentActual,
          stopPercentActual,
          `rgb(${Math.floor(color.red)}, ${Math.floor(color.green)}, ${Math.floor(color.blue)})`
        )
    }

}

function drawSeclectionLineSegment(lineStart, lineRise, lineRun, lineLength, startPercent, stopPercent, lineColor) {

    let lineWidthToUse = selectionLineWidth * getSelectionMultiplier()* getSelectionMultiplier();

    let percentageAverage = (startPercent + stopPercent)/2;
    let distancePercentFromEnd = 0.5 - Math.abs(0.5 - percentageAverage);
    let distanceActualFromEnd = distancePercentFromEnd * lineLength;

    let lineWidth = 0;
    if (distanceActualFromEnd >= lineWidthToUse) {
        lineWidth = lineWidthToUse;
    } else {
        let dist =  1 - distanceActualFromEnd/lineWidthToUse;
        lineWidth = Math.sqrt(1 - dist * dist) * lineWidthToUse;
    }

    drawSeclectionLineSegmentAtWidth(
      lineStart,
      lineRise,
      lineRun,
      startPercent,
      stopPercent,
      lineWidth,
      lineColor
    )
}

function drawSeclectionLineSegmentAtWidth(lineStart, lineRise, lineRun, startPercent, stopPercent, lineWidth, lineColor) {
    //console.log(`${startPercent} ${stopPercent}`)

    selectionRainbowCtx.lineWidth = lineWidth;
    selectionRainbowCtx.strokeStyle = lineColor;
    selectionRainbowCtx.beginPath();
    selectionRainbowCtx.moveTo(lineStart.x + lineRun*startPercent, lineStart.y + lineRise*startPercent);
    selectionRainbowCtx.lineTo(lineStart.x + lineRun*stopPercent, lineStart.y + lineRise*stopPercent);
    selectionRainbowCtx.stroke();
}

function drawSelectionRoom(selectedRoom) {
    let time = new Date();
    let pattern = document.createElement('canvas');
    pattern.width = 40;
    pattern.height = 40;
    let pctx = pattern.getContext('2d');

    let color1 = "#0000"
    let color2 = "rgb(005, 170, 255)";
    let numberOfStripes = 24;
    for (let i=0; i < numberOfStripes*5; i++){
        let thickness = 40 / numberOfStripes;
        pctx.beginPath();


        let color = null;
        let aplaha = 255;
        let rainbowIndex = Math.floor(i/4);
        let rainbowMod = rainbowIndex % 6;
        if (i%4 !== 0) {
            color = {
                red: 0,
                green: 0,
                blue: 0
            }
            aplaha = 0;
        } else  if (rainbowMod == 0) {
            color = red;
        } else  if (rainbowMod == 1) {
            color = orange;
        } else  if (rainbowMod == 2) {
            color = yellow;
        } else  if (rainbowMod == 3) {
            color = green;
        } else  if (rainbowMod == 4) {
            color = blue;
        } else {
            color = purple;
        }

        pctx.strokeStyle = `rgba(${color.red}, ${color.green}, ${color.blue}, ${aplaha})`;
        pctx.lineWidth = thickness * getSelectionMultiplier()*getSelectionMultiplier()/1.5;

        let milisecondsAfteFrame = ((time.getSeconds()*1000 + time.getMilliseconds())%(1000/selectionCircleRotationsPerSecond));
        let percentageAfterFrameStart = milisecondsAfteFrame / (1000/selectionCircleRotationsPerSecond);

        let animationOffset = 40*percentageAfterFrameStart;
        let lineAdustment = i*thickness + thickness/2 + animationOffset
        pctx.moveTo(-5, -45 + lineAdustment);
        pctx.lineTo(145, -195 + lineAdustment);
        pctx.stroke();
    }

    let patternStyle = selectionRainbowCtx.createPattern(pattern, "repeat");

    selectionRainbowCtx.fillStyle = patternStyle;
    selectionRainbowCtx.beginPath();
    selectionRainbowCtx.moveTo(selectedRoom.leftX, selectedRoom.leftCeilingY);
    selectionRainbowCtx.lineTo(selectedRoom.rightX, selectedRoom.rightCeilingY);
    selectionRainbowCtx.lineTo(selectedRoom.rightX, selectedRoom.rightFloorY);
    selectionRainbowCtx.lineTo(selectedRoom.leftX, selectedRoom.leftFloorY);
    selectionRainbowCtx.closePath();
    selectionRainbowCtx.fill();
}

async function wildSelection(){

    /*for (let i=0; i < metaroomPoints.length; i++){
        let selected = metaroomPoints[i];
        drawSelectionSquare(selected.x, selected.y);
    }*/

    for (let i=0; i < metaroomDoors.length; i++){
        let selected = metaroomDoors[i];
        drawSelectionLine(selected);
    }

    for (let i=0; i < metaroomWalls.length; i++){
        let selected = metaroomWalls[i];
        drawSelectionLine(selected);
    }

    /*for (let i=0; i < metaroom.rooms.length; i++){
        let selected = metaroom.rooms[i];
        drawSelectionRoom(selected);
    }*/
}

//room
//door
//wall
//corner
//point
async function redrawSelection(selectionRainbowCtx, selectionHighlightCtx, dataStructures, selected){
    //console.log(selected);
    //console.log(dataStructures);
    //redrawPasties(pastiesCtx, dataStructures.points, dataStructures.metaroomDisk);
    selectionRainbowCtx.clearRect(0, 0, dataStructures.metaroomDisk.width, dataStructures.metaroomDisk.height);
    selectionHighlightCtx.clearRect(0, 0, dataStructures.metaroomDisk.width, dataStructures.metaroomDisk.height);

    //wildSelection();
//  return;
    //console.log(selected);
    if (selected.selectedType === "point") {
        let selectedPoint = dataStructures.points[selected.selectedId];
        drawSelectionSquare(selectionRainbowCtx, selectionHighlightCtx, selectedPoint);
    } else if (selected.selectedType === "corner") {
        let selectedRoom = dataStructures.metaroomDisk.rooms[selected.selectedRoomId];
        let selectedPoint = dataStructures.points[selected.selectedId];
        drawSelectionSquare(selectionRainbowCtx, selectionHighlightCtx, selectedPoint, selectedRoom);
    } else if (selected.selectedType === "door" || selected.selectedType === "wall") {
        let selectedSide = null;
        if (selected.selectedType === "door") {
            selectedSide = dataStructures.doors[selected.selectedId];
        } else {
            selectedSide = dataStructures.walls[selected.selectedId];
        }
        drawSelectionLine(selectedSide);
    } else if (selected.selectedType === "room") {
        drawSelectionRoom(dataStructures.metaroomDisk.rooms[selected.selectedId]);
    }
}

module.exports = {
    selectionRenderer: {
        redrawSelection: redrawSelection
    }
}
