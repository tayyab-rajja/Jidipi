import {FC, useState, useEffect} from 'react'
import Image from 'next/image'

import clsx from 'clsx'

import styles from './AvatarsCatalog.module.css'

// const avatarsArray = [
//   '/images/avatars-icons/reader-w-01.png',
//   '/images/avatars-icons/reader-w-02.png',
//   '/images/avatars-icons/reader-w-03.png',
//   '/images/avatars-icons/reader-w-05.png',
//   '/images/avatars-icons/reader-w-07.png',
//   '/images/avatars-icons/reader-m-31.png',
//   '/images/avatars-icons/reader-m-43.png',
//   '/images/avatars-icons/reader-m-44.png',
//   '/images/avatars-icons/reader-m-45.png',
//   '/images/avatars-icons/reader-m-46.png',
// ]

interface Props {
  chooseAvatar: (url: string) => void;
  avatars: Array<{url: string, choosed: boolean}>;
}

const AvatarsCatalog:FC<Props> = ({chooseAvatar, avatars: propAvatars}) => {
  const [avatars, setAvatars] = useState(propAvatars)

  const decorateChoosedAvatar = (index: number): void => {
    setAvatars(prevState => prevState.map((prevAvatar, prevIndex) => {
      if (prevIndex === index) {
        return {url: prevAvatar.url, choosed: true}
      }

      return {url: prevAvatar.url, choosed: false}
    }))
  }

  useEffect(() => {
    setAvatars(propAvatars);
  }, [propAvatars])

  return (
    <div>
      <p className={clsx(styles['Text'], styles['Body-Text'])}>Or select an avatar from our template</p>
      
      <div className={clsx(styles['Container'], styles['Body-Container'])}>
        {avatars.map((avatar, index) => {
          return (
            <div
              key={index}
              className={clsx(styles['AvatarWrapper'])}
              data-choosed={avatar.choosed}
              onClick={() => {
                chooseAvatar(avatar.url)
                decorateChoosedAvatar(index)
              }}
            >
              <Image
                src={avatar.url}
                alt='avatar'
                width={80}
                height={80}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AvatarsCatalog