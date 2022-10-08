const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");

const config = require("./config/key");

const { User } = require("./models/User");

app.use(bodtParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    config.mongoURI,
    "mongodb+srv://jhLee:flwlgud12@boilerplate.gfr0kn6.mongodb.net/?retryWrites=true&w=majority"
    // {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
    // }
    // 몽구스 6버전 이상은 usenewparser,topology, createindex, findandmodify - true 작성 불필요
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// 모델 - 스키마를 감싸주는 역할을 함
// 스키마 - 하나하나의 정보들을 지정해줌

app.get("/", (req, res) => {
  res.send("Hello World! 안녕하세요~");
});

app.post("/register", (req, res) => {
  // 회원가입시 필요한 정보들을 client 에서 가져오면
  // 그것들을 데이터베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
