import React, { useState, useEffect } from 'react'
import './index.scss'
import { Layout } from 'antd'
import Typer from './typer'
import {useNavigate} from 'react-router-dom'
const WelcomeLayout = props => {
  const navigate = useNavigate();
  function redirect() {
    navigate('/home')
  }

  return (
    <Layout style={{ width: '100%', height: '100%' }} >
      <div className='container' onClick={redirect}>

        {/* <div class='text-container'><div></div></div> */}
        <Typer/>
        <div className='bird-container bird-container--one'>
          <div className='bird bird--one'></div>
        </div>

        <div className='bird-container bird-container--two'>
          <div className='bird bird--two'></div>
        </div>

        <div className='bird-container bird-container--three'>
          <div className='bird bird--three'></div>
        </div>

        <div className='bird-container bird-container--four'>
          <div className='bird bird--four'></div>
        </div>

      </div>
    </Layout>

  )
}
export default WelcomeLayout
