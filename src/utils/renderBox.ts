// import labels from './labels.json'

/**
 * Render prediction boxes
 * @param {HTMLCanvasElement} canvasRef canvas tag reference
 * @param {Array} boxes_data boxes array
 * @param {Array} scores_data scores array
 * @param {Array} classes_data class array
 * @param {Array[Number]} ratios boxes ratio [xRatio, yRatio]
 */

const win_mm = 0.17; // Assuming the width of the fingernail (in mm)
// const refWid_MM = 25; // Change this value to the actual width of the reference object

const numbers = [
  15, 14, 13.3, 12.8, 12.6, 12.3, 12, 11.8, 11.6, 11.2,
  10.8, 10.65, 10.5, 10.37, 10.1, 9.7, 9.55, 9.4, 9.35,
  9.15, 8.9, 8.6, 8.3, 8.18, 8.05, 7.8, 7.58, 7.35, 7.19, 6.8
];
const mold = ["1 or 2",
  "1 to 3",
  "2 to 4",
  "3 to 5",
  "4 to 6",
  "5 to 7",
  "6 to 8",
  "7 to 9",
  "8 to 10",
  "9 to 11",
  "10 to 12",
  "11 to 13",
  "12 to 14",
  "13 to 15",
  "14 to 16",
  "15 to 17",
  "16 to 18",
  "17 to 19",
  "18 to 20",
  "19 to 21",
  "20 to 22",
  "21 to 23",
  "22 to 24",
  "23 to 25",
  "24 to 26",
  "25 to 27",
  "26 to 28",
  "27 to 29",
  "28 to 30",
  "29 or 30"
]

const mv = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]

// export function renderBoxes(canvasRef: HTMLCanvasElement, boxes_data: Float32Array | Int32Array | Uint8Array, scores_data: Float32Array | Int32Array | Uint8Array, classes_data: Float32Array | Int32Array | Uint8Array, ratios: any[]) {
//   const ctx = canvasRef.getContext('2d');
//   if (ctx) {
//     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clean canvas

//     // const colors = new Colors();

//     // font configs
//     const font = `${Math.max(Math.round(Math.max(ctx.canvas.width, ctx.canvas.height) / 40), 14)}px Arial`;
//     ctx.font = font;
//     ctx.textBaseline = 'top';

//     for (let i = 0; i < scores_data.length; ++i) {
//       // filter based on class threshold
//       // const klass = labels[classes_data[i]];
//       // const color = colors.get(classes_data[i]);
//       // const score = (scores_data[i] * 100).toFixed(1);

//       let [y1, x1, y2, x2] = boxes_data.slice(i * 4, (i + 1) * 4);
//       x1 *= ratios[0];
//       x2 *= ratios[0];
//       y1 *= ratios[1];
//       y2 *= ratios[1];
//       const width = x2 - x1;
//       const height = y2 - y1;

//       // Cal width in MM
//       const widthInMM = (width * win_mm).toFixed(0);

//       // Calculate the distance based on the reference object's width
//       const real_distanceMM = (refWid_MM * ctx.canvas.width) / (width * ratios[0]); //Converting to MM
//       const real_distanceCM = (real_distanceMM / 10).toFixed(0); // Converting to CM
//       const distance = Number(Math.sqrt(width * width + height * height).toFixed(1));

//       // Change the color of the bounding box border based on the distance range
//       ctx.strokeStyle = distance >= 100 && distance <= 140 ? 'green' : 'blue';
//       ctx.lineWidth = Math.max(Math.min(ctx.canvas.width, ctx.canvas.height) / 200, 2.5);
//       ctx.strokeRect(x1, y1, width, height);

//       // Set the fill text color based on the distance range
//       const fillTextColor = distance >= 80 && distance <= 140 ? 'green' : 'blue';
//       ctx.fillStyle = fillTextColor;
//       const textHeight = parseInt(font, 10); // base 10

//       // Draw labal at bottom
//       const widthLabel = `W ${widthInMM} mm`;
//       const widthLabelWidth = ctx.measureText(widthLabel).width;
//       const yWidthLabel = y1 + height + textHeight + ctx.lineWidth; // Position bottom
//       ctx.fillText(widthLabel, x1 + width / 2 - widthLabelWidth / 2, yWidthLabel);

//       // // Draw distance label in centimeters
//       // const distanceLabelCM = `D ${real_distanceCM} cm`;
//       // const distanceLabelWidthCM = ctx.measureText(distanceLabelCM).width;
//       // const yDistanceLabelCM = y1 + height + 2 * (textHeight + ctx.lineWidth); // Position After width label
//       // ctx.fillText(distanceLabelCM, x1 + width / 2 - distanceLabelWidthCM / 2, yDistanceLabelCM);
//     }
//   }
// }

export let numberTextsForCurrentFrame: string[] = [];

