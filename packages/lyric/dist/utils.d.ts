import { LyricLine, LyricWord } from './types';

export declare const createLine: (line: Partial<LyricLine>) => LyricLine;
export declare const createWord: (word: Partial<LyricWord>) => LyricWord;
export declare const parseTime: (time: string) => number;
/**
 * 将一个时间戳的分、秒、毫秒三段文本转换为毫秒。
 *
 * 毫秒段可以省略，省略时按 `0` 计；
 * 毫秒不足三位时视为在后位省略了 `0`，即 `.1` 为 100 毫秒、`.02` 为 20 毫秒；
 * 超过三位的部分直接截断。
 */
export declare const parseTimestampParts: (minStr: string, secStr: string, msStr?: string) => number;
export declare const formatTime: (ms: number) => string;
export declare const normalizeTimestamp: (ms: number) => number;
export declare const normalizeDuration: (duration: number) => number;
/**
 * LRC 家族时间戳可表示的最大值，即 `999:59.999`
 *
 * 时间戳的分钟为 1 至 3 位、秒为 1 至 2 位、毫秒为 1 至 6 位，
 * 因此能写出来又读得回来的最大时间就到这里
 */
export declare const MAX_LRC_TIMESTAMP: number;
/**
 * 将时间钳制到 LRC 家族可表示的范围内
 * @param ms 时间，单位为毫秒
 * @returns 钳制后的时间
 */
export declare const clampTimestamp: (ms: number) => number;
export type DeepRequired<T> = T extends object ? {
    [P in keyof T]-?: DeepRequired<NonNullable<T[P]>>;
} : T;
