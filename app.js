/**
 *  1. Render songs =>ok
 *  2. Scroll top =>ok
 *  3. Play / pause / seek =>ok
 *  4. CD rotate =>ok
 *  5. NExt / prev =>ok
 *  6. Random =>ok
 *  7. Next / Repeat when ended =>ok
 *  8. Active song =>ok
 *  9. Scroll active song into view
 *  10. play song when click
 */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'MUSICS_PLAYER'

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')
const volume = $('.volume')
const volumeUp = $('.volume-up')
const volumeDown = $('.volume-down')
const volumeViewPercent = $('.volume-percent')
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isTimeupdate: true,
    currentVolume: 100,
    maxVolume: 100,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: 'Wrap Me In Plastic',
            singer: 'Chromance',
            path: 'https://aredir.nixcdn.com/Sony_Audio69/WrapMeInPlastic-CHROMANCE-6160685.mp3?st=yv4dtGmOG4xuOeP6xCQSsQ&e=1625246154',
            image: 'https://i.ytimg.com/vi/hnHRaRQewp8/maxresdefault.jpg',
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773',
            image: 'https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg',
        },
        {
            name: 'Unstoppable',
            singer: 'Sia',
            path: 'https://aredir.nixcdn.com/NhacCuaTui1011/UnstoppableNightcoreMix-Sia-6942285.mp3?st=5DQoz47zBSey-cotvTrRWg&e=1625937338',
            image: 'https://i1.sndcdn.com/artworks-yqiiKWS6GVNHnqIi-Zup5hg-t500x500.jpg',
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
            image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
        },
        {
            name: 'See You Again',
            singer: 'Charlie Puth ft Wiz Khalifa',
            path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
            image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
        },
        {
            name: 'Shape of You',
            singer: 'Ed Sheeran',
            path: 'https://aredir.nixcdn.com/NhacCuaTui945/ShapeOfYou-AlexGootAndieCase-5076956.mp3?st=9I9Z2TBGWNOnQRfIJDomDA&e=1623138210',
            image: 'https://is2-ssl.mzstatic.com/image/thumb/Music122/v4/09/a0/64/09a0641c-e5fa-407e-9829-47702358ec72/190295819972.jpg/1200x1200bf-60.jpg',
        }
        ,
        {
            name: 'Symphony',
            singer: 'Clean Bandit',
            path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
            image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
        },
        {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
            image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
        },
        {
            name: 'Alone',
            singer: 'Marshmello',
            path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
            image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
        },
        {
            name: 'Something Just Like This',
            singer: 'The Chainsmokers & Coldplay',
            path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
            image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
        },

    ],
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb"
                style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`;
        });
        playlist.innerHTML = htmls.join(" ");
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function () {
        const _this = this
        const cdWidth = cd.offsetWidth
        //Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        //Xử lý phóng to/ thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newcdWidth = cdWidth - scrollTop
            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0
            cd.style.opacity = newcdWidth / cdWidth
        }
        //Xử lý khi click nút play/pause
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }
        // Khi bài hát play
        audio.onplay = function () {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // Khi bài hát pause
        audio.onpause = function () {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }
        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration && _this.isTimeupdate) {
                //Tính phần trăm trên slider
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent;
                console.log(progress.value)
            }
        }
        // Xử lý khi tua bài hát
        progress.onmousedown = function () {
            _this.isTimeupdate = false;
        }
        progress.ontouchstart = function () {
            _this.isTimeupdate = false;
        }
        progress.onchange = function (e) {
            //Từ phần trăm sang giây phát bài hát
            const seekTime = e.target.value * audio.duration / 100
            audio.currentTime = seekTime
            console.log(e.target.value * audio.duration / 100)
            _this.isTimeupdate = true;
        }
        // KHi next bài hát
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // KHi next bài hát
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        // Xử lý bật / tắt random bài hát
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        // Xử lý lập lại 1 bài hái
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        // Xử lý chuyển bài hết khi kết thức bài
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        //Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                // Xử lý click bài hát
                if (songNode && !e.target.closest('.option')) {
                    console.log(songNode.dataset.index)
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render();
                    audio.play()
                }
                //Xử lý khi click vào option
                if (e.target.closest('.option')) {
                    console.log('nope')
                }
            }
        }
        // Xử lý volume
        volumeDown.onmousedown = function () {
            if (_this.currentVolume > 0) {
                _this.currentVolume--
                _this.changeVolume(_this.currentVolume)
                volume.value = _this.currentVolume
            }
        }
        volumeUp.onmousedown = function () {
            if (_this.currentVolume < 100) {
                _this.currentVolume++
                _this.changeVolume(_this.currentVolume)
                volume.value = _this.currentVolume
            }
        }
        volume.onchange = function () {
            _this.currentVolume = volume.value
            _this.changeVolume(_this.currentVolume)
            volume.value = _this.currentVolume
        }
    },
    changeVolume: function(value) {        
        volumeViewPercent.textContent = 'Volume '+value + '%'
        //console.log(index)
        audio.volume = value/100       
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            if (this.currentIndex <= 5) {
                $('.song.active').scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "center"
                });
            } else {
                $('.song.active').scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                    inline: "center"
                });
            }

        }, 300)
    },
    loadCurrentSong: function () {
        //DOM Text 
        heading.textContent = this.currentSong.name
        //DOM CSS
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        //DOM attribute
        audio.src = this.currentSong.path
        if ($('.song.active')) {
            $('.song.active').classList.remove('active');
        }
        const list = $$('.song');
        list.forEach((song) => {
            if (Number(song.getAttribute('data-index')) === this.currentIndex) {
                song.classList.add('active');
            }
        });
    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
        // Hiển thị trạng thái ban đầu của button repeat và random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },


    start: function () {
        //Gán cấu hình từ config vào ứng dụng
        this.loadConfig()

        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Lắng nghe / xử lý các sự kiện (DOM event)
        this.handleEvents()

        //Tải thong tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Redenr playlist
        this.render()


    }
}
app.start();