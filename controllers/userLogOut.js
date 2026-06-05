const userLogOut = (req, res) => {
  try {
    res.clearCookie('token')
    res.status(200).json({ success: true, msg: "user logout successfully" });
  } catch (error) {}
};

export default userLogOut;
