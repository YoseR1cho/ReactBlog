import React, {useEffect, useLayoutEffect} from 'react';
import SignModal from "@/components/Public/signModal";
import {useDispatch} from "react-redux";
import {getTags} from "@/store/article/actionCreators";
import {fetchToken} from "@/store/user/actionCreators";

const Index = () => {
    const dispatch = useDispatch();
    // 从后台获取所有的标签到store中
    useEffect(() => {
        dispatch(getTags());
        dispatch(fetchToken());
    }, []);
    return (
        <>
            <SignModal/>
        </>
    );
};

export default Index;
