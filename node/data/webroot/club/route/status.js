var os = require('os');

var uptime = function(pattern, time){
  var days, hours, min, second;

  if ( time == "null" ||
    typeof(time) == "null" ||
    time == 0 ||
    typeof(time) == "undefined" ||
    time == "undefined" ){
    time = 0
  }

  second = time;
  min    = second / 60;
  hours  = min / 60;

  days   = Math.floor( hours / 24 );
  hours  = Math.floor( hours - ( days * 24 ));
  min    = Math.floor( min - (days * 60 * 24) - (hours * 60));
  second = Math.floor( second - (days * 24 * 60 * 60) - (hours * 60 * 60) - (min * 60));

  return pattern.replace(/dd/, days).replace(/hh/, hours).replace(/mm/, min).replace(/ss/, second);
};

var loadavg = function(){
  var loadavg;
  loadavg = os.loadavg();

  loadavg[0] = loadavg[0].toFixed(2);
  loadavg[1] = loadavg[1].toFixed(2);
  loadavg[2] = loadavg[2].toFixed(2);

  return loadavg[0]+', '+loadavg[1]+', '+loadavg[2]+'';
}

var nTtitle = function(){
  var title = process.title;
  if ( title == "node" || title == "iojs" ){
    title = title;
  } else {
    title = "node";
  }
  return title;
}



exports.index = function(req, res, next){
  res.render('status', {
    title: 'status',
    content : {
      system : {
        hostname : os.hostname(),
        system   : os.type(),
        platform : os.platform(),
        arch     : os.arch(),
        release  : os.release(),
        uptime   : uptime('dd天hh小时mm分ss秒', os.uptime()),
        loadavg  : loadavg()
      },
      cpus   : {
        model    : os.cpus()[0].model,
        core     : os.cpus().length,
        speed    : os.cpus()[0].speed
      },
      momory : {
        totalmem : (os.totalmem()/1024/1024).toFixed(2),
        freemem  : (os.freemem()/1024/1024).toFixed(2),
        usedmem  : ((os.totalmem()/1024/1024) - (os.freemem()/1024/1024)).toFixed(2)
      },
      node   : {
        name    : nTtitle(),
        version : process.version,
        arch    : process.arch,
        exePATH : process.execPath,
        uptime  : uptime('dd天hh小时mm分ss秒', process.uptime()),
        path    : process.cwd()
      }
    },
    keyword: ''
  });
}

exports.active = function(req, res, next){
  res.jsonp({
    system : {
      uptime   : uptime('dd天hh小时mm分ss秒', os.uptime()),
      loadavg  : loadavg()
    },
    momory : {
      totalmem : (os.totalmem()/1024/1024).toFixed(2),
      freemem  : (os.freemem()/1024/1024).toFixed(2),
      usedmem  : ((os.totalmem()/1024/1024) - (os.freemem()/1024/1024)).toFixed(2)
    },
    node   : {
      uptime  : uptime('dd天hh小时mm分ss秒', process.uptime())
    }
  })
}

