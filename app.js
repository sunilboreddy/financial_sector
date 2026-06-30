const quizData = [
  {
    q: "You're building a security master table. A colleague wants to use the ticker symbol as the primary key. What's wrong with this?",
    opts: ["Tickers are too short to be unique","Tickers can be reused by different companies after corporate actions or delistings","Tickers aren't stored as text in most databases","Nothing is wrong — tickers are a good primary key"],
    ans: 1,
    exp: "Tickers are not stable identifiers. Companies can change tickers, and the same ticker can be assigned to a different company after a delisting. Use ISIN or FIGI as your primary key, with ticker as an attribute."
  },
  {
    q: "A bond has a 'day count convention' field set to 'Actual/360'. Why does this matter for data engineers?",
    opts: ["It determines how often coupons are paid","It affects how accrued interest is calculated — different conventions give different amounts","It indicates the bond is from the US market","It sets the settlement period to 360 days"],
    ans: 1,
    exp: "Day count conventions (Actual/360, 30/360, Actual/365, etc.) determine how interest accrues between coupon dates. Incorrect handling of this field is a classic source of calculation errors in fixed income systems."
  },
  {
    q: "What is the difference between 'valid time' and 'transaction time' in a bi-temporal data model?",
    opts: ["Valid time is when data was entered; transaction time is when it took effect","Valid time is when the fact was true in the real world; transaction time is when it was recorded in the system","They are the same concept — just different names","Valid time is used for trades; transaction time is used for positions"],
    ans: 1,
    exp: "Bi-temporal modelling is essential in finance. Valid time captures real-world timing (a trade happened on Friday). Transaction time captures when we knew about it (we recorded it on Monday). You need both to produce accurate point-in-time reports."
  },
  {
    q: "A colleague stores a trade's monetary value as a Python float. Why is this a problem?",
    opts: ["Floats use too much storage","IEEE 754 floating point cannot represent most decimal fractions exactly, causing rounding errors in financial calculations","Floats don't support negative numbers","Python floats don't work with SQL databases"],
    ans: 1,
    exp: "0.1 + 0.2 = 0.30000000000000004 in float arithmetic. For money, always use DECIMAL/NUMERIC in SQL or Python's decimal.Decimal. Even tiny errors compound across millions of transactions."
  },
  {
    q: "What does MiFID II require regarding trade timestamps for high-frequency trading?",
    opts: ["Timestamps are only required for trades above £10,000","Timestamps must be accurate to microseconds","Timestamps must be in UTC only","MiFID II doesn't have timestamp requirements"],
    ans: 1,
    exp: "MiFID II requires timestamps accurate to microseconds (10^-6 seconds) for high-frequency and algorithmic trading activity. This has significant implications for system clock synchronisation and data pipeline design."
  },
  {
    q: "You're working at an asset manager. What does 'buy side' mean in this context?",
    opts: ["The team that physically purchases office supplies","The firm invests capital on behalf of clients — it buys securities","The division that sells investment products to retail customers","The trading desk that only takes long positions"],
    ans: 1,
    exp: "Buy side refers to firms (asset managers, hedge funds, pension funds) that invest capital — they are buyers of securities and investment services. Sell side refers to banks and brokers that facilitate trading and provide those services."
  },
  {
    q: "BCBS 239 directly relates to your work as a data engineer. What does it require?",
    opts: ["That all trades are reported to a trade repository","That banks can accurately aggregate and report risk data quickly, including in a crisis","That all customer data must be deleted after 7 years","That banks must use only approved technology vendors"],
    ans: 1,
    exp: "BCBS 239 (Principles for Effective Risk Data Aggregation and Risk Reporting) is essentially a regulatory mandate for good data engineering — data accuracy, completeness, timeliness, lineage, and the ability to aggregate risk data quickly. Many banks have failed audits due to poor data architecture."
  },
  {
    q: "Why does a 'right to erasure' GDPR request create complexity in a financial firm's data pipeline?",
    opts: ["Financial firms are exempt from GDPR","Regulatory requirements (e.g. AML) mandate retaining financial records for 7+ years, conflicting with deletion","It's not complex — you just delete the record from all tables","Customer data is not covered by GDPR if it's financial data"],
    ans: 1,
    exp: "There's a genuine tension: GDPR grants the right to erasure, but AML regulations require financial records to be kept for 5-7 years. The common resolution is pseudonymisation — replacing personally identifiable fields with a reference key — rather than true deletion."
  },
  {
    q: "What is 'T+2' settlement and why does it matter for your data pipelines?",
    opts: ["A trading strategy that runs for 2 days","The trade must be reported to regulators within 2 hours","Securities and cash actually change hands 2 business days after the trade date","There must be 2 levels of approval for any trade"],
    ans: 2,
    exp: "Settlement (the actual exchange of securities for cash) typically happens T+2 (trade date + 2 business days). This means your positions aren't fully settled immediately after trading. Your pipeline must track 'pending settlement' positions separately from settled ones, and handle settlement failures."
  },
  {
    q: "You're joining a new bank and told to 'reconcile against custodian files'. What does this mean?",
    opts: ["Match your internal position records against what the custodian (safekeeping firm) says you hold, and investigate any differences","Backup your database to the custodian's systems","Check that custody fees match your billing system","Reconcile customer account numbers with the custodian's numbering system"],
    ans: 0,
    exp: "Position reconciliation against custodian statements is a daily back-office process. The custodian holds the actual securities on your behalf. Any difference between your records and theirs (a 'break') must be investigated and resolved. It's a core operational data pipeline."
  }
];

