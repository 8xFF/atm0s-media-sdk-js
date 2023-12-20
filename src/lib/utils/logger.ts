import { LogLevel } from './types';

let logLevel: LogLevel = LogLevel.Warn;

export function setLogLevel(level: LogLevel) {
  logLevel = level;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function getLogger(prefix: string) {
  return {
    log: (...args: any[]) => {
      if (logLevel >= LogLevel.Debug) {
        console.log(`[${prefix}]`, ...args);
      }
    },
    debug: (...args: any[]) => {
      if (logLevel >= LogLevel.Debug) {
        console.debug(`[${prefix}]`, ...args);
      }
    },
    info: (...args: any[]) => {
      if (logLevel >= LogLevel.Info) {
        console.info(`[${prefix}]`, ...args);
      }
    },
    warn: (...args: any[]) => {
      if (logLevel >= LogLevel.Warn) {
        console.warn(`[${prefix}]`, ...args);
      }
    },
    error: (...args: any[]) => {
      if (logLevel >= LogLevel.Error) {
        console.error(`[${prefix}]`, ...args);
      }
    },
  };
}
