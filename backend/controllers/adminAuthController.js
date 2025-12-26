const Admin = require("../model/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Admin খোঁজা (Model = Admin, document = admin)
    const admin = await Admin.findOne({ email });

    console.log("ADMIN:", admin);

    if (!admin) {
      return res.status(401).json({ message: "Login failed" });
    }

    // 2️⃣ Password match
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Login failed" });
    }

    // 3️⃣ JWT generate
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4️⃣ Response
    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
