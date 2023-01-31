import { api, fetchLoginApi } from "./api";

const getSessionId = (setCookieHeader?: { [key: string]: any }) => {
  const stringSessionId = setCookieHeader?.filter((cookieString) =>
    cookieString.startsWith("JSESSIONID"),
  )[0];

  return stringSessionId?.split(";")[0].split("=")[1];
};

const loginInfoSetCookies = (sessionId?: string) => {
  if (sessionId) {
    api.defaults.headers[
      "cookies"
    ] = `${api.defaults.headers["cookies"]}; ids=${process.env.USER_ID}; JSESSIONID=${sessionId}`;
  }
};

const LOGIN_SUCCESS_CODE = "11";
const LOGIN_FAIL_CODE = "12";

export const setUserSessionIdInAxios = async () => {
  try {
    const result = await fetchLoginApi();

    if (result.data?.result === LOGIN_SUCCESS_CODE) {
      const sessionId: string | undefined = getSessionId(
        result.headers["set-cookie"],
      );

      return loginInfoSetCookies(sessionId);
    }

    throw new Error("로그인 에러!!!!!!!!!!!!");
  } catch (e) {
    throw e;
  }
};
