import { LyricLine } from '../types';

/**
 * 解析 LYS 格式的歌词字符串
 * @param lys 歌词字符串
 * @returns 成功解析出来的歌词
 */
export declare function parseLys(lys: string): LyricLine[];
/**
 * 将歌词数组转换为 LYS 格式的字符串
 * @param lines 歌词数组
 * @returns LYS 格式的字符串
 */
export declare function stringifyLys(lines: LyricLine[]): string;
