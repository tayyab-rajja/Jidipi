import {FC} from 'react'

import clsx from 'clsx';

import styles from './NoValidationText.module.css'

interface Props {
  label?: string | null;
}

const NoValidationText:FC<Props> = ({label}) => {
  return (
    <p
      className={clsx(styles['Text'], styles['Form-Text'])}
      data-is-invisible={!label}
    >{label}</p>
  )
}

export default NoValidationText