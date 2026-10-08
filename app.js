/* =====================================================
   AAC — Associação Atlética Cocari
   app.js — Navegação, interface e estado local
   ===================================================== */

/* ── Dados locais simulados (serão substituídos pela API/banco) ── */
const DB = {
  associado: {
    id: 1,
    nome: 'Matheus Augusto Lopes',
    matricula: '0-1106',
    categoria: 'Titular'
  },

  reservas: [
    {
      id: 1, protocolo: '#AAC-2026-088', espacoId: 'field-01', espacoNome: 'Campo de Futebol 01',
      data: '2026-10-14', dataFormatada: '14/10/2026', dia: '14', mes: 'Out', horario: '19:30 às 21:00',
      status: 'aguardando_pagamento', statusLabel: 'Pendente Pagamento', valor: 140.00, cobrancaId: 'COB-088'
    },
    {
      id: 2, protocolo: '#AAC-2026-075', espacoId: 'gym', espacoNome: 'Ginásio de Esportes',
      data: '2026-10-17', dataFormatada: '17/10/2026', dia: '17', mes: 'Out', horario: '18:00 às 19:29',
      status: 'aprovada', statusLabel: 'Aprovada', valor: 60.00, cobrancaId: 'COB-075'
    },
    {
      id: 3, protocolo: '#AAC-2026-061', espacoId: 'kiosk-02', espacoNome: 'Quiosque 02',
      data: '2026-10-25', dataFormatada: '25/10/2026', dia: '25', mes: 'Out', horario: 'Horário a combinar',
      status: 'pendente_aprovacao', statusLabel: 'Em Análise', valor: null, cobrancaId: null
    },
    {
      id: 4, protocolo: '#AAC-2026-042', espacoId: 'beach-01', espacoNome: 'Beach tennis 01',
      data: '2026-10-01', dataFormatada: '01/10/2026', dia: '01', mes: 'Out', horario: '16:30 às 17:59',
      status: 'concluida', statusLabel: 'Concluída', valor: 0.00, cobrancaId: 'COB-042'
    }
  ],

  cobrancas: [
    {
      id: 'COB-088', reservaProtocolo: '#AAC-2026-088', descricao: 'Locação Campo de Futebol 01 (14/10)',
      valor: 140.00, vencimento: 'Hoje às 23:59', status: 'pendente',
      pixCode: '00020126580014br.gov.bcb.pix0136associacaococari-pix-cobranca-20265204000053039865406140.005802BR5924ASSOCIACAO ATLETICA COCARI6010MANDAGUARI62070503***6304ABCD'
    },
    {
      id: 'COB-075', reservaProtocolo: '#AAC-2026-075', descricao: 'Locação Ginásio de Esportes (17/10)',
      valor: 60.00, vencimento: 'Pago em 05/10/2026', status: 'pago', pagoEm: '05/10/2026'
    },
    {
      id: 'COB-042', reservaProtocolo: '#AAC-2026-042', descricao: 'Locação Beach Tennis 01',
      valor: 0.00, vencimento: 'Pago em 01/10/2026', status: 'pago', pagoEm: '01/10/2026'
    }
  ],

  notificacoes: [
    { id: 1, titulo: 'Reserva pré-aprovada', mensagem: 'Sua solicitação para o Campo 01 foi aprovada. Efetue o pagamento do PIX para liberar o acesso.', data: 'Há 15 min', tipo: 'alert', lida: false },
    { id: 2, titulo: 'Cobrança disponível', mensagem: 'Fatura de R$ 140,00 gerada para o pedido #AAC-2026-088.', data: 'Há 1 hora', tipo: 'info', lida: false },
    { id: 3, titulo: 'Torneio de Beach Tennis 2026', mensagem: 'Inscrições abertas na secretaria até o dia 20.', data: 'Ontem', tipo: 'success', lida: true }
  ]
};

/* ── Tipos de espaço e suas unidades ──
   mode 'slots' = reserva por faixa de horário
   mode 'day'   = reserva do espaço na data (horário combinado com a secretaria)
   Valores marcados como null estão "a confirmar" (ver docs/CONTEXTO_PORTAL_ASSOCIACAO.md) */
