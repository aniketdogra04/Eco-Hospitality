// Shared dropdowns keep header links, booking values and date enquiries in sync.
const codeRoot = new URL('./', import.meta.url);
const asset = name => new URL('../assets/' + name, codeRoot).href;
const route = path => new URL(path, codeRoot).href;
const destinations = ['Shimla', 'Dalhousie', 'Spiti'];
const destinationURL = name => name === 'Shimla' ? route('destinations/shimla.html') : route('index.html?destination=' + name + '#booking');
let active = null;
function closeActive(restore = false) { if (active) { const current = active; active = null; current.close(restore); } }
function position(panel, trigger) {
  const r = trigger.getBoundingClientRect();
  panel.style.maxHeight = (innerHeight - 16) + 'px';
  panel.style.left = Math.max(8, Math.min(r.left, innerWidth - panel.offsetWidth - 8)) + 'px';
  const below = r.bottom + 10;
  const above = r.top - panel.offsetHeight - 10;
  const top = below + panel.offsetHeight <= innerHeight - 8 ? below : above >= 8 ? above : Math.max(8, innerHeight - panel.offsetHeight - 8);
  panel.style.top = top + 'px';
}
function popup(trigger, panel) {
  panel.popover = 'manual';
  document.body.append(panel);
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', panel.id);
  const controller = {
    open() { if (active === controller) return; closeActive(); panel.showPopover(); trigger.setAttribute('aria-expanded', 'true'); position(panel, trigger); active = controller; },
    close(restore) { panel.hidePopover(); trigger.setAttribute('aria-expanded', 'false'); if (restore) trigger.focus(); },
    panel, trigger,
  };
  const hoverMenu = trigger.matches('.nav-dropdown-trigger');
  let hoverClose;
  const cancelHoverClose = () => clearTimeout(hoverClose);
  if (hoverMenu) {
    for (const element of [trigger, panel]) {
      element.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'mouse') return;
        cancelHoverClose();
        controller.open();
      });
      element.addEventListener('pointerleave', event => {
        if (event.pointerType !== 'mouse') return;
        hoverClose = setTimeout(() => {
          if (active === controller && !panel.matches(':focus-within') && !trigger.matches(':focus-visible')) closeActive();
        }, 180);
      });
    }
  }
  trigger.addEventListener('click', event => {
    // Mouse users open header menus by hover; keyboard and touch still toggle.
    if (hoverMenu && event.pointerType === 'mouse') return;
    active === controller ? closeActive() : controller.open();
  });
  trigger.addEventListener('keydown', event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); controller.open(); const items = panel.querySelectorAll('a,button'); items[event.key === 'ArrowUp' ? items.length - 1 : 0]?.focus(); }
  });
  panel.addEventListener('keydown', event => {
    const items = [...panel.querySelectorAll('a,button:not(:disabled)')];
    const index = items.indexOf(document.activeElement);
    const next = event.key === 'ArrowDown' ? (index + 1) % items.length : event.key === 'ArrowUp' ? (index - 1 + items.length) % items.length : event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : null;
    if (next !== null) { event.preventDefault(); items[next]?.focus(); }
  });
  return controller;
}
let menuId = 0;
function list(trigger, entries, onSelect) {
  const panel = document.createElement('div');
  panel.className = 'dropdown-panel'; panel.id = 'dropdown-' + ++menuId;
  panel.setAttribute('aria-label', trigger.textContent.trim());
  for (const entry of entries) {
    const item = document.createElement(onSelect ? 'button' : 'a');
    if (onSelect) item.type = 'button'; else item.href = entry.href;
    item.textContent = entry.name;
    item.addEventListener('click', () => { onSelect?.(entry.name); closeActive(true); });
    panel.append(item);
  }
  return popup(trigger, panel);
}
for (const link of document.querySelectorAll('.main-nav > a')) {
  const label = link.textContent.trim();
  if (!['Destinations', 'Hotels'].includes(label)) continue;
  const trigger = document.createElement('button'); trigger.type = 'button'; trigger.className = 'nav-dropdown-trigger'; trigger.textContent = label;
  link.replaceWith(trigger);
  const hotels = [
    ['Golden Fern Resort, Shimla', 'hotels/golden-fern.html'],
    ['Shimla Havens Resort', 'index.html?destination=Shimla#hotels'],
    ['Hotel Woodrina, Shimla', 'index.html?destination=Shimla#hotels'],
    ['SS Resort, Dalhousie', 'index.html?destination=Dalhousie#hotels'],
    ['Hotel Snow Castle, Dalhousie', 'index.html?destination=Dalhousie#hotels'],
    ['Mahamaya Regency, Kaza', 'index.html?destination=Spiti#hotels'],
    ['Maitreya Regency, Tabo', 'index.html?destination=Spiti#hotels'],
    ['Maitreya Mud House, Tabo', 'index.html?destination=Spiti#hotels'],
  ];
  list(trigger, label === 'Destinations' ? destinations.map(name => ({name, href: destinationURL(name)})) : hotels.map(([name,path]) => ({name,href:route(path)})));
}
for (const select of document.querySelectorAll('.destination-select select')) {
  const trigger = document.createElement('button'); trigger.type = 'button'; trigger.className = 'destination-trigger';
  const sync = () => { trigger.textContent = select.selectedOptions[0]?.textContent || 'Choose a destination'; };
  sync(); select.after(trigger); select.classList.add('dropdown-native'); select.tabIndex = -1; select.setAttribute('aria-hidden', 'true');
  select.addEventListener('change', sync);
  select.addEventListener('invalid', event => { event.preventDefault(); trigger.focus(); controller.open(); });
  const controller = list(trigger, destinations.map(name => ({name})), name => { select.value = name; select.dispatchEvent(new Event('change', {bubbles:true})); });
  // Initial URL values are set by the page's booking module after this module runs.
  queueMicrotask(sync); window.addEventListener('pageshow', sync);
  document.addEventListener('click', () => queueMicrotask(sync));
}
document.addEventListener('pointerdown', event => { if (active && !active.panel.contains(event.target) && !active.trigger.contains(event.target)) closeActive(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && active) { event.preventDefault(); closeActive(true); } });
document.addEventListener('focusin', event => { if (active && !active.panel.contains(event.target) && !active.trigger.contains(event.target)) closeActive(); });
window.addEventListener('resize', () => closeActive());
window.addEventListener('scroll', event => {
  if (!active || active.panel.contains(event.target)) return;
  const rect = active.trigger.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > innerHeight) closeActive();
  else position(active.panel, active.trigger);
}, true);

