const out = document.getElementById('out');
const jumps = document.getElementById('jumps');
const q = document.getElementById('q');
const empty = document.getElementById('empty');
const qecho = document.getElementById('qecho');

const esc = s => s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

function highlightArgs(cmd){
  return esc(cmd).replace(/(&lt;[a-z0-9_-]+&gt;)/g, '<span class="arg">$1</span>');
}

// The first visible row of a list has no top border; recomputed whenever the filter hides rows.
function markLead(list){
  list.querySelectorAll('.row').forEach(r => r.classList.remove('lead'));
  const first = list.querySelector('.row:not([hidden])');
  if (first) first.classList.add('lead');
}

// Sections come from js/data/*.js, each pushing one {id, h, note, groups} onto window.CHEATSHEET.
const SECTIONS = window.CHEATSHEET || [];

SECTIONS.forEach(sec => {
  const total = sec.groups.reduce((n, g) => n + g.items.length, 0);

  const a = document.createElement('a');
  a.href = '#' + sec.id; a.textContent = sec.h;
  jumps.appendChild(a);

  const s = document.createElement('section');
  s.id = sec.id;
  s.innerHTML = `<div class="sechead"><h2>${sec.h}</h2><span class="count">${total}</span><p>${sec.note}</p></div>`;
  sec.groups.forEach(group => {
    const g = document.createElement('div');
    g.className = 'group';
    if (group.label) {
      const h = document.createElement('h3');
      h.className = 'subhead';
      h.textContent = group.label;
      g.appendChild(h);
    }
    if (group.note) {
      const p = document.createElement('p');
      p.className = 'subnote';
      p.textContent = group.note;
      g.appendChild(p);
    }
    const list = document.createElement('div');
    list.className = 'list';
    group.items.forEach(([cmd, desc, flag]) => {
      const row = document.createElement('div');
      row.className = 'row';
      row.tabIndex = 0;
      row.dataset.cmd = cmd;
      // searchable text: the command, its description, and the group and section it sits in
      row.dataset.hay = [cmd, desc, group.label || '', sec.h].join(' ').toLowerCase();
      const mark = flag === 'danger'
        ? '<span class="flag danger">destructive</span>'
        : flag === 'care' ? '<span class="flag care">careful</span>' : '';
      row.innerHTML = `<p class="cmd">${highlightArgs(cmd)}</p><p class="desc">${esc(desc)}${mark}</p>`;
      list.appendChild(row);
    });
    markLead(list);
    g.appendChild(list);
    s.appendChild(g);
  });
  out.appendChild(s);
});

function copy(row){
  const text = row.dataset.cmd;
  const done = () => {
    document.querySelectorAll('.row.copied').forEach(r => r.classList.remove('copied'));
    row.classList.add('copied');
    setTimeout(() => row.classList.remove('copied'), 1200);
  };
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done).catch(fallback);
  } else { fallback(); }
  function fallback(){
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); done(); } catch(e){}
    document.body.removeChild(ta);
  }
}

out.addEventListener('click', e => {
  const row = e.target.closest('.row');
  if (row) copy(row);
});
out.addEventListener('keydown', e => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const row = e.target.closest('.row');
  if (row) { e.preventDefault(); copy(row); }
});

q.addEventListener('input', () => {
  const term = q.value.trim().toLowerCase();
  let total = 0;
  document.querySelectorAll('section').forEach(sec => {
    let shown = 0;
    sec.querySelectorAll('.group').forEach(g => {
      const list = g.querySelector('.list');
      let hits = 0;
      list.querySelectorAll('.row').forEach(row => {
        const hit = !term || row.dataset.hay.includes(term);
        row.hidden = !hit;
        if (hit) hits++;
      });
      markLead(list);
      g.hidden = hits === 0;
      shown += hits;
    });
    sec.querySelector('.count').textContent = shown;
    sec.hidden = shown === 0;
    total += shown;
  });
  empty.hidden = total !== 0;
  qecho.textContent = q.value;
});

document.addEventListener('keydown', e => {
  if (e.key === '/' && document.activeElement !== q) { e.preventDefault(); q.focus(); q.select(); }
  if (e.key === 'Escape' && document.activeElement === q) { q.value = ''; q.dispatchEvent(new Event('input')); q.blur(); }
});

// The sticky bar wraps on narrow screens, so its height is not a fixed number. Publish it as --bar-h and let
// css/style.css use it as scroll-padding-top: jump links and keyboard focus then stop below the bar.
const bar = document.querySelector('.controls');
const syncBarHeight = () => document.documentElement.style.setProperty('--bar-h', bar.offsetHeight + 'px');
new ResizeObserver(syncBarHeight).observe(bar);
syncBarHeight();

document.getElementById('theme').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = root.getAttribute('data-theme') || (dark ? 'dark' : 'light');
  root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});
