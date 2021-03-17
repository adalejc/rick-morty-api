import {LitElement, html, css } from 'lit-element';

import './components/GetData';
import './components/ApiTemplate';
import './components/modal-lit';


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

  firstUpdated() {
    this.shadowRoot.getElementById('api').getData();
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
      <modal-lit>
        ${this.getModalTemplate}
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
      this.shadowRoot.querySelector('get-data').getCharacterById(id);
    }
  }

  get getModalTemplate() {
    return html`
      ${this.personaje ? 
      html`
        <div>
          <img src="${this.personaje.image}">
          <div><strong>Name: </strong><small>${this.personaje.name}</small></div>
          <div><strong>Status: </strong><small>${this.personaje.status}</small></div>
          <div><strong>Species: </strong><small>${this.personaje.species}</small></div>
          <div><strong>Origin: </strong><small>${this.personaje.origin.name}</small></div>
          <div><strong>Location: </strong><small>${this.personaje.location.name}</small></div>
          <div><strong>Gender: </strong><small>${this.personaje.gender}</small></div>
      </div>`:
      html``  
    }`;
    
  }

  showCharacter(event) {
    const { detail } = event;
    this.personaje = detail;
    this.modal();
  }

  modal() {
    this.shadowRoot.querySelector('modal-lit').showAndCloseModal();
  }
  
}
