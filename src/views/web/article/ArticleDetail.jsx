import React, {useEffect, useMemo, useState} from 'react';
import styles from "@/views/web/article/index.module.scss";

import moment from "moment/moment";

// components
import {CalendarOutlined, EyeOutlined, HeartOutlined} from "@ant-design/icons";
import ArticleTag from "@/components/articleTag";
import Navigation from "@/components/navigation";

import {Spin} from "antd";

// methods
import {getArticle} from "@/utils/axios";
import {translateMarkdowntoHtml} from "@/utils";
import {useNavigate, useParams} from "react-router-dom";
import Markdown from "@/components/Markdown";

const ArticleDetail = ({withLoading}) => {
    const params = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({
        title: '',
        content: '',
        createAt: '',
        tags:[],
        loading:true
    })
    useEffect(() => {
        if(params.id){
            withLoading(getArticle(params.id).then(res => {
                const data = res.data[0];
                data.createAt = moment(data.createAt).format('YYYY.MM.DD');
                setArticle({...data,loading:false});
            }).catch(() => {
                navigate('/404')
            }))
        }
    },[]);


    const {title, content, createAt,view,loading,tags} = article;
    return (
        <>
            <Spin spinning={loading}>
                <div className={styles.post_header}>
                    <h1 className={styles.post_title}>{title}</h1>
                    <div className={styles.app_others}>
                        <div>
                            <EyeOutlined /> {view}
                        </div>
                        <div>
                            <HeartOutlined /> 0
                        </div>
                        <span>
                        <CalendarOutlined/>
                            &nbsp; Posted on &nbsp;
                            <span>{createAt}</span>
                        </span>
                    </div>
                    {tags && <ArticleTag tagList={tags}/>}
                </div>
                <Markdown markdown={content}/>
                <nav className={styles.article_navigation}>
                    <Navigation content={content}/>
                </nav>
            </Spin>
        </>
    );
};

export default ArticleDetail;
