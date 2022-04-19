import {FC, useState} from 'react';

import TabsFormsUserData from 'src/components/TabsFormsUserData';
import ChangeNameOrEmailField from 'src/components/ChangeNameOrEmailField'
import ChangePasswordField from 'src/components/ChangePasswordField'
import AvatarField from 'src/components/AvatarField'

import styles from './SidebarSettingAccount.module.css'


const SidebarSettingAccount:FC = () => {
  const [showChangePassword, setShowChangePassword] = useState(false)

  const accountPanel = showChangePassword
    ? <ChangePasswordField switchToChangePassword={() => setShowChangePassword(false)} />
    : <ChangeNameOrEmailField switchToChangePassword={() => setShowChangePassword(true)} />
  
  const tabsData = [
    {
      name: 'avatar',
      panel: <AvatarField/>
    },
    
    {
      name: 'account',
      panel: accountPanel
    },
  ]
  
  return (
    <div className={styles['Body-SettingAccountContainer']}>
      <TabsFormsUserData
        tabsData={tabsData}
      />
    </div>
  )
}

export default SidebarSettingAccount