# Dex TCI — Hannivoort dexmedetomidine step-down planner

An offline web app that runs the Hannivoort 2015 dexmedetomidine TCI model (Anesthesiology 2015;123:357–67) and converts it into a bolus plus the fewest manual step-down infusion rates within a chosen accuracy.

All calculations run on the device. Nothing you enter is sent anywhere.

## Files

| File | Purpose |
|---|---|
| `index.html` | The app |
| `sw.js` | Service worker that saves the app on the device for offline use |
| `manifest.webmanifest` | App name, icon and full-screen setting for "Add to Home Screen" |
| `apple-touch-icon.png`, `icon-*.png` | Home-screen icons |

## Publish on GitHub Pages (one-off, about 10 minutes)

1. Sign in at github.com (create a free account if needed).
2. Click **+** (top right) → **New repository**. Name it, for example, `dex-tci`, set it to **Public**, and click **Create repository**. (Free accounts can only use Pages with public repositories.)
3. On the new repository page, click **uploading an existing file**. Drag in **all the files from this folder**, not the folder itself. Click **Commit changes**.
4. Go to **Settings** → **Pages** (left menu). Under **Build and deployment**, set **Source** to **Deploy from a branch**, set the branch to **main** and the folder to **/ (root)**, then click **Save**.
5. Wait 1–2 minutes and refresh the Pages settings screen. It will show your address, for example `https://your-username.github.io/dex-tci/`.

## Install on iPhone

1. Open the address in **Safari** (it must be Safari for Add to Home Screen on iPhone).
2. Tap **Share** → **Add to Home Screen** → **Add**.
3. Open the app **from the new home-screen icon** once while you have internet. The footer should read "saved for offline use".
4. Test it: turn on Flight Mode, close the app, then open it again from the icon. It should load and calculate normally.

On Android, open the address in Chrome and choose **Install app** or **Add to Home screen** from the ⋮ menu.

## Updating the app later

1. Replace `index.html` in the repository (**Add file** → **Upload files**, then commit).
2. In `sw.js`, increase the number in `const VERSION = 'dex-tci-v4';` (to `v5`, `v6` and so on). Phones only fetch the new copy when this changes. Edit the file on GitHub with the pencil icon, then commit.
3. Open the app once while online, then close and reopen it to load the new version.

## Live tracking

Tap **Start now** when the bolus is given, or enter the clock time the infusion started and tap **Start from that time**. The top bar then shows elapsed time, the pump rate to set, predicted Cp, deviation from TCI and time to the next change. The current table row is highlighted and the graphs show a "Now" line. When a step changes, the panel flashes, and Android phones also vibrate. Tracking survives the phone sleeping or the app closing. Inputs are locked until you tap **Stop tracking**.

## Zooming the graphs

- **Phone:** pinch to zoom the time axis, drag with two fingers to move, and double-tap to reset. One finger still reads off values, and vertical swipes still scroll the page.
- **Laptop:** pinch on the trackpad (or Ctrl/⌘ + scroll) to zoom, click-drag to move, and double-click to reset.
- **Buttons:** − / + / Reset do the same.

When zoomed in, the concentration axis rescales to the visible data so deviations are easier to see.

## Caveats

**This app was built for personal use as a TCI simulator and should not be used in patient care or in any clinical context. DO NOT USE THIS APP**


The model comes from 18 healthy adult volunteers (20–70 yr, 51–110 kg, BMI 20.6–29.3 kg/m², targets 1–8 ng/mL). The authors state it should be validated in patients before clinical TCI use. Output is decision support only. Check every dose and rate independently.
