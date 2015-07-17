var rootDir = __dirname + '/';

module.exports = {
  
  config: function(conf) {
    console.log('Using iui-table directive');
    conf.client.head.scripts.push(conf.client.app.root + '$iui-table/filters/startFrom.js');
    conf.client.head.scripts.push(conf.client.app.root + '$iui-table/directives/iui-sort-heading.js');
    conf.client.head.scripts.push(conf.client.app.root + '$iui-table/directives/iui-table.js');
  },

  app: function(app, conf) {
    app.get('/\\$iui-table/*', function(req, res) {
      res.sendfile(rootDir + req.params[0]);
    });
  }
};