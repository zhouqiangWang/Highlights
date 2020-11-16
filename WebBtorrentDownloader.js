var WebTorrent = require('webtorrent')

var client = new WebTorrent()

// var magnetURI = 'magnet:?xt=urn:btih:043e6d28c07b4288a633ae80acec0a47fa2f335a&dn=[电影天堂www.dytt89.com]麦路人HD国语中字.mp4'

const magnetURI = 'magnet:?xt=urn:btih:b1aa4756c0454f193eee818661675cca6d821a78&dn=断片之险途夺宝_HD高清国语中字.mp4';

let progress = 0;
client.add(magnetURI, { path: './' }, function (torrent) {
    torrent.on('ready', function () {
        console.log("ready to dowload --- ");
        torrent.files.forEach((file) => {
            console.log('Name : ' + file.name);
            console.log('length : ' + file.length);
            console.log('path : ' + file.path);
         })
    })
    torrent.on('done', function () {
        console.log('torrent download finished')
    })
    torrent.on('download', (bytes) => {
        if (progress < torrent.progress.toFixed(3)) {
            progress = torrent.progress.toFixed(3);
            let pBar = '[';
            let pInt = progress * 100;
            let i = 1;
            while(i++ < pInt) {
                pBar += '=';
            }
            pBar += '>'
            while (i++ <= 100) {
                pBar += '.';
            }
            pBar += ']';
            console.log(pBar);
            console.log('total downloaded: ' + torrent.downloaded / 1000000 + ' MB');
            console.log('download speed: ' + torrent.downloadSpeed / 1000 + ' Kb/s');
            console.log('progress: ' + (progress * 100) + "%");
        }
    });
})