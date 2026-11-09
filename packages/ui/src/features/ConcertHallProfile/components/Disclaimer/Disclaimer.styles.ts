import styled from '@emotion/styled';

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 12px 20px 20px;
`;

const BottomText = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: ${({ theme }) => theme.palette.mobile.grey.g70};
  word-break: break-word;
`;

export default {
  Bottom,
  BottomText,
};
