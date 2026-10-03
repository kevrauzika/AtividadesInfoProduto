const modules = [
  { slug: 'caca-palavras', name: 'Caça-Palavras', pages: 41, color: '#ff8a3d', description: '30 caça-palavras temáticos com gabarito. Um convite para descobrir novas palavras.', titles: ['Animais', 'Meios de transporte', 'Corpo humano'] },
  { slug: 'cruzadinhas', name: 'Cruzadinhas', pages: 41, color: '#2ec4b6', description: '30 cruzadinhas com dicas para completar, pensar e brincar com as palavras.' },
  { slug: 'labirintos', name: 'Labirintos', pages: 41, color: '#ff6b9a', description: '30 labirintos do fácil ao difícil. Cada caminho é uma nova aventura.' },
  { slug: 'alfabetizacao', name: 'Alfabetização', pages: 78, color: '#43b65c', description: 'Letras de A a Z, números de 0 a 10, sílabas, vogais, palavras e frases.' },
  { slug: 'matematica', name: 'Matemática Divertida', pages: 38, color: '#3a86ff', description: 'Contagem, contas, tabuada, problemas e desafios para brincar com os números.' },
  { slug: 'logica', name: 'Lógica e Raciocínio', pages: 38, color: '#8e5cf7', description: 'Sudoku, sequências, charadas e caminhos secretos para exercitar o pensamento.' },
  { slug: 'arte', name: 'Arte e Colorir', pages: 38, color: '#ff8a3d', description: 'Desenhos infantis para pintar e desenhos secretos para colorir por código.' },
  { slug: 'criatividade', name: 'Criatividade', pages: 30, color: '#ff6b9a', description: 'Complete o desenho, simetria, histórias em quadrinhos e criação de histórias.' },
  { slug: 'certificados', name: 'Certificados e Conquistas', pages: 8, color: '#ff8a3d', description: 'Medalhas, certificados e Diploma de Mestre para celebrar cada conquista.', exampleCount: 2 },
];

document.getElementById('module-grid').innerHTML = modules.map((m, i) => `
  <article class="module-card" style="--module-color:${m.color}">
    <div class="module-cover"><span class="module-number">MÓDULO ${String(i+1).padStart(2,'0')}</span><img src="assets/${m.slug}-capa.webp" width="893" height="1263" alt="Capa original do módulo ${m.name}" loading="lazy"><span class="page-count">${m.pages} páginas</span></div>
    <div class="module-copy"><h3>${m.name}</h3><p>${m.description}</p><button type="button" class="sample-button" data-preview="${m.slug}">Ver capa e exemplos <span aria-hidden="true">＋</span></button></div>
  </article>`).join('');

const previewDialog = document.getElementById('preview-dialog');
const pageSelect = document.getElementById('preview-page');
const previewImage = document.getElementById('preview-image');
let activeModule;
function showPage(value) {
  previewImage.src = `assets/${activeModule.slug}-${value === 'capa' ? 'capa' : `exemplo-${value}`}.webp`;
  previewImage.alt = `${activeModule.name}: ${value === 'capa' ? 'capa original' : activeModule.slug === 'certificados' ? `exemplo ${value}` : `atividade de exemplo do nível ${value}`}`;
  document.querySelector('.preview-image-wrap').scrollTop = 0;
}
function openPreview(slug, page = 'capa') {
  activeModule = modules.find(m => m.slug === slug);
  document.getElementById('preview-title').textContent = activeModule.name;
  pageSelect.innerHTML = '<option value="capa">Capa do módulo</option>' + Array.from({length:activeModule.exampleCount || 3},(_,i)=>`<option value="${i+1}">${slug==='certificados' ? ['Medalhas para recortar','Certificado'][i] : `Nível ${i+1} · ${['4 a 6','6 a 8','8 a 10'][i]} anos`}</option>`).join('');
  pageSelect.value = page;
  showPage(page);
  previewDialog.showModal();
}
pageSelect.addEventListener('change', () => showPage(pageSelect.value));
document.addEventListener('click', e => {
  const button = e.target.closest('[data-preview]');
  if (button) openPreview(button.dataset.preview, button.dataset.page || 'capa');
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click', e => { if(e.target===dialog){ const rect=dialog.getBoundingClientRect(); if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom) dialog.close(); } });
  dialog.addEventListener('close',()=>document.body.classList.remove('dialog-open'));
  new MutationObserver(()=> { if(dialog.open) document.body.classList.add('dialog-open'); }).observe(dialog,{attributes:true,attributeFilter:['open']});
});

const sampleModules = ['alfabetizacao','matematica','logica'];
function setLevel(level, focus = false) {
  document.querySelectorAll('[role="tab"]').forEach(tab => {const active=tab.dataset.level===String(level);tab.setAttribute('aria-selected',active);tab.tabIndex=active?0:-1;if(active&&focus)tab.focus();});
  document.getElementById('sample-panel').setAttribute('aria-labelledby',`tab-${level}`);
  document.getElementById('sample-panel').innerHTML = sampleModules.map(slug=>{const m=modules.find(x=>x.slug===slug);return `<button class="sample-card" type="button" data-preview="${slug}" data-page="${level}" aria-label="Ampliar exemplo de ${m.name}, nível ${level}"><span class="sample-paper"><img src="assets/${slug}-exemplo-${level}.webp" width="983" height="1389" alt="Página de atividade de ${m.name}, nível ${level}" loading="lazy"><span class="zoom-label">＋ Ampliar atividade</span></span><span class="sample-name">${m.name}</span><span class="sample-level">Nível ${level} · ${['4 a 6','6 a 8','8 a 10'][level-1]} anos</span></button>`;}).join('');
}
document.querySelectorAll('[role="tab"]').forEach((tab,i)=>{
  tab.addEventListener('click',()=>setLevel(Number(tab.dataset.level)));
  tab.addEventListener('keydown', e=> {let next;if(e.key==='ArrowRight')next=(i+1)%3+1;if(e.key==='ArrowLeft')next=(i+2)%3+1;if(e.key==='Home')next=1;if(e.key==='End')next=3;if(next){e.preventDefault();setLevel(next,true);}});
});
setLevel(1);

const checkout = window.HORA_CONFIG?.checkoutUrl;
if (checkout) {
  try {
    const url = new URL(checkout);
    if (url.protocol === 'https:') {
      document.querySelectorAll('a.purchase').forEach(link => { link.href = url.href; });
    }
  } catch {}
}
