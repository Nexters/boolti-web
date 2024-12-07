interface Props {
  checked: boolean;
}

export const SquareCheckIcon = ({ checked }: Props) => {
  return checked ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect width="20" height="20" rx="4" fill="#282B33" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.744 6.66828L8.71719 14.4936L4.25854 9.56778L5.74132 8.22563L8.71125 11.5067L14.2559 5.33203L15.744 6.66828Z"
        fill="white"
      />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="0.5" y="0.5" width="19" height="19" rx="3.5" stroke="#C8CCDC" />
      <path d="M5 8.89655L8.71429 13L15 6" stroke="#D8DBE5" strokeWidth="2" />
    </svg>
  );
};
