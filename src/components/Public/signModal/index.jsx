import React, {useEffect, useState} from 'react';
import {Modal} from 'antd';
import {useListener} from "@/hooks/useBus";
import styles from './styles.module.scss'
import Login from "@/components/Public/signModal/Login";
import Register from "@/components/Public/signModal/Register";
import {useDispatch, useSelector} from "react-redux";
import {fetchToken} from "@/store/user/actionCreators";
const App = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [type,setType] = useState('');
    const user = useSelector(store=>store.user);
    const dispatch = useDispatch();

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    useListener('openSignModal',type=>{
        setOpen(true);
        setType(type==='login'?'登录':'注册')
    })




    return (
        <>
            <Modal
                width={460}
                title={type}
                open={open}
                confirmLoading={confirmLoading}
                onCancel={()=>setOpen(false)}
                maskClosable={false}
                footer={null}
                className={styles.modal}
            >
                {type === '登录' ? <Login setOpen={setOpen}/> : <Register setOpen={setOpen}/>}
            </Modal>
        </>
    );
};
export default App;
