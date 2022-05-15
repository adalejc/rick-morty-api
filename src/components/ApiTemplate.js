import {LitElement, html, css} from 'lit';
import style from './styles/ApiTemplateStyle'

export class ApiTemplate extends LitElement {
  static get is() {
    return 'api-template';
  }

  static get styles() {
    return [style]
  }

  render() {
    return html`
      <div class="container" >
        <h1>The <strong class="title">Rick and Morty</strong>API</h1>
        <p class="title">Make with Lit</p>
      </div>
    `;
  }

  
}
customElements.define(ApiTemplate.is, ApiTemplate);