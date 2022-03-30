import {FC, ReactElement} from 'react';

import clsx from 'clsx';

import styles from './SectionUserData.module.css';
// import tabsFormsStyle from '../TabsFormsUserData/TabsFormsUserData.module.css';

interface Props {
  children?: ReactElement; // TODO: убери вопрос
  className?: string;
}

const SectionUserData:FC<Props> = ({children, className}) => {
  const clazz = clsx(styles['body__section'], className);

  return (
    <section className={clazz}>
      {children}
    </section>
  )
}

export default SectionUserData;