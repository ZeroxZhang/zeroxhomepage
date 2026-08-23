/* site/site.js · 作品页共享交互
   kinetic grid、reveal、进度条、按钮动效接线、cube-flip 复制（读按钮 data-copy 属性）。
   修改此处即全站生效；prefers-reduced-motion 自动降级。 */
  (function(){
    'use strict';
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ── Kinetic grid 背景（canvas + rAF + ResizeObserver + DPR）── */
    (function(){
      var canvas = document.getElementById('kinetic-canvas');
      if(!canvas) return;
      var ctx = canvas.getContext('2d');
      var parent = canvas.parentElement;
      var pointer = { x:-9999, y:-9999, active:false, activeUntil:0 };
      var points = [], rows = [], trail = [];
      var width = 0, height = 0, dpr = 1, raf = 0;
      var css = getComputedStyle(document.documentElement);
      var bg = (css.getPropertyValue('--ink-950')||'#08110f').trim();
      var dot = (css.getPropertyValue('--paper-100')||'#e8e9df').trim();
      var line = (css.getPropertyValue('--data-cyan')||'#35c9d0').trim();
      var trailColor = (css.getPropertyValue('--signal-green')||'#3dff92').trim();
      var spacing = Number(css.getPropertyValue('--motion-originkit-grid-spacing'))||50;
      var radius = Number(css.getPropertyValue('--motion-originkit-grid-radius'))||200;
      var strength = ((Number(css.getPropertyValue('--motion-originkit-grid-strength'))||4)/10)*4;
      var trailMs = Number(css.getPropertyValue('--motion-originkit-grid-trail-ms'))||260;

      function build(w,h){
        width = Math.max(1,Math.floor(w)); height = Math.max(1,Math.floor(h));
        dpr = Math.min(2, Math.max(1, window.devicePixelRatio||1));
        canvas.width = Math.floor(width*dpr); canvas.height = Math.floor(height*dpr);
        canvas.style.width = width+'px'; canvas.style.height = height+'px';
        ctx.setTransform(dpr,0,0,dpr,0,0);
        rows.length = 0; points.length = 0;
        var cols = Math.floor(width/spacing)+2, rowCount = Math.floor(height/spacing)+2;
        for(var x=0;x<cols;x++){
          var col = [];
          for(var y=0;y<rowCount;y++){
            var p = { hx:x*spacing, hy:y*spacing, x:x*spacing, y:y*spacing, vx:0, vy:0 };
            col.push(p); points.push(p);
          }
          rows.push(col);
        }
      }
      function resize(entries){
        var rect = (entries && entries[0]) ? entries[0].contentRect : parent.getBoundingClientRect();
        build(rect.width, rect.height);
        if(reduce.matches) drawStatic();
        else scheduleFrame();
      }
      function drawStatic(){
        ctx.fillStyle = bg; ctx.fillRect(0,0,width,height);
        ctx.globalAlpha = .14; ctx.strokeStyle = line; ctx.lineWidth = .75;
        for(var x=0;x<rows.length;x++) for(var y=0;y<rows[x].length;y++){
          var p = rows[x][y], r = rows[x+1]?rows[x+1][y]:null, b = rows[x]?rows[x][y+1]:null;
          if(r){ ctx.beginPath(); ctx.moveTo(p.hx,p.hy); ctx.lineTo(r.hx,r.hy); ctx.stroke(); }
          if(b){ ctx.beginPath(); ctx.moveTo(p.hx,p.hy); ctx.lineTo(b.hx,b.hy); ctx.stroke(); }
        }
        ctx.globalAlpha = .4; ctx.fillStyle = dot;
        for(var i=0;i<points.length;i++){ var q = points[i]; ctx.beginPath(); ctx.arc(q.hx,q.hy,1.2,0,Math.PI*2); ctx.fill(); }
        ctx.globalAlpha = 1;
      }
      function scheduleFrame(){
        if(!raf && !reduce.matches && !document.hidden) raf = requestAnimationFrame(frame);
      }
      function frame(){
        raf = 0;
        var now = performance.now();
        var pointerHot = pointer.active && now < pointer.activeUntil;
        var moving = false;
        ctx.fillStyle = bg; ctx.fillRect(0,0,width,height);
        for(var i=0;i<points.length;i++){
          var p = points[i];
          var fx = (p.hx-p.x)*.08, fy = (p.hy-p.y)*.08;
          if(pointerHot){
            var dx = pointer.x-p.x, dy = pointer.y-p.y;
            var dist = Math.hypot(dx,dy);
            if(dist<radius && dist>.001){
              var pull = (1-dist/radius)*strength;
              fx += dx/dist*pull; fy += dy/dist*pull;
            }
          }
          p.vx = (p.vx+fx)*.82; p.vy = (p.vy+fy)*.82;
          p.x += p.vx; p.y += p.vy;
          if(
            Math.abs(p.vx)>.01 || Math.abs(p.vy)>.01 ||
            Math.abs(p.x-p.hx)>.05 || Math.abs(p.y-p.hy)>.05
          ) moving = true;
          else if(!pointerHot){ p.x = p.hx; p.y = p.hy; p.vx = 0; p.vy = 0; }
        }
        for(var x=0;x<rows.length;x++) for(var y=0;y<rows[x].length;y++){
          var p = rows[x][y], r = rows[x+1]?rows[x+1][y]:null, b = rows[x]?rows[x][y+1]:null;
          var hot = pointerHot ? Math.max(0,1-Math.hypot(pointer.x-p.x,pointer.y-p.y)/radius) : 0;
          ctx.globalAlpha = .06 + hot*.7; ctx.strokeStyle = line; ctx.lineWidth = .5 + hot*1.5;
          if(r){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(r.x,r.y); ctx.stroke(); }
          if(b){ ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
        }
        for(var i=0;i<points.length;i++){
          var q = points[i];
          var hot = pointerHot ? Math.max(0,1-Math.hypot(pointer.x-q.x,pointer.y-q.y)/radius) : 0;
          ctx.globalAlpha = .22 + hot*.78; ctx.fillStyle = dot;
          ctx.beginPath(); ctx.arc(q.x,q.y,.8+hot*2.2,0,Math.PI*2); ctx.fill();
        }
        trail = trail.filter(function(point){ return now-point.t<=trailMs; });
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        for(var i=1;i<trail.length;i++){
          var a = trail[i-1], b = trail[i], age = now-b.t;
          if(age<=trailMs){
            ctx.globalAlpha = Math.max(0,1-age/trailMs)*.85; ctx.strokeStyle = trailColor; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
        if(pointerHot || moving || trail.length>1) scheduleFrame();
      }
      function setPoint(clientX,clientY){
        var r = canvas.getBoundingClientRect();
        pointer.x = clientX-r.left; pointer.y = clientY-r.top; pointer.active = true;
        pointer.activeUntil = performance.now()+140;
        trail.push({x:pointer.x,y:pointer.y,t:performance.now()});
        if(trail.length>80) trail.shift();
        scheduleFrame();
      }
      function mousemove(e){ setPoint(e.clientX,e.clientY); }
      function touchmove(e){ var t = e.touches[0]; if(t) setPoint(t.clientX,t.clientY); }
      function leave(){
        pointer.active = false; pointer.x = -9999; pointer.y = -9999;
        scheduleFrame();
      }

      var ro = new ResizeObserver(resize);
      ro.observe(parent);
      resize();
      if(reduce.matches){
        drawStatic();
      } else {
        /* 全屏 fixed 画布：指针监听挂在 window 上，保证任何内容之上都能追踪 */
        window.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseleave', leave);
        window.addEventListener('touchmove', touchmove, { passive:true });
        window.addEventListener('touchend', leave);
        document.addEventListener('visibilitychange', function(){
          if(document.hidden && raf){ cancelAnimationFrame(raf); raf = 0; }
          else scheduleFrame();
        });
        scheduleFrame();
      }
    })();

    /* ── 阅读进度条 + 导航高亮 ── */
    var progress = document.querySelector('.progress');
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
    var sections = navLinks.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
    function updateProgress(){
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (max>0 ? Math.min(100, window.scrollY/max*100) : 0) + '%';
    }
    window.addEventListener('scroll', updateProgress, { passive:true });
    updateProgress();
    var navObs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          navLinks.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#'+entry.target.id); });
        }
      });
    }, { rootMargin:'-35% 0px -55%' });
    sections.forEach(function(s){ navObs.observe(s); });

    /* ── 页面进场 reveal ── */
    var revealObs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){ entry.target.classList.add('visible'); revealObs.unobserve(entry.target); }
      });
    }, { threshold:.08 });
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function(el){ revealObs.observe(el); });

    /* ── radial-reveal：从指针原点展开 ── */
    Array.prototype.forEach.call(document.querySelectorAll('.btn-radial-reveal'), function(btn){
      var fill = btn.querySelector('.reveal-fill');
      function setOrigin(e, open){
        if(reduce.matches) return;
        var r = btn.getBoundingClientRect();
        var x = e.clientX-r.left, y = e.clientY-r.top;
        var max = Math.max(Math.hypot(x,y), Math.hypot(r.width-x,y), Math.hypot(x,r.height-y), Math.hypot(r.width-x,r.height-y));
        var xp = (x/r.width*100).toFixed(2)+'%', yp = (y/r.height*100).toFixed(2)+'%';
        var rad = (max/Math.max(r.width,r.height)*145).toFixed(2)+'%';
        fill.style.clipPath = 'circle('+(open?rad:'0%')+' at '+xp+' '+yp+')';
        fill.style.webkitClipPath = fill.style.clipPath;
        btn.classList.toggle('is-open', open);
      }
      var enter = function(e){ setOrigin(e,true); };
      var leave = function(e){ setOrigin(e,false); };
      btn.addEventListener('pointerenter', enter);
      btn.addEventListener('pointerleave', leave);
    });

    /* ── light-glass：光标追踪写入 --mx/--my/--ma ── */
    Array.prototype.forEach.call(document.querySelectorAll('.btn-light-glass'), function(btn){
      var move = function(e){
        if(reduce.matches) return;
        var r = btn.getBoundingClientRect();
        var x = (e.clientX-r.left)/r.width, y = (e.clientY-r.top)/r.height;
        btn.style.setProperty('--mx', (x*100).toFixed(2)+'%');
        btn.style.setProperty('--my', (y*100).toFixed(2)+'%');
        btn.style.setProperty('--ma', (Math.atan2(y-.5,x-.5)*180/Math.PI+90).toFixed(1)+'deg');
        btn.classList.add('is-lit');
      };
      var leave = function(){ btn.classList.remove('is-lit'); };
      btn.addEventListener('pointermove', move);
      btn.addEventListener('pointerleave', leave);
    });

    /* ── cube-flip：真实双态（复制仓库地址 / 已复制）── */
    var cubeBtn = document.querySelector('.btn-cube-flip');
    if(cubeBtn){
      var repoUrl = cubeBtn.getAttribute('data-copy') || '';
      var cubeTimer = 0;
      function markCopied(){
        cubeBtn.classList.add('is-flipped');
        cubeBtn.setAttribute('aria-pressed','true');
        clearTimeout(cubeTimer);
        cubeTimer = setTimeout(function(){
          cubeBtn.classList.remove('is-flipped');
          cubeBtn.setAttribute('aria-pressed','false');
        }, 2200);
      }
      function fallbackCopy(text){
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly','');
        ta.style.position = 'fixed';
        ta.style.top = '-999px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); markCopied(); } catch {}
        document.body.removeChild(ta);
      }
      cubeBtn.addEventListener('click', function(){
        if(!repoUrl) return;
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(repoUrl).then(markCopied, function(){ fallbackCopy(repoUrl); });
        } else {
          fallbackCopy(repoUrl);
        }
      });
    }
  })();
