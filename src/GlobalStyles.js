import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    font-family: 'Montserrat', sans-serif;
  }

  .container {
    max-width: 1100px;
    margin: auto;
    padding: 0 2rem;
  }

  @media (max-width: 500px) {
    .container {
      padding: 0 1rem;
    }
  }

  p {
    line-height: 1.8;
  }

  a {
    color: #772ce8;
  }

  label {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 2rem;
  }

  input,
  textarea {
    padding: 0.7rem;
    border: 1px solid #333;
    border-radius: 4px;
    margin-bottom: 2rem;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    transition: all 0.5s;
  }

  textarea {
    height: 100px;
  }

  input:focus,
  textarea:focus {
    border: 1px solid #772ce8;
    outline: none;
  }

  .btn {
    padding: 0.7rem;
    border: none;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-block {
    display: inline-block;
    width: 100%;
  }

  .btn-primary:hover {
    background-color: #772ce8;
  }

  .btn-primary {
    color: #fff;
    background-color: #8947eb;
  }

  .btn-danger:hover {
    background-color: #f41c24;
  }

  .btn-danger {
    color: #fff;
    background-color: #f63c42;
  }
`;

export default GlobalStyles;
