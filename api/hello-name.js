module.exports = (req, res) => {
    res.send("hello " + req.query.name)
}