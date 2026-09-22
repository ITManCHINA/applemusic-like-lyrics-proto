import { LyricLine } from '../types';

/**
 * 解析 QRC 格式的歌词字符串
 * @param qrc 歌词字符串
 * @returns 成功解析出来的歌词
 */
export declare function parseQrc(qrc: string): LyricLine[];
/**
 * 将歌词数组转换为 QRC 格式的字符串
 * @param lines 歌词数组
 * @returns QRC 格式的字符串
 */
export declare function stringifyQrc(lines: LyricLine[]): string;
