songnum=0
songlength=[196,234,175,227,217,244]
var url=["https://piapro.jp/t/ULcJ/20250205120202","https://piapro.jp/t/SuQO/20250127235813","https://piapro.jp/t/Ppc9/20241224135843","https://piapro.jp/t/oTaJ/20250204234235","https://piapro.jp/t/GCgy/20250202202635","https://piapro.jp/t/CyPO/20250128183915"]
let barclass;
const { Player, stringToDataUrl } = TextAliveApp;

// TextAlive Player を初期化
const player = new Player({
  // トークンは https://developer.textalive.jp/profile で取得したものを使う
  app: { token: "test" },
  mediaElement: document.querySelector("#media"),
  mediaBannerPosition: "bottom right"

  // オプション一覧
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/playeroptions.html
});

const overlay = document.querySelector("#overlay");
const bar = document.querySelector("#bar");
const textContainer = document.querySelector("#text");
const seekbar = document.querySelector("#seekbar");
const paintedSeekbar = seekbar.querySelector("div");
let b, c;

player.addListener({
  /* APIの準備ができたら呼ばれる */
  onAppReady(app) {
    if (app.managed) {
      document.querySelector("#control").className = "disabled";
    }
    if (!app.songUrl) {
      document.querySelector("#media").className = "disabled";

      // SUPERHERO / めろくる
      player.createFromSongUrl(url[songnum], {
        video: {
          // 音楽地図訂正履歴
          beatId: 4694275+songnum,
          chordId: 2830730+songnum,
          repetitiveSegmentId: 2946478+songnum,
          // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FhZ35%2F20240130103028
          lyricId: 67810+songnum,
          lyricDiffId: 20654+songnum
        }
      });
    }
  },

  /* 楽曲が変わったら呼ばれる */
  onAppMediaChange() {
    // 画面表示をリセット
    overlay.className = "";
    bar.className = "";
    resetChars();
  },

  /* 楽曲情報が取れたら呼ばれる */
  onVideoReady(video) {
    // 楽曲情報を表示
    document.querySelector("#artist span").textContent =
      player.data.song.artist.name;
    document.querySelector("#song span").textContent = player.data.song.name;

    // 最後に表示した文字の情報をリセット
    c = null;
  },

  /* 再生コントロールができるようになったら呼ばれる */
  onTimerReady() {
    overlay.className = "disabled";
    document.querySelector("#control > a#play").className = "";
    document.querySelector("#control > a#stop").className = "";
  },

  /* 再生位置の情報が更新されたら呼ばれる */
  onTimeUpdate(position) {
    // シークバーの表示を更新
    paintedSeekbar.style.width = `${
      parseInt((position * 1000) / player.video.duration) / 10
    }%`;

    // 現在のビート情報を取得
    let beat = player.findBeat(position);
    if (b !== beat) {
      if (beat) {
        requestAnimationFrame(() => {
          barclass= "active";
          requestAnimationFrame(() => {
            barclass="activebeat"
          });
        });
      }
      b = beat;
    }
    // 歌詞情報がなければこれで処理を終わる
    if (!player.video.firstChar) {
      return;
    }

    // 巻き戻っていたら歌詞表示をリセットする
    if (c && c.startTime > position + 1000) {
      resetChars();
    }

    // 500ms先に発声される文字を取得
    let current = c || player.video.firstChar;
    while (current && current.startTime < position + 500) {
      // 新しい文字が発声されようとしている
      if (c !== current) {
        newChar(current);
        c = current;
      }
      current = current.next;
    }
  },

  /* 楽曲の再生が始まったら呼ばれる */
  onPlay() {
    starposx=[]
    starposy=[]
    getstarx=[]
    getstary=[]
    Starset()
    state="play"
    const a = document.querySelector("#control > a#play");
    while (a.firstChild) a.removeChild(a.firstChild);
    a.appendChild(document.createTextNode("\uf28b"));
  },

  /* 楽曲の再生が止まったら呼ばれる */
  onPause() {
    state ="stop"
    const a = document.querySelector("#control > a#play");
    while (a.firstChild) a.removeChild(a.firstChild);
    a.appendChild(document.createTextNode("\uf144"));
  }
});

