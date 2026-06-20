import "./styles.css";

type QualityKey =
  | "major"
  | "minor"
  | "dominant7"
  | "major7"
  | "minor7"
  | "sus4"
  | "sus2"
  | "power";

type ToneRole = "root" | "third" | "fifth" | "seventh" | "extension" | "other";

type ScaleKey = "major" | "minor" | "pentatonic" | "blues";

type AppMode = "chord" | "scale";

interface FormulaTone {
  semitone: number;
  label: string;
  role: ToneRole;
}

interface ChordQuality {
  key: QualityKey;
  suffix: string;
  name: string;
  formula: FormulaTone[];
}

interface ScaleType {
  key: ScaleKey;
  // Suffix used in the input/history, e.g. "minor pentatonic" -> "A minor pentatonic".
  suffix: string;
  // Short label for the Type picker button.
  shortLabel: string;
  name: string;
  // Whole/half step pattern between consecutive tones, for the summary panel.
  stepPattern: string;
  formula: FormulaTone[];
}

interface ParsedScale {
  rootName: string;
  rootPc: number;
  preferFlats: boolean;
  scale: ScaleType;
  displayName: string;
}

interface ScaleNote {
  stringIndex: number;
  fret: number;
  noteName: string;
  degree: string;
  role: ToneRole;
  midi: number;
}

interface ScaleBox {
  id: string;
  name: string;
  rangeLabel: string;
  baseFret: number;
  fretCount: number;
  notes: ScaleNote[];
}

interface ParsedChord {
  rootName: string;
  rootPc: number;
  preferFlats: boolean;
  quality: ChordQuality;
  displayName: string;
}

interface OpenString {
  name: string;
  pc: number;
  midi: number;
}

interface ChordShape {
  id: string;
  name: string;
  frets: Array<number | null>;
  category: "Popular" | "Movable" | "Found";
  sourceUrl?: string;
}

type CuratedShape = Omit<ChordShape, "id" | "category" | "sourceUrl">;

interface ShapeTemplate {
  id: string;
  name: string;
  rootString: number;
  offsets: Array<number | null>;
}

interface AnnotatedString {
  stringName: string;
  fret: number | null;
  noteName: string | null;
  interval: string | null;
  semitoneFromRoot: number | null;
  role: ToneRole;
}

interface AudioEngine {
  context: AudioContext;
  output: GainNode;
}

const NOTE_NAMES_SHARP = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTE_NAMES_FLAT = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const LETTER_TO_NATURAL_PC: Record<string, number> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

const NOTE_TO_PC: Record<string, number> = {
  C: 0,
  "B#": 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  "E#": 5,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};

const OPEN_STRINGS: OpenString[] = [
  { name: "E", pc: 4, midi: 40 },
  { name: "A", pc: 9, midi: 45 },
  { name: "D", pc: 2, midi: 50 },
  { name: "G", pc: 7, midi: 55 },
  { name: "B", pc: 11, midi: 59 },
  { name: "E", pc: 4, midi: 64 },
];

const DISPLAY_STRING_ORDER = [5, 4, 3, 2, 1, 0];
const STRUM_STRING_ORDER = [0, 1, 2, 3, 4, 5];
const CHROMATIC_INTERVAL_MAP = [
  { semitone: 0, label: "1" },
  { semitone: 1, label: "b2" },
  { semitone: 2, label: "2" },
  { semitone: 3, label: "b3" },
  { semitone: 4, label: "3" },
  { semitone: 5, label: "4" },
  { semitone: 6, label: "b5" },
  { semitone: 7, label: "5" },
  { semitone: 8, label: "b6" },
  { semitone: 9, label: "6" },
  { semitone: 10, label: "b7" },
  { semitone: 11, label: "7" },
];

const QUALITIES: Record<QualityKey, ChordQuality> = {
  major: {
    key: "major",
    suffix: "",
    name: "major",
    formula: [
      { semitone: 0, label: "R", role: "root" },
      { semitone: 4, label: "3", role: "third" },
      { semitone: 7, label: "5", role: "fifth" },
    ],
  },
  minor: {
    key: "minor",
    suffix: "m",
    name: "minor",
    formula: [
      { semitone: 0, label: "R", role: "root" },
      { semitone: 3, label: "b3", role: "third" },
      { semitone: 7, label: "5", role: "fifth" },
    ],
  },
  dominant7: {
    key: "dominant7",
    suffix: "7",
    name: "dominant seventh",
    formula: [
      { semitone: 0, label: "R", role: "root" },
      { semitone: 4, label: "3", role: "third" },
      { semitone: 7, label: "5", role: "fifth" },
      { semitone: 10, label: "b7", role: "seventh" },
    ],
  },
  major7: {
    key: "major7",
    suffix: "maj7",
    name: "major seventh",
    formula: [
      { semitone: 0, label: "R", role: "root" },
      { semitone: 4, label: "3", role: "third" },
      { semitone: 7, label: "5", role: "fifth" },
      { semitone: 11, label: "7", role: "seventh" },
    ],
  },
  minor7: {
    key: "minor7",
    suffix: "m7",
    name: "minor seventh",
    formula: [
      { semitone: 0, label: "R", role: "root" },
      { semitone: 3, label: "b3", role: "third" },
      { semitone: 7, label: "5", role: "fifth" },
      { semitone: 10, label: "b7", role: "seventh" },
    ],
  },
  sus4: {
    key: "sus4",
    suffix: "sus4",
    name: "suspended fourth",
    formula: [
      { semitone: 0, label: "R", role: "root" },
      { semitone: 5, label: "4", role: "third" },
      { semitone: 7, label: "5", role: "fifth" },
    ],
  },
  sus2: {
    key: "sus2",
    suffix: "sus2",
    name: "suspended second",
    formula: [
      { semitone: 0, label: "R", role: "root" },
      { semitone: 2, label: "2", role: "extension" },
      { semitone: 7, label: "5", role: "fifth" },
    ],
  },
  power: {
    key: "power",
    suffix: "5",
    name: "power chord",
    formula: [
      { semitone: 0, label: "R", role: "root" },
      { semitone: 7, label: "5", role: "fifth" },
    ],
  },
};

const QUALITY_SUFFIXES = new Map<string, QualityKey>([
  ["", "major"],
  ["maj", "major"],
  ["major", "major"],
  ["M", "major"],
  ["m", "minor"],
  ["min", "minor"],
  ["minor", "minor"],
  ["-", "minor"],
  ["7", "dominant7"],
  ["dom7", "dominant7"],
  ["maj7", "major7"],
  ["ma7", "major7"],
  ["M7", "major7"],
  ["major7", "major7"],
  ["m7", "minor7"],
  ["min7", "minor7"],
  ["minor7", "minor7"],
  ["-7", "minor7"],
  ["sus4", "sus4"],
  ["sus", "sus4"],
  ["sus2", "sus2"],
  ["5", "power"],
]);

