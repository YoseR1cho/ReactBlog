import {Menu, Layout, Dropdown, message} from "antd";
import React from "react";
import styles from './styles.module.scss'
import {
    EditOutlined, FolderOutlined, UserOutlined, LoginOutlined, DownOutlined, TeamOutlined, LogoutOutlined,} from '@ant-design/icons';
import useBus from "@/hooks/useBus";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {fetchLogout} from "@/store/user/actionCreators";
const {Header} = Layout;
const items = [
    {
        label: '归档',
        key: 'archive',
        icon: <EditOutlined />,
    },
    {
        label: '分类',
        key: 'classify',
        icon: <FolderOutlined />,
    },
    {
        label: '关于',
        key: 'about',
        icon: <UserOutlined />,
    },
];
function Index(){
    const [current, setCurrent] = React.useState('mail');
    const bus = useBus();
    const dispatch = useDispatch();
    const user = useSelector(store=>store.user)
    const onClick = (e) => {
        setCurrent(e.key);
    };

    const menu = (
        <Menu>
            <Menu.Item><TeamOutlined style={{marginRight:'5px'}}/><Link to='user'>个人信息</Link></Menu.Item>
            <Menu.Item><div onClick={()=>{
                dispatch(fetchLogout());
                message.success('登出成功！')
            }}><LogoutOutlined style={{marginRight:'13px'}}/>登出</div></Menu.Item>
        </Menu>
    )


    return (
        <>
            <Header
                className={styles.header}
            >
                <div className={styles.leftHeader}>
                    <div className={styles.avatarBox}>
                        <img src={require('../../assets/images/avatar.png')} alt="" className={styles.avatar}/>
                    </div>

                    <Menu onClick={onClick}
                          selectedKeys={[current]}
                          mode="horizontal"
                          items={items}
                          defaultOpenKeys={['archive','classify','about']}
                    />
                </div>
                <div className={styles.user}>
                    {user.isLogin?
                        (<Dropdown overlay={menu}>
                            <div className={styles.userInfo}>
                                <UserOutlined /> {`${user.username}`}<DownOutlined/>
                            </div>
                        </Dropdown>):
                        <>
                            <button className={styles.login} onClick={e => bus.emit('openSignModal', 'login')}>
                                <LoginOutlined/>登录
                            </button>
                            <button className={styles.register} onClick={e => bus.emit('openSignModal', 'register')}>
                                <LoginOutlined/>注册
                            </button>
                        </>
                    }
                </div>
            </Header>
        </>
    )
}

export default Index;
