import React, {useRef,useState} from 'react';
import {
    UserOutlined,
    FormOutlined,
    TagOutlined,
    UnorderedListOutlined,
    EditOutlined,
    SmileOutlined, MenuUnfoldOutlined, MenuFoldOutlined, HomeOutlined, ApiOutlined
} from '@ant-design/icons';
import {Button, Layout, Menu, theme} from 'antd';
import styles from './styles.module.css'
import {Outlet, useNavigate} from "react-router-dom";
const { Sider,Header } = Layout;
const items = [
    {
        label:'首页',
        key:'',
        icon:<SmileOutlined />
    },
    {
        label:'我的主页',
        key:'../home',
        icon:<HomeOutlined />
    },
    {
        label:'用户管理',
        key:'user',
        icon:<UserOutlined/>
    },
    {
        label:'文章管理',
        key:'article',
        icon:<FormOutlined/>,
        children:[
            {
                label:'文章列表',
                key:'article/list',
                icon:<UnorderedListOutlined />
            },
            {
                label:'发布文章',
                key:'article/publish',
                icon:<EditOutlined />
            }
        ]
    },
    {
        label:'标签管理',
        key:'tag',
        icon:<TagOutlined />
    },
    {
        label:'API管理',
        key:'api',
        icon:<ApiOutlined />
    }

];
const App = (props) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);
    const navigateTo = useNavigate();

    const menuClick = (e)=>{
        // 点击跳转到对应路由    编程式导航
        navigateTo(e.key);
    }

    const nameRef = useRef();

    return (
        <Layout className={styles.layout}>
            <Sider
                breakpoint="lg"
                collapsed={collapsed}
            >
                <div className={styles.logo} >
                    <img src={require('@/assets/images/avatar.png')} alt="" className={styles.avatar}/>
                    <h1 className={styles.info} ref={nameRef}>YoseR1cho</h1>
                </div>
                <Menu
                    className={styles.menu}
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={items}
                    onClick={menuClick}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => {
                            setCollapsed(!collapsed)
                            nameRef.current.style.display = collapsed?'block':'none';
                        }}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Outlet/>
            </Layout>
        </Layout>
    );
};
export default App;
