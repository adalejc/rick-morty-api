import { LitElement } from 'lit-element';


export class GetData extends LitElement {
  static get is() {
    return 'get-data';
  }

  static get properties() {
    return {
      apiUrl: { type: String },
      metho: { type: String }
    }
  }

  constructor() {
    super();
    this.apiUrl = "https://rickandmortyapi.com/api/character";
    this.metho = "GET";
  }

  getData() {
    fetch(this.apiUrl, { method: this.metho })
      .then( response => {
        if (response.ok ) return response.json();
        return Promise.reject(response)
      })
        .then(data => this._sendData('api-data', data))
        .catch(error => console.warn('Shomething went wront', error))
  }

  getCharacterById(id) {
    const url = `${this.apiUrl}/${id}`;
    fetch(url, { method: this.metho })
      .then(response => {
        if (response.ok) return response.json();
        return Promise.reject(response)
      })
      .then(data => this._sendData('character',data))
      .catch(error => console.log('Shomethig went wront', error))
  }

  _sendData(customEvent, data) {
    this.dispatchEvent(new CustomEvent(customEvent, {
      detail: data ,
      bubbles: true,
      composed: true
    }));
  }

}
customElements.define(GetData.is, GetData);
