export interface GiftInfoResponse {
  /**
   * example: 홍길동
   * 선물 받는사람 이름
   */
  recipientName: string;
  /**
   * example: 생일 축하해요!
   * 선물 메시지
   */
  message: string;
  /**
   * example: https://dudoong.com/_next/image?url=https%3A%2F%2Fasset.dudoong.com%2Fproduction%2Fevent%2F149%2F0d71ec8a-20cd-4022-bf41-e76555b949e2.jpeg&w=640&q=75
   * 선물 이미지 URL
   */
  giftImageUrl: string;
  /**
   * example: https://dudoong.com/_next/image?url=https%3A%2F%2Fasset.dudoong.com%2Fproduction%2Fevent%2F149%2F0d71ec8a-20cd-4022-bf41-e76555b949e2.jpeg&w=640&q=75
   * 공연 이미지 URL
   */
  showImageUrl: string;
  /**
   * example: 두둥페스티벌
   * 공연 이름
   */
  showName: string;
  /**
   * 공연 날짜
   */
  showDate: string;
}
