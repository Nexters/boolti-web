import { PlusIcon, TrashIcon } from '@boolti/icon';
import { Badge, Button, TextButton, useDialog } from '@boolti/ui';
import { SubmitHandler } from 'react-hook-form';

import InvitationTicketForm, {
  InvitationTicketFormInputs,
} from '../TicketForm/InvitationTicketForm';
import Styled from './ShowInfoFormContent.styles';
import ShowInvitationCodeList from './ShowInvitationCodeList';

export interface InvitationTicket {
  id?: number;
  name: string;
  quantity: number;
  totalForSale: number;
}

interface ShowInvitationTicketFormContentProps {
  invitationTicketList: InvitationTicket[];
  description: React.ReactNode;
  fullEditable?: boolean;
  disabled?: boolean;
  isShowEnded?: boolean;
  onSubmitTicket: SubmitHandler<InvitationTicketFormInputs>;
  onDeleteTicket: (ticket: InvitationTicket) => void;
}

const ShowInvitationTicketFormContent = ({
  invitationTicketList,
  description,
  fullEditable,
  disabled,
  isShowEnded,
  onSubmitTicket,
  onDeleteTicket,
}: ShowInvitationTicketFormContentProps) => {
  const invitationTicketDialog = useDialog();

  const handleSubmitTicket: SubmitHandler<InvitationTicketFormInputs> = (data) => {
    invitationTicketDialog.close();

    onSubmitTicket(data);
  };

  return (
    <Styled.TicketGroup>
      <Styled.TicketGroupHeader>
        <Styled.TicketGroupInfo>
          <Styled.TicketGroupTitle>초청 티켓</Styled.TicketGroupTitle>
          <Styled.TicketGroupDescription>{description}</Styled.TicketGroupDescription>
        </Styled.TicketGroupInfo>
        <Styled.TicketAddButtonContainer>
          <Button
            type="button"
            colorTheme="netural"
            size="small"
            icon={<PlusIcon />}
            onClick={() => {
              invitationTicketDialog.open({
                title: '초청 티켓 생성하기',
                content: <InvitationTicketForm onSubmit={handleSubmitTicket} />,
              });
            }}
          >
            생성하기
          </Button>
        </Styled.TicketAddButtonContainer>
      </Styled.TicketGroupHeader>
      <Styled.MobileTicketGroupHeader>
        <Styled.MobileTicketGroupInfo>
          <Styled.TicketGroupTitle>초청 티켓</Styled.TicketGroupTitle>
          <Styled.TicketAddButtonContainer>
            <TextButton
              type="button"
              size="small"
              colorTheme="netural"
              icon={<PlusIcon />}
              onClick={() => {
                invitationTicketDialog.open({
                  title: '초청 티켓 생성하기',
                  content: <InvitationTicketForm onSubmit={handleSubmitTicket} />,
                });
              }}
            >
              생성하기
            </TextButton>
          </Styled.TicketAddButtonContainer>
        </Styled.MobileTicketGroupInfo>
        <Styled.TicketGroupDescription>{description}</Styled.TicketGroupDescription>
      </Styled.MobileTicketGroupHeader>

      {invitationTicketList.length > 0 && (
        <Styled.TicketList>
          {invitationTicketList.map((ticket) => {
            const isSoldTicket = ticket.totalForSale > ticket.quantity;
            const isDeleteDisabled = isSoldTicket;

            return (
              <Styled.Ticket key={ticket.id ?? ticket.name}>
                <Styled.TicketContent>
                  <Styled.TicketInfo>
                    <Styled.TicketTitle>
                      <Styled.TicketTitleText>{ticket.name}</Styled.TicketTitleText>
                      <Badge colorTheme={ticket.quantity === 0 ? 'grey' : 'red'}>
                        재고 {ticket.quantity}/{ticket.totalForSale}
                      </Badge>
                    </Styled.TicketTitle>
                    <Styled.TicketDescription>1인 1매</Styled.TicketDescription>
                  </Styled.TicketInfo>
                  <Styled.TicketAction>
                    <Button
                      type="button"
                      colorTheme="line"
                      size="bold"
                      disabled={(() => {
                        if (disabled) return disabled;
                        if (fullEditable) return false;

                        return isDeleteDisabled;
                      })()}
                      onClick={() => onDeleteTicket(ticket)}
                    >
                      삭제하기
                    </Button>
                  </Styled.TicketAction>
                  <Styled.MobileTicketAction disabled={disabled}>
                    <TextButton
                      type="button"
                      colorTheme="netural"
                      size="small"
                      icon={<TrashIcon />}
                      disabled={(() => {
                        if (disabled) return disabled;
                        if (fullEditable) return false;

                        return isDeleteDisabled;
                      })()}
                      onClick={() => onDeleteTicket(ticket)}
                    />
                  </Styled.MobileTicketAction>
                </Styled.TicketContent>
                {ticket.id !== undefined && (
                  <Styled.TicketCodeListContainer>
                    <ShowInvitationCodeList
                      invitationTicketId={ticket.id}
                      isShowEnded={isShowEnded}
                    />
                  </Styled.TicketCodeListContainer>
                )}
              </Styled.Ticket>
            );
          })}
        </Styled.TicketList>
      )}
    </Styled.TicketGroup>
  );
};

export default ShowInvitationTicketFormContent;
