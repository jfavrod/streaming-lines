import fs from 'fs';

interface ICallback {
    (line: string): any;
}

/**
 * Read a file line by line, using a Stream, and apply a given function
 * to each line. Currently only works with utf-8 encoded files.
 * Each line must be shorter than highwater mark (64 kb).
 * @param filepath The absolute path to the file.
 * @param func The fuction to apply to each line.
 */
export const readlines = async (filepath: string, func: ICallback): Promise<void> => {
    const stream = fs.createReadStream(filepath);

    // The parameters used in the logChunks function.
    // TODO: Have IIFE return params for different encodings.
    const readParams = (() => {
        const params = {
            func: 'readUInt8',
            newline: 10,
            offset: 1,
        };

        return params;
    })();

    async function processChunks(readable: fs.ReadStream) {
        let char = 0;
        let bytesProcessed = 0;
        let line = '';

        for await (const chunk of readable) {
            while (bytesProcessed < chunk.length) {
                char = chunk[readParams.func](bytesProcessed);

                if (char === readParams.newline) {
                    func(line);
                    line = '';
                }
                else {
                    line += String.fromCharCode(char);
                }

                // Advance byte counter.
                bytesProcessed += readParams.offset;
            }

            // Reset the byte counter to 0.
            bytesProcessed = 0;
        }
    }

    await processChunks(stream);
};