/* 再生・一時停止ボタン */
document.querySelector("#control > a#play").addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
    if (player.isPlaying) {
      player.requestPause();
    } else {
      player.requestPlay();
    }
  }
  return false;
});

/* 停止ボタン */
document.querySelector("#control > a#stop").addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
    player.requestStop();

    // 再生を停止したら画面表示をリセットする
    barclass = "";songnum=0
songlength=[196,234,175,227,217,244]
var url=["https://piapro.jp/t/ULcJ/20250205120202","https://piapro.jp/t/SuQO/20250127235813","https://piapro.jp/t/Ppc9/20241224135843","https://piapro.jp/t/oTaJ/20250204234235","https://piapro.jp/t/GCgy/20250202202635","https://piapro.jp/t/CyPO/20250128183915"]
let barclass;
const { Player, stringToDataUrl } = TextAliveApp;

// TextAlive Player を初期化
const player = new Player({
  // トークンは https://developer.textalive.jp/profile で取得したものを使う
  app: { token: "test" },
  mediaElement: document.querySelector("#media"),
  mediaBannerPosition: "bottom right"

  // オプション一覧
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/playeroptions.html
});

const overlay = document.querySelector("#overlay");
const bar = document.querySelector("#bar");
const textContainer = document.querySelector("#text");
const seekbar = document.querySelector("#seekbar");
const paintedSeekbar = seekbar.querySelector("div");
let b, c;

player.addListener({
  /* APIの準備ができたら呼ばれる */
  onAppReady(app) {
    if (app.managed) {
      document.querySelector("#control").className = "disabled";
    }
    if (!app.songUrl) {
      document.querySelector("#media").className = "disabled";

      // SUPERHERO / めろくる
      player.createFromSongUrl(url[songnum], {
        video: {
          // 音楽地図訂正履歴
          beatId: 4694275+songnum,
          chordId: 2830730+songnum,
          repetitiveSegmentId: 2946478+songnum,
          // 歌詞タイミング訂正履歴: https://textalive.jp/lyrics/piapro.jp%2Ft%2FhZ35%2F20240130103028
          lyricId: 67810+songnum,
          lyricDiffId: 20654+songnum
        }
      });
    }
  },

  /* 楽曲が変わったら呼ばれる */
  onAppMediaChange() {
    // 画面表示をリセット
    overlay.className = "";
    bar.className = "";
    resetChars();
  },

  /* 楽曲情報が取れたら呼ばれる */
  onVideoReady(video) {
    // 楽曲情報を表示
    document.querySelector("#artist span").textContent =
      player.data.song.artist.name;
    document.querySelector("#song span").textContent = player.data.song.name;

    // 最後に表示した文字の情報をリセット
    c = null;
  },

  /* 再生コントロールができるようになったら呼ばれる */
  onTimerReady() {
    overlay.className = "disabled";
    document.querySelector("#control > a#play").className = "";
    document.querySelector("#control > a#stop").className = "";
  },

  /* 再生位置の情報が更新されたら呼ばれる */
  onTimeUpdate(position) {
    // シークバーの表示を更新
    paintedSeekbar.style.width = `${
      parseInt((position * 1000) / player.video.duration) / 10
    }%`;

    // 現在のビート情報を取得
    let beat = player.findBeat(position);
    if (b !== beat) {
      if (beat) {
        requestAnimationFrame(() => {
          barclass= "active";
          requestAnimationFrame(() => {
            barclass="activebeat"
          });
        });
      }
      b = beat;
    }
    // 歌詞情報がなければこれで処理を終わる
    if (!player.video.firstChar) {
      return;
    }

    // 巻き戻っていたら歌詞表示をリセットする
    if (c && c.startTime > position + 1000) {
      resetChars();
    }

    // 500ms先に発声される文字を取得
    let current = c || player.video.firstChar;
    while (current && current.startTime < position + 500) {
      // 新しい文字が発声されようとしている
      if (c !== current) {
        newChar(current);
        c = current;
      }
      current = current.next;
    }
  },

  /* 楽曲の再生が始まったら呼ばれる */
  onPlay() {
    starposx=[]
    starposy=[]
    getstarx=[]
    getstary=[]
    Starset()
    state="play"
    const a = document.querySelector("#control > a#play");
    while (a.firstChild) a.removeChild(a.firstChild);
    a.appendChild(document.createTextNode("\uf28b"));
  },

  /* 楽曲の再生が止まったら呼ばれる */
  onPause() {
    state ="stop"
    const a = document.querySelector("#control > a#play");
    while (a.firstChild) a.removeChild(a.firstChild);
    a.appendChild(document.createTextNode("\uf144"));
  }
});

