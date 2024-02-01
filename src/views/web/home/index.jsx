import React, {useRef} from 'react';
import './index.scss'

import {Spin} from 'antd'
import WebPagination from '@/components/pagination'
import List from './List'

import {HOME_PAGESIZE} from "@/utils/config";

//hooks
import {useLocation, useNavigate, useParams} from "react-router-dom";
import useFetchList from "@/hooks/useFetchList";
import {tagTranslate} from "@/utils";
import {useSelector} from "react-redux";


const Index = ({setPage}) => {
    const homeRef = useRef();
    const location = useLocation();
    const params = useParams();


    // 发送请求获取文章列表和页面跳转信息
    const { loading, pagination, dataList } = useFetchList({
        queryParams: { pageSize: HOME_PAGESIZE,key:params},
        fetchDependence: [location.search],
    })


    return (
        <Spin tip='loading...' spinning={loading} >
            <div className='app-home' ref={homeRef}>
                <List list={dataList}></List>
                <WebPagination
                    {...pagination}
                    onChange={(page,pageSize)=>{
                        pagination.onChange(page,pageSize);
                    }}
                />
            </div>
        </Spin>
    );
};

export default Index;
