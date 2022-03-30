import {FC, ReactElement} from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";

import clsx from 'clsx';

import styles from './TabsFormsUserData.module.css';
import "@reach/tabs/styles.css";

interface Props {
  tabName1: string;
  tabName2: string;
  tab1: ReactElement;
  tab2: ReactElement;
  className?: string;
}

const TabsFormsContainer:FC<Props> = ({tabName1, tabName2, tab1, tab2, className}) => {
  const clazz = clsx(className);
  
  return (
      <section className={clazz}>
        <Tabs>
          <TabList>
            <Tab className={styles['tabs__tab']} data-reach-menu-item>{tabName1}</Tab>
            <Tab className={styles['tabs__tab']} data-reach-menu-item>{tabName2}</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {tab1}
            </TabPanel>
            <TabPanel>
              {tab2}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </section>
  );
}
  
  export default TabsFormsContainer;