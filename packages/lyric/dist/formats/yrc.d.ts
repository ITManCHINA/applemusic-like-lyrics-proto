import { LyricLine } from '../types';

/**
 * 解析 YRC 格式的歌词字符串
 * @param yrc 歌词字符串
 * @returns 成功解析出来的歌词
 */
export declare function parseYrc(yrc: string): LyricLine[];
/**
 * 将歌词数组转换为 YRC 格式的字符串
 * @param lines 歌词数组
 * @returns YRC 格式的字符串
 */
export declare function stringifyYrc(lines: LyricLine[]): string;
