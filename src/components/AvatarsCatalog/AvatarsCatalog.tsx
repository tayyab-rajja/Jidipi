import {FC} from 'react'
import Image from 'next/image'

import clsx from 'clsx'

import styles from './AvatarsCatalog.module.css'

const avatarsArray = [
  '/images/avatars-icons/reader-w-01.png',
  '/images/avatars-icons/reader-w-02.png',
  '/images/avatars-icons/reader-w-03.png',
  '/images/avatars-icons/reader-w-05.png',
  '/images/avatars-icons/reader-w-07.png',
  '/images/avatars-icons/reader-m-31.png',
  '/images/avatars-icons/reader-m-43.png',
  '/images/avatars-icons/reader-m-44.png',
  '/images/avatars-icons/reader-m-45.png',
  '/images/avatars-icons/reader-m-46.png',
]

interface Props {
  chooseAvatar: (url: string) => any;
}

const AvatarsCatalog:FC<Props> = ({chooseAvatar}) => {
  return (
    <div className={clsx(styles['Container'], styles['Body-Container'])}>
      {avatarsArray.map((url, index) => {
        return (
          <Image
            key={index}
            src={url}
            alt='avatar'
            width={80}
            height={80}
            className={styles['Avatar']}
            onClick={chooseAvatar(avatarsArray[index])}
          />
        )
      })}
    </div>
  )
}

export default AvatarsCatalog