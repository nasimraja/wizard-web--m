import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const Loginroute =()=>{
    const auth = localStorage.getItem('game_user_id');
    return !auth ?<Outlet />:<Navigate to="/game/dashboard" />
}


export default Loginroute;