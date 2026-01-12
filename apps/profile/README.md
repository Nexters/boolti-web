# Profile - 불티 프로필 페이지

사용자 프로필을 보여주는 웹 애플리케이션입니다.

## URL 구조

- 프로필 페이지: `https://profile.boolti.in/{username}`
- 개발 서버: `https://profile.dev.boolti.in:8082/{username}`

## 개발 서버 실행

```bash
# 루트 디렉토리에서
yarn workspace profile dev

# 또는 turbo 사용
turbo dev --filter=profile
```

## 빌드

```bash
# 루트 디렉토리에서
yarn workspace profile build

# 또는 turbo 사용
turbo build --filter=profile
```

## 기술 스택

- React 18
- TypeScript
- Vite
- Emotion (CSS-in-JS)
- React Router v6
- React Helmet Async

## 사용하는 공통 패키지

- `@boolti/ui`: 공통 UI 컴포넌트
- `@boolti/api`: API 호출 로직
- `@boolti/icon`: 아이콘 컴포넌트

## 디렉토리 구조

```
src/
├── components/       # 재사용 가능한 컴포넌트
├── pages/           # 페이지 컴포넌트
├── App.tsx          # 라우팅 설정
├── main.tsx         # 앱 진입점
└── index.css        # 전역 스타일
```
