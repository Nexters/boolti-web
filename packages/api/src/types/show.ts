export interface ShowImage {
  sequence: number;
  thumbnailPath: string;
  path: string;
}

export interface ShowPlace {
  name: string;
  streetAddress: string;
  detailAddress: string;
}

export interface ShowHost {
  name: string;
  phoneNumber: string;
}

export interface ShowResponse {
  id: number;
  name: string;
  images: ShowImage[];
  date: string;
  runningTime: number;
  place: ShowPlace;
  notice: string;
  host: ShowHost;
  isEnded: boolean;
}