/* 再生・一時停止ボタン */
document.querySelector("#control > a#play").addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
    if (player.isPlaying) {
      player.requestPause();
    } else {
      player.requestPlay();
    }
  }
  return false;
});

/* 停止ボタン */
document.querySelector("#control > a#stop").addEventListener("click", (e) => {
  e.preventDefault();
  if (player) {
    player.requestStop();

    // 再生を停止したら画面表示をリセットする
    barclass = "";
    resetChars();
  }
  return false;
});


/**
 * 新しい文字の発声時に呼ばれる
 * Called when a new character is being vocalized
 */
function newChar(current) {
  // 品詞 (part-of-speech)
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/iword.html#pos
  const classes = [];
  if (
    current.parent.pos === "N" ||
    current.parent.pos === "PN" ||
    current.parent.pos === "X"
  ) {
    classes.push("noun");
  }

  // フレーズの最後の文字か否か
  if (current.parent.parent.lastChar === current) {
    classes.push("lastChar");
  }
  if (current.parent.parent.firstChar === current) {
    resetChars()
  }

  // 英単語の最初か最後の文字か否か
  if (current.parent.language === "en") {
    if (current.parent.lastChar === current) {
      classes.push("lastCharInEnglishWord");
    } else if (current.parent.firstChar === current) {
      classes.push("firstCharInEnglishWord");
    }
  }

  // noun, lastChar クラスを必要に応じて追加
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(current.text));

  // 文字を画面上に追加
  const container = document.createElement("div");
  container.className = classes.join(" ");
  container.appendChild(div);
  container.addEventListener("click", () => {
    player.requestMediaSeek(current.startTime);
  });
  textContainer.appendChild(container);
}

/**
 * 歌詞表示をリセットする
 * Reset lyrics view
 */
function resetChars() {
  c = null;
  while (textContainer.firstChild)
    textContainer.removeChild(textContainer.firstChild);
}

//NEW
score=0
R=30
G=0
B=60
x=0
vy=0
y=85
m=0
getstarx=[]
getstary=[]
state="stop"
scene="title"
var canvas = document.getElementById( "stage" ) ;
const ctx = canvas.getContext('2d');
var width = canvas.width ;
const star = new Image();
star.src = 'https://aya-57.github.io/Magicalmirai/star.png';
const chara1 = new Image();
chara1.src = 'https://aya-57.github.io/Magicalmirai/miku1.png';
const chara2 = new Image();
chara2.src = 'https://aya-57.github.io/Magicalmirai/miku2.png';
const chara3 = new Image();
chara3.src = 'https://aya-57.github.io/Magicalmirai/miku3.png';
function Jump(){
    if(vy==0){
    vy=15
  }
}
function StarDraw(){
  for(i=0;i<starposx.length;i++){
    starposx[i]-=5
    if(starposx[i]<20 && starposx[i]>-5 && Math.abs(starposy[i]-y-10)<10){
      starposx[i]=-50
      getstarx[getstarx.length]=Math.random*40
      getstary[getstary.length]=Math.random*280+10
    }
    ctx.drawImage(star, starposx[i], starposy[i],10,10);
  }
}
function Draw(){
  m+=1
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0,135,500,80);
  if(m%9<3){
    ctx.drawImage(chara1, x, y,50,50);
  }else if(m%9<6){
    ctx.drawImage(chara2, x, y,50,50);
  }else{
    ctx.drawImage(chara3, x, y,50,50);
  }
  for(j=0;j<getstarx.length;j++){
    ctx.drawImage(star, getstarx[j], getstary[j],5,5);
  }
  if(state=="play"){
    StarDraw()
}}
function Tick(){
  Draw()
  if(state=="play"){
    y-=vy
  }
  if(y<115){
    vy-=3
  }else{
    vy=0
  }
}
function Starset(position){
  for(i=0;i<songlength[songnum]/6;i++){
    starposx[starposx.length]=300+100*i
    if(Math.random()>0.75){
      starposy[starposy.length]=125
}
  else{
    starposy[starposy.length]=75
}}}
window.onload = setInterval(Tick,100)
function start(){
  state=play
}
    resetChars();
  }
  return false;
});


