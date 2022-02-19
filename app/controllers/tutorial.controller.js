const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {

// Validate
  if(!req.body.title){
    res.status(400).send({messsage : "Tutorial Title cannot be empty"});
    return;
  } 

  // Create Tutorial
  const tutorial = new Tutorial({
      title : req.body.title,
      description : req.body.description,
      published : req.body.published ? req.body.published : false
  })

  // save Tutorial

  tutorial.save(tutorial).
  then((data) =>{
        res.send(data);
  }).
  catch(err => {
      res.status(500).send({message : err.response || "some error faced during creating tutorial"})
  })


};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    
    Tutorial.find(condition)
    .then((data) =>{
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({message : err.message || "Error While Retriving data"});
    })
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findById(id).
    then((data) =>{
        if(!data){
            res.status(404).send({message : "Tutorial id not found with id "+id});
        }else{
                res.send(data);
            }
    })
    .catch((err) => {
        res.status(500).send({message:err.message || "error while fetching the tutorial with id"});
    })
    }


// Update a Tutorial by the id in the request
exports.update = (req, res) => {

    if(!req.body){
         return res.status(400).send({message:'Request Cannot be empty !!'});          
    }

    const id = req.params.id;
    console.log(id);

   
    Tutorial.findByIdAndUpdate( id, req.body )
    .then((data) =>{
        if(!data){
            res.status(404).send({message : "Tutorial Id or req.body not found"});
            
        }
        else{
            res.send({message : `Data updated succesfully with id = ${id}`});
            //console.log(id);
        }
    }).catch((err)=>{
        res.status(500).send({message : "Facing problem while updating the Tutorial"});
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
  .then((data) => {
      if(!data){
          res.status(400).message({message :  `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`})
      }
      else{
          res.send({message : "Tutorial deleted Successfully !!" })
      }
  })
  .catch((err) => {
      res.status(500).send({message : "Facing problem while Deleting Tutorial"});
  })

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.deleteMany({})
  .then((data) => {
      res.send({message : `${data.deletedCount} records deleted successfully`})
  })
  .catch((err) => {
      res.status(500).send({message : err.message || "Some error occured during deleting all tutorials"})
  })
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
    Tutorial.find({published : true})
    .then((data) =>{
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({message : err.message || "Some error occured during fetching published Tutorials"});
    })
    
};
