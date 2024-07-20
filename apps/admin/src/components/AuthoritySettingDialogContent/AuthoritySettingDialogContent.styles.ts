import styled from '@emotion/styled';

interface InputWrapperProps {
  text: string;
}

const Container = styled.div``;

const Form = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 28px;
`;

const InputWrapper = styled.div<InputWrapperProps>`
  ${({ theme }) => theme.typo.b3};
  border: 1px solid ${({ text, theme }) => (text ? theme.palette.grey.g90 : theme.palette.grey.g20)};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.grey.w};
  padding: 12px;
  margin-right: 8px;
  flex: auto;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  &::placeholder {
    color: ${({ theme }) => theme.palette.grey.g30};
  }
`;

const MemberListWrapper = styled.div``;

const MemberListTitle = styled.h3`
  ${({ theme }) => theme.typo.b3};
  color: ${({ theme }) => theme.palette.grey.g90};
  margin-bottom: 20px;
`;

const MemberList = styled.ul``;

const MemberListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.typo.b3};

  & + & {
    margin-top: 20px;
  }
`;

const MemberInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MemberImage = styled.img`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  object-fit: cover;
`;

const MemberName = styled.p`
  margin-left: 6px;
  margin-right: 4px;
  color: ${({ theme }) => theme.palette.grey.g90};
`;

const MemberSelfLabel = styled.span`
  color: ${({ theme }) => theme.palette.grey.g50};
`;

const MemberType = styled.span`
  color: ${({ theme }) => theme.palette.grey.g60};
`;

export default {
  Container,
  Form,
  InputWrapper,
  Input,
  MemberListWrapper,
  MemberListTitle,
  MemberList,
  MemberListItem,
  MemberInfoWrapper,
  MemberImage,
  MemberName,
  MemberSelfLabel,
  MemberType,
};
