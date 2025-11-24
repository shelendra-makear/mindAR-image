import script from "./modules/script";

new script()
// main.js
// Quick dev setup: load Camera Kit from jsDelivr ESM.
// In production, it's better to install @snap/camera-kit via npm and bundle.
import {
  bootstrapCameraKit,
  createMediaStreamSource,
  Transform2D,
} from 'https://cdn.jsdelivr.net/npm/@snap/camera-kit/+esm';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzYzNzM3MDM3LCJzdWIiOiIzZjUxN2JhMy01MmU5LTQ5MDMtYjEyMy1jNjNjMzcxZDNiMTJ-UFJPRFVDVElPTn40NTZmYTQxMi00MjZlLTQwYmQtOGNkZS03Mzg4Y2M2YTU4ZDMifQ.migeCWTEkFyUutpJutYsRmjp41DlXv3aWjoxqmdHIMU';   // from Camera Kit portal
const LENS_ID   = 'YOUR_LENS_ID_HERE';     // from My Lenses (Camera Kit target)

const logEl = document.getElementById('log');
const log = (msg) => {
  console.log(msg);
  if (logEl) logEl.textContent = msg;
};

async function main() {
  try {
    log('Bootstrapping Camera Kit…');

    // 1) Initialize Camera Kit with your API token
    const cameraKit = await bootstrapCameraKit({
      apiToken: API_TOKEN,
    });

    log('Creating session…');

    // 2) Create a CameraKit session and attach its canvas to the page
    const canvasContainer = document.getElementById('canvas-container');
    const session = await cameraKit.createSession();
    canvasContainer.appendChild(session.output.live); // output canvas

    log('Requesting camera access…');

    // 3) Get user’s back camera stream (better for image target tracking)
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment', // back camera on mobile
      },
      audio: false,
    });

    const source = createMediaStreamSource(stream, {
      // For back camera image targets we usually *don’t* mirror
      transform: Transform2D.None,
      cameraType: 'back',
    });

    await session.setSource(source);

    log('Loading Lens…');

    // 4) Load your Lens (which already contains the image target logic)
    const { lens } = await cameraKit.lensRepository.loadLens(LENS_ID);

    await session.setLens(lens);

    log('Starting AR session… point camera at your image target!');

    // 5) Start rendering
    await session.play();

    // Optional: handle lens events (debug)
    session.events.addEventListener('lens-applied', () =>
      log('Lens applied – track your marker image!')
    );
  } catch (err) {
    console.error(err);
    log('Error: ' + err.message);
  }
}

main();