const SCALES: Record<ScaleKey, ScaleType> = {
  major: {
    key: "major",
    suffix: "major",
    shortLabel: "major",
    name: "major (Ionian)",
    stepPattern: "W W H W W W H",
    formula: [
      { semitone: 0, label: "1", role: "root" },
      { semitone: 2, label: "2", role: "other" },
      { semitone: 4, label: "3", role: "other" },
      { semitone: 5, label: "4", role: "other" },
      { semitone: 7, label: "5", role: "other" },
      { semitone: 9, label: "6", role: "other" },
      { semitone: 11, label: "7", role: "other" },
    ],
  },
  minor: {
    key: "minor",
    suffix: "minor",
    shortLabel: "minor",
    name: "natural minor (Aeolian)",
    stepPattern: "W H W W H W W",
    formula: [
      { semitone: 0, label: "1", role: "root" },
      { semitone: 2, label: "2", role: "other" },
      { semitone: 3, label: "b3", role: "other" },
      { semitone: 5, label: "4", role: "other" },
      { semitone: 7, label: "5", role: "other" },
      { semitone: 8, label: "b6", role: "other" },
      { semitone: 10, label: "b7", role: "other" },
    ],
  },
  pentatonic: {
    key: "pentatonic",
    suffix: "minor pentatonic",
    shortLabel: "min pent",
    name: "minor pentatonic",
    stepPattern: "3 2 2 3 2",
    formula: [
      { semitone: 0, label: "1", role: "root" },
      { semitone: 3, label: "b3", role: "other" },
      { semitone: 5, label: "4", role: "other" },
      { semitone: 7, label: "5", role: "other" },
      { semitone: 10, label: "b7", role: "other" },
    ],
  },
  blues: {
    key: "blues",
    suffix: "blues",
    shortLabel: "blues",
    name: "minor blues",
    stepPattern: "3 2 1 1 3 2",
    formula: [
      { semitone: 0, label: "1", role: "root" },
      { semitone: 3, label: "b3", role: "other" },
      { semitone: 5, label: "4", role: "other" },
      // The "blue note" (b5) gets its own accent colour via the seventh role.
      { semitone: 6, label: "b5", role: "seventh" },
      { semitone: 7, label: "5", role: "other" },
      { semitone: 10, label: "b7", role: "other" },
    ],
  },
};

const SCALE_SUFFIXES = new Map<string, ScaleKey>([
  ["major", "major"],
  ["maj", "major"],
  ["ionian", "major"],
  ["minor", "minor"],
  ["min", "minor"],
  ["m", "minor"],
  ["naturalminor", "minor"],
  ["aeolian", "minor"],
  ["minorpentatonic", "pentatonic"],
  ["minpentatonic", "pentatonic"],
  ["pentatonic", "pentatonic"],
  ["minpent", "pentatonic"],
  ["pent", "pentatonic"],
  ["minorblues", "blues"],
  ["minblues", "blues"],
  ["blues", "blues"],
]);

const SCALE_CHOICES: Array<{ key: ScaleKey; label: string }> = [
  { key: "major", label: "major" },
  { key: "minor", label: "minor" },
  { key: "pentatonic", label: "min pent" },
  { key: "blues", label: "blues" },
];

const GTRLIB_QUALITY_SLUGS: Record<QualityKey, string> = {
  major: "major",
  minor: "minor",
  dominant7: "dominant-7th",
  major7: "major-7th",
  minor7: "minor-7th",
  sus4: "suspended-4th",
  sus2: "suspended-2nd",
  power: "5",
};

const CURATED_SHAPES: Record<string, CuratedShape[]> = {
  "C:major": [
    { name: "Open C", frets: [null, 3, 2, 0, 1, 0] },
    { name: "C A-form barre", frets: [null, 3, 5, 5, 5, 3] },
  ],
  "A:major": [
    { name: "Open A", frets: [null, 0, 2, 2, 2, 0] },
    { name: "A E-form barre", frets: [5, 7, 7, 6, 5, 5] },
  ],
  "G:major": [
    { name: "Open G", frets: [3, 2, 0, 0, 0, 3] },
    { name: "Open G with D", frets: [3, 2, 0, 0, 3, 3] },
    { name: "G E-form barre", frets: [3, 5, 5, 4, 3, 3] },
  ],
  "E:major": [
    { name: "Open E", frets: [0, 2, 2, 1, 0, 0] },
    { name: "E A-form barre", frets: [null, 7, 9, 9, 9, 7] },
  ],
  "D:major": [
    { name: "Open D", frets: [null, null, 0, 2, 3, 2] },
    { name: "D A-form barre", frets: [null, 5, 7, 7, 7, 5] },
  ],
  "A:minor": [
    { name: "Open Am", frets: [null, 0, 2, 2, 1, 0] },
    { name: "Am E-minor form barre", frets: [5, 7, 7, 5, 5, 5] },
  ],
  "E:minor": [
    { name: "Open Em", frets: [0, 2, 2, 0, 0, 0] },
    { name: "Em A-minor form barre", frets: [null, 7, 9, 9, 8, 7] },
  ],
  "D:minor": [
    { name: "Open Dm", frets: [null, null, 0, 2, 3, 1] },
    { name: "Dm A-minor form barre", frets: [null, 5, 7, 7, 6, 5] },
  ],
  "C:dominant7": [
    { name: "Open C7", frets: [null, 3, 2, 3, 1, 0] },
    { name: "C7 A7-form barre", frets: [null, 3, 5, 3, 5, 3] },
  ],
  "A:dominant7": [
    { name: "Open A7", frets: [null, 0, 2, 0, 2, 0] },
    { name: "A7 E7-form barre", frets: [5, 7, 5, 6, 5, 5] },
  ],
  "G:dominant7": [
    { name: "Open G7", frets: [3, 2, 0, 0, 0, 1] },
    { name: "G7 E7-form barre", frets: [3, 5, 3, 4, 3, 3] },
  ],
  "E:dominant7": [
    { name: "Open E7", frets: [0, 2, 0, 1, 0, 0] },
    { name: "Open E7 four-finger", frets: [0, 2, 2, 1, 3, 0] },
    { name: "E7 A7-form barre", frets: [null, 7, 9, 7, 9, 7] },
  ],
  "D:dominant7": [
    { name: "Open D7", frets: [null, null, 0, 2, 1, 2] },
    { name: "D7 A7-form barre", frets: [null, 5, 7, 5, 7, 5] },
  ],
  "B:dominant7": [
    { name: "Open B7", frets: [null, 2, 1, 2, 0, 2] },
    { name: "B7 A7-form barre", frets: [null, 2, 4, 2, 4, 2] },
  ],
  "E:minor7": [
    { name: "Open Em7", frets: [0, 2, 2, 0, 3, 0] },
    { name: "Em7 A-minor-7 form barre", frets: [null, 7, 9, 7, 8, 7] },
  ],
  "A:minor7": [
    { name: "Open Am7", frets: [null, 0, 2, 0, 1, 0] },
    { name: "Am7 E-minor-7 form barre", frets: [5, 7, 5, 5, 5, 5] },
  ],
  "D:minor7": [
    { name: "Open Dm7", frets: [null, null, 0, 2, 1, 1] },
    { name: "Dm7 A-minor-7 form barre", frets: [null, 5, 7, 5, 6, 5] },
  ],
  "D:major7": [
    { name: "Open Dmaj7", frets: [null, null, 0, 2, 2, 2] },
    { name: "Dmaj7 Amaj7-form barre", frets: [null, 5, 7, 6, 7, 5] },
  ],
  "A:major7": [
    { name: "Open Amaj7", frets: [null, 0, 2, 1, 2, 0] },
    { name: "Amaj7 Emaj7-form barre", frets: [5, 7, 6, 6, 5, 5] },
  ],
  "E:major7": [
    { name: "Open Emaj7", frets: [0, 2, 1, 1, 0, 0] },
    { name: "Emaj7 Amaj7-form barre", frets: [null, 7, 9, 8, 9, 7] },
  ],
};

