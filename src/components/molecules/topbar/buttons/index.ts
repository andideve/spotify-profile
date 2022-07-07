import styled from '@emotion/styled';

export const Signup = styled.a`
  text-decoration: none !important;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 0.5rem;
  padding-right: 2rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-secondary);
  &:hover,
  &:focus {
    color: var(--color-secondary-hovered);
    transform: scale(1.04);
  }
`;

Signup.defaultProps = { children: 'Sign up' };

export const Login = styled.a`
  text-decoration: none !important;
  color: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 999px;
  color: var(--color-black);
  background-color: var(--color-white);
  &:hover,
  &:focus {
    transform: scale(1.04);
  }
`;

Login.defaultProps = { children: 'Log in' };
