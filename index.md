const express = require("express");
var app = express(); //tạo ứng dụng nodejs
const port = 3000;
app.use(express.json()); //cho phép đọc dữ liệu dạng json
const cors = require("cors");
app.use(cors()); //cho phép mọi nguồi bên ngoài request đến ứnd dụng
const { SanPhamModel, LoaiModel } = require("./database"); //các model lấy database
//routes

app
  .listen(port, () => {
    console.log(`Ung dung dang chay o port ${port}`);
  })
  .on("error", function (err) {
    console.log(`Loi xay ra khi chay ung dung ${err}`);
  });

//routes
app.get("/api/loai", async (req, res) => {
  const loai_arr = await LoaiModel.findAll({
    where: { an_hien: 1 },
    order: [["thu_tu", "ASC"]],
  });
  res.json(loai_arr);
});
app.get("/api/loai/:id", async (req, res) => {
  const loai = await LoaiModel.findByPk(req.params.id);
  res.json(loai);
});
app.get("/api/sphot/:sosp?", async (req, res) => {
  const sosp = Number(req.params.sosp) || 12;
  const sp_arr = await SanPhamModel.findAll({
    where: { an_hien: 1, hot: 1 },
    order: [
      ["ngay", "DESC"],
      ["gia", "ASC"],
    ],
    offset: 0,
    limit: sosp,
  });
  res.json(sp_arr);
});
app.get("/api/spmoi/:sosp?", async (req, res) => {
  const sosp = Number(req.params.sosp) || 6;
  const sp_arr = await SanPhamModel.findAll({
    where: { an_hien: 1 },
    order: [
      ["ngay", "DESC"],
      ["gia", "ASC"],
    ],
    offset: 0,
    limit: sosp,
  });
  res.json(sp_arr);
});
app.get("/api/sp/:id", async (req, res) => {
  const id = Number(req.params.id);
  const sp = await SanPhamModel.findOne({
    where: { id: id },
  });
  res.json(sp);
});
app.get("/api/sptrongloai/:id", async (req, res) => {
  const id_loai = Number(req.params.id);
  const sp_arr = await SanPhamModel.findAll({
    where: { id_loai: id_loai, an_hien: 1 },
    order: [
      ["ngay", "DESC"],
      ["gia", "ASC"],
    ],
  });
  res.json(sp_arr);
});
// Lab4 form đăng ký và đăng nhập
const { UserModel } = require("./database"); //các model lấy database
// đăng ký
app.post(`/api/dangky`, async (req, res) => {
  let { email, mat_khau, go_lai_mat_khau, ho_ten } = req.body;
  //validate

  //mã hóa mật khẫu
  const bcrypt = require("bcryptjs");
  const salt = bcrypt.genSaltSync(10);
  let mk_mahoa = bcrypt.hashSync(mat_khau, salt);

  //lưu vào bảng users
  await UserModel.create({ email: email, ho_ten: ho_ten, mat_khau: mk_mahoa })
    .then((user) => res.json({ thong_bao: "Đã lưu users", user: user }))
    .catch((err) => res.json({ thong_bao: "Lỗi lưu users ", err }));
});
// đăng nhập
app.post(`/api/dangnhap`, async (req, res) => {
  let { email, mat_khau } = req.body;
  const user = await UserModel.findOne({ where: { email: email } });
  if (user === null)
    return res.status(401).json({ thong_bao: "Email không tồn tại" });
  let mk_mahoa = user.mat_khau;
  const bcrypt = require("bcryptjs");
  let kq = bcrypt.compareSync(mat_khau, mk_mahoa);
  if (kq == false) return res.json({ thong_bao: "Mật khẩu không đúng" });

  // tạo token
  const fs = require("fs");
  const PRIVATE_KEY = "my_secret_key";
  const jwt = require("jsonwebtoken");
  const payload = { id: user.id, email: user.email }; // nội dung token
  const maxAge = "1h";
  const bearToken = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: maxAge,
    subject: user.id + "",
  });
  res.status(200).json({
    token: bearToken,
    expiresIn: maxAge,
    info: { id: user.id, ho_ten: user.ho_ten, email: user.email },
  });
});
app.post(`/api/dangnhapadmin`, async (req, res) => {
  let { email, mat_khau } = req.body;
  const user = await UserModel.findOne({ where: { email: email } });
  if (user === null)
    return res.status(401).json({ thong_bao: "Email không tồn tại" });
  let mk_mahoa = user.mat_khau;
  const bcrypt = require("bcryptjs");
  let kq = bcrypt.compareSync(mat_khau, mk_mahoa);
  if (kq == false) return res.json({ thong_bao: "Mật khẩu không đúng" });
  if (user.vai_tro != 1)
    return res.status(401).json({ thong_bao: "Bạn không phải admin" });
  if (user.khoa == 1)
    return res.status(401).json({ thong_bao: "Tài khoản bị khóa rồi" });

  //tạo token
  const fs = require("fs");
  let PRIVATE_KEY = fs.readFileSync("private-key.txt");
  const jwt = require("node-jsonwebtoken");
  const payload = { id: user.id, email: user.email }; //nội dung token
  const maxAge = "1h";
  const bearToken = jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: maxAge,
    subject: user.id + "",
  });
  res.status(200).json({
    token: bearToken,
    expiresIn: maxAge,
    info: {
      id: user.id,
      ho_ten: user.ho_ten,
      email: user.email,
      vai_tro: user.vai_tro,
    },
  });
});
// thêm sản phẩm admin
app.post("/api/sphot", async (req, res) => {
  const {
    ten_sp,
    ngay,
    gia,
    gia_km,
    id_loai,
    hot = 0,
    an_hien = 1,
    hinh,
    tinh_chat = 0,
    luot_xem = 0,
  } = req.body;

  try {
    const sp = await SanPhamModel.create({
      ten_sp,
      ngay,
      gia,
      gia_km,
      id_loai,
      hot,
      an_hien,
      hinh,
      tinh_chat,
      luot_xem,
    });
    res.json({ thong_bao: "Đã thêm sản phẩm", sp });
  } catch (err) {
    res.status(500).json({ thong_bao: "Lỗi khi thêm sản phẩm", err });
  }
});

