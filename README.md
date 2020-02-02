streaming-lines
===============
Efficiently process text files line-by-line.

Streams are more efficient than reading an entire file into memory, 
especially when reading large files - some files are too large to do
this. This package enables users to efficiently process large text
files line-by-line.

NOTE: streaming-lines only handles utf-8 encode text.

Install
-------
Install the package, including TypeScript declarations.

```
npm i streaming-lines
```

Use
---
Let's read from a file in the current directory and capitalize each
line in the file.

### Using JavaScript
```javascript
const readlines = require('streaming-lines').readlines;

(async function () {
    await readlines(__dirname + '/myfile.txt', (line) => {
        line.toUpperCase();
    });
})
```

### Using TypeScript
```typescript
import { readlines } from 'streaming-lines';

(async function () {
    await readlines(__dirname + '/myfile.txt', (line: string) => {
        line.toUpperCase();
    });
})
```

Test
----
Tests can be found in the `test/` directory. They can be run with the
following command:

```
npm run test
```

Each file with a `.test.ts` extension will be executed using the
`mocha` testing framework.
