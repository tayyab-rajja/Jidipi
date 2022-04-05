import {FC, useState} from 'react'
import clsx from 'clsx'

import styles from './AvatarField.module.css'

import AvatarCurrent from 'src/components/AvatarCurrent'
import AvatarsCatalog from 'src/components/AvatarsCatalog'
import ButtonUserData from 'src/components/ButtonUserData'


const AvatarField:FC = () => {
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(undefined);
  let prevAvatar;

  const chooseAvatar = (url:string | undefined): any => {
    return () => {
      prevAvatar = currentAvatar
      setCurrentAvatar(url)
    }
  }
  
  return (
    <div className={clsx(styles['Container'], styles['Body-Container'])}>
      <AvatarCurrent currentAvatar={currentAvatar} chooseAvatar={chooseAvatar} />
      
      <AvatarsCatalog chooseAvatar={chooseAvatar} />
      
      <ButtonUserData
        label='Save Change'
        action={() => alert('write your func')}
        className={styles['Container-Button']}
      />
    </div>
  )
}

export default AvatarField