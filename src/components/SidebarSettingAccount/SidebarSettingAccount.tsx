import {FC} from 'react';

import TabsFormsUserData from 'src/components/TabsFormsUserData';
import SettingNameEmail from 'src/components/SettingNameEmail';
import AvatarField from 'src/components/AvatarField'

import styles from './SidebarSettingAccount.module.css'

const tabsData = [
  {
    name: 'avatar',
    panel: <AvatarField/>
  },
  
  {
    name: 'account',
    panel: <SettingNameEmail/>
  },
]

const SidebarSettingAccount:FC = () => {
  return (
    <div className={styles['Body-SettingAccountContainer']}>
      <TabsFormsUserData
        tabsData={tabsData}
      />
    </div>
  )
}

export default SidebarSettingAccount