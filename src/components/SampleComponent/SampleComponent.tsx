import clsx from "clsx";
import styles from "./SampleComponent.module.css";

interface Props {
  children: React.ReactElement;
  className?: string;
}

export const SampleComponent = ({ children, className }: Props) => {
  return (
    <div className={clsx(styles.SapmleComponent, className && className)}>
      {children}
    </div>
  );
};
