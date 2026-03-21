// scripts for navbar menu button
// المان‌ها
const menuToggle = document.getElementById('menuToggleBtn');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalMenu = document.getElementById('modalMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');

// باز کردن مودال
function openMenu() {
    modalBackdrop.classList.remove('opacity-0', 'pointer-events-none');
    modalBackdrop.classList.add('opacity-100', 'pointer-events-auto');
    modalMenu.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
    modalMenu.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
}

// بستن مودال
function closeMenu() {
    modalBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
    modalBackdrop.classList.add('opacity-0', 'pointer-events-none');
    modalMenu.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
    modalMenu.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
    document.body.style.overflow = '';
}

// رویدادها
menuToggle.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
modalBackdrop.addEventListener('click', closeMenu);

// بستن منو با کلیک روی لینک‌ها
document.querySelectorAll('#modalMenu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});


//scripts for why us section animation
 // Fade / Stagger Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-up, .fade-in').forEach(el => {
    observer.observe(el);
  });

  // Count Up Animation
  const counters = document.querySelectorAll('[data-target]');

  const runCounter = (el) => {
    const target = +el.getAttribute('data-target');
    let count = 0;
    const speed = target / 40;

    const update = () => {
      count += speed;
      if (count < target) {
        el.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        el.innerText = target + '+';
      }
    };

    update();
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });



    // Scripts for services section from home page
    document.querySelectorAll('li').forEach(li => {
      const link = li.querySelector('a.group');
      const container = link.querySelector('div');
      const shine = link.querySelector('.glass-shine');
      const arrowBtn = link.querySelector('.arrow-toggle');
      const arrowIcon = link.querySelector('.arrow-icon');

      // hover: اضافه/حذف کلاس گرادیانت و شاین
      link.addEventListener('mouseenter', () => {
        container.classList.add('card-gradient');
        container.classList.add('text-white');
        shine.style.opacity = '1';
        // آیکن را روشن‌تر کنیم برای خوانایی (در صورت تمایل)
        arrowBtn.classList.remove('text-slate-700');
        arrowBtn.classList.add('text-white');
      });
      link.addEventListener('mouseleave', () => {
        // اگر حالت expanded نیست، برگردان
        if (arrowBtn.getAttribute('data-expanded') !== 'true') {
          container.classList.remove('card-gradient');
          container.classList.remove('text-white');
          shine.style.opacity = '0';
          arrowBtn.classList.remove('text-white');
          arrowBtn.classList.add('text-slate-700');
        } else {
          // اگر expanded هست، نگه دار (تا وقتی کاربر آیکن را زده)
          container.classList.add('card-gradient');
          container.classList.add('text-white');
          shine.style.opacity = '1';
          arrowBtn.classList.remove('text-slate-700');
          arrowBtn.classList.add('text-white');
        }
      });

      // کلیک روی آیکن: toggle حالت باز/بسته بدون ناوبری
      arrowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const expanded = arrowBtn.getAttribute('data-expanded') === 'true';
        if (!expanded) {
          arrowBtn.setAttribute('data-expanded', 'true');
          arrowBtn.setAttribute('aria-expanded', 'true');
          // چرخش آیکن به بالا
          arrowIcon.style.transform = 'rotate(-85deg)';
          // فعال کردن گرادیانت و شاین
          container.classList.add('card-gradient');
          container.classList.add('text-white');
          shine.style.opacity = '1';
          arrowBtn.classList.remove('text-slate-700');
          arrowBtn.classList.add('text-white');
        } else {
          arrowBtn.setAttribute('data-expanded', 'false');
          arrowBtn.setAttribute('aria-expanded', 'false');
          arrowIcon.style.transform = 'rotate(0deg)';
          // غیرفعال کردن گرادیانت و شاین (مگر ماوس روی کارت باشد)
          if (!link.matches(':hover')) {
            container.classList.remove('card-gradient');
            container.classList.remove('text-white');
            shine.style.opacity = '0';
            arrowBtn.classList.remove('text-white');
            arrowBtn.classList.add('text-slate-700');
          }
        }
      });

      // دسترسی کیبورد: فشردن Enter روی آیکن نیز toggle کند
      arrowBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          arrowBtn.click();
        }
      });
    });


//scripts for work section from home page





(function(){
  const container = document.querySelector('.cards-row');
  if (!container) return;

  const lis = Array.from(container.querySelectorAll('li'));

  let lastHoverLi = null;
  // mousemove: پیدا کردن عنصر دقیق زیر نشانگر با elementFromPoint
  container.addEventListener('mousemove', (e) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;

    // بالا برو تا به li برسیم (یا null)
    const li = el.closest && el.closest('.cards-row li');
    if (li !== lastHoverLi) {
      // پاک کردن قبلی
      if (lastHoverLi) {
        lastHoverLi.classList.remove('is-active');
        lastHoverLi.classList.remove('is-hovered');
      }
      if (li) {
        li.classList.add('is-active');      // برای CSS و z-index
        li.classList.add('is-hovered');     // اختیاری برای استایل موقت
      }
      lastHoverLi = li;
    }
  });

  // وقتی موس از کانتینر خارج شد همه را پاک کن
  container.addEventListener('mouseleave', () => {
    if (lastHoverLi) lastHoverLi.classList.remove('is-active', 'is-hovered');
    lastHoverLi = null;
  });

  // Touch: همان رفتار قبلی اما کلاس را روی li بگذار
  let lastActive = null;
  lis.forEach(li => {
    li.addEventListener('touchstart', (ev) => {
      const already = li.classList.contains('is-active');
      if (!already) {
        ev.preventDefault(); // جلوگیری از ناوبری فوری
        if (lastActive && lastActive !== li) lastActive.classList.remove('is-active');
        li.classList.add('is-active');
        lastActive = li;
      } else {
        // اگر قبلاً فعال بود، اجازه بده لینک اجرا شود
      }
    }, {passive:false});
  });

  // لمس بیرون برای پاک کردن
  document.addEventListener('touchstart', (e) => {
    if (!e.target.closest('.cards-row li')) {
      lis.forEach(li => li.classList.remove('is-active'));
      lastActive = null;
    }
  }, {passive:true});

  // Keyboard: وقتی کارت فوکوس می‌گیرد والد را is-active کن
  lis.forEach(li => {
    const card = li.querySelector('.work-card');
    if (!card) return;
    card.setAttribute('tabindex', '0');
    card.addEventListener('focus', () => {
      if (lastActive && lastActive !== li) lastActive.classList.remove('is-active');
      li.classList.add('is-active');
      lastActive = li;
    });
    card.addEventListener('blur', () => {
      li.classList.remove('is-active');
      if (lastActive === li) lastActive = null;
    });
  });

})();
