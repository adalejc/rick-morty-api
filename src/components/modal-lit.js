import { LitElement, html, css } from 'lit-element';

export class ModalLit extends LitElement {
  static get is() {
    return 'modal-lit';
  }

  static get styles() {
    return css`
    .modal-contenido {
      background: #fff;
      width: 300px;
      padding: 1rem;
      margin: 20% auto;
      position: relative;
    }

    .close-container {
      text-align: right;
    }

    .btn-close {
      cursor: pointer;
    }

    #modal {
      background-color: rgba(0, 0, 0, 0.8);
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      
      
      transition: all 1s;
    }

    .hide {
      opacity: 0;
      pointer-events: none;
    }

    .modal-container {
      position: absolute;
    background: black;
    width: 100%;
    height: 100%;
    z-index: 1;
    }

    .show-modal {
      opacity: 1;
      pointer-events: all;
    }
    `;
  }

  static get properties() {
    return {
      enableModal: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.enableModal = false;

  }

  render() {
    return html`
      <div id="modal" class="modal-container hide">
        <div id="miModal" class="modal-contenido">
          <div class="close-container">
            <button class="btn-close" @click="${this.closeModal}">X</button>
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }

  openModal() {
    this.shadowRoot.getElementById('modal').classList.remove('hide');
    this.shadowRoot.getElementById('modal').classList.add('show-modal');
  }

  closeModal() {
    this.shadowRoot.getElementById('modal').classList.remove('show-modal');
    this.shadowRoot.getElementById('modal').classList.add('hide');
  }

  _showEmmitModal() {
    this.dispatchEvent(new CustomEvent('open-modal', {
      detail: this.enableModal ? true : false,
      bubbles: true,
      composed: true
    }))
  }

  

}
customElements.define(ModalLit.is, ModalLit);