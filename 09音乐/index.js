const axios = require('axios');
let fs = require('fs');
let max = 15;
let dataList = [];
async function getPage(num) {
    let httpUrl = `http://www.app-echo.com/api/recommend/sound-day?page=${num}`
    let res = await axios.get(httpUrl);
    // console.log(res.data);
    if (res.data.list.length < max) {
        res.data.list.forEach((item, index) => {
            let musicUrl = item.sound.source
            let musicName = item.sound.name;
            dataList.push({ musicName, musicUrl })
        })

        return downMusic();
    } else {
        res.data.list.forEach((item, index) => {
            let musicUrl = item.sound.source
            let musicName = item.sound.name;
            dataList.push({ musicName, musicUrl })
        })
        ++num;
        return arguments.callee(num);
    }
}

getPage(1);
function downMusic() {
    console.log("下载开始")
    dataList.forEach((item, index) => {
        let name = `${item.musicName}/n+${item.musicUrl}.mp3/n`
        fs.writeFile("music.txt", item.musicName + "mp3", { flag: 'a' })
        await axios.get(item.musicUrl)
        //let res = await axios.get(item.musicUrl, { resposeType: 'stream' })
        let path = fs.createWriteStream("./mp3/" + index + ".mp3");
        res.data.pipe(path);

    })
}