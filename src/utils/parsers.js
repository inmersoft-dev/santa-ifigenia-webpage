// @ts-check
/**
 *
 * @param {object} parameters
 */
export const parseQueryParameters = (parameters) => {
  let result = "?";
  const keys = Object.keys(parameters);
  keys.forEach((item, index) => {
    if (parameters[item]) {
      result += `${item}=${parameters[item]}`;
      if (index < keys.length - 1) result += "&";
    }
  });
  if (result === "?") return "";
  return result;
};
