import React, {useState, useEffect} from 'react'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logoimg from '../../images/logoimg.png';
import slist1 from '../../images/slist1.png';
import slist2 from '../../images/slist2.png';
import slist3 from '../../images/slist3.png';
import slist4 from '../../images/slist4.png';
import tires from '../../images/tire.png';
import star from '../../images/star.png';
import star2 from '../../images/star2.png';
import un1 from '../../images/un1.png';
import { SampleData } from '../../../Config/dataIdo';
import IdoCard from './IDOCard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
      className: `tablink`
    };
  }

  
function Pools2(props){

    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    

    useEffect(() => {
       
      });



    return(
       <div className="pools2bg">
           <div className="container">
               <div className="row">
                   <div className="col-lg-8">
                       <div className="pools2-content">
                            <h3>IWO POOLS</h3>
                            {/* <p>Lorem Ipsum fuking jewish dolores</p> */}
                       </div>
                   </div>
                   <div className="col-lg-4">
                        <div className="text-rights">
                          <div className="tabs-ppols2">
                          <Box sx={{ width: '100%' }}>
                          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tabs-p-wrp">
                              <Tab label="Pools" {...a11yProps(0)} />
                              <Tab label="Tiers" {...a11yProps(1)} />
                              </Tabs>
                          </Box>
                          <div className="total-rised">
                            {/* <p>Total Rised: <span>$384625.89</span></p> */}
                          </div>
                         
                          </Box>
                          </div>
                        </div>
                   </div>
               </div>
              <TabPanel value={value} index={0}>
                <div className="row">
                  {
                    SampleData.map((v,i) => {
                      return (
                          <IdoCard index={i} />
                      )
                    })
                  }
                   
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
            
                <div className="row">
                    <div className="col-lg-3">
                        <div className="archer-box">
                            <div className="archer-img">
                                <h3>Archer</h3>
                            </div>
                            <div className="archer-content-main">
                              
                              
                                <div className="tire-stoke"></div>
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Pool Weight</p>
                                        <p><span>5</span> </p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Allocation</p>
                                        <img src={star2} />
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="archer-box">
                            <div className="archer-img">
                                <h3>Barbarian</h3>
                            </div>
                            <div className="archer-content-main">
                               
                               
                                <div className="tire-stoke"></div>
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Pool Weight</p>
                                        <p><span>10</span></p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Allocation</p>
                                        <img src={star2} />
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="archer-box">
                            <div className="archer-img">
                                <h3>Knight</h3>
                            </div>
                            <div className="archer-content-main">
                             
                                <div className="tire-stoke"></div>
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Pool Weight</p>
                                        <p><span>15</span> </p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Allocation</p>
                                        <img src={star2} />
                                    </div>
                                </div>
                             
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="archer-box">
                            <div className="archer-img">
                                <h3>Wizard</h3>
                            </div>
                            <div className="archer-content-main">
                                
                                <div className="tire-stoke"></div>
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Pool Weight</p>
                                        <p><span>20</span> </p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Allocation</p>
                                        <img src={star2} />
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
              </TabPanel>
             
           </div>
       </div> 
    )
}


export default Pools2;