const MOVABLE_TEMPLATES: Partial<Record<QualityKey, ShapeTemplate[]>> = {
  major: [
    { id: "e-major", name: "E-form barre", rootString: 0, offsets: [0, 2, 2, 1, 0, 0] },
    { id: "a-major", name: "A-form barre", rootString: 1, offsets: [null, 0, 2, 2, 2, 0] },
    { id: "d-major", name: "D-form", rootString: 2, offsets: [null, null, 0, 2, 3, 2] },
  ],
  minor: [
    { id: "e-minor", name: "E-minor form barre", rootString: 0, offsets: [0, 2, 2, 0, 0, 0] },
    { id: "a-minor", name: "A-minor form barre", rootString: 1, offsets: [null, 0, 2, 2, 1, 0] },
    { id: "d-minor", name: "D-minor form", rootString: 2, offsets: [null, null, 0, 2, 3, 1] },
  ],
  dominant7: [
    { id: "e-7", name: "E7-form barre", rootString: 0, offsets: [0, 2, 0, 1, 0, 0] },
    { id: "a-7", name: "A7-form barre", rootString: 1, offsets: [null, 0, 2, 0, 2, 0] },
    { id: "d-7", name: "D7-form", rootString: 2, offsets: [null, null, 0, 2, 1, 2] },
  ],
  major7: [
    { id: "e-maj7", name: "Emaj7-form barre", rootString: 0, offsets: [0, 2, 1, 1, 0, 0] },
    { id: "a-maj7", name: "Amaj7-form barre", rootString: 1, offsets: [null, 0, 2, 1, 2, 0] },
    { id: "d-maj7", name: "Dmaj7-form", rootString: 2, offsets: [null, null, 0, 2, 2, 2] },
  ],
  minor7: [
    { id: "e-m7", name: "Em7-form barre", rootString: 0, offsets: [0, 2, 0, 0, 0, 0] },
    { id: "a-m7", name: "Am7-form barre", rootString: 1, offsets: [null, 0, 2, 0, 1, 0] },
    { id: "d-m7", name: "Dm7-form", rootString: 2, offsets: [null, null, 0, 2, 1, 1] },
  ],
  sus4: [
    { id: "e-sus4", name: "Esus4-form barre", rootString: 0, offsets: [0, 2, 2, 2, 0, 0] },
    { id: "a-sus4", name: "Asus4-form barre", rootString: 1, offsets: [null, 0, 2, 2, 3, 0] },
    { id: "d-sus4", name: "Dsus4-form", rootString: 2, offsets: [null, null, 0, 2, 3, 3] },
  ],
  sus2: [
    { id: "a-sus2", name: "Asus2-form barre", rootString: 1, offsets: [null, 0, 2, 2, 0, 0] },
    { id: "d-sus2", name: "Dsus2-form", rootString: 2, offsets: [null, null, 0, 2, 3, 0] },
  ],
  power: [
    { id: "e-5", name: "E-string power chord", rootString: 0, offsets: [0, 2, 2, null, null, null] },
    { id: "a-5", name: "A-string power chord", rootString: 1, offsets: [null, 0, 2, 2, null, null] },
  ],
};

const ROOT_CHOICES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
const QUALITY_CHOICES: Array<{ key: QualityKey; label: string }> = [
  { key: "major", label: "maj" },
  { key: "minor", label: "m" },
  { key: "dominant7", label: "7" },
  { key: "major7", label: "maj7" },
  { key: "minor7", label: "m7" },
  { key: "sus4", label: "sus4" },
  { key: "sus2", label: "sus2" },
  { key: "power", label: "5" },
];

let currentSelection: {
  mode: AppMode;
  rootName: string;
  qualityKey: QualityKey;
  scaleKey: ScaleKey;
} = {
  mode: "chord",
  rootName: "E",
  qualityKey: "dominant7",
  scaleKey: "pentatonic",
};
let activeParsedChord: ParsedChord | null = null;
let activeParsedScale: ParsedScale | null = null;
let activeShapes: ChordShape[] = [];
let activeScaleBoxes: ScaleBox[] = [];
let audioEngine: AudioEngine | null = null;
let history: Array<{ name: string; mode: AppMode }> = [];

const app = requireElement<HTMLDivElement>("#app");

app.innerHTML = `
  <main class="app-shell">
    <section class="control-panel" aria-labelledby="app-title">
      <div class="brand-lockup">
        <p class="eyebrow">Guitar chord tones</p>
        <h1 id="app-title">ChordLens</h1>
      </div>
      <div class="mode-toggle" role="group" aria-label="Mode">
        <button type="button" class="mode-option is-active" data-mode="chord" aria-pressed="true">Chords</button>
        <button type="button" class="mode-option" data-mode="scale" aria-pressed="false">Scales</button>
      </div>
      <form id="chord-form" class="chord-form">
        <label id="input-label" for="chord-input">Chord</label>
        <div class="input-row">
          <input id="chord-input" name="chord" value="E7" autocomplete="off" spellcheck="false" />
        </div>
      </form>
      <div class="chooser-stack">
        <fieldset class="choice-group">
          <legend>Type</legend>
          <div id="quality-picker" class="quality-grid" data-mode-panel="chord">
            ${QUALITY_CHOICES.map(
              (quality) =>
                `<button type="button" class="quality-option" data-quality="${quality.key}" aria-pressed="false">${quality.label}</button>`,
            ).join("")}
          </div>
          <div id="scale-picker" class="quality-grid" data-mode-panel="scale" hidden>
            ${SCALE_CHOICES.map(
              (scale) =>
                `<button type="button" class="quality-option" data-scale="${scale.key}" aria-pressed="false">${scale.label}</button>`,
            ).join("")}
          </div>
        </fieldset>
        <fieldset class="choice-group">
          <legend>Root</legend>
          <div id="root-picker" class="root-grid">
            ${ROOT_CHOICES.map(
              (root) =>
                `<button type="button" class="root-option" data-root="${root}" aria-pressed="false">${root}</button>`,
            ).join("")}
          </div>
        </fieldset>
      </div>
      <fieldset class="choice-group history-group">
        <legend>History</legend>
        <div id="history-row" class="history-row" aria-label="Chord history"></div>
      </fieldset>
      <div id="summary" class="summary-panel"></div>
    </section>
    <section class="results-panel" aria-live="polite">
      <div id="message" class="message" hidden></div>
      <div id="shape-grid" class="shape-grid"></div>
    </section>
  </main>
`;

const form = requireElement<HTMLFormElement>("#chord-form");
const input = requireElement<HTMLInputElement>("#chord-input");
const inputLabel = requireElement<HTMLLabelElement>("#input-label");
const summary = requireElement<HTMLDivElement>("#summary");
const grid = requireElement<HTMLDivElement>("#shape-grid");
const message = requireElement<HTMLDivElement>("#message");
const historyRow = requireElement<HTMLDivElement>("#history-row");
const qualityPicker = requireElement<HTMLDivElement>("#quality-picker");
const scalePicker = requireElement<HTMLDivElement>("#scale-picker");
const rootButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".root-option"));
const qualityButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-quality]"));
const scaleButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-scale]"));
const modeButtons = Array.from(document.querySelectorAll<HTMLButtonElement>(".mode-option"));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  render(input.value);
});

input.addEventListener("input", () => {
  render(input.value);
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;

    if (mode === "chord" || mode === "scale") {
      setMode(mode);
    }
  });
});

rootButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentSelection.rootName = button.dataset.root ?? currentSelection.rootName;
    input.value = currentSymbol();
    input.focus();
    render(input.value);
  });
});

qualityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const qualityKey = button.dataset.quality as QualityKey | undefined;

    if (!qualityKey || !QUALITIES[qualityKey]) {
      return;
    }

    currentSelection.qualityKey = qualityKey;
    input.value = currentSymbol();
    input.focus();
    render(input.value);
  });
});

scaleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const scaleKey = button.dataset.scale as ScaleKey | undefined;

    if (!scaleKey || !SCALES[scaleKey]) {
      return;
    }

    currentSelection.scaleKey = scaleKey;
    input.value = currentSymbol();
    input.focus();
    render(input.value);
  });
});

grid.addEventListener("click", (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>("[data-play-action]");

  if (!button) {
    return;
  }

  const action = button.dataset.playAction;

  if (action === "scale") {
    const box = activeScaleBoxes.find((candidate) => candidate.id === button.dataset.boxId);

    if (!box) {
      return;
    }

    button.classList.add("is-playing");
    window.setTimeout(() => button.classList.remove("is-playing"), 1300);
    void playScaleBox(box);
    return;
  }

  if (!activeParsedChord) {
    return;
  }

  const shape = activeShapes.find((candidate) => candidate.id === button.dataset.shapeId);

  if (!shape || (action !== "chord" && action !== "sequence")) {
    return;
  }

  button.classList.add("is-playing");
  window.setTimeout(() => button.classList.remove("is-playing"), action === "sequence" ? 1300 : 450);
  void playShape(shape, action);
});

