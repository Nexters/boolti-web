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
