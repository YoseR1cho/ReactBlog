import React from 'react';
import styles from './index.module.scss'
import 'highlight.js/styles/github.css'

// components
import {Spin} from "antd";
import useAjaxLoading from "@/hooks/useAjaxLoading";
import ArticleDetail from "@/views/web/article/ArticleDetail";

const Index = () => {

    const [loading,withLoading] = useAjaxLoading()


    return (
        <Spin tip='Loading...' spinning={loading}>
            <article className={styles.app_article}>
                <ArticleDetail withLoading={withLoading}/>
            </article>
        </Spin>
    );
};

export default Index;
