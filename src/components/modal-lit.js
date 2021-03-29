import { LitElement, html, css } from 'lit-element';

export class ModalLit extends LitElement {
  static get is() {
    return 'modal-lit';
  }

  static get styles() {
    return css`
    :host {
      display: block;
      --modal-contenido-background: #ffffff;
      --modal-contenido-width: 300px;
      --modal-contenido-padding: 1rem;
      --modal-contenido-close-btn: right;
      --modal-contenido-btn-close-cursor: pointer;
      --modal-container-background-color: rgba(0, 0, 0, 0.8);
      --modal-container-transition: all 1s;
      --modal-container-z-index: 1;
    }
    .modal-contenido {
      background: var(--modal-contenido-background, #fff);
      width: var(--modal-contenido-width, 300px);
      padding: var(--modal-contenido-padding, 1rem);
    }

    .close-container {
      text-align: var(--modal-contenido-close-btn, right);
    }

    .btn-close {
      cursor: var(--modal-contenido-btn-close-cursor, pointer);
    }

    .disabled {
      opacity: 0;
      pointer-events: none;
    }

    .modal-container {
      position: fixed;
      background-color: var(--modal-container-background-color, rgba(0, 0, 0, 0.8));
      width: 100%;
      height: 100%;
      z-index: var(--modal-container-z-index, 1);
      transition: var(--modal-container-transition, all 1s);
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }

    .enabled {
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
      <div id="modal" class="modal-container ${this.enableModal ? 'enabled' : 'disabled'}">
        <div id="miModal" class="modal-contenido">
          <div class="close-container">
            <button class="btn-close" @click=${this.showAndCloseModal}>X</button>
          </div>
          <slot></slot>
        </div>
      </div>
    `;
  }

  showAndCloseModal() {
    this._showEmmitModal();
  }

  _showEmmitModal() {
    this.enableModal = !this.enableModal;
    this.dispatchEvent(new CustomEvent('open-modal', {
      detail: this.enableModal,
      bubbles: true,
      composed: true
    }));
  }
}
customElements.define(ModalLit.is, ModalLit);
