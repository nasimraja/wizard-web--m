import React, {useState, useEffect} from 'react'

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logoimg from '../../images/logoimg.png';
import tires from '../../images/tire.png';
import star from '../../images/star.png';
import star2 from '../../images/star2.png';



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
    };
  }

  
function Tires(props){

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
                            <h3>Tiers</h3>
                            <p>Lorem Ipsum fuking jewish dolores</p>
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
                              <Tab label="IWO" {...a11yProps(2)} />
                              </Tabs>
                          </Box>
                          <div className="total-rised">
                            <p>Total Rised: <span>$384625.89</span></p>
                          </div>
                         
                          </Box>
                          </div>
                        </div>
                   </div>
               </div>
               <div className="tire-tabstokes"></div>
              <TabPanel value={value} index={0}>
                <div className="tires-wrp">
                    <div className="tires-child1">
                        <p><img src={tires} /> UNDEAD TOKEN TIERS</p>
                    </div>
                    <div className="tires-child2">
                        <p>BUSD <a href="#">Open</a></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="archer-box">
                            <div className="archer-img">
                                <h3>Archer</h3>
                            </div>
                            <div className="archer-content-main">
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Requiriments</p>
                                        <p><span>800</span> BUSD</p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Voting power</p>
                                        <img src={star} />
                                    </div>
                                </div>
                                <div className="tire-stoke"></div>
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Pool Weight</p>
                                        <p><span>800</span> BUSD</p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Allocation</p>
                                        <img src={star2} />
                                    </div>
                                </div>
                                <div className="stake-btns">
                                    <button>STAKE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="archer-box">
                            <div className="archer-img">
                                <h3>Archer</h3>
                            </div>
                            <div className="archer-content-main">
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Requiriments</p>
                                        <p><span>800</span> BUSD</p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Voting power</p>
                                        <img src={star} />
                                    </div>
                                </div>
                                <div className="tire-stoke"></div>
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Pool Weight</p>
                                        <p><span>800</span> BUSD</p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Allocation</p>
                                        <img src={star2} />
                                    </div>
                                </div>
                                <div className="stake-btns">
                                    <button>STAKE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="archer-box">
                            <div className="archer-img">
                                <h3>Archer</h3>
                            </div>
                            <div className="archer-content-main">
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Requiriments</p>
                                        <p><span>800</span> BUSD</p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Voting power</p>
                                        <img src={star} />
                                    </div>
                                </div>
                                <div className="tire-stoke"></div>
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Pool Weight</p>
                                        <p><span>800</span> BUSD</p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Allocation</p>
                                        <img src={star2} />
                                    </div>
                                </div>
                                <div className="stake-btns">
                                    <button>STAKE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                    <div className="archer-box">
                            <div className="archer-img">
                                <h3>Archer</h3>
                            </div>
                            <div className="archer-content-main">
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Requiriments</p>
                                        <p><span>800</span> BUSD</p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Voting power</p>
                                        <img src={star} />
                                    </div>
                                </div>
                                <div className="tire-stoke"></div>
                                <div className="archer-content-wrp">
                                    <div className="archer-c-child1">
                                        <p>Pool Weight</p>
                                        <p><span>800</span> BUSD</p>
                                    </div>
                                    <div className="archer-c-child2">
                                        <p>Allocation</p>
                                        <img src={star2} />
                                    </div>
                                </div>
                                <div className="stake-btns">
                                    <button>STAKE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
               two
              </TabPanel>
              <TabPanel value={value} index={2}>
                three
              </TabPanel>
           </div>
       </div> 
    )
}


export default Tires;