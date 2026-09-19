const focusContent = {
  impact: { period: 'CPF BOARD · 2018–PRESENT', title: 'People at the heart of data.', description: 'From Principal Analyst / Deputy Director to Senior Deputy Director, with a personal focus on using analytics for positive impact.', link: '#journey', label: 'Follow the journey ↗' },
  data: { period: 'NEXTONE PARTNERS · 2016–2017', title: 'From language to recommendations.', description: 'Designed and developed a content-based recommendation system using natural language processing and machine learning.', link: '#work', label: 'Explore the project ↗' },
  build: { period: 'DSTA · 2008–2015', title: 'Build the foundations. Lead the team.', description: 'Led a team of three designing and developing enterprise-scale data warehousing and analytics, from requirements to dashboards.', link: '#work', label: 'Explore the project ↗' }
};
const tabs = [...document.querySelectorAll('[data-focus]')];
function selectFocus(tab) {
  const content = focusContent[tab.dataset.focus];
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  document.querySelector('#desk-panel').setAttribute('aria-labelledby', tab.id);
  for (const key of ['period', 'title', 'description']) document.querySelector(`#desk-${key}`).textContent = content[key];
  const link = document.querySelector('#desk-link');
  link.textContent = content.label;
  link.setAttribute('href', content.link);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFocus(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectFocus(tabs[next]);
    tabs[next].focus();
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
