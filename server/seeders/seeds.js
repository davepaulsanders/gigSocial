const db = require("../config/connection");
const { User, Setlist, Song } = require("../models");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Setlist.deleteMany({});
    await Song.deleteMany({});

    const userInfo = await User.create({
      username: "davepsandy",
      email: "davepsandy@gmail.com",
      password: "123456",
    });

    const setListInfo = await Setlist.create({
      setListName: "Setlist 1",
      setListCreator: "davepsandy",
      likes: 0,
    });

    const songInfo = await Song.create({
      songTitle: "Chandelier",
      artist: "Sia",
      image:
        "https://images.genius.com/5bcfb76690b3fb068a317c76579b70b5.300x300x1.jpg",
      lyrics: "https://genius.com/Sia-chandelier-lyrics",
      bpm: 120,
      embed:
        "<div id='rg_embed_link_378195' class='rg_embed_link' data-song-id='378195'>Read <a href='https://genius.com/Sia-chandelier-lyrics'>“Chandelier” by Sia</a> on Genius</div> <script crossorigin src='//genius.com/songs/378195/embed.js'></script>",
    });

    await Setlist.findOneAndUpdate(
      { _id: setListInfo._id },
      { $push: { songs: songInfo._id } },
      { new: true }
    );
       
       // setListCreator must be passed for middleware to delete from user as well
    await Setlist.findOneAndDelete({
      _id: setListInfo._id,
      setListCreator: setListInfo.setListCreator,
    });
  

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
});
