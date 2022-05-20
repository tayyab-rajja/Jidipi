import styles from "../Sidebar.module.scss";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {LinkProp, MenuProp} from "../../../../../lib/common/menu";
export interface ItemProps   {
    link: LinkProp,
    active: boolean,
}
export function Item(props: ItemProps) {

    const link = props.link;
    const active = props.active;
 console.log('link:::', active, link);
    // if (link.isSelected) console.log('link:::', link);
    // const [active, setActive] = useState(false);
    //
    // useEffect(
    //     () => {
    //         setActive(link.isSelected);
    //     },
    //     [link.isSelected]
    // );
    useEffect(

        ()=>{

            console.log('link:::     1223', active, link);
        },
        [active]
    );
    return <li className={active ? styles["active"] : ''}>
        <Link href={link.link}>
            <a className={styles['menu-item']}>
                <div className={styles['icon']}>
                    <img src={link.icon}/>
                </div>
                <div className={styles['menu-container']}>
                    <span>{link.title}</span>
                    <div className={styles['arrow-right']}></div>
                </div>
            </a>
        </Link>
    </li>
}