import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
	build: {
		lib: {
			entry: "./src/index.ts",
			name: "AppleMusicLikeLyricsLyric",
			fileName: "amll-lyric",
			formats: ["es", "cjs"],
		},
		rollupOptions: {
			external: ["@applemusic-like-lyrics/ttml", "pako"],
		},
	},
	resolve: {
		alias: {
			"@applemusic-like-lyrics/ttml": path.resolve(
				__dirname,
				"../ttml/src",
			),
		},
	},
	plugins: [dts()],
});
