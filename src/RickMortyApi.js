import {LitElement, html, css } from 'lit-element';

import './components/GetData';
import './components/ApiTemplate';
import './components/modal-lit';
import './components/DetailView';


import  styles from './components/styles/RickMortyStyle'

export class RickMortyApi extends LitElement {
  static get is() {
    return 'rick-morty-api';
  }

  static get properties() {
    return {
      wiky: { type: Array},
      personaje: { type: Object }
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.wiky = [];
    this.addEventListener('api-data', event => {
      let { detail: { results: data } } = event;
      this._dataFormat(data);
    });
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('add open-modal in window');
    window.addEventListener('open-modal', this._openModal);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('remove open-modal in window');
    window.removeEventListener('open-modal', this._openModal);
  }

  get api() {
    return this.shadowRoot.querySelector('get-data');
  }

  firstUpdated() {
    this.api.getData();
  }

  _openModal(event) {
    const { detail } = event;
        if (detail) {
        document.querySelector('body').style.overflow = 'hidden';
    } else {
        document.querySelector('body').style.overflow = 'auto';
    }
  }

  _dataFormat(data) {
    let characters = []
    characters = data.map(personaje => {
      let { id, image, name, species, status } = personaje
      return {
        id,
        image,
        name,
        species,
        status
      };        
    });

    this.wiky = characters;
  }

  render() {
    return html`
    <div class="container">
      <get-data id="api" @character="${this.showCharacter}"></get-data>
      <modal-lit title="${this.personaje && this.personaje.name || 'Detalles'}">
        <detail-view .personaje="${this.personaje}"></detail-view>
      </modal-lit>
      <api-template></api-template>
      <div class="container-cards">
        ${this.dateTemplate}
      </div>
    </div>
    `;
  }

  get dateTemplate() {
    return html`
      ${this.wiky.map(item => html`
        <div class="card" @click="${() => this.getCharacterById(item.id)}">
          <div id="${item.id}" class="card-content">
            <h2>${item.name}</h2>
            <img src="${item.image}" loading="lazy">
            <p>${ item.species} | ${item.status }</p>
          </div>
        </div>
      `)}
    `;
  }

  getCharacterById(id) {
    if (id) {
      this.api.getCharacterById(id);
    }
  }

  showCharacter(event) {
    const { detail } = event;
    this.personaje = detail;
    this.modal();
  }

  modal() {
    //this.shadowRoot.querySelector('modal-lit').showAndCloseModal();
    this.dispatchEvent(new CustomEvent('show-modal', {
      detail: true,
      bubbles: true,
      composed: true
    }));
  }
  
}