historyRow.addEventListener("click", (event) => {
  const button = (event.target as Element).closest<HTMLButtonElement>("[data-history-chord]");

  if (button) {
    currentSelection.mode = button.dataset.historyMode === "scale" ? "scale" : "chord";
    const symbol = button.dataset.historyChord ?? "";
    input.value = symbol;
    input.focus();
    render(symbol);
  }
});

function setMode(mode: AppMode): void {
  if (currentSelection.mode === mode) {
    return;
  }

  currentSelection.mode = mode;
  input.value = currentSymbol();
  input.focus();
  render(input.value);
}

function currentSymbol(): string {
  return currentSelection.mode === "scale"
    ? scaleSymbol(currentSelection.rootName, currentSelection.scaleKey)
    : chordSymbol(currentSelection.rootName, currentSelection.qualityKey);
}

render(input.value);

function requireElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Missing element: ${selector}`);
  }

  return element;
}

function render(rawSymbol: string): void {
  if (currentSelection.mode === "scale") {
    renderScale(rawSymbol);
  } else {
    renderChord(rawSymbol);
  }
}

function renderChord(rawSymbol: string): void {
  const parsed = parseChord(rawSymbol);

  if (!parsed) {
    activeParsedChord = null;
    activeShapes = [];
    syncChoiceControls();
    summary.innerHTML = "";
    grid.innerHTML = "";
    message.hidden = false;
    message.textContent = rawSymbol.trim()
      ? "Unsupported chord symbol. Try E7, C, Am, G7, Dmaj7, F#m7, Bbmaj7, Asus2, or a 5 chord."
      : "Enter a chord symbol.";
    return;
  }

  currentSelection.rootName = parsed.rootName;
  currentSelection.qualityKey = parsed.quality.key;

  const shapes = getShapes(parsed);
  activeParsedChord = parsed;
  activeShapes = shapes;
  const notes = parsed.quality.formula.map((tone) => ({
    ...tone,
    name: spellChordTone(parsed, tone),
  }));

  message.hidden = true;
  message.textContent = "";
  syncChoiceControls();
  updateHistory(parsed.displayName, "chord");
  summary.innerHTML = renderSummary(parsed, notes);
  grid.innerHTML = shapes.map((shape) => renderShapeCard(parsed, shape)).join("");
}

function renderScale(rawSymbol: string): void {
  const parsed = parseScale(rawSymbol);

  if (!parsed) {
    activeParsedScale = null;
    activeScaleBoxes = [];
    syncChoiceControls();
    summary.innerHTML = "";
    grid.innerHTML = "";
    message.hidden = false;
    message.textContent = rawSymbol.trim()
      ? "Unsupported scale. Try A minor pentatonic, E blues, C major, or G minor."
      : "Enter a scale, e.g. A minor pentatonic.";
    return;
  }

  currentSelection.rootName = parsed.rootName;
  currentSelection.scaleKey = parsed.scale.key;

  const boxes = getScaleBoxes(parsed);
  activeParsedScale = parsed;
  activeScaleBoxes = boxes;

  message.hidden = true;
  message.textContent = "";
  syncChoiceControls();
  updateHistory(parsed.displayName, "scale");
  summary.innerHTML = renderScaleSummary(parsed);
  grid.innerHTML = boxes.map((box) => renderScaleCard(parsed, box)).join("");
}

function updateHistory(displayName: string, mode: AppMode): void {
  history = [{ name: displayName, mode }, ...history.filter((entry) => entry.name !== displayName)].slice(0, 8);
  historyRow.innerHTML = history
    .map(
      (entry) =>
        `<button type="button" class="history-chip" data-history-chord="${escapeHtml(entry.name)}" data-history-mode="${entry.mode}">${escapeHtml(entry.name)}</button>`,
    )
    .join("");
}

function parseChord(inputValue: string): ParsedChord | null {
  const cleaned = inputValue.trim().replace(/\s+/g, "");
  const match = cleaned.match(/^([A-Ga-g])([#b]?)(.*)$/);

  if (!match) {
    return null;
  }

  const rootName = `${match[1].toUpperCase()}${match[2] ?? ""}`;
  const rootPc = NOTE_TO_PC[rootName];

  if (rootPc === undefined) {
    return null;
  }

  const rawSuffix = match[3] ?? "";
  const qualityKey = parseQuality(rawSuffix);

  if (!qualityKey) {
    return null;
  }

  const quality = QUALITIES[qualityKey];
  const displayName = `${rootName}${quality.suffix}`;

  return {
    rootName,
    rootPc,
    preferFlats: rootName.includes("b"),
    quality,
    displayName,
  };
}

function parseQuality(rawSuffix: string): QualityKey | null {
  const suffix = rawSuffix.replace("major", "maj");
  const exact = QUALITY_SUFFIXES.get(suffix);

  if (exact) {
    return exact;
  }

  return QUALITY_SUFFIXES.get(suffix.toLowerCase()) ?? null;
}

function chordSymbol(rootName: string, qualityKey: QualityKey): string {
  return `${rootName}${QUALITIES[qualityKey].suffix}`;
}

function scaleSymbol(rootName: string, scaleKey: ScaleKey): string {
  return `${rootName} ${SCALES[scaleKey].suffix}`;
}

function parseScale(inputValue: string): ParsedScale | null {
  const cleaned = inputValue.trim();
  const match = cleaned.match(/^([A-Ga-g])([#b]?)(.*)$/);

  if (!match) {
    return null;
  }

  const rootName = `${match[1].toUpperCase()}${match[2] ?? ""}`;
  const rootPc = NOTE_TO_PC[rootName];

  if (rootPc === undefined) {
    return null;
  }

  const scaleKey = parseScaleSuffix(match[3] ?? "");

  if (!scaleKey) {
    return null;
  }

  const scale = SCALES[scaleKey];

  return {
    rootName,
    rootPc,
    preferFlats: rootName.includes("b"),
    scale,
    displayName: scaleSymbol(rootName, scaleKey),
  };
}

function parseScaleSuffix(rawSuffix: string): ScaleKey | null {
  const suffix = rawSuffix.replace(/\s+/g, "").toLowerCase();
  return SCALE_SUFFIXES.get(suffix) ?? null;
}

function syncChoiceControls(): void {
  const isScale = currentSelection.mode === "scale";

  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === currentSelection.mode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  inputLabel.textContent = isScale ? "Scale" : "Chord";
  qualityPicker.hidden = isScale;
  scalePicker.hidden = !isScale;

  const committed = isScale
    ? activeParsedScale?.rootName === currentSelection.rootName &&
      activeParsedScale.scale.key === currentSelection.scaleKey
    : activeParsedChord?.rootName === currentSelection.rootName &&
      activeParsedChord.quality.key === currentSelection.qualityKey;

  rootButtons.forEach((button) => {
    const rootName = button.dataset.root ?? "";
    const isActive = Boolean(committed) && rootName === currentSelection.rootName;

    button.textContent = isScale ? rootName : chordSymbol(rootName, currentSelection.qualityKey);
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  qualityButtons.forEach((button) => {
    const isActive = button.dataset.quality === currentSelection.qualityKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  scaleButtons.forEach((button) => {
    const isActive = button.dataset.scale === currentSelection.scaleKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function renderSummary(parsed: ParsedChord, notes: Array<FormulaTone & { name: string }>): string {
  return `
    ${renderChromaticMap(parsed.quality.formula)}
    <div class="chord-title-row">
      <div>
        <p class="summary-label">Current chord</p>
        <h2>${escapeHtml(parsed.displayName)}</h2>
      </div>
      <span class="quality-pill">${escapeHtml(parsed.quality.name)}</span>
    </div>
    <div class="definition-panel" aria-label="${escapeHtml(parsed.displayName)} chord definition">
      <div class="definition-row">
        <span>Semitone intervals</span>
        <strong>${parsed.quality.formula.map((tone) => tone.semitone).join(" ")}</strong>
      </div>
      <div class="definition-row">
        <span>Major scale positions</span>
        <strong>${parsed.quality.formula.map((tone) => intervalLabelForDefinition(tone)).join(" ")}</strong>
      </div>
    </div>
    <div class="tone-table">
      ${notes
        .map(
          (note) => `
            <div class="tone-token tone-${note.role}">
              <span>${escapeHtml(note.label)}</span>
              <strong>${escapeHtml(note.name)}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderChromaticMap(formula: FormulaTone[]): string {
  return `
    <div class="interval-map">
      <p class="definition-label">Chromatic map</p>
      <div class="interval-map-grid">
        ${CHROMATIC_INTERVAL_MAP.map((interval) => renderIntervalMapToken(formula, interval)).join("")}
      </div>
    </div>
  `;
}

function renderIntervalMapToken(formula: FormulaTone[], interval: { semitone: number; label: string }): string {
  const chordTone = formula.find((tone) => tone.semitone === interval.semitone);
  const activeClass = chordTone ? ` is-active tone-${chordTone.role}` : "";

  return `
    <div class="interval-map-token${activeClass}">
      <span>${interval.semitone}</span>
      <strong>${escapeHtml(interval.label)}</strong>
    </div>
  `;
}

function renderScaleSummary(parsed: ParsedScale): string {
  const notes = parsed.scale.formula.map((tone) => ({
    ...tone,
    name: spellScaleTone(parsed, tone),
  }));

  return `
    ${renderChromaticMap(parsed.scale.formula)}
    <div class="chord-title-row">
      <div>
        <p class="summary-label">Current scale</p>
        <h2>${escapeHtml(parsed.displayName)}</h2>
      </div>
      <span class="quality-pill">${escapeHtml(parsed.scale.name)}</span>
    </div>
    <div class="definition-panel" aria-label="${escapeHtml(parsed.displayName)} scale definition">
      <div class="definition-row">
        <span>Scale formula</span>
        <strong>${parsed.scale.formula.map((tone) => tone.label).join(" ")}</strong>
      </div>
      <div class="definition-row">
        <span>Step pattern</span>
        <strong>${escapeHtml(parsed.scale.stepPattern)}</strong>
      </div>
      <div class="definition-row">
        <span>Notes</span>
        <strong>${notes.map((note) => escapeHtml(note.name)).join(" ")}</strong>
      </div>
    </div>
    <div class="tone-table">
      ${notes
        .map(
          (note) => `
            <div class="tone-token tone-${note.role}">
              <span>${escapeHtml(note.label)}</span>
              <strong>${escapeHtml(note.name)}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function getScaleBoxes(parsed: ParsedScale): ScaleBox[] {
  const lowEpc = OPEN_STRINGS[0].pc;
  const rootFret = (parsed.rootPc - lowEpc + 12) % 12;
  // Wider window for 7-note scales so each box shows a playable 3-notes-per-string region.
  const span = parsed.scale.formula.length > 5 ? 5 : 4;
  const anchors = new Set<number>();

  // Anchor each box on a scale tone along the low E string, spanning octaves so the
  // lowest playable positions are covered regardless of how high the root sits.
  for (const octave of [-12, 0, 12]) {
    for (const tone of parsed.scale.formula) {
      anchors.add(rootFret + octave + tone.semitone);
    }
  }

  return [...anchors]
    .filter((start) => start >= 0 && start <= 12)
    .sort((a, b) => a - b)
    .slice(0, 5)
    .map((start, index) => buildScaleBox(parsed, start, span, index));
}

function buildScaleBox(parsed: ParsedScale, start: number, span: number, index: number): ScaleBox {
  const lo = start;
  const hi = start + span - 1;
  const notes: ScaleNote[] = [];

  for (let stringIndex = 0; stringIndex < OPEN_STRINGS.length; stringIndex += 1) {
    for (let fret = lo; fret <= hi; fret += 1) {
      const pc = (OPEN_STRINGS[stringIndex].pc + fret) % 12;
      const interval = (pc - parsed.rootPc + 12) % 12;
      const tone = parsed.scale.formula.find((candidate) => candidate.semitone === interval);

      if (!tone) {
        continue;
      }

      notes.push({
        stringIndex,
        fret,
        noteName: spellScaleTone(parsed, tone),
        degree: tone.label,
        role: tone.role,
        midi: OPEN_STRINGS[stringIndex].midi + fret,
      });
    }
  }

  return {
    id: `scale-${parsed.scale.key}-${parsed.rootPc}-${start}`,
    name: `Position ${index + 1}`,
    rangeLabel: lo === 0 ? `open · frets 0–${hi}` : `frets ${lo}–${hi}`,
    baseFret: lo === 0 ? 1 : lo,
    fretCount: span,
    notes,
  };
}

function renderScaleCard(parsed: ParsedScale, box: ScaleBox): string {
  const svg = renderScaleDiagramSvg(parsed, box);

  return `
    <article class="shape-card">
      <div class="shape-card-header">
        <div>
          <p class="shape-category">Scale position</p>
          <h3>${escapeHtml(box.name)}</h3>
        </div>
        <div class="shape-tools">
          <button type="button" class="icon-button" data-play-action="scale" data-box-id="${escapeHtml(
            box.id,
          )}" title="Play scale" aria-label="Play ${escapeHtml(parsed.displayName)} ${escapeHtml(box.name)} ascending">
            ${sequenceIcon()}
          </button>
          <span class="fret-code">${escapeHtml(box.rangeLabel)}</span>
        </div>
      </div>
      ${svg}
    </article>
  `;
}

function renderScaleDiagramSvg(parsed: ParsedScale, box: ScaleBox): string {
  const width = 360;
  const height = 230;
  const left = 58;
  const right = 330;
  const top = 44;
  const bottom = 184;
  const { fretCount, baseFret } = box;
  const fretGap = (right - left) / fretCount;
  const stringGap = (bottom - top) / 5;
  const fretLines = Array.from({ length: fretCount + 1 }, (_, index) => left + index * fretGap);
  const stringYs = Array.from({ length: 6 }, (_, index) => top + index * stringGap);
  const nutStroke = baseFret === 1 ? 8 : 2;
  const baseLabel = baseFret === 1 ? "" : `<text class="fret-label" x="${left + 10}" y="24">${baseFret}fr</text>`;

  return `
    <svg class="chord-diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(
      `${parsed.displayName} ${box.name}`,
    )}">
      <rect class="diagram-bg" x="0" y="0" width="${width}" height="${height}" rx="8"></rect>
      ${baseLabel}
      ${fretLines
        .map(
          (x, index) =>
            `<line class="${index === 0 && baseFret === 1 ? "nut-line" : "fret-line"}" x1="${x}" y1="${top}" x2="${x}" y2="${bottom}" stroke-width="${index === 0 ? nutStroke : 2}"></line>`,
        )
        .join("")}
      ${stringYs.map((y) => `<line class="string-line" x1="${left}" y1="${y}" x2="${right}" y2="${y}"></line>`).join("")}
      ${DISPLAY_STRING_ORDER.map(
        (stringIndex, displayIndex) =>
          `<text class="string-label" x="${left - 34}" y="${stringYs[displayIndex] + 5}">${6 - stringIndex} ${OPEN_STRINGS[stringIndex].name}</text>`,
      ).join("")}
      ${DISPLAY_STRING_ORDER.map((stringIndex, displayIndex) =>
        renderScaleStringMarkers(box, stringIndex, left, stringYs[displayIndex], fretGap, baseFret),
      ).join("")}
    </svg>
  `;
}

function renderScaleStringMarkers(
  box: ScaleBox,
  stringIndex: number,
  left: number,
  y: number,
  fretGap: number,
  baseFret: number,
): string {
  const stringNotes = box.notes.filter((note) => note.stringIndex === stringIndex);

  if (stringNotes.length === 0) {
    const openX = left - 22;

    return `
      <g class="muted-marker" aria-label="${OPEN_STRINGS[stringIndex].name} string has no scale tone in this position">
        <line x1="${openX - 7}" y1="${y - 7}" x2="${openX + 7}" y2="${y + 7}"></line>
        <line x1="${openX + 7}" y1="${y - 7}" x2="${openX - 7}" y2="${y + 7}"></line>
      </g>
    `;
  }

  return stringNotes.map((note) => renderScaleMarker(note, left, y, fretGap, baseFret)).join("");
}

function renderScaleMarker(note: ScaleNote, left: number, y: number, fretGap: number, baseFret: number): string {
  const markerClass = `note-marker marker-${note.role}`;

  if (note.fret === 0) {
    const openX = left - 22;

    return `
      <g class="open-marker ${markerClass}" aria-label="${OPEN_STRINGS[note.stringIndex].name} open ${escapeHtml(
        note.noteName,
      )} ${escapeHtml(note.degree)}">
        <circle cx="${openX}" cy="${y}" r="13"></circle>
        ${renderMarkerText(openX, y, note.noteName, note.degree)}
      </g>
    `;
  }

  const x = left + (note.fret - baseFret + 0.5) * fretGap;

  return `
    <g class="${markerClass}" aria-label="${OPEN_STRINGS[note.stringIndex].name} string fret ${note.fret} ${escapeHtml(
      note.noteName,
    )} ${escapeHtml(note.degree)}">
      <circle cx="${x}" cy="${y}" r="13"></circle>
      ${renderMarkerText(x, y, note.noteName, note.degree)}
    </g>
  `;
}

async function playScaleBox(box: ScaleBox): Promise<void> {
  const engine = getAudioEngine();
  const { context } = engine;

  if (context.state === "suspended") {
    await context.resume();
  }

  const seen = new Set<number>();
  const ordered = [...box.notes]
    .sort((a, b) => a.midi - b.midi)
    .filter((note) => {
      if (seen.has(note.midi)) {
        return false;
      }

      seen.add(note.midi);
      return true;
    });
  const now = context.currentTime + 0.025;

  ordered.forEach((note, index) => {
    const pan = ((note.stringIndex - 2.5) / 2.5) * 0.28;
    playPluckedNote(context, engine.output, midiToFrequency(note.midi), now + index * 0.16, 0.26, pan);
  });
}

function getShapes(parsed: ParsedChord): ChordShape[] {
  const curated = dedupeShapes(getCuratedShapes(parsed));

  if (curated.length > 0) {
    return curated;
  }

  const movable = dedupeShapes(getMovableShapes(parsed)).slice(0, 6);

  if (movable.length > 0) {
    return movable;
  }

  return findFallbackShapes(parsed);
}

function getCuratedShapes(parsed: ParsedChord): ChordShape[] {
  const rootKey = noteName(parsed.rootPc, parsed.preferFlats);
  const entries = CURATED_SHAPES[`${rootKey}:${parsed.quality.key}`] ?? [];

  return entries.map((shape, index) => ({
    ...shape,
    id: `curated-${rootKey}-${parsed.quality.key}-${index}`,
    category: "Popular",
    sourceUrl: gtrLibChordUrl(parsed),
  }));
}

function gtrLibChordUrl(parsed: ParsedChord): string {
  const rootSlug = gtrLibRootSlug(parsed.rootName);
  const qualitySlug = GTRLIB_QUALITY_SLUGS[parsed.quality.key];
  const chordSlug = parsed.quality.key === "power" ? `${rootSlug}${qualitySlug}` : `${rootSlug}-${qualitySlug}`;

  return `https://gtrlib.com/chords/${chordSlug}`;
}

