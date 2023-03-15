const conn = require('../configs/configs_database.js')
const nodemailer = require('nodemailer');

//configs tài khoản gửi mail khi đăng kí
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'super.quyet69@gmail.com',
    pass: 'kxdtzmqxeceqekqb',
  },
});

const validator = require('validator');

const email = 'example@example.com';
//validate password
const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
}
//api xử lý khi đăng nhập
let login =async(req,res)=>{

  const{username,password} = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin' });
    return;
  }

  try {
    // Lấy thông tin tài khoản từ database
    const [rows, fields] = await conn.query('SELECT * FROM user_login WHERE username = ?', [username]);
    const user = rows[0];

    console.log(JSON.stringify(user));

    // Kiểm tra có tài khoản và mật khẩu của tài khoản có trùng mật khẩu trong database
    if (!user||password!==user.password) {
      return res.status(400).json({ message: 'Sai tài khoản hoặc mật khẩu' });
    }
    // Đăng nhập thành công
    return res.status(200).json({ message: `Đăng nhập thành công ,chào mừng ${user.username}` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: `Đăng nhập không thành công `,error });
  }
}
//api đăng kí
let regiter=async(req,res)=>{
  const{email,username,password} = req.body;
  if (!username||!email || !password) {
    res.status(400).json({ message: 'Vui lòng nhập đầy đủ các trường' });
    return;
  }
  if (validator.isEmail(email)) {
    console.log('Email hợp lệ');
    
  } else {
    console.log('Email không hợp lệ');
    res.status(400).json({ message: 'Điền đúng định dạng email' });
    return;
  }
  if (validatePassword(password)) {
    console.log('Mật khẩu hợp lệ');
  } else {
    console.log('Mật khẩu không hợp lệ');
    res.status(400).json({ message: 'Mật Khẩu phải có 6 ký tự chứ 1 chữ cái hoa và số' });
    return;
  }
  
  try {
    // Kiem tra tai khoan ton tai hay chua
    const [rows, fields] = await conn.query('SELECT * FROM user_login WHERE username = ?', [username]);
    const user = rows[0];

    // Kiểm tra tài khoản có tồn tại không
    if (user) {
      return res.status(400).json({ message: 'Tài khoản đã tồn tại' });
    }
    if (email) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }
    // tài khoản hợp lệ
    if (!user) {
      await conn.query('INSERT INTO user_login (username,password,email) VALUES (?,?,?)',[username,password,email])
      const mailOptions = {
        from: 'super.quyet69@gmail.com',
        to: `${email}`,
        subject: 'Đăng kí thành công',
        text: 'Chúc mừng bạn đã đăng ký tài khoản thành công ở Quyet media',
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      return res.status(200).json({ message: 'Đăng kí thành công' });
      
    }
    return res.status(200).json({ message: `Đăng kí thành công , chào mừng ${user.username}` });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'có gì đó sai sai' });
  }
}


let test =async(req,res)=>{
  let [response,fields]= await conn.query('SELECT * FROM user_login');
  return(
    res.status(200).json(response)
  )
  

};



module.exports = {login,test,regiter}