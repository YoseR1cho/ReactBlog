import { userLogin, userRegister,tokenLogin} from "@/utils/axios";
import {setUser,removeUser} from "@/store/user/reducer";
import {getToken} from "@/utils/token";

export const fetchLogin = (values)=>{
    const {username,password} = values;
    return async dispatch=>{
        try {
            const res = await userLogin({username, password});
            const {id,token,role} = res.data;
            dispatch(setUser({token,username,id,role}));
        }
        catch (err){
            throw err;
        }
    }
}

export const fetchRegister = (values)=>{
    return async dispatch=>{
        try{
            const res = await userRegister(values);
        }
        catch (err){
            throw err;
        }
    }
}

export const fetchToken = ()=>{
    return async dispatch=>{
        // 通过后端校验token并返回用户数据
        let token = getToken();
        if(token){
            const res = await tokenLogin(token);
            const {username,id,newToken,role} = res.data;
            dispatch(setUser({username,id,token:newToken,role}));
        }
    }
}

export const fetchLogout = ()=>{
    return dispatch =>{
        dispatch(removeUser());
    }
}
