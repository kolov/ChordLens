[Open ChordLens](https://kolov.github.io/ChordLens/)

# ChordLens

A pure browser TypeScript app for visualising guitar chord shapes and the notes inside each voicing.

## Run locally

```sh
npm install
npm run dev
```

Open the local Vite URL and type a chord symbol such as `E7`, `F#m7`, `Bbmaj7`, or `Asus4`. The app also has root and chord-type buttons for browsing every supported family, including all dominant seventh chords and all sus4 chords. Each voicing includes controls to play the notes together as a chord or one string at a time as a sequence.

Switch the **Chords / Scales** toggle to explore scales instead. Type a scale such as `A minor pentatonic`, `E blues`, `C major`, or `G minor` (or use the Type/Root buttons). Each scale is shown as five position "box" patterns across the neck, with every scale note labelled by name and degree, the root highlighted, and a play button that runs the position ascending. Supported scales: major, natural minor, minor pentatonic, and minor blues.

## Run without a server

```sh
npm run build
```

Then open `dist/index.html` directly in a browser. The build inlines its CSS and JavaScript into that single file, so it can run from `file://` with no server.
