import { LyricLine } from '../types';

/**
 * 解析 LYL 格式的歌词字符串
 * @param lyl 歌词字符串
 * @returns 成功解析出来的歌词
 */
export declare function parseLyl(lyl: string): LyricLine[];
/**
 * 将歌词数组转换为 LYL 格式的字符串
 * @param lines 歌词数组
 * @returns LYL 格式的字符串
 */
export declare function stringifyLyl(lines: LyricLine[]): string;
