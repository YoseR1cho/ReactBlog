import React, {useState} from 'react';
import { List } from 'antd';
import {notificate} from "@/components/notification";
import styles from './styles.module.css'
import useFetchList from "@/hooks/useFetchList";
import {BACKGROUND_PAGESIZE} from "@/utils/config";
import { useLocation, useNavigate} from "react-router-dom";
import {deleteArticle} from "@/utils/axios";
import Confirm from "@/components/confirm";


const App = () => {
    const location = useLocation();
    const navigateTo = useNavigate();
    const [deleting,setDeleting] = useState({state:false,id:''});
    const [contextHolder,openNotification] = notificate();

    const { pagination, dataList } = useFetchList({
        queryParams: { pageSize: BACKGROUND_PAGESIZE,},
        fetchDependence: [location.search]
    })

    const data = dataList.map(item=>{
        return {
            ...item,
            href:`/article/${item._id}`,
        }
    })


    const confirmDelete = ()=>{
        const id = deleting.id;
        deleteArticle(id).then(()=>{
            setDeleting({state:false,id:''});
            openNotification('文章删除提醒','恭喜，您的文章删除成功！')
            window.location.reload();
        }).catch(()=>{
            openNotification('文章删除提醒','文章删除失败！')
        })
    }

    const editArticle = (article)=>{
        navigateTo('/admin/article/publish',{state:{...article}});
    }

    return(
           <>
               {contextHolder}
               <div className={styles.manager}>
                   {deleting.state && <Confirm
                       message='确定要删除该文章吗？'
                       onOk={confirmDelete}
                       setDeleting={setDeleting}
                   />}
                   <List
                       className={styles.list}
                       itemLayout="horizontal"
                       size="large"
                       pagination={{
                           onChange: (page,pageSize) => {
                               pagination.onChange(page,pageSize);
                           },
                           pageSize: pagination.pageSize,
                           align:'center',
                           total:pagination.total,
                           current:pagination.current
                       }}
                       dataSource={data}
                       renderItem={(item) => (
                           <List.Item
                               key={item.title}
                               actions={[<a onClick={()=>editArticle(item)}>编辑</a>,<a onClick={()=>setDeleting({state:true,id:item._id})}>删除</a>]}
                           >
                               <List.Item.Meta
                                   title={<a href={item.href}>{item.title}</a>}
                               />
                               {item.summary}
                           </List.Item>
                       )}
                   />
               </div>
           </>
    )
};
export default App;
