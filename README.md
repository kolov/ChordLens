# ChordLens

A pure browser TypeScript app for visualising guitar chord shapes and the notes inside each voicing.

## Run locally

```sh
npm install
npm run dev
```

Open the local Vite URL and type a chord symbol such as `E7`, `F#m7`, `Bbmaj7`, or `Asus4`. The app also has root and chord-type buttons for browsing every supported family, including all dominant seventh chords and all sus4 chords. Each voicing includes controls to play the notes together as a chord or one string at a time as a sequence.

## Run without a server

```sh
npm run build
```

Then open `dist/index.html` directly in a browser. The build inlines its CSS and JavaScript into that single file, so it can run from `file://` with no server.
