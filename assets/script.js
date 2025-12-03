/* script: tema persistente e ano dinâmico */
// Para resetar o tema: limpe a chave 'theme' no localStorage
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// wrapper simples para evitar erros em modos privados
function safeSetItem(k,v){ try{ localStorage.setItem(k,v) }catch(e){} }
function safeGetItem(k){ try{ return localStorage.getItem(k) }catch(e){ return null } }

// Retorna o tema: localStorage > preferência do sistema > light
function getPreferredTheme(){ const s=safeGetItem('theme'); if(s) return s; return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' }

// Aplica o tema e atualiza o ícone e aria-pressed
function applyTheme(theme){
    if(theme==='dark'){ html.classList.add('dark-mode'); if(themeIcon) themeIcon.textContent='☀️' }
    else { html.classList.remove('dark-mode'); if(themeIcon) themeIcon.textContent='🌙' }
    if(themeToggle) themeToggle.setAttribute('aria-pressed', String(theme==='dark'))
}

// Alterna o tema e salva a escolha
function toggleTheme(){ const isDark=html.classList.contains('dark-mode'); const next=isDark?'light':'dark'; applyTheme(next); safeSetItem('theme', next) }

// Atualiza o ano no rodapé
function updateYear() {
    const el = document.getElementById('ano-atual');
    if (!el) return;
    el.textContent = new Date().getFullYear();
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', ()=>{ applyTheme(getPreferredTheme()); updateYear() })
if(themeToggle) themeToggle.addEventListener('click', toggleTheme)
const mq=window.matchMedia('(prefers-color-scheme: dark)')
if(mq.addEventListener) mq.addEventListener('change',(e)=>{ if(!safeGetItem('theme')) applyTheme(e.matches?'dark':'light') })
else if(mq.addListener) mq.addListener((e)=>{ if(!safeGetItem('theme')) applyTheme(e.matches?'dark':'light') })