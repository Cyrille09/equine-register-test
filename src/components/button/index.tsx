import { Link } from 'react-router-dom';
import classnames from 'classnames';
import styles from './button.module.scss';

interface ButtonProps {
  format?: string;
  href?: string | null;
  to?: string | null;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  target?: string | null;
  small?: boolean;
  classNameActive?: string;
  className?: string | null;
  children: React.ReactNode;
}

export const Button = ({
  format = 'primary',
  href = null,
  to = null,
  type = 'button',
  onClick,
  disabled = false,
  target = null,
  small = false,
  classNameActive = '',
  className,
  children,
}: ButtonProps) => {
  if (href && target) {
    return (
      <a
        href={href}
        target={target}
        className={classnames(
          styles.btn,
          className,
          'btn',
          styles[format],
          small && styles.small
        )}
        onClick={onClick}
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link
        to={to}
        className={classnames(
          styles.btn,
          className,
          'btn',
          styles[format],
          small && styles.small,
          classNameActive
        )}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classnames(
        styles.btn,
        'btn',
        styles[format],
        className,
        small && styles.small
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
