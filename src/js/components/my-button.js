class MyButton extends HTMLElement {
    static sheet = null; 

    constructor() {
        super();
         this.shadow = this.attachShadow({ mode: 'open' });  
        
        this.path = this.getAttribute('path') || './assets';

        this.loadStyles();
    }

    async loadStyles() {
    try {
      // Si ya existe la hoja compartida, solo la aplicamos
      if (MyButton.sheet) {
        this.shadow.adoptedStyleSheets = [MyButton.sheet];
        return;
      }

      // Si no existe, la cargamos y la guardamos de forma estática
      const sheet = new CSSStyleSheet();
      const response = await fetch(`${this.path}/my-button.mini.css`);
      const css = await response.text();

      await sheet.replace(css);
      MyButton.sheet = sheet; // guardamos para futuros botones

      this.shadow.adoptedStyleSheets = [sheet];
    } catch (err) {
      console.error('Error al cargar los estilos: ', err);
    }
  }
    
    static get observedAttributes() {
        return ['label'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'label' && this.shadowRoot) {
            this.render();
        }
    }
    
  connectedCallback() {
    this.render();
  }
    
     render() {
        this.shadow.innerHTML = `
            <button class="my-button">
                ${this.getAttribute('label') || 'Click'}
            </button>
        `;
    }
}

customElements.define('my-button', MyButton);