// cập nhật sản phẩm
app.put("/api/sphot/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const sp = await SanPhamModel.findByPk(id);
    if (!sp)
      return res.status(404).json({ thong_bao: "Không tìm thấy sản phẩm" });

    const {
      ten_sp,
      ngay,
      gia,
      gia_km,
      id_loai,
      hot,
      an_hien,
      hinh,
      tinh_chat,
      luot_xem,
    } = req.body;

    Object.assign(sp, {
      ten_sp: ten_sp ?? sp.ten_sp,
      ngay: ngay ?? sp.ngay,
      gia: gia ?? sp.gia,
      gia_km: gia_km ?? sp.gia_km,
      id_loai: id_loai ?? sp.id_loai,
      hot: hot ?? sp.hot,
      an_hien: an_hien ?? sp.an_hien,
      hinh: hinh ?? sp.hinh,
      tinh_chat: tinh_chat ?? sp.tinh_chat,
      luot_xem: luot_xem ?? sp.luot_xem,
    });

    await sp.save();
    res.json({ thong_bao: "Đã cập nhật sản phẩm", sp });
  } catch (err) {
    res.status(500).json({ thong_bao: "Lỗi khi cập nhật sản phẩm", err });
  }
});

// xóa sản phẩm
app.delete("/api/sphot/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const sp = await SanPhamModel.findByPk(id);
    if (!sp)
      return res.status(404).json({ thong_bao: "Không tìm thấy sản phẩm" });

    await sp.destroy();
    res.json({ thong_bao: "Đã xóa sản phẩm" });
  } catch (err) {
    res.status(500).json({ thong_bao: "Lỗi khi xóa sản phẩm", err });
  }
});
