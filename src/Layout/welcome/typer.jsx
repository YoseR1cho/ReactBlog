import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Typist from 'react-typist'
import './index.scss'
function Typer() {

    const [renderMsg,setRenderMsg] = useState(false);
    function onHeaderTyped  () {
        setRenderMsg(true);
    }

    {
        const docs = 'https://github.com/YoseR1cho/myBlog'
        return (
            <div className='typer'>
                <Typist className='typer-header' avgTypingDelay={100} startDelay={2000} onTypingDone={onHeaderTyped}>
                    <a href={docs}>欢迎来到YoseR1cho的小园子</a>
                </Typist>
                <div className='typer-content'>
                    {renderMsg ? (
                        <Typist className='typer-message' cursor={{ hideWhenDone: true }}>
                            * 这里记录着技术的点滴进步
                            <Typist.Delay ms={1250} />
                            <br />
                            * 这里记录着生活的五彩斑斓
                            <Typist.Delay ms={1250} />
                            <br />
                            * 希望你也一样，做
                            <Typist.Delay ms={500} />
                            资本家的主人
                            <Typist.Backspace count={6} delay={1000} />
                            <Typist.Delay ms={750} />
                            自己的主人
                            <Typist.Delay ms={1250} />
                            <br />
                            <span>
                *{' '}
                                <a href={docs} className='flash'>
                  欢迎 PR&Star
                </a>
              </span>
                            <br />
                            {''}
                        </Typist>
                    ) : null}
                </div>
            </div>
        )
    }
}

export default Typer;
