import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ShowDetailLayout from '~/components/ShowDetailLayout';
import ShowInvitationTicketFormContent from '~/components/ShowInfoFormContent/ShowInvitationTicketFormContent';
import ShowSalesTicketFormContent from '~/components/ShowInfoFormContent/ShowSalesTicketFormContent';
import ShowTicketInfoFormContent from '~/components/ShowInfoFormContent/ShowTicketInfoFormContent';
import { ShowTicketFormInputs } from '~/components/ShowInfoFormContent/types';
import { InvitationTicketFormInputs } from '~/components/TicketForm/InvitationTicketForm';
import { SalesTicketFormInputs } from '~/components/TicketForm/SalesTicketForm';

import Styled from './ShowTicketPage.styles';

const ShowTicketPage = () => {
  const showTicketForm = useForm<ShowTicketFormInputs>();
  const [salesTicketList, setSalesTicketList] = useState<SalesTicketFormInputs[]>([]);
  const [invitationTicketList, setInvitationTicketList] = useState<InvitationTicketFormInputs[]>(
    [],
  );

  return (
    <ShowDetailLayout showName="불다람쥐 파이어 쇼">
      <Styled.ShowTicketPage>
        <Styled.ShowTicketForm>
          <Styled.ShowTicketFormContent>
            <ShowTicketInfoFormContent form={showTicketForm} showDate="2024-03-02" />
          </Styled.ShowTicketFormContent>
          <Styled.ShowTicketFormDivider />
          <Styled.ShowTicketFormContent>
            <ShowSalesTicketFormContent
              salesTicketList={salesTicketList}
              onSubmitTicket={(ticket) => {
                setSalesTicketList((prevList) =>
                  prevList.filter((prevTicket) => prevTicket.name !== ticket.name),
                );
              }}
              onDeleteTicket={(ticket) => {
                setSalesTicketList((prevList) =>
                  prevList.filter((prevTicket) => prevTicket.name !== ticket.name),
                );
              }}
            />
          </Styled.ShowTicketFormContent>
          <Styled.ShowTicketFormDivider />
          <Styled.ShowTicketFormContent>
            <ShowInvitationTicketFormContent
              invitationTicketList={invitationTicketList}
              onSubmitTicket={(ticket) => {
                setInvitationTicketList((prevList) => [...prevList, ticket]);
              }}
              onDeleteTicket={(ticket) => {
                setInvitationTicketList((prevList) =>
                  prevList.filter((prevTicket) => prevTicket.name !== ticket.name),
                );
              }}
            />
          </Styled.ShowTicketFormContent>
        </Styled.ShowTicketForm>
      </Styled.ShowTicketPage>
    </ShowDetailLayout>
  );
};

export default ShowTicketPage;
