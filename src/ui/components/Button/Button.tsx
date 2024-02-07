/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { css } from '@emotion/react';
import * as React from 'react';
import { button as styles } from '../../emotion';

/**
 * Props for the Button
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'filled';
  icon?: React.ReactNode;
  label: string;
  iconOnly?: boolean;
}

/**
 * Basic button component.
 *
 * @todo Fix messy styling in the span.
 *
 * @param props
 * @returns
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'ghost',
      label,
      icon,
      children = label,
      iconOnly = false,
      ...forwardedProps
    } = props;

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        {...forwardedProps}
        css={css`
          ${styles.base};
          ${styles.variant[variant]};
        `}
      >
        {icon}
        {!iconOnly && (
          <span
            css={css`
              margin-left: 0.5em;
              line-height: 0.85em;
              margin-top: 0.15em;
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            {children}
          </span>
        )}
      </button>
    );
  }
);

export default Button;
