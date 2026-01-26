

1. 프로젝트 실행 방법
- npm install
- npm run start

2. 구현한 기능에 대한 설명
- 현재 기온, 당일 최저 기온, 당일 최고 기온, 시간대별 기온 정보를 제공합니다.
OpenWeatherMap One Call API 3.0의 Current and forecasts weather data는
현재 시각 기준의 현재 온도와 daily 최저/최고 기온만 제공하기 때문에,
하루(24시간) 단위의 시간별 기온을 충족하기 위해 /timemachine API를 활용했습니다.
시간별 데이터는 TanStack Query의 useQueries를 사용해 병렬로 조회했습니다.

- 현재 시각을 기준으로 시간대별 기온 리스트의 스크롤 위치를 자동으로 조정했습니다.

- 즐겨찾기 지역은 최대 6개까지 설정 가능하도록 제한했습니다.
각 즐겨찾기 지역에는 별칭을 지정할 수 있으며,
연필 아이콘 클릭 시 팝업을 통해 별칭을 수정할 수 있도록 구현했습니다.

- 웹앱 최초 진입 시 useGeolocation.ts 커스텀 훅을 사용하여
사용자의 현재 위치를 감지하도록 구현했습니다.

- 사용자가 원하는 장소를 korea_districts.json 데이터를 기반으로 검색할 수 있도록 했으며,
자동완성 기능을 구현했습니다.
마우스 입력뿐 아니라 onKeyDown을 활용해 방향키(위/아래) 및 Enter 키 입력도 지원했습니다.

- 즐겨찾기 지역 상태는 Zustand를 사용해 관리했습니다.
최대 6개 제한과 별칭 지정 로직을 함께 구현했습니다.

3. 기술적 의사결정 및 이유
- 상태관리 라이브러리
상태관리 라이브러리는 redux, zustand, jotai 외 여러가지가 있지만, redux를 사용하기에는 대규모 프로젝트가 아니였습니다
zustand와 jotai 비교했을때 구조가 단순한 전역 상태만 필요했기 때문에,
보일러플레이트가 많은 Redux나 atom 기반 설계가 필요한 Jotai보다
경량한 Zustand가 적합하다고 판단했습니다.

- kakao local api 
좌표 -> 주소 / 주소 -> 좌표 전환은 kakao local api를 활용하였습니다.

- openweathermap api
실시간 기온, 과거 및 미래의 시간별 기온 데이터,
그리고 daily 최저/최고 기온 정보를 제공받기 위해
OpenWeatherMap API를 활용했습니다.

4. 사용한 기술 스택
- react v19
- TanStack Query
- tailwindcss v3
- react-router-dom v7
- zustand v5
- kakao local api
- openweathermap api