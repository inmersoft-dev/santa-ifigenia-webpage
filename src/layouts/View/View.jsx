/* eslint-disable react/function-component-definition */
// react-router-dom
import { Outlet } from "react-router-dom";

// own components
import Footer from "../../components/Footer/Footer";

const View = () => (
  <>
    <Outlet />
    <Footer />
  </>
);

export default View;
