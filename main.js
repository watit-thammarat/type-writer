class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = +wait;
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fulltxt = this.words[current];
    if (this.isDeleting) {
      this.txt = fulltxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fulltxt.substring(0, this.txt.length + 1);
    }
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    let typeSpeed = 300;
    if (this.isDeleting) {
      typeSpeed = 150;
    }
    if (!this.isDeleting && this.txt === fulltxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt.length === 0) {
      this.isDeleting = false;
      this.wordIndex += 1;
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener('DOMContentLoaded', init);

function init() {
  const txt = document.querySelector('.txt-type');
  const words = JSON.parse(txt.getAttribute('data-words'));
  const wait = txt.getAttribute('data-wait');
  const t = new TypeWriter(txt, words, wait);
}
