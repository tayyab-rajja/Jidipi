import {FC, ReactElement} from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import clsx from 'clsx';

import styles from './TabsFormsUserData.module.css';
import "@reach/tabs/styles.css";

interface Props {
  tabsData: Array<{name: string, panel: ReactElement}>;
}

const TabsFormsContainer:FC<Props> = ({tabsData}) => {
  let id = 1;

  let tabsToRender: Array<ReactElement> = [];
  let tabPanelsToRender: Array<ReactElement> = [];

  tabsData.forEach(e => {
    tabsToRender.push(<Tab key={id++} className={styles['Tabs-Tab']} data-reach-menu-item>{e.name}</Tab>);
    tabPanelsToRender.push(<TabPanel key={id++}>{e.panel}</TabPanel>)
  })

  return (
    <Tabs>
      <TabList>
        {tabsToRender}
      </TabList>
      <TabPanels className={clsx(styles['TabPanels'], styles['Body-TabPanel'])}>
        {tabPanelsToRender}
      </TabPanels>
    </Tabs>
  );
}
  
  export default TabsFormsContainer;