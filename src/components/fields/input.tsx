import React from 'react';
import { useField } from 'formik';
import classnames from 'classnames';
import styles from './fields.module.scss';

interface InputProps {
  type: 'number' | 'text' | 'search' | 'email' | 'password';
  name: string;
  id?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string | null;
  min?: number;
  required?: string;
  max?: number;
}

export function Input({
  type,
  name,
  id,
  placeholder,
  label,
  disabled,
  className = null,
  min,
  required,
  max,
}: InputProps) {
  // return field name for an <input />
  const [field, meta] = useField(name);
  const isInvalid = meta.error && meta.touched;

  return (
    <div className={classnames(styles.field, className)}>
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label} {}
          {required}
        </label>
      )}
      <input
        {...field}
        type={type}
        id={id}
        name={name}
        className={classnames(
          styles.input,
          className,
          isInvalid && styles.invalid
        )}
        placeholder={placeholder}
        disabled={disabled}
        min={min}
        max={max}
      />
      {isInvalid && <p className={styles.error}>{meta.error}</p>}
    </div>
  );
}
