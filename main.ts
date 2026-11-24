// Entry for a make.fun TikTok-ad bounty (Node 22, standard library only).
//
// The entry is the video: a short vertical ad for make.fun, posted publicly on
// TikTok from a public account, ending with make.fun's referral end card and
// the poster's referral code, with the bounty's line and play code in the
// caption. This program's only job is to hand the video's address to the
// gate: it copies VIDEO.json from the repository root to /output/VIDEO.json.
//
// VIDEO.json names the posted video:
// https://www.tiktok.com/@arkana77_/video/7711715621414685958
// (posted publicly 24 Nov 2026 from @arkana77_).
//
// Run it the way the grader does (outside the grader's container, the two
// environment variables stand in for /bot and /output):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });

const source = join(botDir, 'VIDEO.json');
const raw = readFileSync(source, 'utf8');
const parsed = JSON.parse(raw) as { url?: unknown };
if (typeof parsed.url !== 'string' || !parsed.url.startsWith('https://www.tiktok.com/')) {
  console.error('WARNING: VIDEO.json does not name a TikTok video URL yet — post the video, then replace the placeholder.');
}

const target = join(outputDir, 'VIDEO.json');
copyFileSync(source, target);
if (readFileSync(target, 'utf8') !== raw) {
  console.error('VIDEO.json copy differs from the repository file.');
  process.exit(1);
}
console.log(`VIDEO.json copied to ${outputDir} for ${parsed.url}`);
