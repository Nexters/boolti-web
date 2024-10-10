import { useSuperAdminInvitationCodeList } from '@boolti/api';
import Styled from './TicketPage.styles';
import { ChevronDownIcon, ChevronUpIcon } from '@boolti/icon';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import BaseBadge from '~/components/BaseBadge/BaseBadge';
const { CodeList, CodeListContainer, CodeListItem, CodeListToggleSection } = Styled;

const InvitationCodeList = ({ ticketId }: { ticketId: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const { data: codes } = useSuperAdminInvitationCodeList(ticketId);

  const toggleText = isOpen ? '초청 코드 접기' : '초청 코드 펼쳐보기';

  const getCodeIndex = (index: number) => {
    return `${index + 1}`.padStart(3, '0');
  };

  return (
    <CodeListContainer>
      <CodeList>
        {isOpen
          ? codes?.map((code, index) => (
              <>
                <CodeListItem key={code.code}>
                  <span>
                    No. {getCodeIndex(index)}
                    <div style={{ marginLeft: 12 }}>{code.code}</div>
                  </span>
                  <BaseBadge
                    style={{ marginLeft: 12 }}
                    color={code.used ? theme.palette.grey.g60 : theme.palette.status.success}
                    backgroundColor={code.used ? theme.palette.grey.g20 : theme.palette.green.sub}
                    label={code.used ? '사용 완료' : '사용 가능'}
                  />
                </CodeListItem>
              </>
            ))
          : null}
      </CodeList>

      <CodeListToggleSection onClick={() => setIsOpen((isOpen) => !isOpen)}>
        {toggleText} &nbsp; {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </CodeListToggleSection>
    </CodeListContainer>
  );
};

export default InvitationCodeList;
