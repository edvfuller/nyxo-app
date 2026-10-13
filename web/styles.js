// Page chrome for the web demo: fonts used by the app's theme and the
// phone-sized frame the app renders into.
import MontserratRegular from '../assets/fonts/Montserrat-Regular.ttf'
import MontserratMedium from '../assets/fonts/Montserrat-Medium.ttf'
import MontserratBold from '../assets/fonts/Montserrat-Bold.ttf'
import DomineRegular from '../assets/fonts/Domine-Regular.ttf'
import DomineBold from '../assets/fonts/Domine-Bold.ttf'

const fontFaces = [
  ['Montserrat-Regular', MontserratRegular],
  ['Montserrat-Medium', MontserratMedium],
  ['Montserrat-Bold', MontserratBold],
  ['Domine-Regular', DomineRegular],
  ['Domine-Bold', DomineBold]
]
  .map(
    ([family, url]) =>
      `@font-face{font-family:'${family}';src:url(${url}) format('truetype');font-display:swap;}`
  )
  .join('\n')

const chrome = `
/* Night-sky lilac stage around a phone frame; the app inside keeps its own theme */
:root {
  --stage-bg: #e9e7f2;
  --stage-fg: #2b2840;
  --stage-muted: #5f5a7a;
  --stage-rule: #cfcae3;
  --accent: #2c0b8e;
  --accent-fg: #ffffff;
  --device-edge: #1c1a26;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --stage-bg: #121119;
    --stage-fg: #d9d6ea;
    --stage-muted: #9a95b5;
    --stage-rule: #2c2940;
    --accent: #8f7bf2;
    --accent-fg: #121119;
    --device-edge: #000000;
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --stage-bg: #121119;
  --stage-fg: #d9d6ea;
  --stage-muted: #9a95b5;
  --stage-rule: #2c2940;
  --accent: #8f7bf2;
  --accent-fg: #121119;
  --device-edge: #000000;
  color-scheme: dark;
}
html, body { height: 100%; margin: 0; }
body {
  background: var(--stage-bg);
  color: var(--stage-fg);
  font-family: 'Montserrat-Regular', system-ui, sans-serif;
  overflow: hidden;
}
#stage {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 56px;
  box-sizing: border-box;
  padding: 16px;
}
#demo-panel {
  width: 300px;
  flex-shrink: 0;
  font-family: 'Montserrat-Regular', system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.55;
}
#demo-panel .demo-eyebrow {
  margin: 0 0 4px;
  font-family: 'Montserrat-Medium', system-ui, sans-serif;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--stage-muted);
}
#demo-panel .demo-title {
  margin: 0 0 12px;
  font-family: 'Domine-Bold', Georgia, serif;
  font-size: 40px;
  line-height: 1.1;
  color: var(--stage-fg);
}
#demo-panel .demo-lede { margin: 0 0 24px; color: var(--stage-fg); text-wrap: balance; }
#demo-panel .demo-facts { margin: 0 0 24px; display: grid; gap: 14px; }
#demo-panel .demo-facts div {
  display: grid;
  gap: 2px;
  padding-top: 12px;
  border-top: 1px solid var(--stage-rule);
}
#demo-panel dt {
  font-family: 'Montserrat-Bold', system-ui, sans-serif;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--stage-fg);
}
#demo-panel dd { margin: 0; color: var(--stage-muted); }
#demo-panel .demo-reset {
  font: inherit;
  font-family: 'Montserrat-Bold', system-ui, sans-serif;
  padding: 10px 18px;
  border: 0;
  border-radius: 8px;
  background: var(--accent);
  color: var(--accent-fg);
  cursor: pointer;
}
#demo-panel .demo-reset:focus-visible { outline: 2px solid var(--stage-fg); outline-offset: 2px; }
@media (max-width: 860px) {
  #demo-panel { display: none; }
}
#device {
  position: relative;
  width: 390px;
  height: 844px;
  max-height: calc(100vh - 32px);
  border-radius: 44px;
  border: 10px solid var(--device-edge);
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(20, 16, 50, 0.35);
  transform: translateZ(0);
}
#root { position: absolute; inset: 0; display: flex; }
/* React Native lays out \`flex: 1\` children of a ScrollView at their content
   size, because the scroll content has no fixed length to share out. Browsers
   resolve the 0% flex-basis react-native-web emits against content instead,
   and can squeeze those children. ScrollViews are tagged with
   data-scrollview (see shims/ScrollViewBase.js). */
[data-scrollview] > div > * { flex-basis: auto !important; }
/* React Native also caps a content-sized view at the space its parent has
   left, so a plain View wrapping a list still lets the list scroll. Browsers
   let the wrapper grow to the full list height instead; allow it to shrink. */
div:has(> [data-scrollview]) { flex-shrink: 1 !important; }
/* Yoga never shrinks a node unless told to; browsers shrink flex items by
   default. react-native-web resets that for its views but not for the <svg>
   elements react-native-svg renders, so icons in tight boxes collapsed. */
#root svg { flex-shrink: 0; }
@media (max-width: 520px) {
  #stage { padding: 0; }
  #device {
    width: 100%;
    height: 100%;
    max-height: none;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }
}
`

export const injectStyles = () => {
  const style = document.createElement('style')
  style.textContent = `${fontFaces}\n${chrome}`
  document.head.appendChild(style)
}
