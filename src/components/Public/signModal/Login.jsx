import React from 'react';
import styles from './styles.module.scss'
import { message} from "antd";

import {useForm} from "react-hook-form";
import md5 from 'js-md5'
import {PASSWORDEXP, SECRET, USERNAMEEXP} from "@/utils/config";
import {fetchLogin} from "@/store/user/actionCreators";
import {useDispatch, useSelector} from "react-redux";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {throttle} from "@/utils";

const Login = ({setOpen}) => {
    const {register,handleSubmit,formState:{errors},reset} = useForm();
    const dispatch = useDispatch();

    const handlerLogin = (data)=>{
        const decrypt = md5(data.password,SECRET);
        const res = dispatch(fetchLogin({username:data.username,password:decrypt}));
        res.then(()=>{
            message.success(`欢迎回来!`)
            setOpen(false);
            reset();
        }).catch(err=>{
            message.error(err.message);
        })
    }

    return (
        <div>
            <form className={styles.form} onSubmit={throttle(handleSubmit(handlerLogin),2000)}>
                <div className={styles.inputContainer}>
                    <input type="text" placeholder="a"
                           className={styles.input}
                           required
                           {...register("username",{required:true,pattern:USERNAMEEXP
                           })}
                    />
                    <label htmlFor="" className={styles.label}>用户名</label>
                </div>
                {errors.username && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.username.type === 'required'?'请输入您的用户名':'请输入由5-15个汉字、字母或数字组成的用户名哦！'}</p>)}
                <div className={styles.inputContainer}>
                    <input type="password" placeholder="a"
                           className={styles.input}
                           required
                           {...register('password',{required:true,pattern:PASSWORDEXP
                           })}
                    />
                    <label htmlFor="" className={styles.label}>密码</label>
                </div>
                {errors.password && (<p className={styles.error}><ExclamationCircleOutlined className={styles.erroricon}/>{errors.password.type === 'required'?'请输入您的密码':'请输入由6-20个字母、数字或下划线组成的密码哦！'}</p>)}
                <button type='submit'>登录</button>
            </form>
        </div>
    );
};

export default Login;