function gtrLibRootSlug(rootName: string): string {
  const rootLetter = rootName[0].toLowerCase();

  if (rootName.endsWith("#")) {
    return `${rootLetter}-sharp`;
  }

  if (rootName.endsWith("b")) {
    return `${rootLetter}-flat`;
  }

  return rootLetter;
}

function getMovableShapes(parsed: ParsedChord): ChordShape[] {
  const templates = MOVABLE_TEMPLATES[parsed.quality.key] ?? [];

  return templates
    .map((template) => templateToShape(parsed, template))
    .filter((shape): shape is ChordShape => Boolean(shape));
}

function templateToShape(parsed: ParsedChord, template: ShapeTemplate): ChordShape | null {
  const rootFret = fretForNote(OPEN_STRINGS[template.rootString].pc, parsed.rootPc);
  const frets = template.offsets.map((offset) => (offset === null ? null : rootFret + offset));

  if (frets.every((fret) => fret === null)) {
    return null;
  }

  return {
    id: `movable-${template.id}-${parsed.rootPc}`,
    name: rootFret === 0 ? template.name.replace(" barre", "") : template.name,
    frets,
    category: "Movable",
  };
}

function fretForNote(openPc: number, targetPc: number): number {
  return (targetPc - openPc + 12) % 12;
}

