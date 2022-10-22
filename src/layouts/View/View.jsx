/* eslint-disable react/function-component-definition */
// react-router-dom
import { Outlet } from "react-router-dom";

// own components
import ToggleMode from "components/ToggleMode/ToggleMode";

const View = () => (
  <>
    <ToggleMode />
    <Outlet />
  </>
);

export default View;
