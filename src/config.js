const {
  REACT_APP_API_URL,
  REACT_APP_BASIC_KEY,  
  REACT_APP_MAPBOX_API,
  REACT_APP_COOKIE_ACCEPTED,
} = process.env;

const config = {
  apiUrl: REACT_APP_API_URL, // "https://trinidad-dashboard-server.herokuapp.com",
  basicKey: REACT_APP_BASIC_KEY,
  mapBoxAPI: REACT_APP_MAPBOX_API,
  cookieAccepted: REACT_APP_COOKIE_ACCEPTED,
};

export default config;
