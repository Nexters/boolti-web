import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

/**
 * 공연장 정보 / 대관 정보 / 데이터 연결 공용 헤더.
 * 액션 버튼(44px) 유무로 높이가 달라지지 않도록 84px로 고정한다. (Figma node 9160:11969)
 */
const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  height: 84px;
  padding: 0 44px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey.g20};
  box-shadow: 0px 4px 18px 0px rgba(136, 141, 157, 0.15);
`;

const Title = styled.h2`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const ActionArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Content = styled.div`
  flex: 1;
  padding: 32px 44px 56px;
  background-color: ${({ theme }) => theme.palette.grey.g00};
`;

export default {
  Container,
  Header,
  Title,
  ActionArea,
  Content,
};
