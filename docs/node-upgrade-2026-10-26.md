# Node 26 보안 업데이트 검증 (2026-10-26)

## 대상과 변경

- 저장소 Node 20.11.0 → **26.12.1**. 사용자 요청에 따라 26 계열을 선택했다.
- [공식 26.12.1 릴리스](https://nodejs.org/en/blog/release/v26.12.1)는 2026-10-21 보안 릴리스이며, 릴리스 시점 분류는 Current다.
- [보안 공지](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)의 Brotli, DNS, TLS 등의 수정이 포함된다. 모든 의존성의 취약점이 해결됐다는 의미는 아니다.
- `.nvmrc`, `.tool-versions`를 갱신하고 CI가 `.nvmrc`를 읽도록 변경했다.
- 공식 macOS arm64 바이너리를 임시 디렉터리에 설치하고 공식 릴리스의 SHA-256과 대조했다. 시스템 기본 Node나 외부 배포 환경은 변경하지 않았다.
- Node 26 배포본에는 Corepack 실행 파일이 없어, CI는 저장소의 Yarn 4.1.0을 `node .yarn/releases/yarn-4.1.0.cjs`로 직접 실행한다. 전역 Yarn에 의존하던 setup-node의 Yarn 캐시 옵션도 제거했다.
- 패키지 버전과 `yarn.lock`은 유지했다.

## 검증 결과

아래 명령의 `yarn`은 위 저장소 Yarn 실행 명령을 뜻한다. Node 26.12.1 / macOS arm64에서 실행했다.

| 검증                                                      | 결과                                    |
| --------------------------------------------------------- | --------------------------------------- |
| `yarn install --immutable`                                | 종료 코드 0, 아래 선택 의존성 경고 있음 |
| `yarn turbo run lint type-check build --force --continue` | 26개 작업 모두 통과, 캐시 재사용 없음   |
| `yarn workspace stroybook build:storybook`                | 통과                                    |
| `yarn workspace admin test` (호환성 수정 후)              | 177개 통과, 46개 실패, 미처리 오류 1개  |
| 기존 Node 20.11.0의 동일 테스트 (수정 전 설정)            | 177개 통과, 46개 실패, 미처리 오류 1개  |
| admin 설정 수정 후 lint / type-check / build 재검증       | 3개 작업 모두 통과                      |

Node 20과 수정 후 Node 26의 실패 테스트 이름 46개를 비교해 완전히 같음을 확인했다. 전체 테스트 통과를 의미하지 않는다.
기존 실패는 `Landing.integration.test.tsx`와 `PlaceSearchPage.integration.test.tsx`에 있으며, 누락된 `SpaceBanner`/`trackConcertHallProfileEvent` 모의 객체, `ResizeObserver`, 변경된 UI 기대값 등이 포함된다.
기존 실패를 별도 수정하기 전까지 CI에 전체 단위 테스트를 새 필수 단계로 추가하지 않았다. CI에는 전체 앱과 Storybook 빌드 검증을 추가했다.

## 발견하고 수정한 Node 26 호환성 문제

### 브라우저 E2E 비교

`yarn workspace admin test:e2e:functional --trace=off`를 Node 20.11.0과 26.12.1에서 각각 실행했다.
두 환경 모두 로그인 이동 1개 통과, 응답 조회 2개 및 정산 2개 실패로 동일했다. 실패는 기대한 화면 요소를 찾지 못하거나 클릭을 기다리다가 시간 초과되는 증상이다.
실제 API 대신 기존 MSW 테스트 환경을 사용했다.

Node 26에서 기본 trace 저장을 사용하는 실행은 실패 후 종료가 지연되어 중단했고, trace를 끈 동일 조건으로 버전을 비교했다.
Node 26으로 Chromium 전체 패키지 설치도 다운로드 후 지연되어 중단했다. 검증에는 Node 20으로 임시 설치한 Chromium headless shell을 사용했다.
따라서 Playwright 설치 및 trace 저장까지 포함한 전체 도구 호환성이 확인된 것은 아니다.

### Vitest Web Storage

Node 26의 네이티브 Web Storage가 Vitest 2.1.9의 jsdom 환경과 충돌했다.
수정 전에는 `localStorage.clear()` 등에서 오류가 나면서 111개 테스트가 실패했다.
`apps/admin/vite.config.ts`의 테스트 worker `execArgv`에 `--no-experimental-webstorage`를 설정해 jsdom이 브라우저 저장소를 제공하도록 했다.
fork와 thread pool 모두 적용되며 프로덕션 앱에는 적용되지 않는다. 기존 저장소 훅 테스트 6개가 통과하고 전체 실패가 기존 46개로 돌아옴을 확인했다.

## 남은 제한과 배포 확인

- `pdfjs-dist`의 선택 의존성 `canvas@2.11.2`는 Node 26 macOS arm64 사전 빌드 바이너리가 없어 404가 발생했고, 소스 빌드는 로컬 `pkg-config` 부재로 실패했다. 네트워크 제한 밖에서도 재확인했다. 설치·프런트엔드 빌드는 성공했지만 Node에서의 canvas/PDF 렌더링 호환성은 검증되지 않았다.
- Storybook/Vite peer dependency 경고, React Hook lint 경고, 큰 번들 및 deprecated API 경고가 남아 있다.
- GitHub Actions의 Linux 실행과 실제 배포는 수행하지 않았다. 외부 빌드 서비스의 Node 설정은 별도 확인이 필요하다.
- 배포 전 Node 26.12.1로 재빌드한 스테이징에서 로그인, 공연 등록·수정, PDF 표시, 결제·정산 연동을 확인한다. 실제 API/인증을 사용하는 운영 흐름은 로컬 자동 테스트만으로 보장할 수 없다.
- 회귀가 발견되면 배포를 중단하고, 필요하면 취약한 20.11.0 대신 보안 수정된 22.23.4 또는 24.22.1을 별도 검증해 대체한다.
