import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Button, Select, Tag} from 'antd'
import {notificate} from "@/components/notification";
import styles from './styles.module.css'
import {useSelector} from "react-redux";
import Editor from "src/components/editor";
import useAjaxLoading from "@/hooks/useAjaxLoading";
import {tagTranslate} from '@/utils'
import {useLocation, useNavigate} from "react-router-dom";
import {patchArticle, publishArticle} from "@/utils/axios";

const Publish = () => {
    const [form] = Form.useForm();
    const editorRef = useRef();
    const navigateTo = useNavigate();
    const location = useLocation();

    //获取标签并渲染颜色
    const tagList = useSelector(store=>store.article.tagList)
    const [isEdite,setIsEditor] = useState(location.state?true:false);
    const [loading,withLoading] = useAjaxLoading();

    const [contextHolder,openNotification] = notificate();



    const onFinish = ()=>{
        const value = form.getFieldValue();
        const content = editorRef.current.editorInst.getMarkdown();
        const article = {...value,content};
        const articlePost = tagTranslate(article,tagList)

        withLoading((isEdite?patchArticle(location.state._id,articlePost):publishArticle(articlePost)).then(()=>{
            openNotification('文章发布提醒',`恭喜，您的文章${isEdite?'修改':'发布'}成功！`);
            setTimeout(()=>{
                localStorage.removeItem('tuiUIEditor_articleContent');
                localStorage.removeItem('tuiUIEditor_articleSummary');
                localStorage.removeItem('tuiUIEditor_articleTitle');
                navigateTo('/admin/article/list');
            },2000);
        }))
    }

    const tagRender = (props) => {
        const { closable, onClose ,label} = props;
        if(!label)  return;
        const {color} = tagList.find(item=>item && item.name===label);
        const onPreventMouseDown = (event) => {
            event.preventDefault();
            event.stopPropagation();
        };

        return (
            <Tag
                color={color}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3,
                }}
            >
                {label}
            </Tag>
        );
    };

    const options = tagList.map(item=>{
        return {
            label:item.name,
            value:item.name
        }
    })


    //存储文章信息
    const contentHandler = ()=>{
        if(!isEdite && editorRef.current){
            localStorage.setItem('tuiUIEditor_articleContent',JSON.stringify(editorRef.current.editorInst.getMarkdown()));
        }
    }

    const formItemTitle = (key,value)=>{
        !isEdite && localStorage.setItem(key,value);
    }


    useEffect(() => {
        const titleInitialValue = !isEdite?(localStorage.getItem('tuiUIEditor_articleTitle')?JSON.parse(localStorage.getItem('tuiUIEditor_articleTitle')):''):location.state.title;
        const summaryInitialValue = !isEdite?(localStorage.getItem('tuiUIEditor_articleSummary')?JSON.parse(localStorage.getItem('tuiUIEditor_articleSummary')):''):location.state.summary;
        const tagsInitialValue = !isEdite?(localStorage.getItem('tuiUIEditor_articleTag')?JSON.parse(localStorage.getItem('tuiUIEditor_articleTag')):''):location.state.tags;
        form.setFieldsValue({
            title:titleInitialValue,
            summary:summaryInitialValue,
            tags:tagsInitialValue
        })
    }, []);

    return (
        <>
            {contextHolder}
            <Form
                className={styles.form}
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label='文章标题'
                    name='title'
                    className={styles.formItem}
                    rules={[
                        {
                            message:'请输入您的标题'
                        }
                    ]}
                >
                    <Input
                        size={"large"}
                        onChange={()=>formItemTitle('tuiUIEditor_articleTitle',JSON.stringify(form.getFieldValue().title))}

                    />
                </Form.Item>
                <Form.Item
                    label='文章摘要'
                    name='summary'
                    className={styles.formItem}
                    rules={[
                        {
                            message:'请输入您的摘要'
                        }
                    ]}
                >
                    <Input
                        size={"large"}
                        onChange={()=>formItemTitle('tuiUIEditor_articleSummary',JSON.stringify(form.getFieldValue().summary))}
                        maxLength={100}
                        showCount
                    />
                </Form.Item>
                <Form.Item
                    label='选择标签'
                    name='tags'
                    className={styles.formItem}
                >
                    <Select
                        mode="multiple"
                        tagRender={tagRender}
                        style={{
                            width: '100%',
                        }}
                        options={options}
                        size='large'
                        onChange={()=>formItemTitle('tuiUIEditor_articleTag',JSON.stringify(form.getFieldValue().tags))}
                    />
                </Form.Item>
                <Editor editorRef={editorRef} changeHandler={contentHandler} initialValue={isEdite&&location.state?location.state.content:''}/>
                <Button
                    className={styles.button}
                    htmlType="submit"
                    loading={loading}
                >{isEdite?'修改':'发布'}</Button>
            </Form>
        </>
    );
};

export default Publish;
