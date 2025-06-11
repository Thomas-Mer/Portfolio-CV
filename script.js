// Animate clouds in hero section
window.addEventListener('DOMContentLoaded', () => {
  // Fancier GSAP cloud animations: scale, rotate, opacity, and path movement
  gsap.to('.cloud1', {
    x: 120,
    y: 30,
    scale: 1.18,
    rotation: 8,
    opacity: 0.92,
    repeat: -1,
    yoyo: true,
    duration: 10,
    ease: 'power2.inOut'
  });
  gsap.to('.cloud2', {
    x: -140,
    y: -40,
    scale: 1.22,
    rotation: -10,
    opacity: 0.88,
    repeat: -1,
    yoyo: true,
    duration: 13,
    ease: 'power2.inOut'
  });
  gsap.to('.cloud3', {
    x: 90,
    y: 35,
    scale: 1.13,
    rotation: 6,
    opacity: 0.95,
    repeat: -1,
    yoyo: true,
    duration: 15,
    ease: 'power2.inOut'
  });

  // Hero content fancy entrance
  gsap.from('.hero-content h1', { opacity: 0, y: -60, scale: 0.92, duration: 1.2, ease: 'power3.out', delay: 0.2 });
  gsap.from('.hero-content h2', { opacity: 0, y: -40, scale: 0.96, duration: 1.2, ease: 'power3.out', delay: 0.5 });
  gsap.from('.hero-content p', { opacity: 0, y: 40, scale: 0.96, duration: 1.2, ease: 'power3.out', delay: 0.8 });

  // Animate contact form entrance with GSAP for extra polish
  gsap.from('.animated-contact', {
    opacity: 0,
    y: 60,
    scale: 0.96,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.2
  });
  // Animate contact form fields sequentially
  gsap.from('.animated-contact input, .animated-contact textarea, .animated-contact button', {
    opacity: 0,
    y: 30,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
    delay: 0.5
  });

  // Animate sections and cards on scroll
  function revealOnScroll() {
    document.querySelectorAll('section, .project-card, .review-card').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-links a, a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar active link highlight on scroll
  const sections = ['#hero', '#about', '#projects', '#reviews', '#contact'];
  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 80;
    sections.forEach(id => {
      const sec = document.querySelector(id);
      const link = document.querySelector(`.nav-links a[href='${id}']`);
      if (sec && link) {
        if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  // Contact form submission (EmailJS integration)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Initialize EmailJS (replace with your public key)
    emailjs.init('C3VVgb0NynF8NXExv'); // <-- Replace with your EmailJS public key
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const status = contactForm.querySelector('.form-status');
      status.textContent = 'Sending...';
      status.style.color = '#7ee787';
      // Prepare params (must match your template variables)
      const params = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        message: contactForm.message.value
      };
      emailjs.send('service_6e20obe', 'template_7khrtb1', params)
        .then(function() {
          status.textContent = 'Thank you! Your message has been sent.';
          status.style.color = '#7ee787';
          contactForm.reset();
        }, function(error) {
          status.textContent = 'Oops! Something went wrong. Please try again.';
          status.style.color = '#ff5c5c';
        });
    });
  }

  // Day/Night theme toggle
  const themeBtn = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  function setTheme(mode) {
    if (mode === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      themeIcon.textContent = '☀️';
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      themeIcon.textContent = '🌙';
    }
    localStorage.setItem('theme', mode);
  }
  // Initial theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? 'dark' : 'light');
  }
  themeBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    setTheme(isLight ? 'dark' : 'light');
  });

  // Custom animated mouse pointer
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const outline = document.createElement('div');
  outline.className = 'cursor-outline';
  document.body.appendChild(dot);
  document.body.appendChild(outline);
  let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2;
  let outlineX = mouseX, outlineY = mouseY;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();
  // Pointer grows on interactive elements
  document.querySelectorAll('a, button, input, textarea, .project-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      outline.style.width = '56px';
      outline.style.height = '56px';
      outline.style.borderColor = '#fff';
    });
    el.addEventListener('mouseleave', () => {
      outline.style.width = '36px';
      outline.style.height = '36px';
      outline.style.borderColor = '';
    });
  });

  // --- Reviews Section with Firebase Firestore ---
  // Replace localStorage logic with Firestore logic
  const addReviewBtn = document.querySelector('.add-review-btn');
  const addReviewForm = document.querySelector('.add-review-form');
  const reviewsGrid = document.querySelector('.reviews-grid');

  // Default reviews (static, always shown)
  const defaultReviews = [
    { text: 'A fantastic developer! Delivered above expectations.', reviewer: 'Sophia L.' },
    { text: 'Creative, reliable, and a pleasure to work with.', reviewer: 'Alex P.' },
    { text: 'Thomas is a true professional. His attention to detail and passion for code are unmatched.', reviewer: 'Maria K.' },
    { text: 'Always delivers on time and goes the extra mile. Highly recommended!', reviewer: 'Daniel S.' },
    { text: 'Working with Thomas was a pleasure. The results exceeded our expectations.', reviewer: 'Priya R.' },
    { text: 'Innovative solutions and a great communicator. Will collaborate again!', reviewer: 'Luca M.' }
  ];

  // Render all reviews (default + approved from Firestore)
  function renderReviewsFromFirestore() {
    reviewsGrid.innerHTML = '';
    // Render default reviews
    defaultReviews.forEach(r => {
      const card = document.createElement('div');
      card.className = 'review-card visible';
      card.innerHTML = `<p>“${r.text}”</p><span>- ${r.reviewer}</span>`;
      reviewsGrid.appendChild(card);
    });
    // Fetch approved reviews from Firestore
    db.collection('reviews')
      .where('approved', '==', true)
      .orderBy('timestamp', 'desc')
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const r = doc.data();
          const card = document.createElement('div');
          card.className = 'review-card visible';
          card.innerHTML = `<p>“${r.text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}”</p><span>- ${r.reviewer.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
          reviewsGrid.appendChild(card);
        });
      });
  }

  if (addReviewBtn && addReviewForm && reviewsGrid) {
    renderReviewsFromFirestore();
    addReviewBtn.addEventListener('click', () => {
      addReviewForm.style.display = (addReviewForm.style.display === 'none' || addReviewForm.style.display === '') ? 'flex' : 'none';
      addReviewForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    addReviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const reviewer = addReviewForm.querySelector('input[name="reviewer"]').value.trim() || 'Anonymous';
      const reviewText = addReviewForm.querySelector('textarea[name="review"]').value.trim();
      const status = addReviewForm.querySelector('.review-form-status');
      if (!reviewText) {
        status.textContent = 'Please enter your review.';
        return;
      }
      // Add review to Firestore (not approved by default)
      db.collection('reviews').add({
        reviewer,
        text: reviewText,
        approved: false, // Only you can approve in admin panel
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        status.textContent = 'Thank you! Your review will appear after approval.';
        addReviewForm.reset();
        setTimeout(() => { status.textContent = ''; addReviewForm.style.display = 'none'; }, 1500);
      }).catch(() => {
        status.textContent = 'Error submitting review. Please try again.';
      });
    });
  }
  // --- Tic-Tac-Toe Modal Logic ---
  function openModal(modal) {
    modal.style.display = 'flex';
    setTimeout(() => { modal.querySelector('.modal-content').focus?.(); }, 100);
    document.body.style.overflow = 'hidden';
  }
  function closeModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  const ticModal = document.getElementById('tic-tac-toe-demo');
  if (ticModal) {
    document.querySelectorAll('.open-tic-tac-toe').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openModal(ticModal);
        startTicTacToe();
      });
    });
    ticModal.querySelector('.close-modal').addEventListener('click', () => closeModal(ticModal));
    ticModal.addEventListener('click', e => { if (e.target === ticModal) closeModal(ticModal); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && ticModal.style.display === 'flex') closeModal(ticModal); });
  }
  // --- Tic-Tac-Toe Game Logic ---
  function startTicTacToe() {
    const board = ticModal.querySelector('#tic-tac-toe-board');
    const status = ticModal.querySelector('#tic-tac-toe-status');
    const restartBtn = ticModal.querySelector('#tic-tac-toe-restart');
    let cells = Array(9).fill(null);
    let xTurn = true;
    let gameOver = false;
    function render() {
      board.innerHTML = '';
      cells.forEach((cell, i) => {
        const div = document.createElement('div');
        div.className = 'tic-cell';
        div.textContent = cell || '';
        div.addEventListener('click', () => handleMove(i));
        board.appendChild(div);
      });
      status.textContent = gameOver ? getWinnerText() : `Turn: ${xTurn ? '❌' : '⭕'}`;
    }
    function handleMove(i) {
      if (cells[i] || gameOver) return;
      cells[i] = xTurn ? '❌' : '⭕';
      xTurn = !xTurn;
      gameOver = checkWinner() || cells.every(Boolean);
      render();
    }
    function getWinnerText() {
      const winner = checkWinner();
      if (winner) return `Winner: ${winner}`;
      if (cells.every(Boolean)) return "It's a draw!";
      return '';
    }
    function checkWinner() {
      const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
      ];
      for (const [a,b,c] of wins) {
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) return cells[a];
      }
      return null;
    }
    restartBtn.onclick = () => {
      cells = Array(9).fill(null);
      xTurn = true;
      gameOver = false;
      render();
    };
    render();
  }
  // --- To-Do App Modal Logic ---
  const todoModal = document.getElementById('todo-app-demo');
  if (todoModal) {
    document.querySelectorAll('.open-todo-app').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openModal(todoModal);
        startTodoApp();
      });
    });
    todoModal.querySelector('.close-modal').addEventListener('click', () => closeModal(todoModal));
    todoModal.addEventListener('click', e => { if (e.target === todoModal) closeModal(todoModal); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && todoModal.style.display === 'flex') closeModal(todoModal); });
  }
  // --- To-Do App Logic ---
  function startTodoApp() {
    const form = todoModal.querySelector('#todo-form');
    const input = todoModal.querySelector('#todo-input');
    const list = todoModal.querySelector('#todo-list');
    let todos = JSON.parse(localStorage.getItem('todos-demo') || '[]');
    function render() {
      list.innerHTML = '';
      if (todos.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'No tasks yet!';
        li.style.color = '#b3b3b3';
        li.style.textAlign = 'center';
        list.appendChild(li);
        return;
      }
      todos.forEach((todo, i) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.justifyContent = 'space-between';
        li.style.padding = '8px 0';
        li.style.borderBottom = '1px solid #23243a';
        const span = document.createElement('span');
        span.textContent = todo.text;
        span.style.textDecoration = todo.done ? 'line-through' : 'none';
        span.style.color = todo.done ? '#7ee787' : '#f3f3f3';
        span.style.cursor = 'pointer';
        span.addEventListener('click', () => {
          todos[i].done = !todos[i].done;
          save();
        });
        const del = document.createElement('button');
        del.textContent = '✕';
        del.style.background = 'none';
        del.style.border = 'none';
        del.style.color = '#7ee787';
        del.style.fontSize = '1.1rem';
        del.style.cursor = 'pointer';
        del.style.marginLeft = '12px';
        del.addEventListener('click', () => {
          todos.splice(i, 1);
          save();
        });
        li.appendChild(span);
        li.appendChild(del);
        list.appendChild(li);
      });
    }
    function save() {
      localStorage.setItem('todos-demo', JSON.stringify(todos));
      render();
    }
    form.onsubmit = e => {
      e.preventDefault();
      const value = input.value.trim();
      if (!value) return;
      todos.unshift({ text: value, done: false });
      input.value = '';
      save();
    };
    render();
  }
  // --- Calculator Modal Logic ---
  const calculatorModal = document.getElementById('calculator-demo');
  if (calculatorModal) {
    document.querySelectorAll('.open-calculator').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openModal(calculatorModal);
        startCalculatorApp();
      });
    });
    calculatorModal.querySelector('.close-modal').addEventListener('click', () => closeModal(calculatorModal));
    calculatorModal.addEventListener('click', e => { if (e.target === calculatorModal) closeModal(calculatorModal); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && calculatorModal.style.display === 'flex') closeModal(calculatorModal); });
  }
  function startCalculatorApp() {
    const container = document.getElementById('calculator-app');
    container.innerHTML = `
      <div class="calc-display" style="background:#20222b;color:#7ee787;font-size:2rem;padding:16px 12px;border-radius:8px;margin-bottom:12px;text-align:right;">0</div>
      <div class="calc-buttons" style="display:grid;grid-template-columns:repeat(4,56px);gap:10px;justify-content:center;"></div>
    `;
    const display = container.querySelector('.calc-display');
    const buttons = [
      '7','8','9','/',
      '4','5','6','*',
      '1','2','3','-',
      '0','.','=','+',
      'C'
    ];
    const btnGrid = container.querySelector('.calc-buttons');
    let current = '0', operator = '', operand = null, reset = false;
    function updateDisplay(val) { display.textContent = val; }
    function handleInput(val) {
      if (val === 'C') { current = '0'; operator = ''; operand = null; reset = false; updateDisplay(current); return; }
      if ('0123456789.'.includes(val)) {
        if (reset) { current = val === '.' ? '0.' : val; reset = false; }
        else if (val === '.' && current.includes('.')) return;
        else current = current === '0' && val !== '.' ? val : current + val;
        updateDisplay(current);
      } else if ('/*-+'.includes(val)) {
        operand = parseFloat(current); operator = val; reset = true;
      } else if (val === '=') {
        if (operator && operand !== null) {
          let result;
          try {
            result = eval(operand + operator + parseFloat(current));
          } catch { result = 'Err'; }
          current = String(result); operator = ''; operand = null; reset = true;
          updateDisplay(current);
        }
      }
    }
    buttons.forEach(val => {
      const btn = document.createElement('button');
      btn.textContent = val;
      btn.style.cssText = 'padding:16px;font-size:1.1rem;background:#23243a;color:#fff;border:none;border-radius:8px;cursor:pointer;transition:background 0.2s;';
      btn.onmouseenter = () => btn.style.background = '#7ee787';
      btn.onmouseleave = () => btn.style.background = '#23243a';
      btn.onclick = () => handleInput(val);
      btnGrid.appendChild(btn);
    });
    document.onkeydown = e => {
      if (calculatorModal.style.display !== 'flex') return;
      if ('0123456789/*-+.='.includes(e.key)) handleInput(e.key);
      if (e.key === 'Enter') handleInput('=');
      if (e.key === 'c' || e.key === 'C') handleInput('C');
    };
  }
  // --- Memory Game Modal Logic ---
  const memoryModal = document.getElementById('memory-game-demo');
  if (memoryModal) {
    document.querySelectorAll('.open-memory-game').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        openModal(memoryModal);
        startMemoryGameApp();
      });
    });
    memoryModal.querySelector('.close-modal').addEventListener('click', () => closeModal(memoryModal));
    memoryModal.addEventListener('click', e => { if (e.target === memoryModal) closeModal(memoryModal); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && memoryModal.style.display === 'flex') closeModal(memoryModal); });
  }
  function startMemoryGameApp() {
    const container = document.getElementById('memory-game-app');
    const emojis = ['🍎','🍌','🍇','🍉','🍒','🍋','🍓','🥝'];
    let cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    let flipped = [], matched = [], moves = 0;
    container.innerHTML = `<div class="memory-board" style="display:grid;grid-template-columns:repeat(4,48px);gap:10px;justify-content:center;margin-bottom:12px;"></div><div class="memory-status" style="color:#7ee787;text-align:center;font-size:1.1rem;"></div>`;
    const board = container.querySelector('.memory-board');
    const status = container.querySelector('.memory-status');
    function render() {
      board.innerHTML = '';
      cards.forEach((emoji, i) => {
        const card = document.createElement('button');
        card.className = 'memory-card';
        card.style.cssText = 'width:48px;height:48px;font-size:2rem;background:#23243a;color:#23243a;border:none;border-radius:8px;cursor:pointer;transition:background 0.2s;';
        if (matched.includes(i) || flipped.includes(i)) {
          card.textContent = emoji;
          card.style.color = '#fff';
          card.style.background = '#7ee787';
        } else {
          card.textContent = '❓';
        }
        card.onclick = () => {
          if (flipped.length < 2 && !flipped.includes(i) && !matched.includes(i)) {
            flipped.push(i);
            render();
            if (flipped.length === 2) {
              moves++;
              if (cards[flipped[0]] === cards[flipped[1]]) {
                matched.push(...flipped);
                flipped = [];
                render();
                if (matched.length === cards.length) status.textContent = `You won in ${moves} moves! 🎉`;
              } else {
                setTimeout(() => { flipped = []; render(); }, 900);
              }
            }
          }
        };
        board.appendChild(card);
      });
      if (matched.length < cards.length) status.textContent = `Moves: ${moves}`;
    }
    render();
  }
});