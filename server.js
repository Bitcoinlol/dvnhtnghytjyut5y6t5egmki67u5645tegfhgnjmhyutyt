const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const scripts = {};
const userLists = {};
const executions = {};
const purchaseStatus = {};
function generateRandomString(_0x23ace3) {
  let _0x47af0d = '';
  for (let _0x3fb1ff = 0x0; _0x3fb1ff < _0x23ace3; _0x3fb1ff++) {
    _0x47af0d += 'abcdefghijklmnopqrstuvwxyz0123456789'.charAt(Math.floor(Math.random() * 'abcdefghijklmnopqrstuvwxyz0123456789'.length));
  }
  return _0x47af0d;
}
app.get('/', (_0x462958, _0x11f1bd) => {
  _0x11f1bd.sendFile(path.join(__dirname, "index.html"));
});
app.get("/home", (_0x263991, _0x1e5c8b) => _0x1e5c8b.sendFile(path.join(__dirname, "index.html")));
app.get("/panel", (_0x207d74, _0xf8c575) => _0xf8c575.sendFile(path.join(__dirname, "index.html")));
app.get('/statues', (_0x46159b, _0x4ba8c3) => _0x4ba8c3.sendFile(path.join(__dirname, "index.html")));
app.get("/plans", (_0x248271, _0x5261c4) => _0x5261c4.sendFile(path.join(__dirname, "index.html")));
app.get("/about", (_0x48e8cd, _0x1a1e0c) => _0x1a1e0c.sendFile(path.join(__dirname, "index.html")));
app.get("/api/scripts", (_0x22d686, _0x370481) => {
  const _0x4d4871 = Object.keys(scripts).map(_0x2d6b35 => ({
    'id': _0x2d6b35,
    'key': scripts[_0x2d6b35].key
  }));
  _0x370481.json(_0x4d4871);
});
app.post("/api/scripts", (_0x321a08, _0x5ec42d) => {
  const {
    code: _0x2005c3
  } = _0x321a08.body;
  const _0x3b967f = generateRandomString(0x6);
  const _0x101c82 = generateRandomString(0xa);
  scripts[_0x3b967f] = {
    'code': _0x2005c3,
    'key': _0x101c82
  };
  userLists[_0x3b967f] = {
    'whitelist': [],
    'blacklist': []
  };
  executions[_0x3b967f] = 0x0;
  console.log("Script created with ID: " + _0x3b967f + " and Key: " + _0x101c82);
  _0x5ec42d.json({
    'id': _0x3b967f,
    'key': _0x101c82
  });
});
app['delete']('/api/scripts/:id', (_0x4c7054, _0x2455d2) => {
  const {
    id: _0x4d7834
  } = _0x4c7054.params;
  if (scripts[_0x4d7834]) {
    delete scripts[_0x4d7834];
    delete userLists[_0x4d7834];
    delete executions[_0x4d7834];
    console.log("Script " + _0x4d7834 + " deleted.");
    _0x2455d2.status(0xc8).send("Script deleted");
  } else {
    _0x2455d2.status(0x194).send("Script not found");
  }
});
app.get("/api/users/:id", (_0x380675, _0x3a73a5) => {
  const {
    id: _0x58e08b
  } = _0x380675.params;
  if (userLists[_0x58e08b]) {
    _0x3a73a5.json(userLists[_0x58e08b]);
  } else {
    _0x3a73a5.status(0x194).send("User lists not found for script ID: " + _0x58e08b);
  }
});
app.post('/api/users/:id/whitelist', (_0x2d0d58, _0x410959) => {
  const {
    id: _0x4e4615
  } = _0x2d0d58.params;
  const {
    userId: _0x22ff54
  } = _0x2d0d58.body;
  if (userLists[_0x4e4615]) {
    if (!userLists[_0x4e4615].whitelist.includes(_0x22ff54)) {
      userLists[_0x4e4615].whitelist.push(_0x22ff54);
      console.log("User " + _0x22ff54 + " added to whitelist for script " + _0x4e4615 + '.');
    }
    _0x410959.status(0xc8).send("User whitelisted");
  } else {
    _0x410959.status(0x194).send("Script not found");
  }
});
app["delete"]("/api/users/:id/whitelist", (_0x4e7083, _0x151b29) => {
  const {
    id: _0xf51611
  } = _0x4e7083.params;
  const {
    userId: _0x18c224
  } = _0x4e7083.body;
  if (userLists[_0xf51611]) {
    userLists[_0xf51611].whitelist = userLists[_0xf51611].whitelist.filter(_0x33a4c2 => _0x33a4c2 !== _0x18c224);
    console.log("User " + _0x18c224 + " removed from whitelist for script " + _0xf51611 + '.');
    _0x151b29.status(0xc8).send("User removed from whitelist");
  } else {
    _0x151b29.status(0x194).send("Script not found");
  }
});
app.post("/api/users/:id/blacklist", (_0x4567ad, _0x351a51) => {
  const {
    id: _0x35dbf5
  } = _0x4567ad.params;
  const {
    userId: _0x57f427
  } = _0x4567ad.body;
  if (userLists[_0x35dbf5]) {
    if (!userLists[_0x35dbf5].blacklist.includes(_0x57f427)) {
      userLists[_0x35dbf5].blacklist.push(_0x57f427);
      console.log("User " + _0x57f427 + " added to blacklist for script " + _0x35dbf5 + '.');
    }
    _0x351a51.status(0xc8).send("User blacklisted");
  } else {
    _0x351a51.status(0x194).send("Script not found");
  }
});
app['delete']("/api/users/:id/blacklist", (_0x32388d, _0x21e6c2) => {
  const {
    id: _0x309c16
  } = _0x32388d.params;
  const {
    userId: _0x3c7da0
  } = _0x32388d.body;
  if (userLists[_0x309c16]) {
    userLists[_0x309c16].blacklist = userLists[_0x309c16].blacklist.filter(_0x2b49fc => _0x2b49fc !== _0x3c7da0);
    console.log("User " + _0x3c7da0 + " removed from blacklist for script " + _0x309c16 + '.');
    _0x21e6c2.status(0xc8).send("User removed from blacklist");
  } else {
    _0x21e6c2.status(0x194).send("Script not found");
  }
});
app.get("/raw/:id", (_0x2abb00, _0x22a16b) => {
  const {
    id: _0x31f3ea
  } = _0x2abb00.params;
  const {
    key: _0x2bee5c,
    userId: _0x503429
  } = _0x2abb00.query;
  const _0x2cf430 = _0x2abb00.headers["user-agent"];
  const _0x41b5ae = _0x2cf430 && _0x2cf430.includes("Roblox");
  if (!scripts[_0x31f3ea] || scripts[_0x31f3ea].key !== _0x2bee5c) {
    return _0x41b5ae ? _0x22a16b.status(0x194).send("Not Found") : _0x22a16b.status(0x193).send("\n                <!DOCTYPE html>\n                <html lang=\"en\">\n                <head>\n                    <meta charset=\"UTF-8\">\n                    <title>Unauthorized</title>\n                    <style>\n                        body {\n                            background-color: #000;\n                            display: flex;\n                            justify-content: center;\n                            align-items: center;\n                            height: 100vh;\n                            margin: 0;\n                            font-family: Arial, sans-serif;\n                            color: #fff;\n                            overflow: hidden;\n                        }\n                        .container {\n                            text-align: center;\n                        }\n                        h1 {\n                            font-size: 4em;\n                            color: #7b2cbf;\n                            text-shadow: 0 0 20px #7b2cbf, 0 0 40px #7b2cbf;\n                            animation: glow 1.5s infinite alternate;\n                        }\n                        @keyframes glow {\n                            from { text-shadow: 0 0 10px #7b2cbf, 0 0 20px #7b2cbf; }\n                            to { text-shadow: 0 0 20px #7b2cbf, 0 0 40px #7b2cbf, 0 0 60px #7b2cbf; }\n                        }\n                    </style>\n                    <script>\n                        // Disable right-click\n                        document.addEventListener('contextmenu', event => event.preventDefault());\n                        // Disable developer tool shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J)\n                        document.addEventListener('keydown', event => {\n                            if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J'))) {\n                                event.preventDefault();\n                            }\n                        });\n                    </script>\n                </head>\n                <body>\n                    <div class=\"container\">\n                        <h1>You are not authorized to see this code.</h1>\n                    </div>\n                </body>\n                </html>\n            ");
  }
  if (userLists[_0x31f3ea].blacklist.includes(_0x503429)) {
    return _0x22a16b.status(0x193).send("game.Players:Kick('" + _0x503429 + "', 'You are blacklisted from using this script.')");
  }
  if (userLists[_0x31f3ea].whitelist.length > 0x0 && !userLists[_0x31f3ea].whitelist.includes(_0x503429)) {
    return _0x22a16b.status(0x193).send("game.Players:Kick('" + _0x503429 + "', 'You are not whitelisted to use this script.')");
  }
  if (!_0x41b5ae) {
    return _0x22a16b.status(0x193).send("\n            <!DOCTYPE html>\n            <html lang=\"en\">\n            <head>\n                <meta charset=\"UTF-8\">\n                <title>Unauthorized</title>\n                <style>\n                    body {\n                        background-color: #000;\n                        display: flex;\n                        justify-content: center;\n                        align-items: center;\n                        height: 100vh;\n                        margin: 0;\n                        font-family: Arial, sans-serif;\n                        color: #fff;\n                        overflow: hidden;\n                    }\n                    .container {\n                        text-align: center;\n                    }\n                    h1 {\n                        font-size: 4em;\n                        color: #7b2cbf;\n                        text-shadow: 0 0 20px #7b2cbf, 0 0 40px #7b2cbf;\n                        animation: glow 1.5s infinite alternate;\n                    }\n                    @keyframes glow {\n                        from { text-shadow: 0 0 10px #7b2cbf, 0 0 20px #7b2cbf; }\n                        to { text-shadow: 0 0 20px #7b2cbf, 0 0 40px #7b2cbf, 0 0 60px #7b2cbf; }\n                    }\n                </style>\n                <script>\n                    // Disable right-click\n                    document.addEventListener('contextmenu', event => event.preventDefault());\n                    // Disable developer tool shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J)\n                    document.addEventListener('keydown', event => {\n                        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J'))) {\n                            event.preventDefault();\n                        }\n                    });\n                </script>\n            </head>\n            <body>\n                <div class=\"container\">\n                    <h1>You are not authorized to see this code.</h1>\n                </div>\n            </body>\n            </html>\n        ");
  }
  if (executions[_0x31f3ea] !== undefined) {
    executions[_0x31f3ea]++;
  } else {
    executions[_0x31f3ea] = 0x1;
  }
  _0x22a16b.set("Content-Type", "text/plain");
  _0x22a16b.send(scripts[_0x31f3ea].code);
});
app.post("/api/roblox-callback", (_0x5e732d, _0x3506c8) => {
  const {
    userId: _0x452fe8,
    gamepassId: _0x1b89b8
  } = _0x5e732d.body;
  console.log("Roblox purchase callback received for User ID: " + _0x452fe8 + ", Gamepass ID: " + _0x1b89b8);
  if (_0x452fe8 && _0x1b89b8) {
    const _0x59175f = generateRandomString(0xc);
    purchaseStatus[_0x452fe8] = {
      'gamepassId': _0x1b89b8,
      'key': _0x59175f
    };
    console.log("Key '" + _0x59175f + "' generated for User ID: " + _0x452fe8);
    _0x3506c8.status(0xc8).json({
      'success': true,
      'message': "Purchase confirmed."
    });
  } else {
    _0x3506c8.status(0x190).json({
      'success': false,
      'message': "Invalid data."
    });
  }
});
app.get("/api/check-purchase/:userId", (_0x435767, _0x33359c) => {
  const {
    userId: _0x30875e
  } = _0x435767.params;
  console.log("Checking purchase status for User ID: " + _0x30875e);
  if (purchaseStatus[_0x30875e]) {
    const {
      gamepassId: _0x5cd2e3,
      key: _0x1ccb96
    } = purchaseStatus[_0x30875e];
    delete purchaseStatus[_0x30875e];
    _0x33359c.status(0xc8).json({
      'status': 'success',
      'key': _0x1ccb96
    });
  } else {
    _0x33359c.status(0xc8).json({
      'status': "pending"
    });
  }
});
app.get("/api/executions", (_0x138cc5, _0x15e73f) => {
  _0x15e73f.json(executions);
});
app.listen(0xbb8, () => {
  console.log("Server running on http://localhost:3000");
});
