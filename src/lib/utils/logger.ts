/* eslint-disable @typescript-eslint/no-explicit-any */
export function getLogger(prefix: string) {
  return {
    log: (...args: any[]) => console.log(prefix, ...args),
    debug: (...args: any[]) => console.debug(prefix, ...args),
    info: (...args: any[]) => console.info(prefix, ...args),
    warn: (...args: any[]) => console.warn(prefix, ...args),
    error: (...args: any[]) => console.error(prefix, ...args),
  };
}
