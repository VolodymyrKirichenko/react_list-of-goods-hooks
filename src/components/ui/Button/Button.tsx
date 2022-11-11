import { FC } from 'react';
import cn from 'classnames';

interface Props {
  className: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: FC<Props> = (props) => {
  const { className, onClick, children } = props;

  const rootClassName = cn(
    'button',
    className,
  );

  return (
    <button
      type="button"
      className={rootClassName}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
