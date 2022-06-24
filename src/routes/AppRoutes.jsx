import React from 'react'

import {Route, Routes} from 'react-router-dom'
import Fishes from "../pages/fish/Fishes";
import Antennas from '../pages/antenna/Antennas';
import Status from '../pages/status/Status';
import Passes from '../pages/passes/Passes';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/fishes' element={<Fishes />} />
            <Route path='/antennas' element={<Antennas />} />
            <Route path='/status' element={<Status />} />
            <Route path='/passes' element={<Passes />} />
        </Routes >
    )

}

export default AppRoutes;