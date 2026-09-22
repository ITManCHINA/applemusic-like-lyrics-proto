import { LyricParseResult } from '../../types';
import { LrcMode } from './types';

export interface ParseLrcLikeOptions {
    /**
     * 解析模式，详见 {@link LrcMode}
     * @default "spl"
     */
    mode?: LrcMode;
}
export declare class LrcParser {
    private readonly mode;
    /**
     * 匹配行内所有的逐字时间戳
     *
     * 例如 `<05:21.22>` 或 `[05:23.22]`，`[00:13]` 这样省略毫秒段的写法同样算数，省略时视作 `0`。
     * 秒与毫秒之间本应使用半角句号，这里也接受半角冒号，以兼容不规范的既有歌词文件
     */
    private static readonly WORD_TIMESTAMP_REGEX;
    constructor(options?: ParseLrcLikeOptions);
    /**
     * 解析 LRC 家族歌词
     * @param text 歌词文本
     * @returns 解析结果
     */
    parse(text: string): LyricParseResult;
    /**
     * 语法分析器
     */
    private tokenizeLine;
    private getLineFeatures;
    /**
     * 把整行被圆括号包裹的歌词行标记为背景人声，并去掉最外层的括号
     *
     * 与 YRC、QRC 的做法一致，只按整行是否被括号包裹判断。
     * 多个背景人声行各自独立处理，不做归并或配对
     * @param lines 已解析出来的歌词行
     * @param isBG 该行是否为背景人声行
     */
    private applyBackgroundVocal;
    /**
     * 尝试将一段文本记录为已出现过的某（组）歌词行的翻译
     *
     * 时间信息必须一致才会认为是翻译，否则视为独立的歌词行
     * @returns 是否成功记录为翻译
     */
    private appendTranslation;
    /**
     * 按时间戳找出与之对应的歌词行
     *
     * 翻译行可以不紧挨着主歌词行，所以在全部已出现的主歌词行里按开始时间查找。
     * 重复行写法的翻译需要每个时间戳都能找到宿主，只要有一个落空就不算翻译
     * @returns 对应的歌词行，时间信息不一致时为 `null`
     */
    private matchLinesByTime;
    /**
     * 将一行只有时间戳的歌词行作为上一（组）歌词行的显式结束时间
     *
     * 与行内写法 `文本[结束时间]` 一致，取该行最后一个时间戳作为结束时间。
     * 上一（组）歌词行不存在、已经有结束时间，或该时间戳不晚于其开始时间时，整行被忽略
     *
     * 重复行写法（`[t1][t2]文本`）会产生多条内容相同的歌词行，
     * 此时这个结束时间应该归属哪一条存在语义模糊：
     * 给最早的一条会让组内各行的结束时间不一致，给所有行又会造成时间区间相互重叠，
     * 格式本身没有说明哪种解读正确。这里选择只标记最后一条（即时间上最近一次出现）的行，
     * 组内其余行仍交给后续的推导逻辑决定结束时间
     */
    private appendExplicitEndTime;
    private parsePlainLines;
    private parseWordSyncLine;
    private finalizeLyricLines;
    /**
     * 决定所有尚未推导的时间，逐行歌词取下一行的开始时间，逐字歌词还会收尾最后一个音节
     */
    private resolveEndTimes;
    /**
     * 普通 LRC 模式丢弃逐字时间戳，只留下覆盖整行的单个音节
     */
    private stripWordTimings;
    /**
     * 将翻译展开成与主歌词行同时开始、同时结束的独立歌词行
     */
    private expandTranslations;
}
