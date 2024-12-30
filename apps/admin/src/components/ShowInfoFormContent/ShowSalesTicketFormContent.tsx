import { PlusIcon, TrashIcon } from '@boolti/icon';
import { Badge, Button, TextButton, useDialog } from '@boolti/ui';
import { SubmitHandler } from 'react-hook-form';

import SalesTicketForm, { SalesTicketFormInputs } from '../TicketForm/SalesTicketForm';
import Styled from './ShowInfoFormContent.styles';

export interface SalesTicket {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  totalForSale: number;
}

interface ShowSalesTicketFormContentProps {
  salesTicketList: SalesTicket[];
  fullEditable?: boolean;
  disabled?: boolean;
  onSubmitTicket: SubmitHandler<SalesTicketFormInputs>;
  onDeleteTicket: (ticket: SalesTicket) => void;
}

const ShowSalesTicketFormContent = ({
  salesTicketList,
  fullEditable = false,
  disabled,
  onSubmitTicket,
  onDeleteTicket,
}: ShowSalesTicketFormContentProps) => {
  const salesTicketDialog = useDialog();

  const isSingleTicket = salesTicketList.length === 1;

  const handleSubmitTicket: SubmitHandler<SalesTicketFormInputs> = (data) => {
    salesTicketDialog.close();

    onSubmitTicket(data);
  };

  return (
    <Styled.TicketGroup>
      <Styled.TicketGroupHeader>
        <Styled.TicketGroupInfo>
          <Styled.TicketGroupTitle required>일반 티켓</Styled.TicketGroupTitle>
          <Styled.TicketGroupDescription>
            티켓 판매를 위해서는 최소 1개 이상의 티켓이 필요해요.
            <br />* 1매 이상 판매된 티켓은 삭제할 수 없습니다.
          </Styled.TicketGroupDescription>
        </Styled.TicketGroupInfo>
        <Styled.TicketAddButtonContainer>
          <Button
            type="button"
            colorTheme="netural"
            size="small"
            icon={<PlusIcon />}
            onClick={() => {
              salesTicketDialog.open({
                title: '일반 티켓 생성하기',
                content: <SalesTicketForm onSubmit={handleSubmitTicket} />,
              });
            }}
          >
            생성하기
          </Button>
        </Styled.TicketAddButtonContainer>
      </Styled.TicketGroupHeader>
      <Styled.MobileTicketGroupHeader>
        <Styled.MobileTicketGroupInfo>
          <Styled.TicketGroupTitle required>일반 티켓</Styled.TicketGroupTitle>
          <Styled.TicketAddButtonContainer>
            <TextButton
              type="button"
              size="small"
              colorTheme="netural"
              icon={<PlusIcon />}
              onClick={() => {
                salesTicketDialog.open({
                  title: '일반 티켓 생성하기',
                  content: <SalesTicketForm onSubmit={handleSubmitTicket} />,
                });
              }}
            >
              생성하기
            </TextButton>
          </Styled.TicketAddButtonContainer>
        </Styled.MobileTicketGroupInfo>
        <Styled.TicketGroupDescription>
          티켓 판매를 위해서는 최소 1개 이상의 티켓이 필요해요.
          <br />* 1매 이상 판매된 티켓은 삭제할 수 없습니다.
        </Styled.TicketGroupDescription>
      </Styled.MobileTicketGroupHeader>
      {salesTicketList.length > 0 && (
        <Styled.TicketList>
          {salesTicketList.map((ticket) => {
            const isSoldTicket = ticket.totalForSale > ticket.quantity;
            const isDeleteDisabled = isSingleTicket || isSoldTicket;

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
                    <Styled.TicketDescription>{ticket.price}원</Styled.TicketDescription>
                  </Styled.TicketInfo>
                  <Styled.TicketAction>
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
                    >
                      삭제하기
                    </TextButton>
                  </Styled.TicketAction>
                  <Styled.MobileTicketAction>
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
              </Styled.Ticket>
            );
          })}
        </Styled.TicketList>
      )}
    </Styled.TicketGroup>
  );
};

export default ShowSalesTicketFormContent;
