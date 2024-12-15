# <img src="https://github.com/Nexters/boolti-web/assets/2542730/54cc332c-daf2-44b5-afdd-b55f30b0fb10" alt="불티" width="200px" />

공연 예매 서비스인 **불티**의 웹 클라이언트 레포지토리입니다.

## 링크

- 서비스 URL : https://boolti.in
- Storybook : https://ui.boolti.in

## 기술 스택

- React
- TypeScript
- Turborepo
- Vite

## 패키지 설명

- `apps/admin`: 불티에서 공연을 생성하고 관리하는 사용자들을 위한 서비스입니다.
- `apps/preview`: 공연 예매 페이지를 공유했을 때 랜딩될 페이지입니다. (WIP)
- `apps/super-admin`: 불티 팀원이 사용할 슈퍼 어드민 페이지입니다. (WIP)
- `apps/storybook`: 불티에서 공통적으로 사용될 디자인 컴포넌트를 확인할 수 있는 Storybook 페이지입니다.
- `packages/api`: 웹 클라이언트에서 사용되는 서버 API 호출 관련 로직이 포함된 패키지입니다.
- `packages/config-eslint`: 각 패키지에서 공통적으로 사용될 ESLint 관련 설정이 포함된 패키지입니다.
- `packages/config-typescript`: 각 패키지에서 공통적으로 사용될 TypeScript 관련 설정이 포함된 패키지입니다.
- `packages/icon`: 공통적으로 사용될 아이콘 컴포넌트가 포함된 패키지입니다.
- `packages/ui`: 공통적으로 사용될 디자인 컴포넌트가 포함된 패키지입니다.
- `packages/ui`: 공통적으로 사용될 웹뷰 브릿지가 포함된 패키지입니다.
