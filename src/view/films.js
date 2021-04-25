import AbstractView from './abstract';

class Films extends AbstractView {
  getTemplate() {
    return '<section class="films"></section>';
  }
}

export { Films as default };
