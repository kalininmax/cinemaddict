const createFilterItemTemplate = ({ name, count }, isChecked) => {
  if (name === 'all')
    return `<a href="#all" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">All movies</a>`;
  return `<a href="#${name}" class="main-navigation__item ${isChecked ? 'main-navigation__item--active' : ''}">${name}
      <span class="main-navigation__item-count">${count}</span></a>`;
};

const createSiteMenuTemplate = (filters) => {
  const filtersTemplate = filters.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filtersTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export { createSiteMenuTemplate };