// ── STATE VARIABLES ──
let answered = new Array(quizData.length).fill(false);
let userAnswers = new Array(quizData.length).fill(null);
let score = 0;
const completedPages = new Set();

const pages = ['overview','instruments','markets','participants','data','risk','compliance','pipelines','quiz'];
const breadcrumbMap = {
  overview: ['Foundation', 'How finance works'],
  instruments: ['Foundation', 'Financial instruments'],
  markets: ['Foundation', 'Markets & venues'],
  participants: ['Participants', 'Who does what'],
  data: ['Participants', 'Finance data types'],
  risk: ['Risk & Compliance', 'Risk management'],
  compliance: ['Risk & Compliance', 'Regulations'],
  pipelines: ['Your Work', 'Finance data pipelines'],
  quiz: ['Your Work', 'Knowledge check']
};

// ── QUIZ BUILD & RENDERING ──
function buildQuiz() {
  const container = document.getElementById('quiz-container');
  if (!container) return;
  container.innerHTML = '';
  
  quizData.forEach((q, i) => {
    const card = document.createElement('div');
    card.className = 'quiz-card';
    card.id = 'qcard-' + i;
    
    // Check if previously answered
    const previousAns = userAnswers[i];
    const isAnswered = previousAns !== null;
    
    let optionsHtml = '';
    q.opts.forEach((o, j) => {
      let optClass = 'quiz-opt';
      let disabledAttr = isAnswered ? 'disabled' : '';
      
      if (isAnswered) {
        if (j === q.ans) {
          optClass += ' correct';
        } else if (j === previousAns) {
          optClass += ' wrong';
        }
      }
      optionsHtml += `<button class="${optClass}" ${disabledAttr} onclick="answerQ(${i},${j},this)">${o}</button>`;
    });

    card.innerHTML = `
      <div class="quiz-q">Q${i+1}. ${q.q}</div>
      <div class="quiz-options">
        ${optionsHtml}
      </div>
      <div class="quiz-feedback" id="fb-${i}"></div>
    `;
    
    container.appendChild(card);
    
    // Restore feedback if answered
    if (isAnswered) {
      showFeedback(i, previousAns === q.ans, q.exp);
    }
  });
  
  updateScore();
}

function answerQ(qIdx, optIdx, btn) {
  if (answered[qIdx]) return;
  answered[qIdx] = true;
  userAnswers[qIdx] = optIdx;
  
  // Save answers to localStorage
  localStorage.setItem('financial_guide_user_answers', JSON.stringify(userAnswers));
  
  const card = document.getElementById('qcard-' + qIdx);
  const btns = card.querySelectorAll('.quiz-opt');
  btns.forEach(b => b.disabled = true);
  
  const q = quizData[qIdx];
  if (optIdx === q.ans) {
    btn.classList.add('correct');
    showFeedback(qIdx, true, q.exp);
  } else {
    btn.classList.add('wrong');
    btns[q.ans].classList.add('correct');
    showFeedback(qIdx, false, q.exp);
  }
  
  // Recompute score
  score = userAnswers.filter((ans, idx) => ans !== null && ans === quizData[idx].ans).length;
  updateScore();
}

function showFeedback(qIdx, pass, exp) {
  const fb = document.getElementById('fb-' + qIdx);
  if (!fb) return;
  fb.textContent = (pass ? '✓ Correct. ' : '✗ Not quite. ') + exp;
  fb.className = 'quiz-feedback show ' + (pass ? 'pass' : 'fail');
}

function updateScore() {
  const done = userAnswers.filter(ans => ans !== null).length;
  const scoreBox = document.getElementById('quiz-score-box');
  const scoreDisplay = document.getElementById('score-display');
  if (scoreBox && scoreDisplay) {
    scoreBox.style.display = done > 0 ? 'block' : 'none';
    scoreDisplay.textContent = score + '/' + done;
  }
}

