/* ============================================================
   Ritiros Studio — Landing Page Interactions
   - Theme toggle (light/dark, tersimpan di localStorage)
   - Menu mobile
   - Bayangan nav saat scroll
   - Accordion FAQ
   - Pratinjau video portofolio (hover di desktop, ketuk di HP)
   - Reveal saat scroll (hormati prefers-reduced-motion)
   ============================================================ */
(function(){
  var root = document.documentElement;

  // Theme toggle
  function setTheme(t){ root.setAttribute('data-theme', t); try{localStorage.setItem('ritiros-theme', t);}catch(e){} }
  try{ var saved = localStorage.getItem('ritiros-theme'); if(saved) setTheme(saved); }catch(e){}
  var tbtn = document.getElementById('theme');
  if(tbtn) tbtn.addEventListener('click', function(){
    var cur = root.getAttribute('data-theme');
    if(!cur){ cur = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light'; }
    setTheme(cur === 'dark' ? 'light' : 'dark');
  });

  // Mobile menu
  var toggle = document.getElementById('toggle'), menu = document.getElementById('menu');
  if(toggle) toggle.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true':'false');
  });
  if(menu) menu.addEventListener('click', function(e){ if(e.target.tagName==='A'){ menu.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); } });

  // Nav shadow on scroll
  var nav = document.getElementById('nav');
  if(nav){
    var onScroll = function(){ nav.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  }

  // FAQ accordion
  document.querySelectorAll('.qa').forEach(function(qa){
    var btn = qa.querySelector('button'), ans = qa.querySelector('.ans');
    btn.addEventListener('click', function(){
      var open = qa.getAttribute('aria-expanded') === 'true';
      qa.setAttribute('aria-expanded', open ? 'false':'true');
      ans.style.maxHeight = open ? null : ans.scrollHeight + 'px';
    });
  });

  // Portfolio video previews: hover to play (desktop), tap to toggle (touch)
  document.querySelectorAll('.work').forEach(function(card){
    var v = card.querySelector('video');
    if(!v) return;
    var play = function(){ card.classList.add('playing'); var p = v.play(); if(p&&p.catch) p.catch(function(){}); };
    var stop = function(){ card.classList.remove('playing'); v.pause(); };
    var toggle = function(){ v.paused ? play() : stop(); };
    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', function(e){ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); toggle(); } });
    card.addEventListener('blur', stop);
  });

  // Progressive reveal
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce && 'IntersectionObserver' in window){
    document.body.classList.add('armed');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('vis'); io.unobserve(en.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  }

  // Spotlight glow yang mengikuti kursor di kartu (hero, layanan, harga, dst.)
  var glowCards = document.querySelectorAll('.svc, .fcard, .work, .plan, .tcard, .quotebox, .contact-card');
  glowCards.forEach(function(card){
    card.addEventListener('mousemove', function(e){
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  // Angka statistik menghitung naik saat masuk viewport
  document.querySelectorAll('.cnum').forEach(function(el){
    var target = parseFloat(el.getAttribute('data-target') || '0');
    if(reduce || !('IntersectionObserver' in window)){ el.textContent = target; return; }
    var done = false;
    var ioNum = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting && !done){
          done = true;
          var start = null, duration = 1100;
          function step(ts){
            if(!start) start = ts;
            var p = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased);
            if(p < 1) requestAnimationFrame(step); else el.textContent = target;
          }
          requestAnimationFrame(step);
          ioNum.unobserve(el);
        }
      });
    }, {threshold:.6});
    ioNum.observe(el);
  });
})();
