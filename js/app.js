const out = document.getElementById('out');
const jumps = document.getElementById('jumps');
const q = document.getElementById('q');
const empty = document.getElementById('empty');
const qecho = document.getElementById('qecho');

function highlightArgs(cmd){
  return cmd
    .replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))
    .replace(/(&lt;[a-z_]+&gt;)/g, '<span class="arg">$1</span>');
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
    const list = document.createElement('div');
    list.className = 'list';
    group.items.forEach(([cmd, desc, flag]) => {
      const row = document.createElement('div');
      row.className = 'row';
      row.tabIndex = 0;
      row.dataset.cmd = cmd;
      row.dataset.hay = (cmd + ' ' + desc).toLowerCase();
      const mark = flag === 'danger'
        ? '<span class="flag danger">destructive</span>'
        : flag === 'care' ? '<span class="flag care">careful</span>' : '';
      row.innerHTML = `<p class="cmd">${highlightArgs(cmd)}</p><p class="desc">${desc}${mark}</p>`;
      list.appendChild(row);
    });
    s.appendChild(list);
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
    sec.querySelectorAll('.row').forEach(row => {
      const hit = !term || row.dataset.hay.includes(term);
      row.hidden = !hit;
      if (hit) shown++;
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

document.getElementById('theme').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const current = root.getAttribute('data-theme') || (dark ? 'dark' : 'light');
  root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
});
