import {FC, useState} from 'react'
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
  choosed?: boolean;
}

const AvatarsCatalog:FC<Props> = ({chooseAvatar}) => {
  const [avatarsArray, setAvatarsArray] = useState([
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
  ])

  const decorateChoosedAvatar = (index: number): void => {
    setAvatarsArray(prevState => prevState.map((prevAvatar, prevIndex) => {
      if (prevIndex === index) {
        return {url: prevAvatar.url, choosed: true}
      }

      return {url: prevAvatar.url, choosed: false}
    }))
  }

  return (
    <div>
      <p className={clsx(styles['Text'], styles['Body-Text'])}>Or select an avatar from our template</p>
      
      <div className={clsx(styles['Container'], styles['Body-Container'])}>
        {avatarsArray.map((avatar, index) => {
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