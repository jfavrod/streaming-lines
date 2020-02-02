import assert from 'assert';
import { readlines } from '../src/index';

const LINES_IN_ALICE = 4046;

describe('readLines Tests', () => {
    describe('Count lines...', () => {
        let count = 0;

        it('Should count the correct lines in alice.txt', async () => {
            await readlines(__dirname + '/alice.txt', () => {
                count++;
            });

            assert.strictEqual(count, LINES_IN_ALICE);
        });
    });

    describe('Apply the function...', async () => {
        const lines: string[] = [];

        it('Should apply the function to every line in the file', async () => {
            await readlines(__dirname + '/alice.txt', (line) => {
                lines.push(line.toUpperCase());
            });

            assert.strictEqual(lines.length, LINES_IN_ALICE);
        });

        it('Should have capitalized each line in the file', () => {
            let line: string;

            for (line of lines) {
                assert.strictEqual(typeof(line), 'string', 'Not all lines are strings.');
                assert.strictEqual(line, line.toUpperCase(), 'Not all lines are upper case.');
            }
        });
    });
});
