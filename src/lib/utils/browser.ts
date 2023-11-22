// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let navigator: any;

export function isFirefox() {
  return (
    typeof navigator != 'undefined' &&
    typeof navigator.userAgent != 'undefined' &&
    navigator.userAgent.toLowerCase().indexOf('firefox') > -1
  );
}