function dedupeShapes(shapes: ChordShape[]): ChordShape[] {
  const seen = new Set<string>();
  const result: ChordShape[] = [];

  for (const shape of shapes) {
    const key = shape.frets.map((fret) => (fret === null ? "x" : String(fret))).join("-");

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(shape);
  }

  return result;
}

function findFallbackShapes(parsed: ParsedChord): ChordShape[] {
  const chordToneSet = new Set(parsed.quality.formula.map((tone) => tone.semitone));
  const candidates: ChordShape[] = [];

  for (let base = 0; base <= 9; base += 1) {
    const choices = OPEN_STRINGS.map((openString) => {
      const stringChoices: Array<number | null> = [null];

      for (let fret = base; fret <= base + 4; fret += 1) {
        if (fret === 0 || fret > 0) {
          const interval = (openString.pc + fret - parsed.rootPc + 120) % 12;

          if (chordToneSet.has(interval)) {
            stringChoices.push(fret);
          }
        }
      }

      return stringChoices;
    });

    buildFallbackCombinations(choices, 0, [], (frets) => {
      const score = scoreFallback(parsed, frets);

      if (score < Number.POSITIVE_INFINITY) {
        candidates.push({
          id: `found-${base}-${candidates.length}`,
          name: `Found voicing ${candidates.length + 1}`,
          frets,
          category: "Found",
        });
      }
    });
  }

  return dedupeShapes(candidates)
    .sort((a, b) => scoreFallback(parsed, a.frets) - scoreFallback(parsed, b.frets))
    .slice(0, 4);
}

function buildFallbackCombinations(
  choices: Array<Array<number | null>>,
  index: number,
  current: Array<number | null>,
  visit: (frets: Array<number | null>) => void,
): void {
  if (index === choices.length) {
    visit([...current]);
    return;
  }

  for (const choice of choices[index]) {
    current.push(choice);
    buildFallbackCombinations(choices, index + 1, current, visit);
    current.pop();
  }
}

function scoreFallback(parsed: ParsedChord, frets: Array<number | null>): number {
  const sounding = frets
    .map((fret, index) => ({ fret, index }))
    .filter((item): item is { fret: number; index: number } => item.fret !== null);

  if (sounding.length < 3 || sounding.length > 5) {
    return Number.POSITIVE_INFINITY;
  }

  const intervals = new Set(
    sounding.map(({ fret, index }) => (OPEN_STRINGS[index].pc + fret - parsed.rootPc + 120) % 12),
  );
  const required = parsed.quality.formula.filter((tone) => tone.role !== "fifth").map((tone) => tone.semitone);

  if (!required.every((interval) => intervals.has(interval))) {
    return Number.POSITIVE_INFINITY;
  }

  const fretted = sounding.map(({ fret }) => fret).filter((fret) => fret > 0);
  const minFret = Math.min(...fretted, 0);
  const maxFret = Math.max(...fretted, 0);

  if (fretted.length > 4 || maxFret - minFret > 4) {
    return Number.POSITIVE_INFINITY;
  }

  const bass = sounding[0];
  const bassInterval = (OPEN_STRINGS[bass.index].pc + bass.fret - parsed.rootPc + 120) % 12;
  const rootBassBonus = bassInterval === 0 ? -10 : 0;
  const mutePenalty = frets.filter((fret) => fret === null).length * 4;
  const highFretPenalty = maxFret;

  return mutePenalty + highFretPenalty + sounding.length + rootBassBonus;
}