/**
 * 新しい文字の発声時に呼ばれる
 * Called when a new character is being vocalized
 */
function newChar(current) {
  // 品詞 (part-of-speech)
  // https://developer.textalive.jp/packages/textalive-app-api/interfaces/iword.html#pos
  const classes = [];
  if (
    current.parent.pos === "N" ||
    current.parent.pos === "PN" ||
    current.parent.pos === "X"
  ) {
    classes.push("noun");
  }

  // フレーズの最後の文字か否か
  if (current.parent.parent.lastChar === current) {
    classes.push("lastChar");
  }
  if (current.parent.parent.firstChar === current) {
    resetChars()
  }

  // 英単語の最初か最後の文字か否か
  if (current.parent.language === "en") {
    if (current.parent.lastChar === current) {
      classes.push("lastCharInEnglishWord");
    } else if (current.parent.firstChar === current) {
      classes.push("firstCharInEnglishWord");
    }
  }

  // noun, lastChar クラスを必要に応じて追加
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(current.text));

  // 文字を画面上に追加
  const container = document.createElement("div");
  container.className = classes.join(" ");
  container.appendChild(div);
  container.addEventListener("click", () => {
    player.requestMediaSeek(current.startTime);
  });
  textContainer.appendChild(container);
}

/**
 * 歌詞表示をリセットする
 * Reset lyrics view
 */
function resetChars() {
  c = null;
  while (textContainer.firstChild)
    textContainer.removeChild(textContainer.firstChild);
}

//NEW
score=0
R=30
G=0
B=60
x=0
vy=0
y=115
getstarx=[]
getstary=[]
state="stop"
scene="title"
var canvas = document.getElementById( "stage" ) ;
const ctx = canvas.getContext('2d');
var width = canvas.width ;
const star = new Image();
star.src = 'https://aya-57.github.io/Magicalmirai/star.png';
function Jump(){
    if(vy==0){
    vy=15
  }
}
function StarDraw(){
  for(i=0;i<starposx.length;i++){
    starposx[i]-=5
    if(starposx[i]<20 && starposx[i]>-5 && Math.abs(starposy[i]-y-10)<10){
      starposx[i]=-50
      getstarx[getstarx.length]=Math.random*40
      getstary[getstary.length]=Math.random*280+10
    }
    ctx.drawImage(star, starposx[i], starposy[i],10,10);
  }
}
function Draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0,135,500,80);
  ctx.drawImage(star, x, y);
  for(j=0;j<getstarx.length;j++){
    ctx.drawImage(star, getstarx[j], getstary[j],5,5);
  }
  if(state=="play"){
    StarDraw()
}}
function Tick(){
  Draw()
  if(state=="play"){
    y-=vy
  }
  if(y<115){
    vy-=3
  }else{
    vy=0
  }
}
function Starset(position){
  for(i=0;i<songlength[songnum]/6;i++){
    starposx[starposx.length]=300+100*i
    if(Math.random()>0.75){
      starposy[starposy.length]=125
}
  else{
    starposy[starposy.length]=75
}}}
window.onload = setInterval(Tick,100)