import { LyricLine, LyricParseResult } from '../../types';
import { LrcMode } from './types';

/**
 * 普通 LRC 显式结束时间戳的输出配置
 *
 * 逐字歌词的结束时间戳由最后一个音节携带，不受此配置影响
 */
export interface LrcEndTimestampOptions {
    /**
     * 输出策略
     * - `"none"`: 不输出
     * - `"always"`: 总是输出
     * - `"interval"`: 与下一行的间隔不小于 `intervalGap` 时输出
     * @default "none"
     */
    mode?: "none" | "always" | "interval";
    /**
     * 触发间隔，单位毫秒，仅在 `mode` 为 `"interval"` 时有效
     * @default 5000
     */
    intervalGap?: number;
}
/**
 * 单种辅助行（翻译、音译或背景人声）的输出配置
 */
export interface LrcAuxiliaryLineOptions {
    /**
     * 是否输出该辅助行
     * @default true
     */
    enabled?: boolean;
    /**
     * 是否内联到主歌词行，仅在普通 LRC 模式下有效
     *
     * translation、romanization 与 backgroundVocal 中最多只有一个可以内联
     *
     * 内联时辅助文本会以半角圆括号 `(text)` 包裹
     */
    inline?: boolean;
}
/**
 * 辅助行的输出配置
 */
export interface LrcAuxiliaryLinesOptions {
    /**
     * 辅助行的输出顺序
     * @default "translation-first"
     */
    order?: "translation-first" | "romanization-first";
    /**
     * 翻译行设置
     */
    translation?: LrcAuxiliaryLineOptions;
    /**
     * 音译行设置
     */
    romanization?: LrcAuxiliaryLineOptions;
    /**
     * 背景人声设置
     */
    backgroundVocal?: LrcAuxiliaryLineOptions;
}
/**
 * 生成 LRC 家族歌词的配置
 */
export interface StringifyLrcLikeOptions {
    /**
     * 生成模式，详见 {@link LrcMode}
     * @default "plain"
     */
    mode?: LrcMode;
    /**
     * 逐字时间戳的括号类型，仅在 `enhanced` 和 `spl` 模式下有效
     * - `"angle"`: 使用 `<mm:ss.ms>`
     * - `"square"`: 使用 `[mm:ss.ms]`
     * @default "angle"
     */
    inlineBracket?: "angle" | "square";
    /**
     * 辅助行（翻译、音译、背景人声）的输出配置
     */
    auxiliaryLines?: LrcAuxiliaryLinesOptions;
    /**
     * 普通 LRC 的显式结束时间戳输出配置
     */
    endTimestamp?: LrcEndTimestampOptions;
}
export declare class LrcGenerator {
    private options;
    private features;
    constructor(options?: StringifyLrcLikeOptions);
    /**
     * 行首时间戳是否改用首个音节的开始时间
     *
     * 生成方括号时间戳时，按常见实现省略行首时间戳，只在行首写入首个音节的开始时间，
     * 生成尖括号时则写入行时间戳
     */
    private get usesFirstWordStartTime();
    /**
     * 生成 LRC 家族歌词
     * @param input 歌词行，或带元数据的解析结果
     * @returns 歌词文本
     */
    generate(input: LyricParseResult | LyricLine[]): string;
    private processSingleLine;
    /**
     * 渲染一行歌词，`lineText` 是已经处理过内联的整行文本
     */
    private renderBaseItem;
    private processEndTimestamp;
    /**
     * 将毫秒渲染为时间戳
     *
     * 传入的时间都已由 {@link normalizeLine} 归一化过，这里再钳制到时间戳可表示的最大值，
     * 保证写出来的时间戳都能被解析回来
     */
    private formatTimeTag;
}
