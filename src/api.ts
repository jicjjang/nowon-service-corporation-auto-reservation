import axios from "axios";
import qs from "qs";
import { numberZeroPrefixUpTo10 } from "./utils/numberUtils";

export const api = axios.create({
  baseURL: process.env.API_URL,
  paramsSerializer: {
    serialize: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
  },
});

export const fetchLoginApi = () =>
  api.post(`/member/loginAction`, null, {
    params: {
      memberId: process.env.USER_ID,
      memberPassword: process.env.USER_PASSWORD,
      save_id: "on",
    },
  });

export interface IReservationTimeListEach1Hour {
  startHour: number;
  court: string;
}

export interface IReservation {
  year: number;
  month: number;
  day: number;
  kind: string;
  cseq: string;
  timeListEach1Hour: IReservationTimeListEach1Hour[];
}

export const fetchReservationConfirm = async (
  timeQuery: string,
  options: IReservation,
) => {
  const unChangeableParams = {
    mseq: "75930",
    parentSeq: "1",
    feeNormal: "4000",
    feeNight: "5200",
    feeHoilday: "5200",
    useTimeBegin: "",
    useTimeEnd: "",
    idleDay1: "N",
    idleDay2: "N",
    idleDay3: "N",
    idleDay4: "N",
    idleDay5: "N",
    idleDay6: "N",
    idleDay7: "N",
  };

  const useDay = `${options.year}-${numberZeroPrefixUpTo10(
    options.month,
  )}-${numberZeroPrefixUpTo10(options.day)}`;

  return api.post(`/sports/courtReserve_confirm?${timeQuery}`, null, {
    params: {
      ...unChangeableParams,
      cseq: options.cseq,
      kind: options.kind,
      useDayBegin: useDay,
      useDayEnd: useDay,
    },
  });
};

export const mutateReservation = async (query: string) =>
  api.post(`/sports/courtReserveAction?${query}`);
