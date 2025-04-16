export interface ShowBasicInfoFormInputs {
  name: string;
  date: string;
  startTime: string;
  runningTime: string;
  placeName: string;
  placeStreetAddress: string;
  placeDetailAddress: string;
  latitude: number;
  longitude: number;
}

export interface ShowDetailInfoFormInputs {
  notice: string;
  hostName: string;
  hostPhoneNumber: string;
}

export interface ShowSalesInfoFormInputs {
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
