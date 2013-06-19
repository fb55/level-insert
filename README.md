#level-insert

a tiny module for inserting documents into a db with automatically increasing keys

###API

Initialisation:

```js
var db = require("level")("./.db");

require("level-sublevel")(db);

var sub = db.level("sub");

require("level-insert")(db, sub);
```

Only a single method is added: `insert(data, cb)`, which inserts the data at the next key (starting at 1).

Additionally, the key for the counter at the original DB can be specified as the third parameter of initialization. Per default, the separator + prefix of the insertion database will be used.

License: BSD
