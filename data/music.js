var localstoragemusicdata = JSON.parse(localStorage.getItem("musicdata")) || [];

export const musicdata =
  localstoragemusicdata.length > 0
    ? localstoragemusicdata
    : [
        {
          id: 0,
          name: "A Desert Tale",
          img: "assets/album/Adeserttale.jpg",
          musicsrc:
            "assets/musics/a-desert-tale-ethnic-amp-fantasy-background-music-109862.mp3",
          author: "SergeQuadrado",
          favorite: false,
          type: "desert",
          time: "04:10",
        },
        {
          id: 1,
          name: "Arab And Muslim",
          img: "assets/album/Arabandmuslim.jpg",
          musicsrc: "assets/musics/arab-and-muslim-190765.mp3",
          author: "StockMusic",
          favorite: false,
          type: "classic",
          time: "02:07",
        },
        {
          id: 2,
          name: "Arabic Dance",
          img: "assets/album/arabicdance.jpg",
          musicsrc: "assets/musics/arabic-dance-195511.mp3",
          author: "Lesfm",
          favorite: false,
          type: "classic",
          time: "02:17",
        },
        {
          id: 3,
          name: "Desert Voices",
          img: "assets/album/desertvoices.webp",
          musicsrc: "assets/musics/desert-voices-11468.mp3",
          author: "ArizonaGuide",
          favorite: false,
          type: "desert",
          time: "04:05",
        },
        {
          id: 4,
          name: "joyful Eid Al Fitr",
          img: "assets/album/muslimfestival.jpg",
          musicsrc: "assets/musics/joyful-eid-al-fitr-125219.mp3",
          author: "ramolmusic",
          favorite: false,
          type: "festival",
          time: "02:41",
        },
        {
          id: 5,
          name: "Muslim Festival",
          img: "assets/album/muslimfestival.jpg",
          musicsrc: "assets/musics/muslim-festival-123815.mp3",
          author: "ramolmusic",
          favorite: false,
          type: "festival",
          time: "02:22",
        },
        {
          id: 6,
          name: "Sands Of Serenity",
          img: "assets/album/sandsofserenity.webp",
          musicsrc: "assets/musics/sands-of-serenity-192869.mp3",
          author: "Magnetic_Trailer",
          favorite: false,
          type: "desert",
          time: "02:00",
        },
        {
          id: 7,
          name: "Tales Of The Arabian",
          img: "assets/album/talesofthearabian.webp",
          musicsrc: "assets/musics/tales-of-the-arabian-nights-154006.mp3",
          author: "OB-LIX",
          favorite: false,
          type: "classic",
          time: "01:59",
        },
        {
          id: 8,
          name: "Travel In Arab",
          img: "assets/album/Arabandmuslim.jpg",
          musicsrc: "assets/musics/travel-in-arab-190766.mp3",
          author: "StockMusic",
          favorite: false,
          type: "classic",
          time: "01:45",
        },
      ];