function renderShapeCard(parsed: ParsedChord, shape: ChordShape): string {
  const annotated = annotateShape(parsed, shape);
  const baseFret = visibleBaseFret(shape.frets);
  const fretCount = 5;
  const svg = renderDiagramSvg(parsed, shape, annotated, baseFret, fretCount);
  const compactFrets = shape.frets.map((fret) => (fret === null ? "x" : String(fret))).join(" ");

  return `
    <article class="shape-card">
      <div class="shape-card-header">
        <div>
          ${renderShapeCategory(parsed, shape)}
          <h3>${escapeHtml(shape.name)}</h3>
        </div>
        <div class="shape-tools">
          <button type="button" class="icon-button" data-play-action="chord" data-shape-id="${escapeHtml(
            shape.id,
          )}" title="Play chord" aria-label="Play ${escapeHtml(parsed.displayName)} ${escapeHtml(shape.name)} as a chord">
            ${chordIcon()}
          </button>
          <button type="button" class="icon-button" data-play-action="sequence" data-shape-id="${escapeHtml(
            shape.id,
          )}" title="Play sequence" aria-label="Play ${escapeHtml(parsed.displayName)} ${escapeHtml(shape.name)} as a sequence">
            ${sequenceIcon()}
          </button>
          <span class="fret-code">${escapeHtml(compactFrets)}</span>
        </div>
      </div>
      ${svg}
    </article>
  `;
}

function renderShapeCategory(parsed: ParsedChord, shape: ChordShape): string {
  const sourceLink = shape.sourceUrl
    ? ` <span aria-hidden="true">·</span> <a class="source-link" href="${escapeHtml(
        shape.sourceUrl,
      )}" target="_blank" rel="noreferrer" title="Open ${escapeHtml(parsed.displayName)} reference on GtrLib">GtrLib</a>`
    : "";

  return `<p class="shape-category">${escapeHtml(shape.category)}${sourceLink}</p>`;
}

function annotateShape(parsed: ParsedChord, shape: ChordShape): AnnotatedString[] {
  const referenceRootMidi = referenceRootMidiForShape(parsed, shape.frets);

  return shape.frets.map((fret, stringIndex) => {
    if (fret === null) {
      return {
        stringName: OPEN_STRINGS[stringIndex].name,
        fret,
        noteName: null,
        interval: null,
        semitoneFromRoot: null,
        role: "other",
      };
    }

    const pc = (OPEN_STRINGS[stringIndex].pc + fret) % 12;
    const midi = OPEN_STRINGS[stringIndex].midi + fret;
    const tone = toneForPc(parsed, pc);

    return {
      stringName: OPEN_STRINGS[stringIndex].name,
      fret,
      noteName: tone ? spellChordTone(parsed, tone) : noteName(pc, parsed.preferFlats),
      interval: tone?.label ?? "?",
      semitoneFromRoot: referenceRootMidi === null ? null : midi - referenceRootMidi,
      role: tone?.role ?? "other",
    };
  });
}

function referenceRootMidiForShape(parsed: ParsedChord, frets: Array<number | null>): number | null {
  const soundingMidis = frets
    .map((fret, stringIndex) => (fret === null ? null : OPEN_STRINGS[stringIndex].midi + fret))
    .filter((midi): midi is number => midi !== null);

  if (soundingMidis.length === 0) {
    return null;
  }

  const lowestMidi = Math.min(...soundingMidis);
  return lowestMidi - ((midiPc(lowestMidi) - parsed.rootPc + 12) % 12);
}

function midiPc(midi: number): number {
  return ((midi % 12) + 12) % 12;
}

function toneForPc(parsed: ParsedChord, pc: number): FormulaTone | null {
  const interval = (pc - parsed.rootPc + 12) % 12;
  return parsed.quality.formula.find((tone) => tone.semitone === interval) ?? null;
}

function visibleBaseFret(frets: Array<number | null>): number {
  const fretted = frets.filter((fret): fret is number => fret !== null && fret > 0);

  if (fretted.length === 0 || Math.max(...fretted) <= 5) {
    return 1;
  }

  return Math.max(1, Math.min(...fretted));
}

function renderDiagramSvg(
  parsed: ParsedChord,
  shape: ChordShape,
  annotated: AnnotatedString[],
  baseFret: number,
  fretCount: number,
): string {
  const width = 360;
  const height = 230;
  const left = 58;
  const right = 330;
  const top = 44;
  const bottom = 184;
  const fretGap = (right - left) / fretCount;
  const stringGap = (bottom - top) / 5;
  const fretLines = Array.from({ length: fretCount + 1 }, (_, index) => left + index * fretGap);
  const stringYs = Array.from({ length: 6 }, (_, index) => top + index * stringGap);
  const nutStroke = baseFret === 1 ? 8 : 2;
  const baseLabel = baseFret === 1 ? "" : `<text class="fret-label" x="${left + 10}" y="24">${baseFret}fr</text>`;

  return `
    <svg class="chord-diagram" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(
      `${parsed.displayName} ${shape.name}`,
    )}">
      <rect class="diagram-bg" x="0" y="0" width="${width}" height="${height}" rx="8"></rect>
      ${baseLabel}
      ${fretLines
        .map(
          (x, index) =>
            `<line class="${index === 0 && baseFret === 1 ? "nut-line" : "fret-line"}" x1="${x}" y1="${top}" x2="${x}" y2="${bottom}" stroke-width="${index === 0 ? nutStroke : 2}"></line>`,
        )
        .join("")}
      ${stringYs.map((y) => `<line class="string-line" x1="${left}" y1="${y}" x2="${right}" y2="${y}"></line>`).join("")}
      ${DISPLAY_STRING_ORDER.map(
        (stringIndex, displayIndex) =>
          `<text class="string-label" x="${left - 34}" y="${stringYs[displayIndex] + 5}">${6 - stringIndex} ${OPEN_STRINGS[stringIndex].name}</text>`,
      ).join("")}
      ${DISPLAY_STRING_ORDER.map((stringIndex, displayIndex) =>
        renderStringMarker(
          shape.frets[stringIndex],
          stringIndex,
          left,
          stringYs[displayIndex],
          fretGap,
          baseFret,
          annotated[stringIndex],
        ),
      )
        .join("")}
      ${DISPLAY_STRING_ORDER.map((stringIndex, displayIndex) =>
        renderSemitoneDistanceLabel(annotated[stringIndex], right + 12, stringYs[displayIndex]),
      ).join("")}
    </svg>
  `;
}

function renderSemitoneDistanceLabel(annotation: AnnotatedString, x: number, y: number): string {
  if (annotation.semitoneFromRoot === null) {
    return "";
  }

  return `<text class="semitone-distance marker-${annotation.role}" x="${x}" y="${y + 5}">${annotation.semitoneFromRoot}</text>`;
}

function renderStringMarker(
  fret: number | null,
  stringIndex: number,
  left: number,
  y: number,
  fretGap: number,
  baseFret: number,
  annotation: AnnotatedString,
): string {
  const openX = left - 22;

  if (fret === null) {
    return `
      <g class="muted-marker" aria-label="${OPEN_STRINGS[stringIndex].name} string muted">
        <line x1="${openX - 7}" y1="${y - 7}" x2="${openX + 7}" y2="${y + 7}"></line>
        <line x1="${openX + 7}" y1="${y - 7}" x2="${openX - 7}" y2="${y + 7}"></line>
      </g>
    `;
  }

  const role = annotation.role;
  const markerClass = `note-marker marker-${role}`;
  const note = annotation.noteName ?? "";
  const interval = annotation.interval ?? "";

  if (fret === 0) {
    return `
      <g class="open-marker ${markerClass}" aria-label="${OPEN_STRINGS[stringIndex].name} open ${escapeHtml(note)} ${escapeHtml(interval)}">
        <circle cx="${openX}" cy="${y}" r="15"></circle>
        ${renderMarkerText(openX, y, note, interval)}
      </g>
    `;
  }

  const x = left + (fret - baseFret + 0.5) * fretGap;

  return `
    <g class="${markerClass}" aria-label="${OPEN_STRINGS[stringIndex].name} string fret ${fret} ${escapeHtml(note)} ${escapeHtml(interval)}">
      <circle cx="${x}" cy="${y}" r="17"></circle>
      ${renderMarkerText(x, y, note, interval)}
    </g>
  `;
}

