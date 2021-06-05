import styled from 'styled-components';

const Alert = ({ errors }) => {
  return (
    <StyledAlert>
      <ul>
        {errors.map((error, index) => (
          <li key={`error-${index}`}>{error}</li>
        ))}
      </ul>
    </StyledAlert>
  );
};

const StyledAlert = styled.div`
  width: 100%;
  border-radius: 5px;
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  margin-top: 2rem;
  padding: 0.3rem 0;
`;

export default Alert;
