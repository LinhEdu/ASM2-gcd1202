function logout_ctrl(req, res) {
  req.session.destroy();
  res.redirect('/');
}
module.exports = logout_ctrl;
