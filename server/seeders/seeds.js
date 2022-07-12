const db = require("../config/connection");
const { User, Setlist, Song, Comment } = require("../models");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Setlist.deleteMany({});
    await Song.deleteMany({});
    await Comment.deleteMany({});

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
      setlist: setListInfo._id,
    });

    await Setlist.findOneAndUpdate(
      { _id: setListInfo._id },
      { $push: { songs: songInfo._id } },
      { new: true }
    );

    const commentInfo = await Comment.create({
      commentText: "This is a test comment",
      username: "davepsandy",
      setList: setListInfo._id,
    });

    //await Comment.findOneAndDelete({_id: commentInfo._id})
    // await Setlist.findOneAndUpdate(
    //     { _id: setListInfo._id },
    //     { $pull: { songs: songInfo._id } },
    //     { new: true }
    //   );
    // setListCreator must be passed for middleware to delete from user as well
    // await Setlist.findOneAndDelete({
    //   _id: setListInfo._id,
    //   setListCreator: setListInfo.setListCreator,
    // });

    //await User.findOneAndDelete({ username: "davepsandy" });
    
    const setListTest = await Setlist.findOne({ setListCreator: "davepsandy" });
    const userTest = await User.findOne({ username: "davepsandy" });

    console.log(setListTest, userTest);
    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
});
