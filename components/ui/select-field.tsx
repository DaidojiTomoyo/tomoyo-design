import type { SelectHTMLAttributes } from 'react';
import { Icon } from './icon';
import './fields.css';
export function SelectField({
  children,
  className = '',
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <span className={`ui-select ${className}`}>
      <select {...props}>{children}</select>
      <Icon name="chevron" />
    </span>
  );
}
