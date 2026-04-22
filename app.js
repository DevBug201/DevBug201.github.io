const commands = {
  help: [
    '> Comandos disponibles:',
    '  perfil     - Quien soy',
    '  formacion  - Estudios',
    '  exp        - Practicas y experiencia',
    '  certs      - Certificaciones',
    '  stack      - Tecnologias',
    '  all        - Todo junto',
    '  clear      - Limpiar terminal'
  ],
  perfil: [
    '> NAME: DevBug',
    '> ROLE: Futuro Fullstack Dev & DevOps',
    '> FOCO: Desarrollo Web, Backend y Automatizacion',
    '> OBJETIVO: Bases tecnicas solidas y crecimiento profesional continuo'
  ],
  formacion: [
    '> FORMACION:',
    '  · SMR (Sistemas Microinformaticos y Redes) completado',
    '  · DAW (Desarrollo de Aplicaciones Web) en curso'
  ],
  exp: [
    '> EXPERIENCIA:',
    '  · Resoluzion 360 (Completado) - Practicas como desarrollador web',
    '    WordPress, WooCommerce, HTML, CSS y JavaScript.',
    '  · Tudefrigo (En curso) - Practicas en backend y automatizaciones',
    '    Integracion de APIs y automatizacion de procesos.'
  ],
  certs: [
    '> CERTIFICACIONES (FUTURAS / PLANIFICADAS):',
    '  GitHub Foundations',
    '  DPSC',
    '  AWS Cloud Practitioner (CCP)',
    '  Docker DCA',
    '  LPIC-1'
  ],
  stack: [
    '> STACK TECNICO:',
    '  Base actual : Python · MySQL · HTML5 · CSS3',
    '  Entorno     : Linux · Bash · Git',
    '  En progreso : Backend, APIs y automatizacion'
  ]
};

const termBody = document.getElementById('termBody');
const termInput = document.getElementById('termInput');
const termCursor = document.getElementById('termCursor');
const termMirror = document.getElementById('termMirror');
const terminalScreen = document.querySelector('.terminal-screen');
const termInputRow = document.querySelector('.term-input-row');

function addLines(lines, cmd) {
  const cmdLine = document.createElement('div');
  cmdLine.className = 'term-line';

  const prompt = document.createElement('span');
  prompt.className = 'prompt';
  prompt.textContent = '$';

  const cmdText = document.createTextNode(` ${cmd}`);

  cmdLine.appendChild(prompt);
  cmdLine.appendChild(cmdText);
  termBody.appendChild(cmdLine);

  lines.forEach((line) => {
    const el = document.createElement('div');
    el.className = 'term-output';
    el.textContent = line;
    termBody.appendChild(el);
  });

  const spacer = document.createElement('div');
  spacer.className = 'term-spacer';
  termBody.appendChild(spacer);

  termBody.scrollTop = termBody.scrollHeight;
}

termInput.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;

  const val = termInput.value.trim().toLowerCase();
  termInput.value = '';
  if (!val) return;

  if (val === 'clear') {
    termBody.replaceChildren();
    return;
  }

  if (val === 'all') {
    ['perfil', 'formacion', 'exp', 'certs', 'stack'].forEach((k) => {
      addLines(commands[k], k);
    });
    return;
  }

  if (commands[val]) {
    addLines(commands[val], val);
  } else {
    addLines([`> Error: comando "${val}" no encontrado. Usa "help".`], val);
  }
});

function updateCursorPosition() {
  const valueForMeasure = (termInput.value || '').replace(/ /g, '\u00a0') + '\u200b';
  termMirror.textContent = valueForMeasure;
  const maxLeft = Math.max(0, termInput.clientWidth - 2);
  const left = Math.min(termMirror.offsetWidth, maxLeft);
  termCursor.style.left = `${left}px`;
}

termInput.addEventListener('input', updateCursorPosition);
termInput.addEventListener('click', updateCursorPosition);
window.addEventListener('resize', updateCursorPosition);

termInput.addEventListener('focus', () => {
  termCursor.classList.add('active');
  updateCursorPosition();
});
termInput.addEventListener('blur', () => {
  termCursor.classList.remove('active');
});

if (terminalScreen) terminalScreen.addEventListener('click', () => termInput.focus());
if (termInputRow) termInputRow.addEventListener('click', () => termInput.focus());

addLines(commands.help, 'help');
termInput.focus();
updateCursorPosition();
