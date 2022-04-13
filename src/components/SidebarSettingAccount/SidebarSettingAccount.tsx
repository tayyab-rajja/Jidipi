import {FC} from 'react';

import TabsFormsUserData from 'src/components/TabsFormsUserData';
// import ChangeNameOrEmailField from 'src/components/ChangeNameOrEmailField'
import ChangePasswordField from 'src/components/ChangePasswordField'
import AvatarField from 'src/components/AvatarField'

import styles from './SidebarSettingAccount.module.css'

const tabsData = [
  {
    name: 'avatar',
    panel: <AvatarField/>
  },
  
  {
    name: 'account',
    panel: <ChangePasswordField/>
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