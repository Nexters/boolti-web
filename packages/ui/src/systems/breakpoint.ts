const breakpoint = {
  desktop: '1120px',
  mobile: '640px',
} as const;

export const mq = `@media (min-width: ${breakpoint.mobile})`;

export const desktopMq = `@media (min-width: ${breakpoint.desktop})`;

export default breakpoint;
