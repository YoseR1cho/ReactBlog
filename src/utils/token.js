import cookie from "react-cookies";
import {LOGINCOOKIE} from "@/utils/config";

function setToken(token){
    cookie.save(LOGINCOOKIE,token,{path:'/'})
}

function getToken(){
    return cookie.load(LOGINCOOKIE);
}

function removeToken() {
    cookie.remove(LOGINCOOKIE);
}

export {
    setToken,
    getToken,
    removeToken
};
