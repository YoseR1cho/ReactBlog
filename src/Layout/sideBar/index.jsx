import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from './index.module.scss'
import {useSelector} from "react-redux";
import MyTag from "@/components/tag";

function SideBar({setPage}){
    const tagList = useSelector(state=>state.article.tagList)
    const navigateTo = useNavigate();
    const role = useSelector(store=>store.user.role);

    const changeNav = ()=>{
        navigateTo('/home');
        window.location.reload();
    }
    return (
        <div>
            <aside className={styles.menu}>
                <div className={styles.menu_box}>
                    <div className={styles.wrap}>
                        <div className={styles.avatar}></div>
                        <h2><a href="#">myBlog</a></h2>
                        <p>感谢关顾</p>
                        <nav className={styles.mainNav}>
                            <ul>
                                <li><a onClick={changeNav}>首页</a></li>
                                {role===0 && <li><Link to={'/admin'}>后台管理</Link></li>}
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className={styles.tag_wrap}>
                    {tagList.map(tag=>{
                        return (<MyTag tag={tag} key={tag.id}/>)
                    })}
                </div>
            </aside>
        </div>
    );
};

export default SideBar;
