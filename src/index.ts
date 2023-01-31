import { setUserSessionIdInAxios } from "./login";
import { reservation } from "./reservation";
import { reservationInfoList } from "./reservationInfoList";
import { runInterval } from "./utils/runInterval";

(async function () {
  await setUserSessionIdInAxios();

  runInterval(() => {
    reservationInfoList.forEach((reservationInfo) => {
      reservation(reservationInfo);
    });
  });
})();
