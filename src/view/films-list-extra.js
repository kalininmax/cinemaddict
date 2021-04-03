const createFilmsListExtraTemplate = (heading) => {
  const headingText = heading;
  return `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${headingText}</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export { createFilmsListExtraTemplate };
