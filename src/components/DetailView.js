import { LitElement, html, css } from 'lit-element';

export class DetailView extends LitElement {
  static get is(){
    return 'detail-view';
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {
      personaje: { type: Object }
    }
  }

  Constructor() {
    super.Constructor();
  }

  render() {
    return html`
      ${this.personaje 
        ? html`
          <img src="${this.personaje.image}">
          <div><strong>Name: </strong><small>${this.personaje.name}</small></div>
          <div><strong>Status: </strong><small>${this.personaje.status}</small></div>
          <div><strong>Species: </strong><small>${this.personaje.species}</small></div>
          <div><strong>Origin: </strong><small>${this.personaje.origin.name}</small></div>
          <div><strong>Location: </strong><small>${this.personaje.location.name}</small></div>
          <div><strong>Gender: </strong><small>${this.personaje.gender}</small></div>  ` 
        : html``}
    `;
  }
}
customElements.define(DetailView.is, DetailView);
