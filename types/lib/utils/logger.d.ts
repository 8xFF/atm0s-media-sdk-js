import { LogLevel } from './types';
export declare function setLogLevel(level: LogLevel): void;
export declare function getLogger(prefix: string): {
    log: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
};
//# sourceMappingURL=logger.d.ts.map