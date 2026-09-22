import { LyricLine } from '../types';

/**
 * 解析 LQE 格式的歌词字符串
 * @param lqe 歌词字符串
 * @returns 成功解析出来的歌词
 */
export declare function parseLqe(lqe: string): LyricLine[];
/**
 * 将歌词数组转换为 LQE 格式的字符串
 * @param lines 歌词数组
 * @returns LQE 格式的字符串
 */
export declare function stringifyLqe(lines: LyricLine[]): string;
