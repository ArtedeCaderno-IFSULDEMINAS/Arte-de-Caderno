function handler404(req, res, next) {
    res.status(404).send('404 Not Found');
}

export default handler404;