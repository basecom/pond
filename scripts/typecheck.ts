// temporary workaround until https://github.com/vuejs/language-tools/issues/4249 is solved
// otherwise, we will receive issues from packages inside the node_modules directory

import Bun from 'bun';

type stringString = string[][]

const proc = Bun.spawnSync(['bun', 'run', 'vue-tsc', '--noEmit']);
const text = new TextDecoder().decode(proc.stdout) + new TextDecoder().decode(proc.stderr);

let chunks: stringString = [];
let chunkIndex = -1;

for (const line of text.split('\n')) {
    if (line.includes('error TS') && line.trim() !== '') {
        chunkIndex++;
    }

    chunks[chunkIndex] ??= [];
    chunks[chunkIndex]?.push(line);
}

chunks = chunks.filter(chunk => !chunk[0]?.includes('node_modules'));

if (chunks.length > 0) {
    chunks.forEach(chunk => {
        chunk.forEach((line, index) => {
            if (index === 0) {
                console.log(`\x1b[31m${line}\x1b[0m`);
                return;
            }
            console.log(line);
        });
        console.log('');
    });

    console.log(`\x1b[33mTotal errors: ${chunks.length}\x1b[0m`);

    process.exit(1);
} else {
    console.log('\x1b[32mTotal errors: 0\x1b[0m');

    process.exit(0);
}
