import { css } from 'lit-element';

export default css`
     :host{
       display: block;
       max-width: 1024px;
       margin: 0 auto;
     }


     .container-cards {
       text-align: center;
     }

     get-data {
       display: none;
     }

     .card {
       background-color: #fff;
       border-radius: 2px;
       display: inline-block;
       min-height: 300px;
       width: 200px;
       margin: 1rem;
       position: relative;
       text-align: center;
       box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
       transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
     }

     .card:hover {
      box-shadow: 0 14px 28px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.24);
     }

     .card img {
       width: 90%;
     }

     @media (max-width: 700px) {
      .card { 
        width: 100%;
        height: auto;
        margin: 0.5rem;
      }
     }
`;