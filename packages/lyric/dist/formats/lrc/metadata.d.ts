import { LrcMetadata } from './types';

/**
 * 解析一行 LRC 元数据，如 `[ti:标题]`
 * @param line 已去除首尾空白的单行文本
 * @returns 元数据键值对，若不是元数据行则为 `null`
 */
export declare function parseLrcMetadataLine(line: string): LrcMetadata | null;
/**
 * 将元数据合并进目标元数据表
 *
 * 同名键的取值会按顺序合并并去重
 * @param target 目标元数据表，会被就地修改
 * @param source 待合并的元数据表
 */
export declare function mergeMetadata(target: LrcMetadata, source: LrcMetadata): void;
/**
 * 将元数据表生成为 LRC 元数据行
 * @param metadata 元数据表
 * @returns 元数据行数组，没有可输出的元数据时为空数组
 */
export declare function generateLrcMetadataLines(metadata: LrcMetadata): string[];
