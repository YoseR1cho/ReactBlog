import Home from '../views/web/home'
import Article from "src/views/web/article";
import Layout from "@/Layout";
import Welcome from "@/Layout/welcome";
import NotFound from '@/components/404'
import Authadmin from "@/views/admin/Authadmin";
import Publish from "@/views/admin/publish";
import Main from '@/views/admin'
import ArticleList from "@/views/admin/articleList";
import Tag from "@/views/admin/tag";
import User from "@/views/web/user";
import Api from "@/views/admin/api";

const routes = [
    {
        path:'/',
        element: <Welcome/>
    },
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                path:'/home',
                element:<Home/>,
            },
            {
                path:'/article/:id',
                element:<Article/>
            },
            {
                path:'/tags/:tag',
                element: <Home/>
            },
            {
                path:'/user',
                element: <User/>
            }
        ]
    },
    {
        path:'/admin',
        element: <Authadmin/>,
        children: [
            {
                path:'',
                element: <Main/>
            },
            {
                path:'article/list',
                element:<ArticleList/>
            },
            {
                path: 'article/publish',
                element: <Publish/>
            },
            {
                path:'tag',
                element: <Tag/>
            },
            {
                path:'user',
                element: <User/>
            },
            {
                path:'api',
                element: <Api/>
            }
        ]
    },
    {
        path:'*',
        element:<NotFound/>
    }
]

export default routes
