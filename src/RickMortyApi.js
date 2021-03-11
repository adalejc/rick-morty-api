import {LitElement, html, css } from 'lit-element';
import './components/GetData';
import './components/ApiTemplate';
import  styles from './components/styles/RickMortyStyle'

export class RickMortyApi extends LitElement {
  static get is() {
    return 'rick-morty-api';
  }

  static get properties() {
    return {
      wiky: { type: Array}
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.wiky = [];
    this.addEventListener('api-data', event => {
      let { detail: { data: { results: data } }  } = event;
      this._dataFormat(data);
    });
  }

  firstUpdated() {
    this.shadowRoot.getElementById('api').getData();
  }

  _dataFormat(data) {

    let characters = []
    characters = data.map(personaje => {
      let { image, name, species, status } = personaje
      return {
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
    <get-data id="api"></get-data>
    <div>
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
        <div class="card">
          <div class="card-content">
            <h2>${item.name}</h2>
            <img src="${item.image}" loading="lazy">
            <p>${ item.species} | ${item.status }</p>
          </div>
        </div>
      `)}
    `;
  }
}
