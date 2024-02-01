import React from 'react';
import {Link, useLocation} from 'react-router-dom'

const Index = () => {
    const location = useLocation();
    console.log(location);
    return (
        <>
            <h1 style={{margin:'30px auto',fontSize:'32px',fontWeight:400}}>
                404 NOT FOUND
            </h1>
            <Link to={'/home'}>返回</Link>
        </>
    );
};

export default Index;
