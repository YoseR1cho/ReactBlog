import React from 'react'

// components
import {  Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Tag } from 'antd'
import {idTranslate2Tag} from "@/utils";

function getColor(name, colorList) {
    const target = colorList.find(c => c.name === name)
    return target ? target.color : ''
}

const ArticleTag = (props)=>{
    const tagColorList = useSelector(store=>store.article.tagList);
    let {tagList} = props;
    tagList = idTranslate2Tag(tagList,tagColorList);
    return (
        <div>
            {tagList.length > 0 && (
                <div className="tag_List">
                    {tagList.map((tag, i) => (
                        <Tag key={i} color={getColor(tag, tagColorList)} >
                            <Link to={`/tags/${tag}`}>{tag}</Link>
                        </Tag>
                    ))}
                </div>
            )}
        </div>
    )
}

export default React.memo(ArticleTag);
