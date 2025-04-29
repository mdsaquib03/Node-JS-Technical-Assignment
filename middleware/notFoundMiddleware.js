
const notFoundMiddleware = (req, res) => {
    res.status(404).json({ msg: 'Module not found' });
}

export default notFoundMiddleware;