const spaceCategories = [
  { id: 'campos', name: 'Campos de Futebol', short: 'Campos', count: '3 campos', icon: 'futbol', mode: 'slots' },
  { id: 'beach', name: 'Beach Tennis', short: 'Beach Tennis', count: '4 quadras', icon: 'volleyball', mode: 'slots' },
  { id: 'quiosques', name: 'Quiosque', short: 'Quiosques', count: '4 quiosques', icon: 'fire', mode: 'day' },
  { id: 'ginasio', name: 'Ginásio', short: 'Ginásio', count: '1 ginásio', icon: 'running', mode: 'slots' },
  { id: 'salao', name: 'Salão Social', short: 'Salão Social', count: '2 salões', icon: 'champagne', mode: 'day' },
  { id: 'massagem', name: 'Massagem Terapêutica', short: 'Massagem', count: '1 espaço', icon: 'calendar-check', mode: 'day' }
];

const rentalUnits = [
  { id: 'gym', cat: 'ginasio', name: 'Ginásio de Esportes', price: 60, billing: 'por horário' },
  { id: 'field-01', cat: 'campos', name: 'Campo de Futebol 01', price: 140, billing: 'por horário' },
  { id: 'field-02', cat: 'campos', name: 'Campo de Futebol 02', price: 140, billing: 'por horário' },
  { id: 'field-03', cat: 'campos', name: 'Campo de Futebol 03', price: 120, billing: 'por horário' },
  { id: 'beach-01', cat: 'beach', name: 'Beach tennis 01', price: null },
  { id: 'beach-02', cat: 'beach', name: 'Beach tennis 02', price: null },
  { id: 'beach-03', cat: 'beach', name: 'Beach tennis 03', price: null },
  { id: 'beach-04', cat: 'beach', name: 'Beach tennis 04', price: null },
  { id: 'kiosk-02', cat: 'quiosques', name: 'Quiosque 02', detail: 'Até 50 pessoas', price: null },
  { id: 'kiosk-03', cat: 'quiosques', name: 'Quiosque 03', detail: 'Até 20 pessoas', price: null },
  { id: 'kiosk-04', cat: 'quiosques', name: 'Quiosque 04', detail: 'Até 40 pessoas', price: null },
  { id: 'kiosk-noble', cat: 'quiosques', name: 'Quiosque Nobre', detail: 'Até 70 pessoas', price: null },
  { id: 'social-bbq', cat: 'salao', name: 'Salão Social com churrasqueira', price: 808.50, billing: 'por evento' },
  { id: 'social-full', cat: 'salao', name: 'Salão Social completo', price: 1617, billing: 'por evento' },
  { id: 'massage', cat: 'massagem', name: 'Massagem Terapêutica Feminina', price: null }
];

const rentalTimeSlots = [
  '09:00 às 10:30', '10:30 às 11:59', '12:00 às 13:29',
  '13:30 às 14:59', '15:00 às 16:29', '16:30 às 17:59',
  '18:00 às 19:29', '19:30 às 21:00', '21:00 às 22:30'
];

/* ── Estado em memória ── */
let activeCategory = null;
let selectedDate = null;
let pendingBooking = null;
let activePixCobranca = null;
let currentBookingTab = 'todas';
let currentFinanceTab = 'pendentes';

/* =====================================================
   NAVEGAÇÃO
   ===================================================== */
