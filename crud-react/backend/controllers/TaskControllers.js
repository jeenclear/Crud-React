const TaskModel = require("../models/TaskModel")

module.exports.getTasks = async (req, res) => {
    const tasks = await TaskModel.find()
    res.send(tasks)
}

module.exports.saveTask = (req, res) => {
    const {task} = req.body;
    const {name} = req.body;

    TaskModel.create({task, name})
    .then((data) => {
        console.log("Save Successfully...");
        res.status(201).send(data)
    }).catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    });
};

module.exports.updateTask = (req, res) => {
    const {id} = req.params
    const {task} = req.body;
    const {name} = req.body;

    TaskModel.findByIdAndUpdate(id, {task, name})
    .then(() => res.send("Updated successfully..."))
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    });
};

module.exports.deleteTask = (req, res) => {
    const {id} = req.params

    TaskModel.findByIdAndDelete(id)
    .then(() => res.send("Delete successfully..."))
    .catch((err) => {
        console.log(err);
        res.send({error: err, msg: "Something went wrong!"})
    });
};