var rootDir = __dirname + '/';

module.exports = {
  
  config: function(conf) {
    console.log('Using iui-table directive');
    conf.client.head.scripts.push(conf.client.app.root + '$iui-table/dist/core-module-setup.js');
    conf.client.head.scripts.push(conf.client.app.root + '$iui-table/dist/iui-table.min.js');
  },

  app: function(app, conf) {
    app.get('/\\$iui-table/*', function(req, res) {
      res.sendfile(rootDir + req.params[0]);
    });
  }
};