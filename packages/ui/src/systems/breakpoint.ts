const breakpoint = {
  desktop: '1120px',
  mobile: '640',
} as const;

export const mq = (key: keyof typeof breakpoint) => `@media (min-width: ${breakpoint[key]}px)`;

export default breakpoint;
