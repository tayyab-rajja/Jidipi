import {FC} from 'react'
import Image from 'next/image'

import clsx from 'clsx'

import styles from './AvatarCurrent.module.css'

import cloudIcon from 'public/icon-cloud.svg'

interface Props {
  currentAvatar?: string | HTMLImageElement | undefined;
  chooseAvatar: (url: string | undefined) => void;
}

const AvatarCurrent:FC<Props> = ({currentAvatar, chooseAvatar}) => {
  const content = currentAvatar ?
    <>
      <Image src={currentAvatar} alt='avatar' objectFit='cover' width={200} height={200} />
      <span className={styles['Container-DeleteAvatar']} onClick={() => chooseAvatar(undefined)}>x</span>
    </>
    :
    <>
      <Image src={cloudIcon} alt='cloud icon' width={14.03} height={11.36}/>
      
      <p
        className={clsx(styles['Text_Gray'], styles['Container-TextToDo'])}
      >
        Drag and Drop or
        <span
          className={styles['Container-TextBrowse']}
          onClick={() => alert('write your func')}
        >
          Browse
        </span>
        
        to upload
      </p>
      
      <p
        className={clsx(styles['Text_Gray'], styles['Container-TextSize'])}
      >
        min 250 x 250px / max 1mb
      </p>
    </>
  
  return (
    <div
      className={clsx(styles['Container'], styles['Body-Container'], currentAvatar && styles['Body-ContainerWithImage'])}
    >
      {content}
    </div>
  )
}

export default AvatarCurrent