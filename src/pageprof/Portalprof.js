import React from 'react'
import { Outlet } from 'react-router-dom'
import Topbarprof from './Topbarprof'
import './Fich.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Portalprof() {
  return (
      <>

          <div id="wrapper">
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content" className="animated-background">
                      <Topbarprof />

                      <div className='container-fluid'>
                          <Outlet></Outlet>
                      </div>
                  </div>
              </div>
          </div>
    </>
  )
}
export default Portalprof;

