import { LyricLine } from '../types';

/**
 * 将歌词数组转换为 ASS 字幕格式字符串
 * @param lines 歌词数组
 * @returns ASS 字幕格式字符串
 */
export declare function stringifyAss(lines: LyricLine[]): string;
