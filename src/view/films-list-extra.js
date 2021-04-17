const createFilmsListExtraTemplate = (heading) => {
  const headingText = heading;
  const sectionId = heading === 'Top rated'
    ? 'top-rated'
    : heading === 'Most commented'
      ? 'most-commented'
      : '';
  return `<section id="${sectionId}" class="films-list films-list--extra">
    <h2 class="films-list__title">${headingText}</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export { createFilmsListExtraTemplate };
