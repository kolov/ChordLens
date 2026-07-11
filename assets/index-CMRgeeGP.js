(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`C`,`C#`,`D`,`D#`,`E`,`F`,`F#`,`G`,`G#`,`A`,`A#`,`B`],t=[`C`,`Db`,`D`,`Eb`,`E`,`F`,`Gb`,`G`,`Ab`,`A`,`Bb`,`B`],n=[`C`,`D`,`E`,`F`,`G`,`A`,`B`],r={C:0,D:2,E:4,F:5,G:7,A:9,B:11},i={C:0,"B#":0,"C#":1,Db:1,D:2,"D#":3,Eb:3,E:4,Fb:4,"E#":5,F:5,"F#":6,Gb:6,G:7,"G#":8,Ab:8,A:9,"A#":10,Bb:10,B:11,Cb:11},a=[{name:`E`,pc:4,midi:40},{name:`A`,pc:9,midi:45},{name:`D`,pc:2,midi:50},{name:`G`,pc:7,midi:55},{name:`B`,pc:11,midi:59},{name:`E`,pc:4,midi:64}],o=[5,4,3,2,1,0],s=[0,1,2,3,4,5],c=[{semitone:0,label:`1`},{semitone:1,label:`b2`},{semitone:2,label:`2`},{semitone:3,label:`b3`},{semitone:4,label:`3`},{semitone:5,label:`4`},{semitone:6,label:`b5`},{semitone:7,label:`5`},{semitone:8,label:`b6`},{semitone:9,label:`6`},{semitone:10,label:`b7`},{semitone:11,label:`7`}],l={major:{key:`major`,suffix:``,name:`major`,formula:[{semitone:0,label:`R`,role:`root`},{semitone:4,label:`3`,role:`third`},{semitone:7,label:`5`,role:`fifth`}]},minor:{key:`minor`,suffix:`m`,name:`minor`,formula:[{semitone:0,label:`R`,role:`root`},{semitone:3,label:`b3`,role:`third`},{semitone:7,label:`5`,role:`fifth`}]},dominant7:{key:`dominant7`,suffix:`7`,name:`dominant seventh`,formula:[{semitone:0,label:`R`,role:`root`},{semitone:4,label:`3`,role:`third`},{semitone:7,label:`5`,role:`fifth`},{semitone:10,label:`b7`,role:`seventh`}]},major7:{key:`major7`,suffix:`maj7`,name:`major seventh`,formula:[{semitone:0,label:`R`,role:`root`},{semitone:4,label:`3`,role:`third`},{semitone:7,label:`5`,role:`fifth`},{semitone:11,label:`7`,role:`seventh`}]},minor7:{key:`minor7`,suffix:`m7`,name:`minor seventh`,formula:[{semitone:0,label:`R`,role:`root`},{semitone:3,label:`b3`,role:`third`},{semitone:7,label:`5`,role:`fifth`},{semitone:10,label:`b7`,role:`seventh`}]},sus4:{key:`sus4`,suffix:`sus4`,name:`suspended fourth`,formula:[{semitone:0,label:`R`,role:`root`},{semitone:5,label:`4`,role:`third`},{semitone:7,label:`5`,role:`fifth`}]},sus2:{key:`sus2`,suffix:`sus2`,name:`suspended second`,formula:[{semitone:0,label:`R`,role:`root`},{semitone:2,label:`2`,role:`extension`},{semitone:7,label:`5`,role:`fifth`}]},power:{key:`power`,suffix:`5`,name:`power chord`,formula:[{semitone:0,label:`R`,role:`root`},{semitone:7,label:`5`,role:`fifth`}]}},u=new Map([[``,`major`],[`maj`,`major`],[`major`,`major`],[`M`,`major`],[`m`,`minor`],[`min`,`minor`],[`minor`,`minor`],[`-`,`minor`],[`7`,`dominant7`],[`dom7`,`dominant7`],[`maj7`,`major7`],[`ma7`,`major7`],[`M7`,`major7`],[`major7`,`major7`],[`m7`,`minor7`],[`min7`,`minor7`],[`minor7`,`minor7`],[`-7`,`minor7`],[`sus4`,`sus4`],[`sus`,`sus4`],[`sus2`,`sus2`],[`5`,`power`]]),d={major:{key:`major`,suffix:`major`,shortLabel:`major`,name:`major (Ionian)`,stepPattern:`W W H W W W H`,formula:[{semitone:0,label:`1`,role:`root`},{semitone:2,label:`2`,role:`other`},{semitone:4,label:`3`,role:`other`},{semitone:5,label:`4`,role:`other`},{semitone:7,label:`5`,role:`other`},{semitone:9,label:`6`,role:`other`},{semitone:11,label:`7`,role:`other`}]},minor:{key:`minor`,suffix:`minor`,shortLabel:`minor`,name:`natural minor (Aeolian)`,stepPattern:`W H W W H W W`,formula:[{semitone:0,label:`1`,role:`root`},{semitone:2,label:`2`,role:`other`},{semitone:3,label:`b3`,role:`other`},{semitone:5,label:`4`,role:`other`},{semitone:7,label:`5`,role:`other`},{semitone:8,label:`b6`,role:`other`},{semitone:10,label:`b7`,role:`other`}]},pentatonic:{key:`pentatonic`,suffix:`minor pentatonic`,shortLabel:`min pent`,name:`minor pentatonic`,stepPattern:`3 2 2 3 2`,formula:[{semitone:0,label:`1`,role:`root`},{semitone:3,label:`b3`,role:`other`},{semitone:5,label:`4`,role:`other`},{semitone:7,label:`5`,role:`other`},{semitone:10,label:`b7`,role:`other`}]},blues:{key:`blues`,suffix:`blues`,shortLabel:`blues`,name:`minor blues`,stepPattern:`3 2 1 1 3 2`,formula:[{semitone:0,label:`1`,role:`root`},{semitone:3,label:`b3`,role:`other`},{semitone:5,label:`4`,role:`other`},{semitone:6,label:`b5`,role:`seventh`},{semitone:7,label:`5`,role:`other`},{semitone:10,label:`b7`,role:`other`}]}},f=new Map([[`major`,`major`],[`maj`,`major`],[`ionian`,`major`],[`minor`,`minor`],[`min`,`minor`],[`m`,`minor`],[`naturalminor`,`minor`],[`aeolian`,`minor`],[`minorpentatonic`,`pentatonic`],[`minpentatonic`,`pentatonic`],[`pentatonic`,`pentatonic`],[`minpent`,`pentatonic`],[`pent`,`pentatonic`],[`minorblues`,`blues`],[`minblues`,`blues`],[`blues`,`blues`]]),p=[{key:`major`,label:`major`},{key:`minor`,label:`minor`},{key:`pentatonic`,label:`min pent`},{key:`blues`,label:`blues`}],m={major:`major`,minor:`minor`,dominant7:`dominant-7th`,major7:`major-7th`,minor7:`minor-7th`,sus4:`suspended-4th`,sus2:`suspended-2nd`,power:`5`},h={"C:major":[{name:`Open C`,frets:[null,3,2,0,1,0]},{name:`C A-form barre`,frets:[null,3,5,5,5,3]}],"A:major":[{name:`Open A`,frets:[null,0,2,2,2,0]},{name:`A E-form barre`,frets:[5,7,7,6,5,5]}],"G:major":[{name:`Open G`,frets:[3,2,0,0,0,3]},{name:`Open G with D`,frets:[3,2,0,0,3,3]},{name:`G E-form barre`,frets:[3,5,5,4,3,3]}],"E:major":[{name:`Open E`,frets:[0,2,2,1,0,0]},{name:`E A-form barre`,frets:[null,7,9,9,9,7]}],"D:major":[{name:`Open D`,frets:[null,null,0,2,3,2]},{name:`D A-form barre`,frets:[null,5,7,7,7,5]}],"A:minor":[{name:`Open Am`,frets:[null,0,2,2,1,0]},{name:`Am E-minor form barre`,frets:[5,7,7,5,5,5]}],"E:minor":[{name:`Open Em`,frets:[0,2,2,0,0,0]},{name:`Em A-minor form barre`,frets:[null,7,9,9,8,7]}],"D:minor":[{name:`Open Dm`,frets:[null,null,0,2,3,1]},{name:`Dm A-minor form barre`,frets:[null,5,7,7,6,5]}],"C:dominant7":[{name:`Open C7`,frets:[null,3,2,3,1,0]},{name:`C7 A7-form barre`,frets:[null,3,5,3,5,3]}],"A:dominant7":[{name:`Open A7`,frets:[null,0,2,0,2,0]},{name:`A7 E7-form barre`,frets:[5,7,5,6,5,5]}],"G:dominant7":[{name:`Open G7`,frets:[3,2,0,0,0,1]},{name:`G7 E7-form barre`,frets:[3,5,3,4,3,3]}],"E:dominant7":[{name:`Open E7`,frets:[0,2,0,1,0,0]},{name:`Open E7 four-finger`,frets:[0,2,2,1,3,0]},{name:`E7 A7-form barre`,frets:[null,7,9,7,9,7]}],"D:dominant7":[{name:`Open D7`,frets:[null,null,0,2,1,2]},{name:`D7 A7-form barre`,frets:[null,5,7,5,7,5]}],"B:dominant7":[{name:`Open B7`,frets:[null,2,1,2,0,2]},{name:`B7 A7-form barre`,frets:[null,2,4,2,4,2]}],"E:minor7":[{name:`Open Em7`,frets:[0,2,2,0,3,0]},{name:`Em7 A-minor-7 form barre`,frets:[null,7,9,7,8,7]}],"A:minor7":[{name:`Open Am7`,frets:[null,0,2,0,1,0]},{name:`Am7 E-minor-7 form barre`,frets:[5,7,5,5,5,5]}],"D:minor7":[{name:`Open Dm7`,frets:[null,null,0,2,1,1]},{name:`Dm7 A-minor-7 form barre`,frets:[null,5,7,5,6,5]}],"D:major7":[{name:`Open Dmaj7`,frets:[null,null,0,2,2,2]},{name:`Dmaj7 Amaj7-form barre`,frets:[null,5,7,6,7,5]}],"A:major7":[{name:`Open Amaj7`,frets:[null,0,2,1,2,0]},{name:`Amaj7 Emaj7-form barre`,frets:[5,7,6,6,5,5]}],"E:major7":[{name:`Open Emaj7`,frets:[0,2,1,1,0,0]},{name:`Emaj7 Amaj7-form barre`,frets:[null,7,9,8,9,7]}]},ee={major:[{id:`e-major`,name:`E-form barre`,rootString:0,offsets:[0,2,2,1,0,0]},{id:`a-major`,name:`A-form barre`,rootString:1,offsets:[null,0,2,2,2,0]},{id:`d-major`,name:`D-form`,rootString:2,offsets:[null,null,0,2,3,2]}],minor:[{id:`e-minor`,name:`E-minor form barre`,rootString:0,offsets:[0,2,2,0,0,0]},{id:`a-minor`,name:`A-minor form barre`,rootString:1,offsets:[null,0,2,2,1,0]},{id:`d-minor`,name:`D-minor form`,rootString:2,offsets:[null,null,0,2,3,1]}],dominant7:[{id:`e-7`,name:`E7-form barre`,rootString:0,offsets:[0,2,0,1,0,0]},{id:`a-7`,name:`A7-form barre`,rootString:1,offsets:[null,0,2,0,2,0]},{id:`d-7`,name:`D7-form`,rootString:2,offsets:[null,null,0,2,1,2]}],major7:[{id:`e-maj7`,name:`Emaj7-form barre`,rootString:0,offsets:[0,2,1,1,0,0]},{id:`a-maj7`,name:`Amaj7-form barre`,rootString:1,offsets:[null,0,2,1,2,0]},{id:`d-maj7`,name:`Dmaj7-form`,rootString:2,offsets:[null,null,0,2,2,2]}],minor7:[{id:`e-m7`,name:`Em7-form barre`,rootString:0,offsets:[0,2,0,0,0,0]},{id:`a-m7`,name:`Am7-form barre`,rootString:1,offsets:[null,0,2,0,1,0]},{id:`d-m7`,name:`Dm7-form`,rootString:2,offsets:[null,null,0,2,1,1]}],sus4:[{id:`e-sus4`,name:`Esus4-form barre`,rootString:0,offsets:[0,2,2,2,0,0]},{id:`a-sus4`,name:`Asus4-form barre`,rootString:1,offsets:[null,0,2,2,3,0]},{id:`d-sus4`,name:`Dsus4-form`,rootString:2,offsets:[null,null,0,2,3,3]}],sus2:[{id:`a-sus2`,name:`Asus2-form barre`,rootString:1,offsets:[null,0,2,2,0,0]},{id:`d-sus2`,name:`Dsus2-form`,rootString:2,offsets:[null,null,0,2,3,0]}],power:[{id:`e-5`,name:`E-string power chord`,rootString:0,offsets:[0,2,2,null,null,null]},{id:`a-5`,name:`A-string power chord`,rootString:1,offsets:[null,0,2,2,null,null]}]},te=[`C`,`C#`,`D`,`Eb`,`E`,`F`,`F#`,`G`,`Ab`,`A`,`Bb`,`B`],ne=[{key:`major`,label:`maj`},{key:`minor`,label:`m`},{key:`dominant7`,label:`7`},{key:`major7`,label:`maj7`},{key:`minor7`,label:`m7`},{key:`sus4`,label:`sus4`},{key:`sus2`,label:`sus2`},{key:`power`,label:`5`}],g={mode:`chord`,rootName:`E`,qualityKey:`dominant7`,scaleKey:`pentatonic`},_=null,v=null,y=[],b=[],x=null,S=[],re=N(`#app`);re.innerHTML=`
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
            ${ne.map(e=>`<button type="button" class="quality-option" data-quality="${e.key}" aria-pressed="false">${e.label}</button>`).join(``)}
          </div>
          <div id="scale-picker" class="quality-grid" data-mode-panel="scale" hidden>
            ${p.map(e=>`<button type="button" class="quality-option" data-scale="${e.key}" aria-pressed="false">${e.label}</button>`).join(``)}
          </div>
        </fieldset>
        <fieldset class="choice-group">
          <legend>Root</legend>
          <div id="root-picker" class="root-grid">
            ${te.map(e=>`<button type="button" class="root-option" data-root="${e}" aria-pressed="false">${e}</button>`).join(``)}
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
`;var ie=N(`#chord-form`),C=N(`#chord-input`),ae=N(`#input-label`),w=N(`#summary`),T=N(`#shape-grid`),E=N(`#message`),D=N(`#history-row`),oe=N(`#quality-picker`),se=N(`#scale-picker`),O=Array.from(document.querySelectorAll(`.root-option`)),k=Array.from(document.querySelectorAll(`[data-quality]`)),A=Array.from(document.querySelectorAll(`[data-scale]`)),j=Array.from(document.querySelectorAll(`.mode-option`));ie.addEventListener(`submit`,e=>{e.preventDefault(),P(C.value)}),C.addEventListener(`input`,()=>{P(C.value)}),j.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.mode;(t===`chord`||t===`scale`)&&ce(t)})}),O.forEach(e=>{e.addEventListener(`click`,()=>{g.rootName=e.dataset.root??g.rootName,C.value=M(),C.focus(),P(C.value)})}),k.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.quality;!t||!l[t]||(g.qualityKey=t,C.value=M(),C.focus(),P(C.value))})}),A.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.scale;!t||!d[t]||(g.scaleKey=t,C.value=M(),C.focus(),P(C.value))})}),T.addEventListener(`click`,e=>{let t=e.target.closest(`[data-play-action]`);if(!t)return;let n=t.dataset.playAction;if(n===`scale`){let e=b.find(e=>e.id===t.dataset.boxId);if(!e)return;t.classList.add(`is-playing`),window.setTimeout(()=>t.classList.remove(`is-playing`),1300),we(e);return}if(!_)return;let r=y.find(e=>e.id===t.dataset.shapeId);!r||n!==`chord`&&n!==`sequence`||(t.classList.add(`is-playing`),window.setTimeout(()=>t.classList.remove(`is-playing`),n===`sequence`?1300:450),Ue(r,n))}),D.addEventListener(`click`,e=>{let t=e.target.closest(`[data-history-chord]`);if(t){g.mode=t.dataset.historyMode===`scale`?`scale`:`chord`;let e=t.dataset.historyChord??``;C.value=e,C.focus(),P(e)}});function ce(e){g.mode!==e&&(g.mode=e,C.value=M(),C.focus(),P(C.value))}function M(){return g.mode===`scale`?L(g.rootName,g.scaleKey):I(g.rootName,g.qualityKey)}P(C.value);function N(e){let t=document.querySelector(e);if(!t)throw Error(`Missing element: ${e}`);return t}function P(e){g.mode===`scale`?ue(e):le(e)}function le(e){let t=de(e);if(!t){_=null,y=[],R(),w.innerHTML=``,T.innerHTML=``,E.hidden=!1,E.textContent=e.trim()?`Unsupported chord symbol. Try E7, C, Am, G7, Dmaj7, F#m7, Bbmaj7, Asus2, or a 5 chord.`:`Enter a chord symbol.`;return}g.rootName=t.rootName,g.qualityKey=t.quality.key;let n=Te(t);_=t,y=n;let r=t.quality.formula.map(e=>({...e,name:q(t,e)}));E.hidden=!0,E.textContent=``,R(),F(t.displayName,`chord`),w.innerHTML=he(t,r),T.innerHTML=n.map(e=>Ne(t,e)).join(``)}function ue(e){let t=pe(e);if(!t){v=null,b=[],R(),w.innerHTML=``,T.innerHTML=``,E.hidden=!1,E.textContent=e.trim()?`Unsupported scale. Try A minor pentatonic, E blues, C major, or G minor.`:`Enter a scale, e.g. A minor pentatonic.`;return}g.rootName=t.rootName,g.scaleKey=t.scale.key;let n=ve(t);v=t,b=n,E.hidden=!0,E.textContent=``,R(),F(t.displayName,`scale`),w.innerHTML=_e(t),T.innerHTML=n.map(e=>be(t,e)).join(``)}function F(e,t){S=[{name:e,mode:t},...S.filter(t=>t.name!==e)].slice(0,8),D.innerHTML=S.map(e=>`<button type="button" class="history-chip" data-history-chord="${$(e.name)}" data-history-mode="${e.mode}">${$(e.name)}</button>`).join(``)}function de(e){let t=e.trim().replace(/\s+/g,``).match(/^([A-Ga-g])([#b]?)(.*)$/);if(!t)return null;let n=`${t[1].toUpperCase()}${t[2]??``}`,r=i[n];if(r===void 0)return null;let a=fe(t[3]??``);if(!a)return null;let o=l[a],s=`${n}${o.suffix}`;return{rootName:n,rootPc:r,preferFlats:n.includes(`b`),quality:o,displayName:s}}function fe(e){let t=e.replace(`major`,`maj`);return u.get(t)||(u.get(t.toLowerCase())??null)}function I(e,t){return`${e}${l[t].suffix}`}function L(e,t){return`${e} ${d[t].suffix}`}function pe(e){let t=e.trim().match(/^([A-Ga-g])([#b]?)(.*)$/);if(!t)return null;let n=`${t[1].toUpperCase()}${t[2]??``}`,r=i[n];if(r===void 0)return null;let a=me(t[3]??``);if(!a)return null;let o=d[a];return{rootName:n,rootPc:r,preferFlats:n.includes(`b`),scale:o,displayName:L(n,a)}}function me(e){let t=e.replace(/\s+/g,``).toLowerCase();return f.get(t)??null}function R(){let e=g.mode===`scale`;j.forEach(e=>{let t=e.dataset.mode===g.mode;e.classList.toggle(`is-active`,t),e.setAttribute(`aria-pressed`,String(t))}),ae.textContent=e?`Scale`:`Chord`,oe.hidden=e,se.hidden=!e;let t=e?v?.rootName===g.rootName&&v.scale.key===g.scaleKey:_?.rootName===g.rootName&&_.quality.key===g.qualityKey;O.forEach(n=>{let r=n.dataset.root??``,i=!!t&&r===g.rootName;n.textContent=e?r:I(r,g.qualityKey),n.classList.toggle(`is-active`,i),n.setAttribute(`aria-pressed`,String(i))}),k.forEach(e=>{let t=e.dataset.quality===g.qualityKey;e.classList.toggle(`is-active`,t),e.setAttribute(`aria-pressed`,String(t))}),A.forEach(e=>{let t=e.dataset.scale===g.scaleKey;e.classList.toggle(`is-active`,t),e.setAttribute(`aria-pressed`,String(t))})}function he(e,t){return`
    ${z(e.quality.formula)}
    <div class="chord-title-row">
      <div>
        <p class="summary-label">Current chord</p>
        <h2>${$(e.displayName)}</h2>
      </div>
      <span class="quality-pill">${$(e.quality.name)}</span>
    </div>
    <div class="definition-panel" aria-label="${$(e.displayName)} chord definition">
      <div class="definition-row">
        <span>Semitone intervals</span>
        <strong>${e.quality.formula.map(e=>e.semitone).join(` `)}</strong>
      </div>
      <div class="definition-row">
        <span>Major scale positions</span>
        <strong>${e.quality.formula.map(e=>Ke(e)).join(` `)}</strong>
      </div>
    </div>
    <div class="tone-table">
      ${t.map(e=>`
            <div class="tone-token tone-${e.role}">
              <span>${$(e.label)}</span>
              <strong>${$(e.name)}</strong>
            </div>
          `).join(``)}
    </div>
  `}function z(e){return`
    <div class="interval-map">
      <p class="definition-label">Chromatic map</p>
      <div class="interval-map-grid">
        ${c.map(t=>ge(e,t)).join(``)}
      </div>
    </div>
  `}function ge(e,t){let n=e.find(e=>e.semitone===t.semitone);return`
    <div class="interval-map-token${n?` is-active tone-${n.role}`:``}">
      <span>${t.semitone}</span>
      <strong>${$(t.label)}</strong>
    </div>
  `}function _e(e){let t=e.scale.formula.map(t=>({...t,name:J(e,t)}));return`
    ${z(e.scale.formula)}
    <div class="chord-title-row">
      <div>
        <p class="summary-label">Current scale</p>
        <h2>${$(e.displayName)}</h2>
      </div>
      <span class="quality-pill">${$(e.scale.name)}</span>
    </div>
    <div class="definition-panel" aria-label="${$(e.displayName)} scale definition">
      <div class="definition-row">
        <span>Scale formula</span>
        <strong>${e.scale.formula.map(e=>e.label).join(` `)}</strong>
      </div>
      <div class="definition-row">
        <span>Step pattern</span>
        <strong>${$(e.scale.stepPattern)}</strong>
      </div>
      <div class="definition-row">
        <span>Notes</span>
        <strong>${t.map(e=>$(e.name)).join(` `)}</strong>
      </div>
    </div>
    <div class="tone-table">
      ${t.map(e=>`
            <div class="tone-token tone-${e.role}">
              <span>${$(e.label)}</span>
              <strong>${$(e.name)}</strong>
            </div>
          `).join(``)}
    </div>
  `}function ve(e){let t=a[0].pc,n=(e.rootPc-t+12)%12,r=e.scale.formula.length>5?5:4,i=new Set;for(let t of[-12,0,12])for(let r of e.scale.formula)i.add(n+t+r.semitone);return[...i].filter(e=>e>=0&&e<=12).sort((e,t)=>e-t).slice(0,5).map((t,n)=>ye(e,t,r,n))}function ye(e,t,n,r){let i=t,o=t+n-1,s=[];for(let t=0;t<a.length;t+=1)for(let n=i;n<=o;n+=1){let r=((a[t].pc+n)%12-e.rootPc+12)%12,i=e.scale.formula.find(e=>e.semitone===r);i&&s.push({stringIndex:t,fret:n,noteName:J(e,i),degree:i.label,role:i.role,midi:a[t].midi+n})}return{id:`scale-${e.scale.key}-${e.rootPc}-${t}`,name:`Position ${r+1}`,rangeLabel:i===0?`open · frets 0–${o}`:`frets ${i}–${o}`,baseFret:i===0?1:i,fretCount:n,notes:s}}function be(e,t){let n=xe(e,t);return`
    <article class="shape-card">
      <div class="shape-card-header">
        <div>
          <p class="shape-category">Scale position</p>
          <h3>${$(t.name)}</h3>
        </div>
        <div class="shape-tools">
          <button type="button" class="icon-button" data-play-action="scale" data-box-id="${$(t.id)}" title="Play scale" aria-label="Play ${$(e.displayName)} ${$(t.name)} ascending">
            ${Z()}
          </button>
          <span class="fret-code">${$(t.rangeLabel)}</span>
        </div>
      </div>
      ${n}
    </article>
  `}function xe(e,t){let{fretCount:n,baseFret:r}=t,i=272/n,s=Array.from({length:n+1},(e,t)=>58+t*i),c=Array.from({length:6},(e,t)=>44+t*28),l=r===1?8:2,u=r===1?``:`<text class="fret-label" x="68" y="24">${r}fr</text>`;return`
    <svg class="chord-diagram" viewBox="0 0 360 230" role="img" aria-label="${$(`${e.displayName} ${t.name}`)}">
      <rect class="diagram-bg" x="0" y="0" width="360" height="230" rx="8"></rect>
      ${u}
      ${s.map((e,t)=>`<line class="${t===0&&r===1?`nut-line`:`fret-line`}" x1="${e}" y1="44" x2="${e}" y2="184" stroke-width="${t===0?l:2}"></line>`).join(``)}
      ${c.map(e=>`<line class="string-line" x1="58" y1="${e}" x2="330" y2="${e}"></line>`).join(``)}
      ${o.map((e,t)=>`<text class="string-label" x="24" y="${c[t]+5}">${6-e} ${a[e].name}</text>`).join(``)}
      ${o.map((e,n)=>Se(t,e,58,c[n],i,r)).join(``)}
    </svg>
  `}function Se(e,t,n,r,i,o){let s=e.notes.filter(e=>e.stringIndex===t);if(s.length===0){let e=n-22;return`
      <g class="muted-marker" aria-label="${a[t].name} string has no scale tone in this position">
        <line x1="${e-7}" y1="${r-7}" x2="${e+7}" y2="${r+7}"></line>
        <line x1="${e+7}" y1="${r-7}" x2="${e-7}" y2="${r+7}"></line>
      </g>
    `}return s.map(e=>Ce(e,n,r,i,o)).join(``)}function Ce(e,t,n,r,i){let o=`note-marker marker-${e.role}`;if(e.fret===0){let r=t-22;return`
      <g class="open-marker ${o}" aria-label="${a[e.stringIndex].name} open ${$(e.noteName)} ${$(e.degree)}">
        <circle cx="${r}" cy="${n}" r="13"></circle>
        ${U(r,n,e.noteName,e.degree)}
      </g>
    `}let s=t+(e.fret-i+.5)*r;return`
    <g class="${o}" aria-label="${a[e.stringIndex].name} string fret ${e.fret} ${$(e.noteName)} ${$(e.degree)}">
      <circle cx="${s}" cy="${n}" r="13"></circle>
      ${U(s,n,e.noteName,e.degree)}
    </g>
  `}async function we(e){let t=W(),{context:n}=t;n.state===`suspended`&&await n.resume();let r=new Set,i=[...e.notes].sort((e,t)=>e.midi-t.midi).filter(e=>r.has(e.midi)?!1:(r.add(e.midi),!0)),a=n.currentTime+.025;i.forEach((e,r)=>{let i=(e.stringIndex-2.5)/2.5*.28;G(n,t.output,K(e.midi),a+r*.16,.26,i)})}function Te(e){let t=B(Ee(e));if(t.length>0)return t;let n=B(ke(e)).slice(0,6);return n.length>0?n:Me(e)}function Ee(e){let t=Q(e.rootPc,e.preferFlats);return(h[`${t}:${e.quality.key}`]??[]).map((n,r)=>({...n,id:`curated-${t}-${e.quality.key}-${r}`,category:`Popular`,sourceUrl:De(e)}))}function De(e){let t=Oe(e.rootName),n=m[e.quality.key];return`https://gtrlib.com/chords/${e.quality.key===`power`?`${t}${n}`:`${t}-${n}`}`}function Oe(e){let t=e[0].toLowerCase();return e.endsWith(`#`)?`${t}-sharp`:e.endsWith(`b`)?`${t}-flat`:t}function ke(e){return(ee[e.quality.key]??[]).map(t=>Ae(e,t)).filter(e=>!!e)}function Ae(e,t){let n=je(a[t.rootString].pc,e.rootPc),r=t.offsets.map(e=>e===null?null:n+e);return r.every(e=>e===null)?null:{id:`movable-${t.id}-${e.rootPc}`,name:n===0?t.name.replace(` barre`,``):t.name,frets:r,category:`Movable`}}function je(e,t){return(t-e+12)%12}function B(e){let t=new Set,n=[];for(let r of e){let e=r.frets.map(e=>e===null?`x`:String(e)).join(`-`);t.has(e)||(t.add(e),n.push(r))}return n}function Me(e){let t=new Set(e.quality.formula.map(e=>e.semitone)),n=[];for(let r=0;r<=9;r+=1)V(a.map(n=>{let i=[null];for(let a=r;a<=r+4;a+=1)if(a===0||a>0){let r=(n.pc+a-e.rootPc+120)%12;t.has(r)&&i.push(a)}return i}),0,[],t=>{H(e,t)<1/0&&n.push({id:`found-${r}-${n.length}`,name:`Found voicing ${n.length+1}`,frets:t,category:`Found`})});return B(n).sort((t,n)=>H(e,t.frets)-H(e,n.frets)).slice(0,4)}function V(e,t,n,r){if(t===e.length){r([...n]);return}for(let i of e[t])n.push(i),V(e,t+1,n,r),n.pop()}function H(e,t){let n=t.map((e,t)=>({fret:e,index:t})).filter(e=>e.fret!==null);if(n.length<3||n.length>5)return 1/0;let r=new Set(n.map(({fret:t,index:n})=>(a[n].pc+t-e.rootPc+120)%12));if(!e.quality.formula.filter(e=>e.role!==`fifth`).map(e=>e.semitone).every(e=>r.has(e)))return 1/0;let i=n.map(({fret:e})=>e).filter(e=>e>0),o=Math.min(...i,0),s=Math.max(...i,0);if(i.length>4||s-o>4)return 1/0;let c=n[0],l=(a[c.index].pc+c.fret-e.rootPc+120)%12==0?-10:0;return t.filter(e=>e===null).length*4+s+n.length+l}function Ne(e,t){let n=Be(e,t,Fe(e,t),ze(t.frets),5),r=t.frets.map(e=>e===null?`x`:String(e)).join(` `);return`
    <article class="shape-card">
      <div class="shape-card-header">
        <div>
          ${Pe(e,t)}
          <h3>${$(t.name)}</h3>
        </div>
        <div class="shape-tools">
          <button type="button" class="icon-button" data-play-action="chord" data-shape-id="${$(t.id)}" title="Play chord" aria-label="Play ${$(e.displayName)} ${$(t.name)} as a chord">
            ${Ye()}
          </button>
          <button type="button" class="icon-button" data-play-action="sequence" data-shape-id="${$(t.id)}" title="Play sequence" aria-label="Play ${$(e.displayName)} ${$(t.name)} as a sequence">
            ${Z()}
          </button>
          <span class="fret-code">${$(r)}</span>
        </div>
      </div>
      ${n}
    </article>
  `}function Pe(e,t){let n=t.sourceUrl?` <span aria-hidden="true">·</span> <a class="source-link" href="${$(t.sourceUrl)}" target="_blank" rel="noreferrer" title="Open ${$(e.displayName)} reference on GtrLib">GtrLib</a>`:``;return`<p class="shape-category">${$(t.category)}${n}</p>`}function Fe(e,t){let n=Ie(e,t.frets);return t.frets.map((t,r)=>{if(t===null)return{stringName:a[r].name,fret:t,noteName:null,interval:null,semitoneFromRoot:null,role:`other`};let i=(a[r].pc+t)%12,o=a[r].midi+t,s=Re(e,i);return{stringName:a[r].name,fret:t,noteName:s?q(e,s):Q(i,e.preferFlats),interval:s?.label??`?`,semitoneFromRoot:n===null?null:o-n,role:s?.role??`other`}})}function Ie(e,t){let n=t.map((e,t)=>e===null?null:a[t].midi+e).filter(e=>e!==null);if(n.length===0)return null;let r=Math.min(...n);return r-(Le(r)-e.rootPc+12)%12}function Le(e){return(e%12+12)%12}function Re(e,t){let n=(t-e.rootPc+12)%12;return e.quality.formula.find(e=>e.semitone===n)??null}function ze(e){let t=e.filter(e=>e!==null&&e>0);return t.length===0||Math.max(...t)<=5?1:Math.max(1,Math.min(...t))}function Be(e,t,n,r,i){let s=272/i,c=Array.from({length:i+1},(e,t)=>58+t*s),l=Array.from({length:6},(e,t)=>44+t*28),u=r===1?8:2,d=r===1?``:`<text class="fret-label" x="68" y="24">${r}fr</text>`;return`
    <svg class="chord-diagram" viewBox="0 0 360 230" role="img" aria-label="${$(`${e.displayName} ${t.name}`)}">
      <rect class="diagram-bg" x="0" y="0" width="360" height="230" rx="8"></rect>
      ${d}
      ${c.map((e,t)=>`<line class="${t===0&&r===1?`nut-line`:`fret-line`}" x1="${e}" y1="44" x2="${e}" y2="184" stroke-width="${t===0?u:2}"></line>`).join(``)}
      ${l.map(e=>`<line class="string-line" x1="58" y1="${e}" x2="330" y2="${e}"></line>`).join(``)}
      ${o.map((e,t)=>`<text class="string-label" x="24" y="${l[t]+5}">${6-e} ${a[e].name}</text>`).join(``)}
      ${o.map((e,i)=>He(t.frets[e],e,58,l[i],s,r,n[e])).join(``)}
      ${o.map((e,t)=>Ve(n[e],342,l[t])).join(``)}
    </svg>
  `}function Ve(e,t,n){return e.semitoneFromRoot===null?``:`<text class="semitone-distance marker-${e.role}" x="${t}" y="${n+5}">${e.semitoneFromRoot}</text>`}function He(e,t,n,r,i,o,s){let c=n-22;if(e===null)return`
      <g class="muted-marker" aria-label="${a[t].name} string muted">
        <line x1="${c-7}" y1="${r-7}" x2="${c+7}" y2="${r+7}"></line>
        <line x1="${c+7}" y1="${r-7}" x2="${c-7}" y2="${r+7}"></line>
      </g>
    `;let l=`note-marker marker-${s.role}`,u=s.noteName??``,d=s.interval??``;if(e===0)return`
      <g class="open-marker ${l}" aria-label="${a[t].name} open ${$(u)} ${$(d)}">
        <circle cx="${c}" cy="${r}" r="15"></circle>
        ${U(c,r,u,d)}
      </g>
    `;let f=n+(e-o+.5)*i;return`
    <g class="${l}" aria-label="${a[t].name} string fret ${e} ${$(u)} ${$(d)}">
      <circle cx="${f}" cy="${r}" r="17"></circle>
      ${U(f,r,u,d)}
    </g>
  `}function U(e,t,n,r){return`
    <text class="marker-note" x="${e}" y="${t-2}">${$(n)}</text>
    <text class="marker-interval" x="${e}" y="${t+11}">${$(r)}</text>
  `}async function Ue(e,t){let n=W(),{context:r}=n;r.state===`suspended`&&await r.resume();let i=r.currentTime+.025;s.map(t=>{let n=e.frets[t];return n===null?null:{frequency:K(a[t].midi+n),stringIndex:t}}).filter(e=>!!e).forEach((e,a)=>{let o=t===`chord`?a*.015:a*.2,s=t===`chord`?.28:.24,c=(e.stringIndex-2.5)/2.5*.28;G(r,n.output,e.frequency,i+o,s,c)})}function W(){if(x)return x;let e=We(),t=e.createGain(),n=e.createDynamicsCompressor();return t.gain.setValueAtTime(1.2,e.currentTime),n.threshold.setValueAtTime(-12,e.currentTime),n.knee.setValueAtTime(18,e.currentTime),n.ratio.setValueAtTime(10,e.currentTime),n.attack.setValueAtTime(.003,e.currentTime),n.release.setValueAtTime(.18,e.currentTime),t.connect(n),n.connect(e.destination),x={context:e,output:t},x}function We(){let e=window.AudioContext??window.webkitAudioContext;if(!e)throw Error(`Web Audio is not supported in this browser.`);return new e}function G(e,t,n,r,i,a){let o=1.8,s=e.createOscillator(),c=e.createOscillator(),l=e.createOscillator(),u=e.createBufferSource(),d=e.createBiquadFilter(),f=e.createBiquadFilter(),p=e.createGain(),m=e.createGain(),h=e.createStereoPanner();s.type=`sawtooth`,s.frequency.setValueAtTime(n,r),s.detune.setValueAtTime(-2,r),c.type=`triangle`,c.frequency.setValueAtTime(n*2.01,r),c.detune.setValueAtTime(3,r),l.type=`sine`,l.frequency.setValueAtTime(n*3.01,r),l.detune.setValueAtTime(-5,r),u.buffer=Ge(e),d.type=`lowpass`,d.frequency.setValueAtTime(4200,r),d.frequency.exponentialRampToValueAtTime(760,r+o),d.Q.setValueAtTime(4.2,r),f.type=`bandpass`,f.frequency.setValueAtTime(Math.max(1200,n*7),r),f.Q.setValueAtTime(1.4,r),p.gain.setValueAtTime(1e-4,r),p.gain.linearRampToValueAtTime(i,r+.004),p.gain.exponentialRampToValueAtTime(i*.42,r+.09),p.gain.exponentialRampToValueAtTime(1e-4,r+o),m.gain.setValueAtTime(1e-4,r),m.gain.linearRampToValueAtTime(i*.6,r+.002),m.gain.exponentialRampToValueAtTime(1e-4,r+.055),h.pan.setValueAtTime(a,r),s.connect(d),c.connect(d),l.connect(d),d.connect(p),u.connect(f),f.connect(m),m.connect(p),p.connect(h),h.connect(t),s.start(r),c.start(r),l.start(r),u.start(r),s.stop(r+o+.04),c.stop(r+o+.04),l.stop(r+o+.04),u.stop(r+.06)}function Ge(e){let t=Math.max(1,Math.floor(e.sampleRate*.06)),n=e.createBuffer(1,t,e.sampleRate),r=n.getChannelData(0);for(let e=0;e<t;e+=1){let n=1-e/t;r[e]=(Math.random()*2-1)*n*n}return n}function K(e){return 440*2**((e-69)/12)}function Ke(e){return e.label===`R`?`1`:e.label}function q(e,t){return Y(e.rootName,e.rootPc,t.semitone,X(t))}function J(e,t){return Y(e.rootName,e.rootPc,t.semitone,X(t))}function Y(e,t,i,a){let o=e[0],s=n[(n.indexOf(o)+a-1)%n.length],c=(t+i)%12,l=r[s];return`${s}${Je(qe(c-l))}`}function X(e){if(e.label===`R`)return 1;let t=e.label.match(/\d+/);return t?Number(t[0]):1}function qe(e){let t=e;for(;t>6;)t-=12;for(;t<-6;)t+=12;return t}function Je(e){return e>0?`#`.repeat(e):e<0?`b`.repeat(Math.abs(e)):``}function Ye(){return`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 8v8"></path>
      <path d="M9 6v12"></path>
      <path d="M13 8v8"></path>
      <path d="M17 5v14"></path>
      <path d="M4 12h14"></path>
      <path d="m18 9 3 3-3 3"></path>
    </svg>
  `}function Z(){return`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h3"></path>
      <path d="M5 12h8"></path>
      <path d="M5 18h13"></path>
      <path d="m15 9 3 3-3 3"></path>
    </svg>
  `}function Q(n,r){return(r?t:e)[(n+12)%12]}function $(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}