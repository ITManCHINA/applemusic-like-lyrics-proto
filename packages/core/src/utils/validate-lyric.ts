import type { LyricLine, LyricWord, LyricWordBase } from "../interfaces.ts";

function formatValue(value: unknown): string {
	return typeof value === "string" ? JSON.stringify(value) : String(value);
}

function assertTimestamp(
	value: unknown,
	path: string,
): asserts value is number {
	if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
		throw new TypeError(
			`Invalid lyric timestamp at ${path}: ${formatValue(value)}`,
		);
	}
}

function assertTimestampRange(
	value: { startTime: unknown; endTime: unknown },
	path: string,
): void {
	const startTime = value.startTime;
	const endTime = value.endTime;
	assertTimestamp(startTime, `${path}.startTime`);
	assertTimestamp(endTime, `${path}.endTime`);

	if (startTime > endTime) {
		throw new RangeError(
			`Invalid lyric timestamp range at ${path}: startTime ${startTime} is greater than endTime ${endTime}`,
		);
	}
}

/**
 * 验证歌词数据中的时间戳满足基本数值约束，例如非负、有限等
 */
export function assertValidLyricTimestamps(lines: readonly LyricLine[]): void {
	for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		const line = lines[lineIndex];
		const linePath = `lines[${lineIndex}]`;
		assertTimestampRange(line, linePath);

		for (let wordIndex = 0; wordIndex < line.words.length; wordIndex++) {
			const word = line.words[wordIndex];
			const wordPath = `${linePath}.words[${wordIndex}]`;
			assertTimestampRange(word, wordPath);

			if (word.ruby) {
				for (let rubyIndex = 0; rubyIndex < word.ruby.length; rubyIndex++) {
					assertTimestampRange(
						word.ruby[rubyIndex],
						`${wordPath}.ruby[${rubyIndex}]`,
					);
				}
			}
		}
	}
}

/**
 * 清洗和容错歌词数据中的时间戳，确保其为有限非负数值，且满足 startTime <= endTime
 * 专门针对 BetterNCM/网络歌词中末行 endTime: Infinity、负数偏移、缺失音节等情况提供健壮的容错机制
 */
export function sanitizeLyricLines(lines: readonly LyricLine[]): LyricLine[] {
	if (!Array.isArray(lines) || lines.length === 0) return [];

	const result: LyricLine[] = [];
	for (let i = 0; i < lines.length; i++) {
		const rawLine = lines[i];
		const startTime = Number.isFinite(rawLine.startTime)
			? Math.max(0, rawLine.startTime)
			: 0;

		let endTime = rawLine.endTime;
		if (!Number.isFinite(endTime) || endTime < startTime) {
			const nextLine = lines[i + 1];
			if (
				nextLine &&
				Number.isFinite(nextLine.startTime) &&
				nextLine.startTime > startTime
			) {
				endTime = nextLine.startTime;
			} else {
				endTime = startTime + 5000;
			}
		}

		const rawWords: LyricWord[] = Array.isArray(rawLine.words)
			? rawLine.words
			: [];
		const words: LyricWord[] = rawWords.map(
			(rawWord: LyricWord, j: number) => {
				const wStart = Number.isFinite(rawWord.startTime)
					? Math.max(0, rawWord.startTime)
					: startTime;
				let wEnd = rawWord.endTime;
				if (!Number.isFinite(wEnd) || wEnd < wStart) {
					const nextWord = rawWords[j + 1];
					if (
						nextWord &&
						Number.isFinite(nextWord.startTime) &&
						nextWord.startTime > wStart
					) {
						wEnd = nextWord.startTime;
					} else {
						wEnd = Math.max(wStart, endTime);
					}
				}

				const ruby = rawWord.ruby?.map((r: LyricWordBase) => {
					const rStart = Number.isFinite(r.startTime)
						? Math.max(0, r.startTime)
						: wStart;
					const rEnd = Number.isFinite(r.endTime)
						? Math.max(rStart, r.endTime)
						: wEnd;
					return {
						...r,
						startTime: rStart,
						endTime: rEnd,
					};
				});

			return {
				...rawWord,
				startTime: wStart,
				endTime: wEnd,
				ruby,
			};
		});

		if (words.length === 0) {
			words.push({
				word: "",
				startTime,
				endTime,
			});
		}

		result.push({
			...rawLine,
			startTime,
			endTime,
			words,
		});
	}

	return result;
}
