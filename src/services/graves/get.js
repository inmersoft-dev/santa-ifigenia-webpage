/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { getAuth } from "auth/auth";
import config from "config";

// cookies
import { getCookie } from "utils/auth";

// parsers
import { parseQueryParameters } from "../../utils/parsers";

/**
 *
 * @param {number} id
 * @returns
 */
export const graveList = async (
  page,
  count,
  reduced,
  routes,
  id,
  date,
  title,
  subtitle,
  average
) => {
  let response;
  try {
    response = await axios.get(
      `${config.apiUrl}grave/list${parseQueryParameters({
        page,
        count,
        reduced,
        routes,
        id,
        date,
        title,
        subtitle,
        average,
      })}`,
      {
        headers: {
          ...getAuth,
          Authorization: `Bearer ${getCookie(config.basicKey)}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (err) {
    return { error: String(err) };
  }
};
