# req-userAgent

Receive request information from REST API and show client information

Install

```markdown
$ npm i req-useragent
```

---

Example

```tsx
import { DetectReq } from 'req-useragent';

app.use('/', async (req, res, next) => {
	const userData = DetectReq(req);
	console.log(userData);
});

/* console
	{ ip: '127.0.0.1',
	  browser: 'Whale',
	  browserVersion: '2.9.115.16',
	  os: 'Mac OS X',
	  osVersion: '11_0_0' }
*/

```

---

Output Data

- `ip`: The client ip
- `brower`: The client brower
- `broweVersionr`: The client brower version
- `os`: The client os
- `osVersion`: The client os version

---

TODO

- Other required information to be added