var fs = require('fs');


module.exports = function scan(dir, alias) {

  return {
    name: alias,
    type: 'folder',
    path: alias,
    items: walk(dir, alias, dir)
  };

};


function walk(dir, root, prefix) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir).filter(function(f) {

    return f && f[0] != '.'; // Ignore hidden files

  }).map(function(f) {

    var p = (dir + '/' + f),
      stat = fs.statSync(p);
    if (stat.isDirectory()) {

      return {
        name: f,
        type: 'folder',
        path: root + p.replace(prefix, ''),
        items: walk(p, root, prefix)
      };

    }

    return {
      name: f,
      type: 'file',
      path: root + p.replace(prefix, ''),
      size: stat.size
    }

  });

};
