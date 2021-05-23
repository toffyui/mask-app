import { AnnotatedPrediction } from "@tensorflow-models/face-landmarks-detection/dist/mediapipe-facemesh";

const drawMask = (ctx: CanvasRenderingContext2D, keypoints: any) => {
  const points = [
    93,
    132,
    58,
    172,
    136,
    150,
    149,
    176,
    148,
    152,
    377,
    400,
    378,
    379,
    365,
    397,
    288,
    361,
    323,
  ];
  ctx.moveTo(keypoints[195][0], keypoints[195][1]);
  for (let i = 0; i < points.length; i++) {
    if (i < points.length / 2) {
      ctx.lineTo(
        keypoints[points[i]][0] / 1.02,
        keypoints[points[i]][1] * 1.02
      );
    } else {
      ctx.lineTo(
        keypoints[points[i]][0] * 1.02,
        keypoints[points[i]][1] * 1.02
      );
    }
  }
};
export const draw = (
  predictions: AnnotatedPrediction[],
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction: { scaledMesh: any }) => {
      const keypoints = prediction.scaledMesh;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "black";
      ctx.save();
      ctx.beginPath();
      drawMask(ctx, keypoints);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  }
};
