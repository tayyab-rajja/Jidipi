import { useEffect, useState } from "react";
import tableData from './partners-table-config'
import Table from 'src/components/UserTable'

interface IProps {
    team: {name: string; users: any[]};
    getItems: () => void;
    createUpdateItem: (item: any, id: any) => void;
}

export default function TableWrapper({ team, getItems, createUpdateItem }: IProps) {
    const [items, setItems] = useState<any>([])
    const [contextData, setContextData] = useState({});


    useEffect(() => {
        setItems(team.users || []);
      }, [team.users]);


    // There is just one table.
    const index = 1

    return (
        <Table
            team={team}
            index={index}
            tableData={tableData}
            items={items}
            setItems={setItems}
            createUpdateItem={createUpdateItem}
            getItems={getItems}
            // setInitalItemProps={setInitalItemProps}
            setContextData={setContextData}
            contextData={contextData}
            menuId={`SELLER_MENU_${index}`}
            // targetRole={targetRole}
        />
    );
}
