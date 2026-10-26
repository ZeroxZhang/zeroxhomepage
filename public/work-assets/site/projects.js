/* 六个新增作品共享：语言继承、渐进增强的图片放大。
   英文保存在 inert template 中，只有当前语言进入可见文档。 */
(() => {
  const content = document.getElementById('project-content');
  const english = document.getElementById('project-english');
  const chinese = document.createElement('template');
  chinese.innerHTML = content.innerHTML;
  let locale = 'zh-CN';
  const setLocale = (next, restoreFocus = false) => {
    locale = next === 'en' ? 'en' : 'zh-CN';
    content.replaceChildren((locale === 'en' ? english : chinese).content.cloneNode(true));
    document.documentElement.lang = locale;
    const suffix = locale === 'en' ? 'en' : 'zh';
    document.title = `${document.body.dataset[locale === 'en' ? 'titleEn' : 'titleZh']} · ${locale === 'en' ? 'Work' : '作品展示'} | ZERØX`;
    document.querySelector('meta[name="description"]').content = document.body.getAttribute(`data-description-${suffix}`);
    const toggle = content.querySelector('[data-locale-toggle]');
    toggle.hidden = false;
    document.dispatchEvent(new Event('work:contentchange'));
    if (restoreFocus) toggle.focus();
    try { localStorage.setItem('site-locale', locale); } catch { /* 禁用存储时仍可切换。 */ }
  };
  try { locale = localStorage.getItem('site-locale') === 'en' ? 'en' : 'zh-CN'; } catch { /* 默认中文。 */ }
  setLocale(locale);

  const dialog = document.querySelector('.image-dialog');
  let trigger = null;
  let previousOverflow = '';
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (target?.closest('[data-locale-toggle]')) setLocale(locale === 'en' ? 'zh-CN' : 'en', true);
    const link = target?.closest('[data-lightbox]');
    if (link && typeof dialog.showModal === 'function' && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      trigger = link;
      const image = link.querySelector('img');
      dialog.querySelector('img').src = image.src;
      dialog.querySelector('img').alt = image.alt;
      dialog.querySelector('p').textContent = image.alt;
      dialog.setAttribute('aria-label', locale === 'en' ? 'Enlarged image' : '图片放大');
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    }
    if (target?.closest('[data-lightbox-close]') || target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    trigger?.focus();
  });
})();
