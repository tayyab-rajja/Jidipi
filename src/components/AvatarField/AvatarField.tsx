import {FC, useState} from 'react'
import clsx from 'clsx'

import styles from './AvatarField.module.css'

import AvatarCurrent from 'src/components/AvatarCurrent'
import AvatarsCatalog from 'src/components/AvatarsCatalog'
import ButtonUserData from 'src/components/ButtonUserData'

let avatars = [
  {url: '/images/avatars-icons/reader-w-01.png', choosed: false},
  {url: '/images/avatars-icons/reader-w-02.png', choosed: false},
  {url: '/images/avatars-icons/reader-w-03.png', choosed: false},
  {url: '/images/avatars-icons/reader-w-05.png', choosed: false},
  {url: '/images/avatars-icons/reader-w-07.png', choosed: false},
  {url: '/images/avatars-icons/reader-m-31.png', choosed: false},
  {url: '/images/avatars-icons/reader-m-43.png', choosed: false},
  {url: '/images/avatars-icons/reader-m-44.png', choosed: false},
  {url: '/images/avatars-icons/reader-m-45.png', choosed: false},
  {url: '/images/avatars-icons/reader-m-46.png', choosed: false},
]

const AvatarField:FC = () => {
  const [currentAvatar, setCurrentAvatar] = useState<string | undefined>(undefined);
  let prevAvatar;

  const chooseAvatar = (url:string | undefined): void => {
    prevAvatar = currentAvatar
    setCurrentAvatar(url)
  }

  const resetAvatar = () => {
    chooseAvatar(undefined);
    avatars = [...avatars]; // это чтобы внутри AvatarsCatalog сработал useEffect и вернул State к исходному состоянию
  }
  
  return (
    <div className={clsx(styles['Container'], styles['Body-Container'])}>
      <AvatarCurrent currentAvatar={currentAvatar} resetAvatar={resetAvatar} />
      
      <AvatarsCatalog chooseAvatar={chooseAvatar} avatars={avatars}/>
      
      <ButtonUserData
        label='Save Change'
        action={() => alert('write your func')}
        className={styles['Container-Button']}
      />
    </div>
  )
}

export default AvatarField