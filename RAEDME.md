# nowon-service-corporation-auto-reservation

주말에 테니스장 예약하기 너무 힘들어서 만든 매크로

## EdgeCase

매월 19일 10시마다 예약이 오픈되는데, 하루 전인 18일에 이용 불가 시간이 공지됨
이는 자동화 하기 모호함이 있음

## 설정

- `.env` 파일을 만들어서 채워줘야 함
- `.env.sample` 파일을 보고 넣으면 됨
  - `USER_ID` 와 `USER_PASSWORD`는 `노원구서비스공단 통합예약시스템` id와 password

```bash
$ yarn # 의존성 설치
$ yarn build
$ yarn start
```

## 직접 추가해야 하는 부분

`reservationInfoList.ts` 파일에 `IReservation` 타입에 맞춰 예약할 날을 넣어야 함
개인적으로 date-fns 라이브러리의 `eachWeekendOfMonth` 함수를 통해 `매주 n요일, n시` 예약하는 방식을 사용 중
