import styled from 'styled-components';

const NotFound = () => {
  return (
    <StyledNotFound>
      <h1>404 Page Not Found !</h1>
    </StyledNotFound>
  );
};

const StyledNotFound = styled.div`
  background-color: #fff;
  margin: 2rem 0;
  padding: 2rem;

  h1 {
    font-size: 2rem;
    text-align: center;
  }
`;

export default NotFound;
