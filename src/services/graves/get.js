// @ts-check
import axios from "axios";

import { getAuth } from "../../auth/auth";

import config from "../../config";

// parsers
import { parseQueryParameters } from "../../utils/parsers";

/**
 *
 * @param {object} options
 * @returns
 */
export const graveList = async (
  options = {
    page: 1,
    count: 10,
    reduced: false,
    routes: false,
    id: undefined,
    date: undefined,
    title: undefined,
    subtitle: undefined,
    average: undefined,
  }
) => {
  let response;
  try {
    response = await axios.get(
      // @ts-ignore
      `${config.apiUrl}grave/list${parseQueryParameters({
        ...options,
      })}`,
      {
        headers: {
          ...getAuth,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (err) {
    return { error: String(err) };
  }
};
