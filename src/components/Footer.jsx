import { useAuth } from 'contexts/AuthContext';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 0 16px;
  p {
    font-size: 14px;
    font-weight: 300;
    margin: 2rem 0 1rem;
  }
`;

const StyledButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  vertical-align: baseline;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  outline: 0;

  font-size: 14px;
  font-weight: 300;
  margin: 2rem 0 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

const Footer = ({ todos }) => {
  const { logout } = useAuth();
  const handleClick = () => {
    logout();
    Swal.fire({
      title: '已登出',
      icon: 'info',
      showConfirmButton: false,
      timer: 1000,
      position: 'top',
    });
  };
  return (
    <StyledFooter>
      <p>剩餘項目數： {todos.length}</p>
      <StyledButton onClick={handleClick}>登出</StyledButton>
    </StyledFooter>
  );
};

export default Footer;
