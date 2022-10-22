/* eslint-disable react/function-component-definition */
// react-router-dom
import { Outlet } from "react-router-dom";

// owm component
import Navbar from "../../components/Navbar/Navbar";

const View = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default View;