function renderMarkerText(x: number, y: number, note: string, interval: string): string {
  return `
    <text class="marker-note" x="${x}" y="${y - 2}">${escapeHtml(note)}</text>
    <text class="marker-interval" x="${x}" y="${y + 11}">${escapeHtml(interval)}</text>
  `;
}

async function playShape(shape: ChordShape, mode: "chord" | "sequence"): Promise<void> {
  const engine = getAudioEngine();
  const { context } = engine;

  if (context.state === "suspended") {
    await context.resume();
  }

  const now = context.currentTime + 0.025;
  const stringOrder = STRUM_STRING_ORDER;
  const notes = stringOrder
    .map((stringIndex) => {
      const fret = shape.frets[stringIndex];

      if (fret === null) {
        return null;
      }

      return {
        frequency: midiToFrequency(OPEN_STRINGS[stringIndex].midi + fret),
        stringIndex,
      };
    })
    .filter((note): note is { frequency: number; stringIndex: number } => Boolean(note));

  notes.forEach((note, index) => {
    const offset = mode === "chord" ? index * 0.015 : index * 0.2;
    const velocity = mode === "chord" ? 0.28 : 0.24;
    const pan = ((note.stringIndex - 2.5) / 2.5) * 0.28;

    playPluckedNote(context, engine.output, note.frequency, now + offset, velocity, pan);
  });
}

function getAudioEngine(): AudioEngine {
  if (audioEngine) {
    return audioEngine;
  }

  const context = createAudioContext();
  const output = context.createGain();
  const limiter = context.createDynamicsCompressor();

  output.gain.setValueAtTime(1.2, context.currentTime);
  limiter.threshold.setValueAtTime(-12, context.currentTime);
  limiter.knee.setValueAtTime(18, context.currentTime);
  limiter.ratio.setValueAtTime(10, context.currentTime);
  limiter.attack.setValueAtTime(0.003, context.currentTime);
  limiter.release.setValueAtTime(0.18, context.currentTime);

  output.connect(limiter);
  limiter.connect(context.destination);

  audioEngine = { context, output };
  return audioEngine;
}

function createAudioContext(): AudioContext {
  const AudioContextConstructor =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextConstructor) {
    throw new Error("Web Audio is not supported in this browser.");
  }

  return new AudioContextConstructor();
}

function playPluckedNote(
  context: AudioContext,
  output: AudioNode,
  frequency: number,
  startTime: number,
  velocity: number,
  pan: number,
): void {
  const duration = 1.8;
  const fundamental = context.createOscillator();
  const overtone = context.createOscillator();
  const shimmer = context.createOscillator();
  const pick = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const pickFilter = context.createBiquadFilter();
  const gain = context.createGain();
  const pickGain = context.createGain();
  const panner = context.createStereoPanner();

  fundamental.type = "sawtooth";
  fundamental.frequency.setValueAtTime(frequency, startTime);
  fundamental.detune.setValueAtTime(-2, startTime);

  overtone.type = "triangle";
  overtone.frequency.setValueAtTime(frequency * 2.01, startTime);
  overtone.detune.setValueAtTime(3, startTime);

  shimmer.type = "sine";
  shimmer.frequency.setValueAtTime(frequency * 3.01, startTime);
  shimmer.detune.setValueAtTime(-5, startTime);

  pick.buffer = createPickNoiseBuffer(context);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(4200, startTime);
  filter.frequency.exponentialRampToValueAtTime(760, startTime + duration);
  filter.Q.setValueAtTime(4.2, startTime);

  pickFilter.type = "bandpass";
  pickFilter.frequency.setValueAtTime(Math.max(1200, frequency * 7), startTime);
  pickFilter.Q.setValueAtTime(1.4, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(velocity, startTime + 0.004);
  gain.gain.exponentialRampToValueAtTime(velocity * 0.42, startTime + 0.09);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  pickGain.gain.setValueAtTime(0.0001, startTime);
  pickGain.gain.linearRampToValueAtTime(velocity * 0.6, startTime + 0.002);
  pickGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.055);

  panner.pan.setValueAtTime(pan, startTime);

  fundamental.connect(filter);
  overtone.connect(filter);
  shimmer.connect(filter);
  filter.connect(gain);
  pick.connect(pickFilter);
  pickFilter.connect(pickGain);
  pickGain.connect(gain);
  gain.connect(panner);
  panner.connect(output);

  fundamental.start(startTime);
  overtone.start(startTime);
  shimmer.start(startTime);
  pick.start(startTime);
  fundamental.stop(startTime + duration + 0.04);
  overtone.stop(startTime + duration + 0.04);
  shimmer.stop(startTime + duration + 0.04);
  pick.stop(startTime + 0.06);
}

function createPickNoiseBuffer(context: AudioContext): AudioBuffer {
  const sampleCount = Math.max(1, Math.floor(context.sampleRate * 0.06));
  const buffer = context.createBuffer(1, sampleCount, context.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let index = 0; index < sampleCount; index += 1) {
    const decay = 1 - index / sampleCount;
    samples[index] = (Math.random() * 2 - 1) * decay * decay;
  }

  return buffer;
}

function midiToFrequency(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12);
}

function intervalLabelForDefinition(tone: FormulaTone): string {
  return tone.label === "R" ? "1" : tone.label;
}

function spellChordTone(parsed: ParsedChord, tone: FormulaTone): string {
  return spellTone(parsed.rootName, parsed.rootPc, tone.semitone, degreeForTone(tone));
}

function spellScaleTone(parsed: ParsedScale, tone: FormulaTone): string {
  return spellTone(parsed.rootName, parsed.rootPc, tone.semitone, degreeForTone(tone));
}

function spellTone(rootName: string, rootPc: number, semitone: number, degree: number): string {
  const rootLetter = rootName[0];
  const rootLetterIndex = LETTERS.indexOf(rootLetter);
  const targetLetter = LETTERS[(rootLetterIndex + degree - 1) % LETTERS.length];
  const targetPc = (rootPc + semitone) % 12;
  const naturalPc = LETTER_TO_NATURAL_PC[targetLetter];
  const accidentalDistance = normalizeAccidentalDistance(targetPc - naturalPc);

  return `${targetLetter}${accidentalSuffix(accidentalDistance)}`;
}

function degreeForTone(tone: FormulaTone): number {
  if (tone.label === "R") {
    return 1;
  }

  const match = tone.label.match(/\d+/);

  if (!match) {
    return 1;
  }

  return Number(match[0]);
}

function normalizeAccidentalDistance(distance: number): number {
  let normalized = distance;

  while (normalized > 6) {
    normalized -= 12;
  }

  while (normalized < -6) {
    normalized += 12;
  }

  return normalized;
}

function accidentalSuffix(distance: number): string {
  if (distance > 0) {
    return "#".repeat(distance);
  }

  if (distance < 0) {
    return "b".repeat(Math.abs(distance));
  }

  return "";
}

function chordIcon(): string {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8v8"></path>
      <path d="M9 6v12"></path>
      <path d="M13 8v8"></path>
      <path d="M17 5v14"></path>
      <path d="M4 12h14"></path>
      <path d="m18 9 3 3-3 3"></path>
    </svg>
  `;
}

function sequenceIcon(): string {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h3"></path>
      <path d="M5 12h8"></path>
      <path d="M5 18h13"></path>
      <path d="m15 9 3 3-3 3"></path>
    </svg>
  `;
}

function noteName(pc: number, preferFlats: boolean): string {
  const names = preferFlats ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP;
  return names[(pc + 12) % 12];
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
