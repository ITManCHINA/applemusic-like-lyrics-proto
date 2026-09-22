const child_process = require("child_process");
const { resolve } = require("path");

let exit = false;

const tasks = [
	{
		cmd: "cargo",
		args: ["watch", "-i", ".gitignore", "-i", "pkg/*", "-s", '"wasm-pack build --target bundler --release --scope applemusic-like-lyrics"'],
		cwd: resolve(__dirname, "../../lyric"),
	},
	{
		cmd: "cargo",
		args: ["watch", "-i", ".gitignore", "-i", "pkg/*", "-s", '"wasm-pack build --target bundler --release --scope applemusic-like-lyrics"'],
		cwd: resolve(__dirname, "../../ws-protocol"),
	},
	{
		cmd: "pnpm",
		args: ["build", "--watch"],
		cwd: resolve(__dirname, "../../core"),
	},
	{
		cmd: "pnpm",
		args: ["build", "--watch"],
		cwd: resolve(__dirname, "../../ttml"),
	},
	{
		cmd: "pnpm",
		args: ["build", "--watch"],
		cwd: resolve(__dirname, "../../react"),
	},
	{
		cmd: "pnpm",
		args: ["exec", "vite", "build", "--watch", "--mode", "dev"],
		cwd: resolve(__dirname, "../"),
	},
].map((v) => {
    console.log("Running cmd in", v.cwd, ":", v.cmd, ...v.args);
	const p = child_process.spawn( [v.cmd, ...v.args].join(" "), {
		cwd: v.cwd,
		shell: true,
	});
	p.stdout.pipe(process.stdout);
	p.stderr.pipe(process.stderr);
	p.addListener("close", () => {
		if (exit) return;
		else process.exit(-1);
	});
	return p;
});

process.addListener("beforeExit", () => {
	exit = true;
	tasks.forEach((v) => {
		v.kill("SIGKILL");
	});
});
