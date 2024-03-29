export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.indexOf('82') == 0) {
    // +82
    return phoneNumber.replace(/(^82)(2|\d{2})(\d+)?(\d{4})$/, '+$1-$2-$3-$4');
  } else if (phoneNumber.indexOf('1') == 0) {
    // 1588, 1566, 1677, ...
    return phoneNumber.replace(/(^1\d{3})(\d{4})$/, '$1-$2');
  }
  // 02/0504/0505/010/011/031
  return phoneNumber.replace(/(^02|^0504|^0505|^0\d{2})(\d+)?(\d{4})$/, '$1-$2-$3');
};
