import {FC} from 'react';

import TabsFormsUserData from 'src/components/TabsFormsUserData';
import SettingNameEmail from 'src/components/SettingNameEmail';

import styles from './SidebarSettingAccount.module.css'

const tabsData = [
  {
    name: 'avatar',
    panel: <h1>Avatar</h1>
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