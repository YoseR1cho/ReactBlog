import React from 'react';
import { Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import {EyeOutlined, HeartOutlined} from "@ant-design/icons";
import moment from 'moment'

const List = ({list}) => {
    const navigate = useNavigate();

    function jumpTo(id){
        navigate(`/article/${id}`)
    }

    return (
        <ul className='app-List'>
            {list.map(item => (
                <div key={item._id}>
                    <li className='appList_item'>
                        <Divider orientation='left'>
                            <span className='title' onClick={() => jumpTo(item._id)}>
                                {item.title}
                            </span>
                        </Divider>
                        <div
                            onClick={() => jumpTo(item._id)}
                            className={`article-detail`}>
                            {item.summary}
                        </div>
                        <div className='list-item-others'>
                            <div>
                                <EyeOutlined /> {item.view}
                            </div>
                            <div>
                                <HeartOutlined /> 0
                            </div>
                            <div>
                                {moment(item.createAt).format('YYYY-MM-DD HH:MM:ss')}
                            </div>
                        </div>
                    </li>
                </div>
            ))}
        </ul>
    );
};

export default List;
