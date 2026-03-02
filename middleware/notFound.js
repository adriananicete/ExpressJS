const notFound = (req, res, next) => {
    const error = new Error('Not Found coming from error middleware');
    error.status = 404;
    next(error)
}

export default notFound;