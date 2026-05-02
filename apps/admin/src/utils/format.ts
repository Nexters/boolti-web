export const formatPhoneNumber = (phoneNumber: string) => {
  const joinPhoneParts = (...parts: Array<string | undefined>) => parts.filter(Boolean).join('-');

  if (phoneNumber.indexOf('82') == 0) {
    // +82
    const match = phoneNumber.match(/(^82)(2|\d{2})(\d+)?(\d{4})$/);

    if (!match) {
      return phoneNumber;
    }

    return `+${joinPhoneParts(match[1], match[2], match[3], match[4])}`;
  } else if (phoneNumber.indexOf('1') == 0) {
    // 1588, 1566, 1677, ...
    const match = phoneNumber.match(/(^1\d{3})(\d{4})$/);

    if (!match) {
      return phoneNumber;
    }

    return joinPhoneParts(match[1], match[2]);
  }
  // 02/0504/0505/010/011/031
  const match = phoneNumber.match(/(^02|^0504|^0505|^0\d{2})(\d+)?(\d{4})$/);

  if (!match) {
    return phoneNumber;
  }

  return joinPhoneParts(match[1], match[2], match[3]);
};
