export interface ShowInfoFormInputs {
  name: string;
  date: string;
  startTime: string;
  runningTime: string;
  placeName: string;
  placeStreetAddress: string;
  placeDetailAddress: string;
  notice: string;
  hostName: string;
  hostPhoneNumber: string;
}

export interface ShowTicketFormInputs {
  startDate: string;
  endDate: string;
  ticketNotice: string;
}

export interface ShowTeamFromInputs {
  name: string;
  members?: Array<{
    id?: number;
    userCode: string;
    roleName: string;
  }>;
}
