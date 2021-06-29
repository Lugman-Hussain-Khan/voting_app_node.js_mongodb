const bcrypt = require('bcrypt');

async function check() {
  const checkPassword = await bcrypt.compare("$2b$10$VabgncNUZC9WAhL2doDtdeTXBWCYWVGhQwsKaSb53Ll8Ou5TsknKu", "1234567") .then(console.log(checkPassword));
}

check();