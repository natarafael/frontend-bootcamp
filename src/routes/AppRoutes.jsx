import React from 'react'

import {Route, Routes} from 'react-router-dom'
import Fishes from "../pages/fish/Fishes";


const AppRoutes = () => {

    return (
        <Routes>
            <Route path='/fishes' element={<Fishes />} />
        </Routes >
    )

}

export default AppRoutes;