const RESERVATION_DAY = 19;
const RESERVATION_HOUR = 10;

export const countdown = (callback: () => void) => {
  const now = new Date();
  const date = now.getDate();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  if (date === RESERVATION_DAY) {
    // 5분 전부터 카운트다운
    if (hour === RESERVATION_HOUR - 1 && minutes > 54) {
      if (minutes === 59) {
        // 59분은 매 초 카운트
        console.log(`예약 ${60 - seconds}초전`);
      } else if (seconds % 10 === 0) {
        // 55~58분은 10초단위 카운트
        console.log(
          `예약 ${60 - minutes - (seconds === 0 ? 0 : 1)}분 ${
            seconds === 0 ? 0 : 60 - seconds
          }초전`,
        );
      }
    } else if (hour === RESERVATION_HOUR) {
      callback();
    }
  }
};
