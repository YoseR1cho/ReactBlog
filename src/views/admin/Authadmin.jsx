import React, {useEffect, useState} from 'react';
import Admin from '@/Layout/admin'
import {useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {message} from "antd";

const Authadmin = () => {
    const role = useSelector(store=>store.user.role);
    const navigateTo = useNavigate();
    useEffect(() => {
        if(role!==0){
            message.error('您没有访问权限！')
            navigateTo('/home')
        }
    }, []);
    return (
        <>
            <Admin/>
        </>
    );
};

export default Authadmin;
