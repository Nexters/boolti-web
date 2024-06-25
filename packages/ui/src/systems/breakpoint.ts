const breakpoint = {
  desktop: '1120px',
  tablet: '768px',
  mobile: '641px',
} as const;

export const mq_lg = `@media (min-width: ${breakpoint.mobile})`;
export const mq_md = `@media (min-width: ${breakpoint.mobile}) and (max-width: ${breakpoint.desktop})`;

export default breakpoint;
