import { css } from 'lit-element';

export default css`
.container {
  text-align: center;

}
h1 {
  font-size: 100px;

}

.title {
  color: #24AA91;
}

p {
  font-size: 30px;
}

@media (max-width: 700px) {
  h1 {
    font-size: 60px;
  }
}
`;