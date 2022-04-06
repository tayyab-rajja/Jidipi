import {FC, useEffect, useState} from 'react'

import clsx from 'clsx';

import styles from './NoValidationText.module.css'

interface Props {
  label?: string | null;
}

const NoValidationText:FC<Props> = ({label}) => {
  const [isVisible, setIsVisible] = useState(Boolean(label));
  
  useEffect(() => {
    setTimeout(() => {
      if (isVisible) setIsVisible(false)
    }, 3000)
  })

  return (
    <p
      className={clsx(styles['Text'], styles['Form-Text'])}
      data-is-invisible={isVisible}
    >{label}</p>
  )
}

export default NoValidationText