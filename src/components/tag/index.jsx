import React from 'react';
import {Tag} from 'antd'
import styles from './styles.module.scss'
import {useNavigate} from "react-router-dom";

const MyTag = ({tag}) => {
    const navigateTo = useNavigate();
    const clickHandler = ()=>{
        navigateTo(`/tags/${tag.name}`)
        window.location.reload();
    }

    return (
            <Tag className={styles.tag}color={tag.color} onClick={clickHandler}>
                {tag.name}
            </Tag>
    );
};

export default React.memo(MyTag);
