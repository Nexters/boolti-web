import { Button, mq_lg } from '@boolti/ui';
import styled from '@emotion/styled';
import { m } from 'framer-motion';

const Container = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.grey.w};
  box-shadow: 0px 8px 14px 0px ${({ theme }) => theme.palette.shadow};

  &:not(:first-of-type) {
    margin-top: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px 8px 0px 0px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  padding: 24px 28px;

  &:last-child {
    border-radius: 8px;
  }
`;

const HeaderNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const Handle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.palette.grey.g40};
  cursor: move;
`

const Name = styled.span`
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.sh2};
`;

const EditButton = styled(Button)`
  padding: 13px 18px;

  span {
    display: none;
    margin-left: 8px;
  }

  ${mq_lg} {
    span {
      display: inline;
    }
  }
`;

const Cast = styled(m.div)`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-top: none;
  border-bottom: none;
  overflow: hidden;
  max-height: 574px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const CastItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 14px 28px;
  flex: 1 0 50%;
  max-width: 50%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:first-of-type,
  &:nth-of-type(2) {
    padding-top: 18px;
  }
`;

const UserImage = styled.div`
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 32px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: var(--imgPath);
  margin-right: 6px;
  flex: 0 0 auto;
`;

const Username = styled.span`
  color: ${({ theme }) => theme.palette.grey.g90};
  ${({ theme }) => theme.typo.b3};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 0 1 auto;
`;

const Rolename = styled.span`
  color: ${({ theme }) => theme.palette.grey.g50};
  ${({ theme }) => theme.typo.b3};
  margin-left: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 0 1 auto;
  max-width: 100px;
`;

const CollapseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 0px 0px 8px 8px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g20};
  border-top: none;
  ${({ theme }) => theme.typo.sh1};
  color: ${({ theme }) => theme.palette.grey.g70};
  padding: 19px 32px;

  & > svg {
    margin-left: 8px;
  }
`;

export default {
  Container,
  Header,
  HeaderNameWrapper,
  Handle,
  Name,
  Cast,
  CollapseButton,
  EditButton,
  CastItem,
  UserImage,
  Username,
  Rolename,
};
