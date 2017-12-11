const basicController = {};

basicController.get = (req, res) => {
    res.status(200)
        .send({
            message: 'Hello there, Our API is working!'
        });
};

export default basicController;
