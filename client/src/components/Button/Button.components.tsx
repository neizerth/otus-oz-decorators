import styled from '@emotion/styled';

export const StyledButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background: ${(p) => (p.disabled ? '#ccc' : '#1976d2')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background: #1565c0;
  }
`;



