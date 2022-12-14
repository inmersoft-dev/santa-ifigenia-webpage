import { createContext, useReducer, useContext } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

const NotificationContext = createContext();

const notificationReducer = (notificationState, action) => {
  switch (action.type) {
    case "set":
      return {
        visible: true,
        type: action.ntype,
        message: action.message,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const NotificationProvider = ({ children }) => {
  const [notificationState, setNotificationState] = useReducer(
    notificationReducer,
    {
      visible: false,
      type: "success",
      message: "message",
    }
  );

  const value = { notificationState, setNotificationState };
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// hooks
const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined)
    throw new Error("notificationContext must be used within a Provider");
  return context;
};

export { NotificationProvider, useNotification };
