import { RickMortyApi } from './RickMortyApi.js';

customElements.define(RickMortyApi.is, RickMortyApi);

/***
window.addEventListener('open-modal', event => {
    if (event.detail) {
        document.querySelector('body').style.overflow = 'hidden';
    } else {
        document.querySelector('body').style.overflow = 'auto';
    }
});
**/