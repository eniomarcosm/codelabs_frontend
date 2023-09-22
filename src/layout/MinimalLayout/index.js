/* eslint-disable react/function-component-definition */

import { Outlet } from 'react-router-dom';

// project imports
import Customization from '../Customization';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => (
    <>
        <Outlet />
        {/* <Customization /> */}
    </>
);

export default MinimalLayout;
