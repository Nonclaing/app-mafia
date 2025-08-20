export enum breakpoint {
  xs = 0,
  sm = 640,
  md = 768,
  lg = 1024,
  xl = 1280,
}

export const devices = {
  mobile: breakpoint.xs,
  tablet: breakpoint.md,
  desktop: breakpoint.xl,
};

export const ssrWidth = () => {
  const { isMobile, isTablet } = useDevice();
  if (isMobile) return devices.mobile;
  if (isTablet) return devices.tablet;
  return devices.desktop;
};