function navigateTo(screen) {
  document.querySelectorAll('.view-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('view-' + screen);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  updateBottomNav(screen);

  const notifPanel = document.getElementById('notif-panel');
  if (notifPanel) notifPanel.classList.add('hidden');

  if (screen === 'home') renderHome();
  if (screen === 'my-bookings') renderBookings(currentBookingTab);
  if (screen === 'finance') renderFinance(currentFinanceTab);

  if (typeof window.applyIcons === 'function') window.applyIcons();
}

function updateBottomNav(screen) {
  const isAuth = screen === 'login' || screen === 'forgot';
  const nav = document.getElementById('bottom-nav');
  if (nav) nav.hidden = isAuth;

  const footer = document.querySelector('.site-footer');
  if (footer) footer.style.display = isAuth ? 'none' : '';

  const wa = document.querySelector('.whatsapp-float');
  if (wa) wa.style.display = isAuth ? 'none' : '';

  if (isAuth) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  document.querySelectorAll('.bn-tab').forEach(t => t.classList.remove('active'));
  const map = { home: 0, spaces: 1, category: 1, profile: 2, 'my-bookings': 3, finance: 4 };
  if (map[screen] !== undefined) {
    const tabs = document.querySelectorAll('.bn-tab');
    if (tabs[map[screen]]) tabs[map[screen]].classList.add('active');
  }
}

/* ── Saudação dinâmica ── */
function setGreeting() {
  const hour = new Date().getHours();
  const el = document.getElementById('greeting-text');
  if (!el) return;
  if (hour >= 5 && hour < 12) el.textContent = 'Bom dia!';
  else if (hour >= 12 && hour < 18) el.textContent = 'Boa tarde!';
  else el.textContent = 'Boa noite!';
}

/* ── Toggle de senha ── */
function togglePwd(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

/* ── Recuperar senha ── */
function forgotSubmit() {
  const btn = document.getElementById('btn-forgot');
  const feedback = document.getElementById('forgot-ok');
  if (!btn || !feedback) return;
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    feedback.classList.remove('hidden');
    btn.textContent = 'Instruções enviadas!';
  }, 1200);
}

