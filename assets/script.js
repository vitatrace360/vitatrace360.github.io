
const header = document.querySelector('[data-header]');
const toggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));
window.addEventListener('scroll', () => header && header.classList.toggle('scrolled', window.scrollY > 10));
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const contactEmail = 'vitatrace360@gmail.com';
document.querySelectorAll('[data-contact-form]').forEach(form=>{
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name') || '';
    const company = data.get('company') || '';
    const email = data.get('email') || '';
    const message = data.get('message') || '';
    const subject = encodeURIComponent('VitaTrace360 demo request');
    const body = encodeURIComponent(`Name: ${name}
Company: ${company}
Email: ${email}
Website: https://vitatrace360.github.io/

Message:
${message}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
});

const tiltTargets = document.querySelectorAll('.card, .demo-card, .link-card, .process div, .mock-panel, .contact-form, .legal-card, .timeline-item, .stats-strip div, .integration-card, .cta-box');
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (isFinePointer) {
  tiltTargets.forEach((el) => {
    el.classList.add('tilt-ready');
    let rafId = null;
    const update = (event) => {
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -8;
      const ry = ((x / rect.width) - 0.5) * 10;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(rafId);
      el.style.transform = '';
    };
    el.addEventListener('mousemove', update);
    el.addEventListener('mouseleave', reset);
    el.addEventListener('blur', reset);
  });
}
