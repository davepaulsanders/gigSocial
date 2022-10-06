const db = require("../config/connection");
const { User, Setlist, Song, Comment } = require("../models");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await Setlist.deleteMany({});
    await Song.deleteMany({});
    await Comment.deleteMany({});

    const userInfo1 = await User.create({
      username: "davepsandy",
      email: "davepsandy@gmail.com",
      password: "123456",
    });
    const userInfo2 = await User.create({
      username: "margenice",
      email: "margenice@gmail.com",
      password: "123456",
    });

    const setListInfo1 = await Setlist.create({
      setListName: "Setlist 1",
      setListCreator: "margenice",
      likes: 0,
    });
    const setListInfo2 = await Setlist.create({
      setListName: "Setlist 2",
      setListCreator: "margenice",
      likes: 4,
    });

    const songInfo1 = await Song.create({
      songTitle: "Chandelier",
      artist: "Sia",
      image:
        "https://images.genius.com/5bcfb76690b3fb068a317c76579b70b5.300x300x1.jpg",
      lyrics: "https://genius.com/Sia-chandelier-lyrics",
      bpm: 120,
      embed:
        "<div id='rg_embed_link_378195' class='rg_embed_link' data-song-id='378195'>Read <a href='https://genius.com/Sia-chandelier-lyrics'>“Chandelier” by Sia</a> on Genius</div> <script crossorigin src='//genius.com/songs/378195/embed.js'></script>",
    });
    const songInfo2 = await Song.create({
      songTitle: "Raining Blood",
      artist: "Slayer",
      image:
        "https://images.genius.com/692b8f35d1308861874470985e78790d.300x300x1.png",
      lyrics: "https://genius.com/Slayer-raining-blood-lyrics",
      bpm: 190,
      embed: "none",
    });

    await Setlist.findOneAndUpdate(
      { setListId: setListInfo1.setListId },
      { $push: { songs: songInfo1._id } },
      { new: true }
    );
    await Setlist.findOneAndUpdate(
      { setListId: setListInfo1.setListId },
      { $push: { songs: songInfo2._id } },
      { new: true }
    );
    await Setlist.findOneAndUpdate(
      { setListId: setListInfo2.setListId },
      { $push: { songs: songInfo1._id } },
      { new: true }
    );
    await Setlist.findOneAndUpdate(
      { setListId: setListInfo2.setListId },
      { $push: { songs: songInfo2._id } },
      { new: true }
    );

    const commentInfo1 = await Comment.create({
      commentText: "This is a test comment",
      username: userInfo1.username,
      setList: setListInfo1.setListId,
    });
    const commentInfo2 = await Comment.create({
      commentText: "This is also a test comment",
      username: userInfo1.username,
      setList: setListInfo1.setListId,
    });
    const commentInfo3 = await Comment.create({
      commentText: "Yet another comment",
      username: userInfo2.username,
      setList: setListInfo2.setListId,
    });
    const commentInfo4 = await Comment.create({
      commentText: "This is also a test comment",
      username: userInfo2.username,
      setList: setListInfo2.setListId,
    });

    console.log("all done!");
    process.exit(0);
  } catch (err) {
    console.log(err);
  }
});
