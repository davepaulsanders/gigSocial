const db = require("../config/connection");
const { User, Setlist, Song } = require("../models");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Setlist.deleteMany({});
    await Song.deleteMany({});
    await User.create({
      username: "davepsandy",
      email: "davepsandy@gmail.com",
      password: "123456",
    });

    await Setlist.create({
      setListName: "Setlist 1",
      setListCreator: "davepsandy",
      likes: 0,
    });

    await Song.create({
      songTitle: "Chandelier",
      artist: "Sia",
      image:
        "https://images.genius.com/5bcfb76690b3fb068a317c76579b70b5.300x300x1.jpg",
      lyrics: "https://genius.com/Sia-chandelier-lyrics",
      bpm: 120,
      embed:
        "<div id='rg_embed_link_378195' class='rg_embed_link' data-song-id='378195'>Read <a href='https://genius.com/Sia-chandelier-lyrics'>“Chandelier” by Sia</a> on Genius</div> <script crossorigin src='//genius.com/songs/378195/embed.js'></script>",
    });

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
});
