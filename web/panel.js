// Side note next to the phone frame on wide screens: what in the demo is
// real app code and what is sample data, plus a reset button.
const html = `
  <p class="demo-eyebrow">Web demo</p>
  <h1 class="demo-title">Nyxo</h1>
  <p class="demo-lede">
    The Nyxo React Native app, running in your browser through react-native-web.
  </p>
  <dl class="demo-facts">
    <div>
      <dt>Sleep</dt>
      <dd>A generated month of sample nights. Tap the date or a day in the strip to switch nights.</dd>
    </div>
    <div>
      <dt>Coaching</dt>
      <dd>A four-week sample program written for this demo, not Nyxo's own lessons.</dd>
    </div>
    <div>
      <dt>Saved</dt>
      <dd>Coaching progress and theme stay in this browser only.</dd>
    </div>
    <div>
      <dt>Missing</dt>
      <dd>
        Sleep tracker sync and Nyxo Cloud accounts need the phone app and its backend.
        Habit tracking is unplugged in the app's own code.
      </dd>
    </div>
  </dl>
  <button type="button" id="demo-reset" class="demo-reset">Reset demo</button>
`

export const mountDemoPanel = () => {
  const stage = document.getElementById('stage')
  if (!stage || document.getElementById('demo-panel')) return
  const panel = document.createElement('aside')
  panel.id = 'demo-panel'
  panel.innerHTML = html
  stage.insertBefore(panel, stage.firstChild)

  document.getElementById('demo-reset').addEventListener('click', () => {
    try {
      window.localStorage.clear()
    } catch (e) {
      // storage blocked; a reload still resets the in-memory state
    }
    window.location.reload()
  })
}