const iso = date => [date.getFullYear(), String(date.getMonth()+1).padStart(2,'0'), String(date.getDate()).padStart(2,'0')].join('-');
const calendars = new WeakMap();
export function openDatePicker(dialog, trigger) {
  closeActive();
  let calendar = calendars.get(dialog);
  if (!calendar) {
    const form = dialog.querySelector('form');
    const checkin = form.elements.checkin, checkout = form.elements.checkout;
    const panel = document.createElement('div'); panel.className = 'calendar-panel'; panel.id = 'booking-calendar'; panel.popover = 'manual';
    panel.setAttribute('role','dialog'); panel.setAttribute('aria-label','Choose check-in and check-out dates');
    panel.innerHTML = `<div class="calendar-heading"><button type="button" aria-label="Previous month"><img src="${asset('about/arrowLeft.svg')}" width="16" height="16" alt=""></button><strong aria-live="polite"></strong><button type="button" aria-label="Next month"><img src="${asset('about/arrowRight.svg')}" width="16" height="16" alt=""></button></div><div class="calendar-weekdays">${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(day=>`<span>${day}</span>`).join('')}</div><div class="calendar-days"></div><p class="sr-only" aria-live="polite" data-calendar-status></p>`;
    document.body.append(panel);
    let month, start, end, pickingEnd, previewEnd;
    const grid = panel.querySelector('.calendar-days');
    function paintRange() {
      const finish = pickingEnd ? previewEnd : end;
      for (const day of grid.children) {
        const value = day.dataset.date;
        const hasRange = !!(start && finish && finish > start);
        day.classList.toggle('selected', value === start || value === finish);
        day.classList.toggle('in-range', hasRange && value > start && value < finish);
        day.classList.toggle('range-start', hasRange && value === start);
        day.classList.toggle('range-end', hasRange && value === finish);
        day.setAttribute('aria-pressed', String(value === start || value === end));
      }
    }
    grid.addEventListener('pointerleave', () => { previewEnd = ''; paintRange(); });
    function render() {
      previewEnd = '';
      panel.querySelector('strong').textContent = month.toLocaleDateString('en-US',{month:'long',year:'numeric'});
      panel.querySelector('[data-calendar-status]').textContent = pickingEnd ? 'Choose check-out date after ' + start : 'Choose check-in date';
      panel.querySelector('[aria-label="Previous month"]').disabled = iso(month).slice(0,7) <= iso(new Date()).slice(0,7);
      grid.replaceChildren();
      const first = new Date(month.getFullYear(),month.getMonth(),1);
      const count = new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
      const cells = Math.ceil((first.getDay()+count)/7)*7;
      for(let i=0;i<cells;i++) {
        const date = new Date(month.getFullYear(),month.getMonth(),i-first.getDay()+1), value = iso(date);
        const day = document.createElement('button'); day.type='button'; day.textContent=date.getDate(); day.dataset.date=value;
        day.setAttribute('aria-label',date.toLocaleDateString('en-US',{weekday:'long',day:'numeric',month:'long',year:'numeric'}));
        day.disabled = value < iso(new Date()) || date.getMonth()!==month.getMonth();
        const preview = () => {
          if (!pickingEnd || day.disabled) return;
          previewEnd = value > start ? value : '';
          paintRange();
        };
        day.addEventListener('pointerenter', preview);
        day.addEventListener('focus', preview);
        if(value===iso(new Date())) day.setAttribute('aria-current','date');
        day.addEventListener('click',()=>{
          if(!pickingEnd || value<=start) { start=value; end=''; pickingEnd=true; }
          else { end=value; pickingEnd=false; previewEnd=''; paintRange(); checkin.value=start; checkin.dispatchEvent(new Event('change',{bubbles:true})); checkout.value=end; form.requestSubmit(); closeActive(true); return; }
          render(); grid.querySelector(`[data-date="${value}"]`)?.focus();
        });
        grid.append(day);
      }
      paintRange();
      if(panel.matches(':popover-open')) position(panel,trigger);
    }
    panel.querySelectorAll('.calendar-heading button').forEach((button,index)=>button.addEventListener('click',()=>{month=new Date(month.getFullYear(),month.getMonth()+(index?1:-1),1);render();}));
    panel.addEventListener('keydown',event=>{
      const focused=event.target.closest('[data-date]');
      if(!focused) return;
      const shift={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7}[event.key];
      if(!shift) return;
      event.preventDefault(); const date=new Date(focused.dataset.date+'T12:00:00');date.setDate(date.getDate()+shift);
      if(iso(date)<iso(new Date()))return;
      if(date.getMonth()!==month.getMonth() || date.getFullYear()!==month.getFullYear()){month=new Date(date.getFullYear(),date.getMonth(),1);render();}
      grid.querySelector(`[data-date="${iso(date)}"]`)?.focus();
    });
    calendar={panel,trigger,open(){start=checkin.value;end=checkout.value;pickingEnd=false;month=new Date((start||iso(new Date()))+'T12:00:00');month.setDate(1);render();panel.showPopover();position(panel,trigger);trigger.setAttribute('aria-expanded','true');active=calendar;grid.querySelector('.selected:not(:disabled),button:not(:disabled)')?.focus({preventScroll:true});},close(restore){panel.hidePopover();dialog.close();trigger.setAttribute('aria-expanded','false');if(restore)trigger.focus();}};
    trigger.setAttribute('aria-controls',panel.id); trigger.setAttribute('aria-expanded','false');
    calendars.set(dialog,calendar);
  }
  // Submit through the existing date form without opening its former modal.
  calendar.open();
}