/* ── Utilitários ── */
function formatMoney(value) {
  if (value === null || value === undefined) return 'A confirmar';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function todayISO() {
  const d = new Date();
  return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function isoToDate(iso) {
  return new Date(iso + 'T12:00:00');
}

function addDaysISO(iso, days) {
  const d = isoToDate(iso);
  d.setDate(d.getDate() + days);
  return new Date(d - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

function longDate(iso) {
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(isoToDate(iso));
}

function refreshIcons() {
  if (typeof window.applyIcons === 'function') window.applyIcons();
}

/* =====================================================
   HOME
   ===================================================== */
function renderHome() {
  const badgeFinance = document.getElementById('badge-finance-alert');
  if (badgeFinance) {
    const pendentes = DB.cobrancas.filter(c => c.status === 'pendente').length;
    badgeFinance.textContent = pendentes === 1 ? '1 pendência' : `${pendentes} pendências`;
    badgeFinance.classList.toggle('hidden', pendentes === 0);
  }
}

function renderQuickReserve() {
  const el = document.getElementById('quick-reserve');
  if (!el) return;
  el.innerHTML = spaceCategories.map(c => `
    <button type="button" class="quick-tile" onclick="openCategory('${c.id}')">
      <span class="quick-tile-icon"><i data-icon="${c.icon}"></i></span>
      <span class="quick-tile-name">${c.short}</span>
    </button>
  `).join('');
  refreshIcons();
}

/* =====================================================
   LOCAÇÃO — TIPOS DE ESPAÇO
   ===================================================== */
function renderCategories() {
  const el = document.getElementById('category-grid');
  if (!el) return;
  el.innerHTML = spaceCategories.map(c => `
    <button type="button" class="category-card" onclick="openCategory('${c.id}')">
      <div class="cat-card-top">
        <span class="category-icon"><i data-icon="${c.icon}"></i></span>
        <span class="cat-unit-pill">${c.count}</span>
      </div>
      <div class="cat-card-body">
        <strong>${c.name}</strong>
        <span class="cat-badge-tag">${c.badge}</span>
      </div>
      <div class="cat-card-foot">
        <span>Ver horários</span>
        <i data-icon="arrow-right"></i>
      </div>
    </button>
  `).join('');
  refreshIcons();
}

function openCategory(id) {
  activeCategory = spaceCategories.find(c => c.id === id);
  if (!activeCategory) return;
  const today = todayISO();
  if (!selectedDate || selectedDate < today) selectedDate = today;

  document.getElementById('cat-title').textContent = activeCategory.name;
  renderDayPicker();
  renderUnits();
  navigateTo('category');
}

/* ── Seletor de datas (próximos 14 dias + calendário) ── */
function renderDayPicker() {
  const el = document.getElementById('day-picker');
  if (!el) return;
  const today = todayISO();
  const weekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
  const month = new Intl.DateTimeFormat('pt-BR', { month: 'short' });

  const days = [];
  for (let i = 0; i < 14; i++) days.push(addDaysISO(today, i));

  el.innerHTML = days.map((iso, i) => {
    const d = isoToDate(iso);
    const label = i === 0 ? 'Hoje' : weekday.format(d).replace('.', '');
    return `
      <button type="button" class="day-btn ${iso === selectedDate ? 'active' : ''}" onclick="pickDate('${iso}')">
        <span>${label}</span>
        <strong>${d.getDate()}</strong>
        <small>${month.format(d).replace('.', '')}</small>
      </button>
    `;
  }).join('');

  const input = document.getElementById('cat-date-input');
  if (input) {
    input.min = today;
    input.value = selectedDate;
  }

  const label = document.getElementById('cat-date-label');
  if (label) label.textContent = longDate(selectedDate);

  const active = el.querySelector('.day-btn.active');
  if (active) active.scrollIntoView({ block: 'nearest', inline: 'center' });
}

function pickDate(iso) {
  selectedDate = iso;
  renderDayPicker();
  renderUnits();
}

function pickCustomDate(value) {
  if (!value) return;
  if (value < todayISO()) {
    showToast('Escolha uma data a partir de hoje.');
    return;
  }
  pickDate(value);
}

/* ── Disponibilidade ──
   Hoje é simulada no navegador. Quando o banco existir, trocar por
   GET /api/disponibilidade?espaco=ID&data=YYYY-MM-DD (o servidor é a fonte da verdade). */
function slotStatus(unitId, date, slot) {
  const hasBooking = DB.reservas.some(r =>
    r.espacoId === unitId && r.data === date && r.status !== 'cancelada' && (slot === null || r.horario === slot)
  );
  if (hasBooking) return 'ocupado';

  if (slot && date === todayISO()) {
    const [h, m] = slot.slice(0, 5).split(':').map(Number);
    const now = new Date();
    if (h * 60 + m <= now.getHours() * 60 + now.getMinutes()) return 'encerrado';
  }

  const key = unitId + date + (slot || '');
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) % 9973;
  return hash % 4 === 0 ? 'ocupado' : 'livre';
}

function renderUnits() {
  const el = document.getElementById('unit-list');
  if (!el || !activeCategory) return;
  const units = rentalUnits.filter(u => u.cat === activeCategory.id);

  el.innerHTML = units.map(u => {
    const price = u.price === null
      ? 'Valor a confirmar'
      : `${formatMoney(u.price)} <span>${u.billing || ''}</span>`;

    if (activeCategory.mode === 'slots') {
      const slots = rentalTimeSlots.map((s, i) => ({ s, i, st: slotStatus(u.id, selectedDate, s) }));
      const free = slots.filter(x => x.st === 'livre').length;
      return `
        <article class="unit-card">
          <div class="unit-head">
            <div class="unit-info">
              <strong>${u.name}</strong>
              <small>${price}</small>
            </div>
            <span class="avail-pill ${free ? 'ok' : 'no'}">${free ? `${free} ${free === 1 ? 'livre' : 'livres'}` : 'Lotado'}</span>
          </div>
          <div class="slot-grid">
            ${slots.map(x => x.st === 'livre'
        ? `<button type="button" class="slot-chip" onclick="selectSlot('${u.id}', ${x.i})">${x.s.replace(' às ', ' – ')}</button>`
        : `<button type="button" class="slot-chip busy" disabled title="${x.st === 'encerrado' ? 'Horário encerrado' : 'Ocupado'}">${x.s.replace(' às ', ' – ')}</button>`
      ).join('')}
          </div>
        </article>
      `;
    }

    const st = slotStatus(u.id, selectedDate, null);
    return `
      <article class="unit-card unit-row">
        <div class="unit-info">
          <strong>${u.name}</strong>
          <small>${u.detail ? u.detail + ' · ' : ''}${price}</small>
        </div>
        <div class="unit-actions">
          ${st === 'livre'
        ? `<span class="avail-pill ok">Disponível</span>
               <button type="button" class="btn-reserve" onclick="selectDay('${u.id}')">Reservar</button>`
        : `<span class="avail-pill no">Indisponível</span>`}
        </div>
      </article>
    `;
  }).join('');

  refreshIcons();
}

/* ── Seleção e confirmação ── */
function selectSlot(unitId, index) {
  const unit = rentalUnits.find(u => u.id === unitId);
  if (!unit) return;
  pendingBooking = { unit, date: selectedDate, horario: rentalTimeSlots[index] };
  openConfirmBooking();
}

function selectDay(unitId) {
  const unit = rentalUnits.find(u => u.id === unitId);
  if (!unit) return;
  pendingBooking = { unit, date: selectedDate, horario: 'Horário a combinar' };
  openConfirmBooking();
}

function openConfirmBooking() {
  if (!pendingBooking) return;
  const { unit, date, horario } = pendingBooking;
  document.getElementById('cb-space').textContent = unit.name;
  document.getElementById('cb-date').textContent = longDate(date);
  document.getElementById('cb-time').textContent = horario;
  document.getElementById('cb-value').textContent = unit.price === null ? 'A confirmar' : formatMoney(unit.price);
  document.getElementById('cb-note').textContent = unit.price === null
    ? 'A secretaria vai analisar o pedido e informar o valor.'
    : 'Depois de confirmar, o PIX fica disponível em Financeiro.';
  openModal('modal-confirm-booking');
}

function confirmBooking() {
  if (!pendingBooking) return;
  const { unit, date, horario } = pendingBooking;

  const seq = String(DB.reservas.length + 1).padStart(3, '0');
  const protocolo = `#AAC-2026-${seq}`;
  const [ano, mesNum, dia] = date.split('-');
  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const dataFormatada = `${dia}/${mesNum}/${ano}`;

  const hasPrice = unit.price !== null;
  const cobId = hasPrice ? `COB-${seq}` : null;

  DB.reservas.unshift({
    id: Date.now(), protocolo, espacoId: unit.id, espacoNome: unit.name,
    data: date, dataFormatada, dia, mes: meses[parseInt(mesNum, 10) - 1], horario,
    status: hasPrice ? 'aguardando_pagamento' : 'pendente_aprovacao',
    statusLabel: hasPrice ? 'Pendente Pagamento' : 'Em Análise',
    valor: unit.price, cobrancaId: cobId
  });

  if (hasPrice) {
    DB.cobrancas.unshift({
      id: cobId, reservaProtocolo: protocolo, descricao: `Locação ${unit.name} (${dia}/${mesNum})`,
      valor: unit.price, vencimento: 'Hoje às 23:59', status: 'pendente',
      pixCode: `00020126580014br.gov.bcb.pix0136associacaococari-pix-${seq}5204000053039865406${unit.price.toFixed(2)}5802BR5924ASSOCIACAO ATLETICA COCARI6010MANDAGUARI6304ABCD`
    });
  }

  DB.notificacoes.unshift({
    id: Date.now(), titulo: 'Pedido registrado',
    mensagem: `${unit.name} em ${dataFormatada} (${protocolo}).`,
    data: 'Agora', tipo: 'success', lida: false
  });

  pendingBooking = null;
  closeModal('modal-confirm-booking');
  renderNotifications();
  showToast(`Pedido ${protocolo} registrado!`);
  navigateTo('my-bookings');
}

/* =====================================================
   MINHAS RESERVAS
   ===================================================== */
function filterBookings(tab, btn) {
  currentBookingTab = tab;
  document.querySelectorAll('#view-my-bookings .booking-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderBookings(tab);
}

function statusClass(status) {
  return {
    aprovada: 'status-pill-aprovada',
    pendente_aprovacao: 'status-pill-pendente',
    aguardando_pagamento: 'status-pill-aguardando-pagamento',
    concluida: 'status-pill-concluida',
    cancelada: 'status-pill-cancelada'
  }[status] || 'status-pill-aprovada';
}

function renderBookings(tab) {
  const container = document.getElementById('bookings-list-container');
  if (!container) return;

  let list = DB.reservas;
  if (tab === 'proximas') list = list.filter(r => r.status === 'aprovada' || r.status === 'aguardando_pagamento');
  if (tab === 'pendentes') list = list.filter(r => r.status === 'pendente_aprovacao');
  if (tab === 'concluidas') list = list.filter(r => r.status === 'concluida' || r.status === 'cancelada');

  if (list.length === 0) {
    container.innerHTML = `
      <div class="simple-empty-state">
        <span class="empty-icon"><i data-icon="calendar"></i></span>
        <p>Nenhuma reserva aqui.</p>
      </div>`;
    refreshIcons();
    return;
  }

  container.innerHTML = list.map(r => {
    const canPay = r.status === 'aguardando_pagamento' && r.cobrancaId;
    const canCancel = r.status === 'pendente_aprovacao' || r.status === 'aguardando_pagamento';
    return `
      <article class="booking-card-item">
        <div class="bci-top">
          <div class="bci-main">
            <div class="bci-date-box">
              <span class="bci-date-day">${r.dia}</span>
              <span class="bci-date-mon">${r.mes}</span>
            </div>
            <div class="bci-title-area">
              <strong>${r.espacoNome}</strong>
              <span><i data-icon="clock"></i> ${r.horario}</span>
            </div>
          </div>
          <span class="status-pill ${statusClass(r.status)}">${r.statusLabel}</span>
        </div>
        <div class="bci-middle">
          <span class="bci-proto">${r.protocolo}</span>
          <span class="bci-value">${r.valor !== null ? formatMoney(r.valor) : 'A confirmar'}</span>
        </div>
        <div class="bci-actions">
          ${canCancel ? `<button type="button" class="btn-cancel-req" onclick="cancelBookingAction(${r.id})">Cancelar</button>` : ''}
          <button type="button" class="btn-detail" onclick="openBookingDetails('${r.protocolo}')">Detalhes</button>
          ${canPay ? `<button type="button" class="btn-pix-pay" onclick="openPixModal('${r.cobrancaId}')"><i data-icon="pix"></i> Pagar</button>` : ''}
        </div>
      </article>`;
  }).join('');

  refreshIcons();
}

function openBookingDetails(protocolo) {
  const r = DB.reservas.find(item => item.protocolo === protocolo);
  if (!r) return;
  document.getElementById('mbd-proto').textContent = r.protocolo;
  document.getElementById('mbd-space').textContent = r.espacoNome;
  document.getElementById('mbd-datetime').textContent = `${r.dataFormatada} · ${r.horario}`;
  document.getElementById('mbd-val').textContent = r.valor !== null ? formatMoney(r.valor) : 'A confirmar';

  const pill = document.getElementById('mbd-status-pill');
  if (pill) {
    pill.textContent = r.statusLabel;
    pill.className = 'status-pill ' + statusClass(r.status);
  }

  const btnPix = document.getElementById('mbd-btn-pix');
  if (btnPix) {
    btnPix.classList.toggle('hidden', !(r.status === 'aguardando_pagamento' && r.cobrancaId));
    if (r.cobrancaId) btnPix.setAttribute('data-cob-id', r.cobrancaId);
  }
  openModal('modal-booking-detail');
}

function openPixModalFromReserva() {
  const btn = document.getElementById('mbd-btn-pix');
  const cobId = btn ? btn.getAttribute('data-cob-id') : null;
  if (cobId) openPixModal(cobId);
}

function cancelBookingAction(id) {
  const r = DB.reservas.find(item => item.id === id);
  if (!r) return;
  if (!confirm(`Cancelar a reserva ${r.protocolo} (${r.espacoNome})?`)) return;
  r.status = 'cancelada';
  r.statusLabel = 'Cancelada';
  if (r.cobrancaId) {
    const cob = DB.cobrancas.find(c => c.id === r.cobrancaId);
    if (cob && cob.status === 'pendente') cob.status = 'cancelada';
  }
  showToast('Reserva cancelada.');
  renderBookings(currentBookingTab);
  renderHome();
}

/* =====================================================
   FINANCEIRO
   ===================================================== */
function filterFinance(tab, btn) {
  currentFinanceTab = tab;
  document.querySelectorAll('#view-finance .booking-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderFinance(tab);
}

function renderFinance(tab) {
  const totalPending = DB.cobrancas.filter(c => c.status === 'pendente').reduce((s, c) => s + (c.valor || 0), 0);
  const totalPaid = DB.cobrancas.filter(c => c.status === 'pago').reduce((s, c) => s + (c.valor || 0), 0);

  const elPending = document.getElementById('fin-total-pending');
  const elPaid = document.getElementById('fin-total-paid');
  const cardPending = document.getElementById('fin-stat-pending-card');
  if (elPending) elPending.textContent = formatMoney(totalPending);
  if (elPaid) elPaid.textContent = formatMoney(totalPaid);
  if (cardPending) cardPending.classList.toggle('alert', totalPending > 0);

  const container = document.getElementById('finance-content-container');
  if (!container) return;

  if (tab === 'pendentes') {
    const list = DB.cobrancas.filter(c => c.status === 'pendente');
    container.innerHTML = list.length === 0
      ? `<div class="simple-empty-state"><span class="empty-icon"><i data-icon="wallet"></i></span><p>Nenhuma cobrança em aberto.</p></div>`
      : list.map(c => `
          <div class="debt-card-item">
            <div class="debt-card-left">
              <strong>${c.descricao}</strong>
              <span>Vence ${c.vencimento.toLowerCase()} · ${c.reservaProtocolo}</span>
            </div>
            <div class="debt-card-right">
              <span class="debt-card-val">${formatMoney(c.valor)}</span>
              <button type="button" class="btn-pix-pay" onclick="openPixModal('${c.id}')"><i data-icon="pix"></i> Pagar</button>
            </div>
          </div>`).join('');
  } else {
    const list = DB.cobrancas.filter(c => c.status === 'pago');
    container.innerHTML = list.length === 0
      ? `<div class="simple-empty-state"><span class="empty-icon"><i data-icon="wallet"></i></span><p>Nenhum pagamento registrado.</p></div>`
      : `<table class="payment-history-table">
          <thead><tr><th>Descrição</th><th>Data</th><th>Valor</th></tr></thead>
          <tbody>
            ${list.map(p => `
              <tr>
                <td>${p.descricao}</td>
                <td>${p.pagoEm || '-'}</td>
                <td><strong style="color:var(--green);">${formatMoney(p.valor)}</strong></td>
              </tr>`).join('')}
          </tbody>
        </table>`;
  }
  refreshIcons();
}

/* ── PIX ── */
function openPixModal(cobrancaId) {
  const cob = DB.cobrancas.find(c => c.id === cobrancaId);
  if (!cob) return;
  activePixCobranca = cob;
  document.getElementById('pix-modal-value').textContent = formatMoney(cob.valor);
  document.getElementById('pix-modal-desc').textContent = cob.descricao;
  document.getElementById('pix-copy-input').value = cob.pixCode || '';

  const copyBtn = document.getElementById('btn-copy-pix-modal');
  if (copyBtn) {
    copyBtn.innerHTML = '<i data-icon="copy"></i> Copiar';
    copyBtn.classList.remove('copied');
  }
  openModal('modal-pix');
}

function copyPixCodeModal() {
  const input = document.getElementById('pix-copy-input');
  if (!input) return;
  const done = () => {
    const btn = document.getElementById('btn-copy-pix-modal');
    if (btn) {
      btn.innerHTML = '<i data-icon="check"></i> Copiado';
      btn.classList.add('copied');
      refreshIcons();
    }
    showToast('Código PIX copiado!');
  };
  navigator.clipboard.writeText(input.value).then(done).catch(() => {
    input.select();
    document.execCommand('copy');
    done();
  });
}

function confirmPixModal() {
  if (!activePixCobranca) return;
  activePixCobranca.status = 'pago';
  activePixCobranca.pagoEm = new Intl.DateTimeFormat('pt-BR').format(new Date());

  const res = DB.reservas.find(r => r.cobrancaId === activePixCobranca.id);
  if (res) {
    res.status = 'aprovada';
    res.statusLabel = 'Aprovada';
  }

  DB.notificacoes.unshift({
    id: Date.now(), titulo: 'Pagamento confirmado',
    mensagem: `Recebemos ${formatMoney(activePixCobranca.valor)} via PIX.`,
    data: 'Agora', tipo: 'success', lida: false
  });

  closeModal('modal-pix');
  showToast('Pagamento confirmado!');
  renderHome();
  renderFinance(currentFinanceTab);
  renderBookings(currentBookingTab);
  renderNotifications();
}

/* =====================================================
   NOTIFICAÇÕES
   ===================================================== */
function toggleNotifications() {
  const panel = document.getElementById('notif-panel');
  if (!panel) return;
  panel.classList.toggle('hidden');
  renderNotifications();
}

function renderNotifications() {
  const list = document.getElementById('notif-panel-list');
  const badge = document.getElementById('notif-badge');
  const unread = DB.notificacoes.filter(n => !n.lida).length;
  if (badge) {
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }
  if (!list) return;

  if (DB.notificacoes.length === 0) {
    list.innerHTML = '<p style="padding:16px;text-align:center;font-size:.8rem;color:var(--text-3);">Nenhuma notificação.</p>';
    return;
  }

  const icon = { success: 'check', alert: 'bell', info: 'bookmark' };
  list.innerHTML = DB.notificacoes.map(n => `
    <div class="notif-item ${!n.lida ? 'unread' : ''}">
      <div class="notif-icon notif-icon-${n.tipo}"><i data-icon="${icon[n.tipo] || 'bell'}"></i></div>
      <div class="notif-content">
        <strong>${n.titulo}</strong>
        <p>${n.mensagem}</p>
        <span>${n.data}</span>
      </div>
    </div>`).join('');
  refreshIcons();
}

function markAllNotificationsAsRead() {
  DB.notificacoes.forEach(n => { n.lida = true; });
  renderNotifications();
}

/* Fecha o painel ao clicar fora */
document.addEventListener('click', e => {
  const panel = document.getElementById('notif-panel');
  const trigger = document.getElementById('notif-btn-trigger');
  if (!panel || panel.classList.contains('hidden')) return;
  if (!panel.contains(e.target) && trigger && !trigger.contains(e.target)) panel.classList.add('hidden');
});

/* =====================================================
   MODAIS
   ===================================================== */
function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('hidden');
    refreshIcons();
  }
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.app-modal-overlay').forEach(m => m.classList.add('hidden'));
});

/* =====================================================
   PERFIL
   ===================================================== */
function previewProfilePhoto(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    showToast('Escolha um arquivo de imagem.');
    event.target.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const preview = document.getElementById('profile-photo-preview');
    const initials = document.getElementById('profile-avatar-initials');
    const btnRemove = document.getElementById('btn-remove-photo');
    if (preview) {
      preview.src = reader.result;
      preview.classList.remove('hidden');
    }
    if (initials) initials.classList.add('hidden');
    if (btnRemove) btnRemove.classList.remove('hidden');
    showToast('Foto atualizada com sucesso!');
  };
  reader.readAsDataURL(file);
}

function removeProfilePhoto() {
  const preview = document.getElementById('profile-photo-preview');
  const initials = document.getElementById('profile-avatar-initials');
  const input = document.getElementById('profile-photo-input');
  const btnRemove = document.getElementById('btn-remove-photo');
  if (preview) {
    preview.src = '';
    preview.classList.add('hidden');
  }
  if (initials) initials.classList.remove('hidden');
  if (input) input.value = '';
  if (btnRemove) btnRemove.classList.add('hidden');
  showToast('Foto removida.');
}

function saveProfileDemo(event) {
  event.preventDefault();
  showToast('Alterações salvas.');
}

/* ── Toast ── */
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast || !toastMsg) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ── Inicialização ── */
document.addEventListener('DOMContentLoaded', () => {
  setGreeting();
  renderQuickReserve();
  renderCategories();
  renderHome();
  renderNotifications();
  updateBottomNav('login');
});