export function renderBoxes(canvasRef: HTMLCanvasElement, boxes_data: Float32Array | Int32Array | Uint8Array, scores_data: Float32Array | Int32Array | Uint8Array, classes_data: Float32Array | Int32Array | Uint8Array, ratios: any[]) {
  const ctx = canvasRef.getContext('2d');
  const numberTextsCurrentFrame: string[] = [];
  if (ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // clean canvas

    // font configs
    const font = `${Math.max(Math.round(Math.max(ctx.canvas.width, ctx.canvas.height) / 40), 25)}px Arial`;
    ctx.font = font;
    ctx.textBaseline = 'top';

    for (let i = 0; i < scores_data.length; ++i) {

      let [y1, x1, y2, x2] = boxes_data.slice(i * 4, (i + 1) * 4);
      x1 *= ratios[0];
      x2 *= ratios[0];
      y1 *= ratios[1];
      y2 *= ratios[1];
      const width = x2 - x1;
      const height = y2 - y1;

      ctx.fillStyle = 'black';
      ctx.fillText(`1: ${x1.toFixed(2)}`, x1, y1);
      ctx.fillText(`2: ${x2.toFixed(2)}`, x2, y2);
      ctx.fillText(`3: ${y1.toFixed(2)}`, x1, y1 - 20);
      ctx.fillText(`4: ${y2.toFixed(2)}`, x2, y2 - 20);

      // console.log(x1,x2,y1,y2)

      const x1Range = {min: 245, max: 260}
      const x2Range = {min: 385, max: 400}
      const y1Range = {min: 165, max: 180}
      const y2Range = {min: 275, max: 290}

     // Draw blue dot for x1Range
     ctx.beginPath();
     ctx.arc((x1Range.min + x1Range.max) / 2, (y1Range.min + y1Range.max) / 2, 5, 0, 2 * Math.PI);
     ctx.fillStyle = 'blue';
     ctx.fillText("1", 180, 180)
     ctx.fill();

     // Draw blue dot for x2Range
     ctx.beginPath();
     ctx.arc((x2Range.min + x2Range.max) / 2, (y1Range.min + y1Range.max) / 2, 5, 0, 2 * Math.PI);
     ctx.fillStyle = 'blue';
     ctx.fillText("2", 300, 310)
     ctx.fill();

     // Draw blue dot for y1Range
     ctx.beginPath();
     ctx.arc((x1Range.min + x1Range.max) / 2, (y2Range.min + y2Range.max) / 2, 5, 0, 2 * Math.PI);
     ctx.fillStyle = 'blue';
     ctx.fillText("3", 180, 310)
     ctx.fill();

     // Draw blue dot for y2Range
     ctx.beginPath();
     ctx.arc((x2Range.min + x2Range.max) / 2, (y2Range.min + y2Range.max) / 2, 5, 0, 2 * Math.PI);
     ctx.fillStyle = 'blue';
     ctx.fillText("4", 310, 180)
     ctx.fill();


      if (
          x1 >= x1Range.min &&
          x1 <= x1Range.max &&
          x2 >= x2Range.min &&
          x2 <= x2Range.max &&
          y1 >= y1Range.min &&
          y1 <= y1Range.max &&
          y2 >= y2Range.min &&
          y2 <= y2Range.max 
      ) {
        alert("Your marker is in the perfect position")
        ctx.fillStyle = 'green';
        ctx.fill();
      }



      // Cal width in MM
      const widthInMM = parseFloat((width * win_mm).toFixed(2)); // Convert to number
      const distance = Number(Math.sqrt(width * width + height * height).toFixed(1));

      // Change the color of the bounding box border based on the distance range
      ctx.strokeStyle = distance >= 100 && distance <= 140 ? 'green' : 'blue';
      ctx.lineWidth = Math.max(Math.min(ctx.canvas.width, ctx.canvas.height) / 200, 2.5);
      ctx.strokeRect(x1, y1, width, height);

      // Set the fill text color based on the distance range
      const fillTextColor = distance >= 80 && distance <= 140 ? 'green' : 'green';
      ctx.fillStyle = fillTextColor;
      const textHeight = parseInt(font, 18); // base 10

      if (widthInMM >= 6.70 && widthInMM <= 16) {
        const index = numbers.findIndex((num) => num <= widthInMM); // Find the index of the number
        if (index !== -1) {

          const numberText = numbers[index].toString();
          numberTextsCurrentFrame.push(numberText);
          numberTextsForCurrentFrame = numberTextsCurrentFrame;
          const moldText = mold[index];
          const moldvalText = mv[index].toString();

          // Calculate the text width for both number and mold
          const numberTextWidth = ctx.measureText(numberText).width;
          const moldTextWidth = ctx.measureText(moldText).width;
          const moldvalTextWidth = ctx.measureText(moldvalText).width;

          // Display the number above the bounding box
          ctx.fillStyle = 'green'; // You can change the text color here
          const xNumber = x1 + width / 2 - numberTextWidth / 2;
          const yNumber = y1 - textHeight;
          ctx.fillText(numberText + " Width", xNumber, yNumber);
          // console.log(numberText)

          // Display the mold value below the bounding box
          // ctx.fillStyle = 'green'; // You can change the text color here
          const xMold = x1 + width / 2 - moldTextWidth / 2;
          const yMold = y2 + textHeight;
          // ctx.fillText(moldText + " Range", xMold, yMold);

          // ctx.fillStyle = 'green'; // You can change the text color here
          const xMoldval = x1 + width / 2 - moldvalTextWidth / 2;
          const yMoldval = yMold + textHeight;

          
          // ctx.fillText(moldvalText + " Mold", xMoldval, yMoldval);
         
        }
        
      }
    }
  }
  
}
// class Colors {
//   palette: string[]
//   n: number
//   // ultralytics color palette https://ultralytics.com/
//   constructor() {
//     this.palette = [
//       '#FF3838',
//       '#FF9D97',
//       '#FF701F',
//       '#FFB21D',
//       '#CFD231',
//       '#48F90A',
//       '#92CC17',
//       '#3DDB86',
//       '#1A9334',
//       '#00D4BB',
//       '#2C99A8',
//       '#00C2FF',
//       '#344593',
//       '#6473FF',
//       '#0018EC',
//       '#8438FF',
//       '#520085',
//       '#CB38FF',
//       '#FF95C8',
//       '#FF37C7',
//     ]
//     this.n = this.palette.length
//   }

//   get = (i: number) => this.palette[Math.floor(i) % this.n]

//   static hexToRgba = (hex: string, alpha: number) => {
//     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
//     return result
//       ? `rgba(${[parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)].join(
//         ', ',
//       )}, ${alpha})`
//       : null
//   }
// }