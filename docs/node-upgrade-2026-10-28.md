# Node 24 보안 업데이트 검증 (2026-10-28)

## 대상과 변경

- 저장소 Node 20.11.0 → **24.22.1 LTS**.
- [공식 24.22.1 릴리스](https://nodejs.org/en/blog/release/v24.22.1)는 2026-10-21 보안 릴리스다. [보안 공지](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases)의 Brotli, DNS, TLS 등의 수정이 포함된다.
- `.nvmrc`, `.tool-versions`를 갱신하고 CI가 `.nvmrc`를 읽도록 변경했다.
- CI는 저장소의 Yarn 4.1.0을 `node .yarn/releases/yarn-4.1.0.cjs`로 직접 실행해 전역 Yarn 설정에 의존하지 않는다. 의존성 설치는 `--immutable`을 사용한다.
- CI에 전체 앱과 Storybook 빌드 검증을 추가했다.
- 패키지 버전과 `yarn.lock`은 유지했다.
- Node 24는 내장 Web Storage가 기본 비활성화되어 있어 Vitest worker에 별도 Web Storage 비활성화 옵션을 추가하지 않는다.

## 검증 환경

공식 macOS arm64 바이너리를 임시 디렉터리에 설치하고 공식 체크섬과 SHA-256을 대조했다. 아래 `yarn`은 저장소 Yarn 실행 명령을 뜻한다.
시스템 기본 Node와 외부 배포 환경은 변경하지 않았다.

## 검증 결과

| 검증                                                      | Node 24.22.1 결과                             |
| --------------------------------------------------------- | --------------------------------------------- |
| `yarn install --immutable`                                | 종료 코드 0, 선택 의존성 경고 있음            |
| `yarn turbo run lint type-check build --force --continue` | 26개 작업 모두 통과, 캐시 재사용 없음         |
| `yarn workspace stroybook build:storybook`                | 통과                                          |
| `yarn workspace admin test`                               | 177개 통과, 46개 실패, 미처리 오류 1개        |
| `yarn workspace admin test:e2e:functional --trace=off`    | 로그인 이동 1개 통과, 응답 조회·정산 4개 실패 |

기존 Node 20.11.0에서도 단위 테스트는 177개 통과, 46개 실패, 미처리 오류 1개였다. 실패 테스트 이름 46개가 Node 24와 정확히 같았다.
최종 설정에서 Vitest의 별도 Web Storage 비활성화 옵션을 제거한 뒤에도 같은 단위 테스트 결과와 admin lint·type-check·build 통과를 재확인했다.
기존 실패는 `Landing.integration.test.tsx`와 `PlaceSearchPage.integration.test.tsx`에 있으며, 누락된 `SpaceBanner`/`trackConcertHallProfileEvent` 모의 객체, `ResizeObserver`, 변경된 UI 기대값 등이 포함된다.
전체 테스트가 통과한 것은 아니며, 기존 실패를 별도 수정하기 전까지 CI에 전체 단위 테스트를 새 필수 단계로 추가하지 않았다.

E2E도 Node 20과 24의 실패 테스트 4개가 같았다. 기대한 화면 요소를 찾지 못하거나 클릭을 기다리다 시간 초과되는 증상이다.
기존 MSW 테스트 환경과 임시 설치된 Chromium headless shell을 사용했다. trace 저장을 끈 조건으로 비교했으므로 trace 저장 기능은 검증 범위에 포함되지 않는다.

## 남은 제한과 배포 확인

- `pdfjs-dist`의 선택 의존성 `canvas@2.11.2` 설치 경고가 남아 있다. Node 24 macOS arm64 사전 빌드 바이너리 URL이 404임을 확인했다. 로컬 소스 빌드도 완료하지 못해 Node에서의 canvas/PDF 렌더링 호환성은 검증되지 않았다. 의존성 설치와 프런트엔드 빌드는 성공했다.
- Storybook/Vite peer dependency 경고, React Hook lint 경고, 큰 번들 및 deprecated API 경고가 남아 있다.
- GitHub Actions의 Linux 실행 결과와 외부 배포 서비스의 Node 설정은 별도 확인이 필요하다.
- 배포 전 Node 24.22.1로 재빌드한 스테이징에서 로그인, 공연 등록·수정, PDF 표시, 결제·정산 연동을 확인한다. 실제 API/인증을 사용하는 운영 흐름은 로컬 자동 테스트만으로 보장할 수 없다.
