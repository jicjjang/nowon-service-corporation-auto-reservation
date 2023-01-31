import qs from "qs";
import { load } from "cheerio";
import {
  fetchReservationConfirm,
  IReservation,
  IReservationTimeListEach1Hour,
  mutateReservation,
} from "./api";
import {
  numberToHourMinutes,
  numberZeroPrefixUpTo10,
} from "./utils/numberUtils";

const reservationTimeFormatter = (
  timeListEach1Hour: IReservationTimeListEach1Hour[],
): string[] => {
  return timeListEach1Hour.map(
    (option) =>
      `${numberToHourMinutes(option.startHour)}~${numberToHourMinutes(
        option.startHour + 1,
      )}~${option.court}`,
  );
};

export const reservation = async (reservationInfo: IReservation) => {
  const formattedTimeList = reservationTimeFormatter(
    reservationInfo.timeListEach1Hour,
  );

  let resultReservationConfirm;
  try {
    resultReservationConfirm = await fetchReservationConfirm(
      qs.stringify(
        {
          time_chk: formattedTimeList,
        },
        { arrayFormat: "repeat" },
      ),
      reservationInfo,
    );
  } catch (e) {
    console.log("예약 확인 에러!!!!!!!!!!!!!!!!!");
    throw e;
  }

  const $ = load(resultReservationConfirm.data);

  const defaultQuery = $("#voStr").val();
  const timeQuery = $("#timeStr").val();

  const reservationQuery = `${defaultQuery}&${qs.stringify({
    timeStr: timeQuery,
  })}&parentSeq=1`;

  const date = `${reservationInfo.year}-${numberZeroPrefixUpTo10(
    reservationInfo.month,
  )}-${numberZeroPrefixUpTo10(reservationInfo.day)}`;

  try {
    await mutateReservation(reservationQuery);
    console.log(`${date} 전체 예약 완료`);
  } catch (e) {
    console.log(`${date} 예약 에러!!!!!!!!!!!!!!!!!`);
  }
};
