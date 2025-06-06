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

  // --- Reviews Section with localStorage persistence ---
  const addReviewBtn = document.querySelector('.add-review-btn');
  const addReviewForm = document.querySelector('.add-review-form');
  const reviewsGrid = document.querySelector('.reviews-grid');

  // Default reviews (static, always shown)
  const defaultReviews = [
    { text: '“A fantastic developer! Delivered above expectations.”', reviewer: 'Sophia L.' },
    { text: '“Creative, reliable, and a pleasure to work with.”', reviewer: 'Alex P.' },
    { text: '“Thomas is a true professional. His attention to detail and passion for code are unmatched.”', reviewer: 'Maria K.' },
    { text: '“Always delivers on time and goes the extra mile. Highly recommended!”', reviewer: 'Daniel S.' },
    { text: '“Working with Thomas was a pleasure. The results exceeded our expectations.”', reviewer: 'Priya R.' },
    { text: '“Innovative solutions and a great communicator. Will collaborate again!”', reviewer: 'Luca M.' }
  ];

  // Load user reviews from localStorage
  function getUserReviews() {
    return JSON.parse(localStorage.getItem('userReviews') || '[]');
  }
  function saveUserReviews(reviews) {
    localStorage.setItem('userReviews', JSON.stringify(reviews));
  }

  // Render all reviews (default + user)
  function renderReviews() {
    reviewsGrid.innerHTML = '';
    // Render default reviews
    defaultReviews.forEach(r => {
      const card = document.createElement('div');
      card.className = 'review-card visible';
      card.innerHTML = `<p>${r.text}</p><span>- ${r.reviewer}</span>`;
      reviewsGrid.appendChild(card);
    });
    // Render user reviews (with delete button)
    getUserReviews().forEach((r, i) => {
      const card = document.createElement('div');
      card.className = 'review-card visible';
      card.innerHTML = `<p>“${r.text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}”</p><span>- ${r.reviewer.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
      // Add delete button
      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.className = 'delete-review-btn';
      delBtn.style.marginLeft = '12px';
      delBtn.style.background = '#ff5c5c';
      delBtn.style.color = '#fff';
      delBtn.style.border = 'none';
      delBtn.style.borderRadius = '6px';
      delBtn.style.padding = '4px 12px';
      delBtn.style.cursor = 'pointer';
      delBtn.style.fontSize = '0.95rem';
      delBtn.addEventListener('click', () => {
        const reviews = getUserReviews();
        reviews.splice(i, 1);
        saveUserReviews(reviews);
        renderReviews();
      });
      card.appendChild(delBtn);
      reviewsGrid.appendChild(card);
    });
  }

  if (addReviewBtn && addReviewForm && reviewsGrid) {
    renderReviews();
    addReviewBtn.addEventListener('click', () => {
      addReviewForm.style.display = addReviewForm.style.display === 'none' ? 'flex' : 'none';
      addReviewForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    addReviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const reviewer = addReviewForm.reviewer.value.trim() || 'Anonymous';
      const reviewText = addReviewForm.review.value.trim();
      const status = addReviewForm.querySelector('.review-form-status');
      if (!reviewText) {
        status.textContent = 'Please enter your review.';
        return;
      }
      // Save new review to localStorage
      const reviews = getUserReviews();
      reviews.push({ reviewer, text: reviewText });
      saveUserReviews(reviews);
      status.textContent = 'Thank you for your review!';
      addReviewForm.reset();
      setTimeout(() => { status.textContent = ''; addReviewForm.style.display = 'none'; }, 1200);
      renderReviews();
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
});