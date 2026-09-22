/**
 * @module qrc-codec
 * @description
 * 此模块是加密与解密 QRC 歌词的核心。
 * 提供了两个主要的公共函数：`decryptQrc` 和 `encryptQrc`。
 *
 * 非标准 3DES 算法实现由 `custom_des` 模块提供。
 *
 * 迁移自 https://github.com/apoint123/qrc-decoder
 */
/**
 * 解密十六进制字符串格式的 Qrc 歌词数据
 * 解密后可去头尾 XML 数据后通过调用 `parseQrc` 解析歌词行
 * @param encryptedHexString 十六进制格式的字符串，代表被加密的歌词数据
 * @returns 被解密出来的歌词字符串，是前后有 XML 混合的 QRC 歌词
 */
export declare function decryptQrcHex(encryptedHexString: string): string;
/**
 * 对明文执行加密操作。
 * @param plaintext 明文字符串
 * @returns 十六进制格式的字符串，代表被加密的歌词数据
 */
export declare function encryptQrcHex(plaintext: string): string;
