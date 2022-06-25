import React from 'react'

import {Route, Routes} from 'react-router-dom'
import Fishes from "../pages/fish/Fishes";
import Antennas from '../pages/antenna/Antennas';
import Status from '../pages/status/Status';
import Passes from '../pages/passes/Passes';
import FishContainer from "../pages/fish/FishContainer";
import AntennaContainer from '../pages/antenna/AntennaContainer';
import StatusContainer from '../pages/status/StatusContainer';

const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/'/>
            <Route path='/fishes' element={<Fishes />} />
            <Route path='/antennas' element={<Antennas />} />
            <Route path='/status' element={<Status />} />
            <Route path='/passes' element={<Passes />} />
            <Route path='/edit-fish' element={<FishContainer />} />
            <Route path='/edit-antenna' element={<AntennaContainer />} />
            <Route path='/edit-status' element={<StatusContainer />} />
        </Routes >
    )

}

export default AppRoutes;