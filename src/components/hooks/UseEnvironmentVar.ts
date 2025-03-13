import { useMemo } from "react";

/**
 * Custom hook to retrieve environment-specific URLs and API keys.
 *
 * This hook determines the current environment (development or production)
 * and returns the corresponding URLs and API key based on the environment.
 *
 * @returns {Object} An object containing the server URL, websocket URL, and API key.
 * @throws {Error} Throws an error if the environment is unknown.
 *
 * @example
 * const { serverUrl, websocketUrl, apiKey } = useEnvironmentUrls();
 *
 * @remarks
 * The environment variables used are:
 * - `DEV_SERVER_URL`, `DEV_WEBSOCKET_URL`, `DEV_API_KEY` for development environment.
 * - `PROD_SERVER_URL`, `PROD_WEBSOCKET_URL`, `PROD_API_KEY` for production environment.
 */
/**
 * Custom hook to get environment-specific URLs based on the current environment.
 *
 * @returns {Object} An object containing the server URL for the current environment.
 * @throws {Error} Throws an error if the environment is not recognized.
 *
 * @example
 * const { serverUrl } = useEnvironmentUrls();
 * console.log(serverUrl); // Outputs the server URL based on the current environment
 */
const useEnvironmentUrls = () => {
  const env = process.env.NODE_ENV;

  const urls = useMemo(() => {
    if (env === "development") {
      return {
        serverUrl: process.env.REACT_APP_DEV_SERVER_URL,
      };
    } else if (env === "production") {
      return {
        serverUrl: process.env.REACT_APP_PROD_SERVER_URL,
      };
    } else {
      throw new Error("Unknown environment");
    }
  }, [env]);

  return urls;
};

export default useEnvironmentUrls;
