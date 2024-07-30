import styled from '@emotion/styled';

const Container = styled.div`
  max-width: 330px;
  border-radius: 8px;
  margin: 0 auto;
  padding-top: 68px;
`;

const Recipient = styled.p`
  padding: 6px 12px;
  border-radius: 100px;
  ${({ theme }) => theme.typo.c1};
  background-color: ${({ theme }) => theme.palette.primary.o3};
  color: ${({ theme }) => theme.palette.grey.w};
  margin-bottom: 12px;
  font-weight: 600;
`;

const Wrapper = styled.div`
  background: linear-gradient(#ff5a14, #ffa883);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px 0 20px;
  border-radius: 8px 8px 0px 0px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    bottom: -10px;
    left: -10px;
    background-color: #32353e;
  }

  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    bottom: -10px;
    right: -10px;
    background-color: #32353e;
  }
`;

const InvitationDescription = styled.p`
  ${({ theme }) => theme.typo.sh2}
  color: ${({ theme }) => theme.palette.grey.w};
  text-align: center;
  height: 80px;
  max-height: 80px;
`;

const InvitationImage = styled.img`
  width: 100%;
  max-width: 270;
  margin-top: 28px;
`;

const ShowContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.grey.w};
  border-radius: 0px 0px 8px 8px;
  display: flex;
  align-items: center;
  padding: 24px 20px;
`;

const PosterImage = styled.img`
  width: 54px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.palette.grey.g10};
  margin-right: 16px;
`;

const ShowInformation = styled.div``;

const ShowTitle = styled.h3`
  word-break: keep-all;
  ${({ theme }) => theme.typo.point.p1};
  color: ${({ theme }) => theme.palette.grey.g100};
`;

const ShowDetailLink = styled.button`
  ${({ theme }) => theme.typo.b1}
  color: ${({ theme }) => theme.palette.grey.g60};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Footer = styled.div`
  width: 100%;
  margin: 64px auto 28px;
  text-align: center;
`;

const RegisterDescription = styled.p`
  margin-bottom: 16px;
  ${({ theme }) => theme.typo.b1};
  color: ${({ theme }) => theme.palette.grey.g20};
`;

const ExpireDate = styled.span`
  ${({ theme }) => theme.typo.sh0};
  color: ${({ theme }) => theme.palette.primary.o1};
`;

const Button = styled.button`
  width: 100%;
  height: 48px;
  padding: 0 20px;
  ${({ theme }) => theme.typo.sh0};
  background-color: ${({ theme }) => theme.palette.grey.g90};
  color: ${({ theme }) => theme.palette.grey.w};
  border-radius: 8px;
  text-align: center;
  cursor: pointer;

  &:disabled {
    color: ${({ theme }) => theme.palette.grey.g40};
    background-color: ${({ theme }) => theme.palette.grey.g70};
  }
`;

const CancelText = styled.span`
  ${({ theme }) => theme.typo.sh0};
  color: ${({ theme }) => theme.palette.primary.o1};
`;

export default {
  Container,
  Recipient,
  Wrapper,
  InvitationDescription,
  InvitationImage,
  ShowContainer,
  PosterImage,
  ShowInformation,
  ShowTitle,
  ShowDetailLink,
  Footer,
  RegisterDescription,
  ExpireDate,
  Button,
  CancelText,
};
