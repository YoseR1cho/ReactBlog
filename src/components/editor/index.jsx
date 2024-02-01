import '@toast-ui/editor/dist/toastui-editor.css';
import React, {useEffect, useState} from 'react';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import { Editor } from '@toast-ui/react-editor';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
// 防抖
import {debounce} from "@/utils";

const MyComponent = ({editorRef,changeHandler,initialValue}) => {

    //回显localstorage中的文章记录
    useEffect(()=>{
        const contentHistory = initialValue?initialValue:(localStorage.getItem('tuiUIEditor_articleContent')?JSON.parse(localStorage.getItem('tuiUIEditor_articleContent')):'');
        editorRef.current.editorInst.setMarkdown(contentHistory);
    },[])


    return (
        <div>
            <Editor
                previewStyle="vertical"
                height="560px"
                placeholder='请编写您的文章'
                useCommandShortcut={true}
                plugins={[codeSyntaxHighlight]}
                ref={editorRef}
                onChange={debounce(changeHandler)}
            />
        </div>
    )
}

export default MyComponent;
