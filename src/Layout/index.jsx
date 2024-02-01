import React, {useState} from 'react';
import { Breadcrumb, Layout, theme,Col,Row } from 'antd';
import styles from './index.module.css'
import {Outlet} from "react-router-dom";
import SideBar from './sideBar'
import Header from "@/Layout/header";

const {  Content, Footer } = Layout;
const sideLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }
const Index = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className={styles.layout}>
            <Header/>
            <Content
                style={{
                    flex:1,
                }}
            >
                <Row>
                    <Col {...sideLayout}>
                    </Col>
                    <Col {...sideLayout} style={{position:'fixed',marginLeft:'8px'}}>
                        <SideBar/>
                    </Col>
                    <Col {...contentLayout} style={{display:"flex",flexDirection:"column",minHeight:'calc(100vh - 64px)'}}>
                        <Outlet/>
                        <Footer
                            style={{
                                textAlign: 'center',
                                marginRight:'18%'
                            }}
                        >
                            Ant Design ©2023 Created by Ant UED
                        </Footer>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};
export default Index;
