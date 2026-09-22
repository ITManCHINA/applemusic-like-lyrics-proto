import { LyricLine, LyricWord } from '../../types';

/**
 * 复制一行歌词并归一化其中所有的时间
 * @param line 一行歌词
 * @returns 归一化后的副本
 */
export declare function normalizeLine(line: LyricLine): LyricLine;
/**
 * 将一组音节拼接为完整文本
 * @param words 音节数组
 * @returns 拼接后的文本
 */
export declare function joinWords(words: LyricWord[]): string;
/**
 * 判断一行歌词是否有文本内容
 * @param line 一行歌词
 * @returns 是否有文本内容
 */
export declare function hasText(line: LyricLine): boolean;
/**
 * 判断一组音节是否为逐字歌词
 *
 * 逐行歌词只有一个音节，且该音节与歌词同时开始，
 * 因此可以直接由音节推导出来，无需额外的标记
 * @param words 音节数组
 * @param startTime 歌词行的开始时间
 * @returns 是否为逐字歌词
 */
export declare function isWordSyncLyric(words: LyricWord[], startTime: number): boolean;
/**
 * 判断一段歌词文本是否为背景人声
 *
 * 只有整段文本都被圆括号包裹时才算数，半角与全角括号都接受。
 * 括号内没有内容的不算，避免把 `()` 这样的写法当作背景人声
 * @param text 一段歌词文本
 * @returns 是否为背景人声
 */
export declare function isBackgroundVocalText(text: string): boolean;
/**
 * 去掉背景人声最外层的圆括号
 * @param words 音节数组，会被就地修改
 */
export declare function trimBackgroundVocalParentheses(words: LyricWord[]): void;
