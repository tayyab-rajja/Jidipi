import {FC} from 'react';

import TabsFormsUserData from 'src/components/TabsFormsUserData';
import ChangePasswordField from 'src/components/ChangePasswordField'
import AvatarField from 'src/components/AvatarField'

import SideBarWrapper from "src/components/SideBarWrapper/SideBarWrapper";

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
    <SideBarWrapper>
      <aside className={styles['Body-SettingAccountContainer']}>
        <TabsFormsUserData
          tabsData={tabsData}
        />
      </aside>
    </SideBarWrapper>
  )
}

export default SidebarSettingAccount