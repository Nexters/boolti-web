import { useInvitationCodeList } from '@boolti/api';
import { ChevronDownIcon, ChevronUpIcon } from '@boolti/icon';
import { Badge } from '@boolti/ui';
import { useState } from 'react';

import Styled from './ShowInfoFormContent.styles';

interface ShowInvitationCodeListProps {
  invitationTicketId: number;
  isShowEnded?: boolean;
}

const ShowInvitationCodeList = ({
  invitationTicketId,
  isShowEnded,
}: ShowInvitationCodeListProps) => {
  const { data: invitationCodeList } = useInvitationCodeList(invitationTicketId);

  const [isTicketCodeListOpen, setIsTicketCodeListOpen] = useState(false);

  if (!invitationCodeList || invitationCodeList.length === 0) return null;

  return (
    <>
      {isTicketCodeListOpen && (
        <Styled.TicketCodeList>
          {invitationCodeList.map(({ id, code, used }, index) => (
            <Styled.TicketCode key={id}>
              <Styled.TicketCodeInfo>
                <Styled.TicketCodeNumber>
                  No. {`${index + 1}`.padStart(3, '0')}
                </Styled.TicketCodeNumber>
                <Styled.TicketCodeText>{code}</Styled.TicketCodeText>
              </Styled.TicketCodeInfo>
              <Styled.TicketCodeStatus>
                {used ? (
                  <Badge colorTheme="grey">사용 완료</Badge>
                ) : isShowEnded ? (
                  <Badge colorTheme="purple">미사용</Badge>
                ) : (
                  <Badge colorTheme="green">사용 가능</Badge>
                )}
              </Styled.TicketCodeStatus>
            </Styled.TicketCode>
          ))}
        </Styled.TicketCodeList>
      )}
      <Styled.TicketCodeListButton
        type="button"
        onClick={() => {
          setIsTicketCodeListOpen((prev) => !prev);
        }}
      >
        {isTicketCodeListOpen ? (
          <>
            초청 코드 접기 <ChevronUpIcon />
          </>
        ) : (
          <>
            초청 코드 펼쳐보기 <ChevronDownIcon />
          </>
        )}
      </Styled.TicketCodeListButton>
    </>
  );
};

export default ShowInvitationCodeList;
