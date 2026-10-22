# 🚲 AI Bicycle Overtake Radar (STEM Safety Project)

An offline, edge-accelerated Advanced Driver Assistance System (ADAS) that transforms an Android smartphone into a rearview radar dashboard. The system tracks overtaking vehicles, estimates closing speeds, and calculates Time-to-Collision (TTC) to alert cyclists of oncoming threats.

## 🛠️ System Architecture
The project utilizes a distributed edge-computing topology to ensure maximum processing speed and zero dependency on cellular networks:
1. **The Edge Node (ESP32-CAM):** Captures raw video frames via an OV2640 lens and broadcasts a localized, offline Wi-Fi stream.
2. **The Dashboard (Android Phone):** Connects to the local network and runs a client-side Progressive Web App (PWA).
3. **The AI Engine (LiteRT.js):** Executes an optimized object detection model locally via WebGPU/Wasm, managing custom tracking algorithms and safety alert thresholds.

## 📂 Project Directory Structure
Ensure your repository or local folder is structured exactly as follows:
* `index.html` - The main user dashboard containing the IoU tracking and TTC equations.
* `sw.js` - The Service Worker script managing permanent offline caching.
* `manifest.json` - The web app manifest that turns the website into an installable Android app.
* `README.md` - This project documentation file.
* `js/vision_bundle.js` - The compiled Google MediaPipe/LiteRT core library.
* `wasm/` - Directory containing local WebAssembly binaries (`vision_wasm_internal.wasm`).
* `models/` - Directory containing the local machine learning model (`efficientdet_lite0.tflite`).

## 🚀 How to Run the System Offline
1. **Power the Camera:** Connect your flashed ESP32-CAM to a portable bicycle battery bank.
2. **Join the Network:** Open your smartphone's Wi-Fi settings and connect to **"Bike-Radar-STEM"** using the password **`SafeRider123`**.
3. **Launch the Dashboard:** Tap the custom **Bike Radar** icon on your phone's home screen (installed via the PWA "Add to Home Screen" prompt).
4. **Activate Tracker:** Mount the phone to your handlebars and tap **"Launch AI Tracking"** to begin monitoring the road.

## 🤝 Credits and Acknowledgments

This advanced STEM safety framework is built upon open-source software, hardware platforms, and AI engineering methodologies developed by the global technology community:

*   **Google's AI Systems Engineering Collaborator (Gemini):** For co-developing the architectural blueprint, optimizing the offline Progressive Web App (PWA) framework, and designing the client-side Intersection-over-Union (IoU) tracker and Time-to-Collision (TTC) mathematical algorithms.
*   **LiteRT (TensorFlow Lite):** Google's high-performance machine learning runtime engine utilized to execute client-side vision inferences 100% offline via WebGPU/Wasm.
*   **Android OS:** Google's open-source mobile platform that provides the secure sandbox environment, haptic vibration APIs, and web rendering engine powering our bicycle safety dashboard.
*   **Google AI & MediaPipe Teams:** For democratizing computer vision technology and providing the open-source model assets used to classify vehicular threats.
*   **Espressif Systems:** For manufacturing the low-cost, high-utility ESP32-CAM microcontroller hardware that serves as our rear-facing sensor node.