function resetQuiz() {
  answered = new Array(quizData.length).fill(false);
  userAnswers = new Array(quizData.length).fill(null);
  score = 0;
  localStorage.removeItem('financial_guide_user_answers');
  const scoreBox = document.getElementById('quiz-score-box');
  if (scoreBox) scoreBox.style.display = 'none';
  buildQuiz();
}

// ── NAVIGATION & PAGES ──
function goto(id, el) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  const targetPage = document.getElementById('page-' + id);
  if (targetPage) targetPage.style.display = 'block';
  
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) {
    el.classList.add('active');
  } else {
    // If element is not passed, find it by data-page attribute
    const navItem = document.querySelector(`[data-page="${id}"]`);
    if (navItem) navItem.classList.add('active');
  }
  
  const bc = breadcrumbMap[id];
  const breadcrumb = document.getElementById('breadcrumb');
  if (bc && breadcrumb) {
    breadcrumb.innerHTML = bc[0] + ' › <span>' + bc[1] + '</span>';
  }
  
  const doneBtn = document.getElementById('done-btn');
  if (doneBtn) {
    if (completedPages.has(id)) {
      doneBtn.textContent = '✓ Done';
      doneBtn.className = 'mark-done-btn done';
    } else {
      doneBtn.textContent = '✓ Mark as done';
      doneBtn.className = 'mark-done-btn';
    }
  }
  
  window.scrollTo(0, 0);
  
  // Save active page state
  localStorage.setItem('financial_guide_active_page', id);
  
  // Close mobile sidebar if open
  closeMobileMenu();
  
  if (id === 'quiz') buildQuiz();
}

function markDone() {
  const active = document.querySelector('.nav-item.active');
  if (!active) return;
  const id = active.dataset.page;
  completedPages.add(id);
  
  // Save completed pages to localStorage
  localStorage.setItem('financial_guide_completed_pages', JSON.stringify(Array.from(completedPages)));
  
  const chk = document.getElementById('chk-' + id);
  if (chk) { chk.textContent = '✓'; }
  active.classList.add('done');
  
  const doneBtn = document.getElementById('done-btn');
  if (doneBtn) {
    doneBtn.textContent = '✓ Done';
    doneBtn.className = 'mark-done-btn done';
  }
  
  updateProgress();
  
  // Advance to next module
  const idx = pages.indexOf(id);
  if (idx < pages.length - 1) {
    const nextId = pages[idx + 1];
    const nextEl = document.querySelector(`[data-page="${nextId}"]`);
    if (nextEl) setTimeout(() => goto(nextId, nextEl), 350);
  }
}

function updateProgress() {
  const pct = Math.round((completedPages.size / pages.length) * 100);
  const fill = document.getElementById('prog-fill');
  const text = document.getElementById('prog-pct');
  if (fill) fill.style.width = pct + '%';
  if (text) text.textContent = pct + '%';
}

function switchTab(e, targetId) {
  const parent = e.target.closest('.module-section') || e.target.parentElement.parentElement;
  parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  e.target.classList.add('active');
  const targetPanel = document.getElementById(targetId);
  if (targetPanel) targetPanel.classList.add('active');
}

// ── MOBILE SIDEBAR TOGGLES ──
function toggleMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar && backdrop) {
    sidebar.classList.toggle('open');
    backdrop.classList.toggle('show');
  }
}

function closeMobileMenu() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (sidebar && backdrop) {
    sidebar.classList.remove('open');
    backdrop.classList.remove('show');
  }
}

// ── INITIALIZATION ──
function init() {
  // 1. Load completed pages
  const savedCompleted = localStorage.getItem('financial_guide_completed_pages');
  if (savedCompleted) {
    try {
      const list = JSON.parse(savedCompleted);
      list.forEach(id => {
        completedPages.add(id);
        const el = document.querySelector(`[data-page="${id}"]`);
        if (el) {
          el.classList.add('done');
          const chk = document.getElementById('chk-' + id);
          if (chk) chk.textContent = '✓';
        }
      });
    } catch(e) {
      console.error("Error loading completed pages from localStorage", e);
    }
  }
  updateProgress();

  // 2. Load quiz answers
  const savedAnswers = localStorage.getItem('financial_guide_user_answers');
  if (savedAnswers) {
    try {
      userAnswers = JSON.parse(savedAnswers);
      answered = userAnswers.map(ans => ans !== null);
      score = userAnswers.filter((ans, idx) => ans !== null && ans === quizData[idx].ans).length;
    } catch(e) {
      console.error("Error loading quiz answers from localStorage", e);
    }
  }

  // 3. Load active page
  const activePage = localStorage.getItem('financial_guide_active_page') || 'overview';
  const activeEl = document.querySelector(`[data-page="${activePage}"]`);
  goto(activePage, activeEl);
}

// Initialize on DOM load
window.addEventListener('DOMContentLoaded', init);
