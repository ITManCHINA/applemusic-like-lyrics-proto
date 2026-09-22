/**
 * @internal
 * @module custom_des
 * @description
 * 本模块包含了为解密 QRC 歌词而移植的、非标准的类 DES 算法的底层实现。
 *
 * <h2>
 * <strong>警告：该 DES 实现并非标准实现！</strong>
 * </h2>
 *
 * 它是结构类似DES的、但完全私有的分组密码算法。
 * 本实现仅用于 QRC 歌词解密，不应用于实际安全目的。
 */
export declare enum Mode {
    Encrypt = 0,
    Decrypt = 1
}
export type KeySchedule = Int32Array;
/**
 * DES 密钥调度算法。
 * 从一个64位的主密钥（实际使用56位，每字节的最低位是奇偶校验位，被忽略）
 * 生成16个48位的轮密钥。
 *
 * @param key 8字节的DES密钥
 * @param mode 加密或解密模式
 */
export declare function keySchedule(key: Uint8Array, mode: Mode): KeySchedule;
/**
 * DES 加密/解密单个64位数据块。
 *
 * @param input 8字节的输入数据块 (明文或密文)。
 * @param output 8字节的可变切片，用于存储输出数据块 (密文或明文)。
 * @param keySchedule 一个包含16个轮密钥的向量的引用，每个轮密钥是6字节。
 */
export declare function desCrypt(input: Uint8Array, output: Uint8Array, keySchedule: KeySchedule): void;
