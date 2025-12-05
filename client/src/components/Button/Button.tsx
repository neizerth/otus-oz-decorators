import type { ButtonHTMLAttributes } from 'react';
import * as C from './Button.components';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: ButtonProps) {
  return <C.StyledButton {...props}>{children}</C.StyledButton>;
}

