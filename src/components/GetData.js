import { LitElement } from 'lit-element';


export class GetData extends LitElement {
  static get is() {
    return 'get-data';
  }

  static get properties() {
    return {
      url: { type: String },
      method: { type: String }
    }
  }

  constructor() {
    super();
    this.url = "https://rickandmortyapi.com/api/character";
    this.method = "GET";
  }

  _sendData(data) {
    //console.log(data);
    this.dispatchEvent(new CustomEvent('api-data', {
      detail: { data },
      bubbles: true,
      composed: true
    }));
  }

  getData() {
    console.log(this.url);
    fetch(this.url, { method: this.metho})
      .then( response => {
        if (response.ok ) return response.json();
        return Promise.reject(response)
      })
        .then(data => this._sendData(data))
        .catch(error => console.warn('Shomething went wront', error))
  }

}
customElements.define(GetData.is, GetData);