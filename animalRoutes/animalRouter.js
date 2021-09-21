const express = require("express");
const router = express.Router();

let animalArray = [
    { id: 1, animalName: "dog" },
    { id: 2, animalName: "cat" },
    { id: 3, animalName: "hamster" },
    ];

//Get page ======================================================================================================
//create a Get request to query all the animalArray and in the same request if query exists your program should able to query a specific animal using animalName
router.get('/',function(req,res){
    let foundAnimal;
    if(Object.keys(req.query).length === 0){
        res.json(animalArray);
    }else{
        animalArray.forEach((obj)=>{
            if(obj.animalType === req.query.animalType.toLowerCase()){
                foundAnimal = obj;
            }
        });
    if(!foundAnimal){
        res.send("Sorry, what you looking for does not exist");
    }else{
        res.json({foundAnimal});
    }
    }
});

router.get('/get-animal-array', function(req,res){
    res.json({animalArray});
});

//create a Get request that uses params id to query to animal by id
router.get('/get-animal-by-params-id/:id',function(req,res){
    let foundAnimal;
    const {id} = req.params;
    animalArray.forEach((obj) =>{
        if(obj.id === +id){
            foundAnimal = obj.animalType;
        }
    });

    if(!foundAnimal){
        res
        .status(404)
        .json({message: "Sorry, what you looking for does not exist"})
    }else{
        res.json({foundAnimal});
    }
});

//create a Get request that uses params animalName to query to animal by animalName
router.get('/get-animal-by-params-name/:name', function(req,res){
    let foundAnimal;
    const {name} = req.params;
    animalArray.forEach((obj) =>{
        if(obj.name === +name){
            foundAnimal = obj.animalType;
        }
    });

    if(!foundAnimal){
        res
        .status(404)
        .json({message: "Sorry, what you looking for does not exist"})
    }else{
        res.json({foundAnimal});
    }
});


// create ========================================================================================================
// create a Post request to create a new animal and if there's duplicate in the array, you should let the user know that the animal already exists and please pick another animal. If the user sends in an empty object your program will tell the user "sorry no empty data"
router.post('/', function (req,res){
    const {id,animalType} = req.body;
    let duplicateAnimal = false;

    animalArray.forEach(function(item){
        if(item.animalType === animalType){
            duplicateAnimal = true;
        }
    })

    if(duplicateAnimal){
        res.status(422).json({
            message: "Animal already exist! pick another"});
        }else{
            animalArray.push({id,animalType});
            res.json({message: "animal created", animal: {id, animalType}});
        } 
});

//Update request ==================================================================================================
//create a Put request to update the animalName using ID params. If successfully updated the name, your program should tell the user that successfully updated and send back the updated animal object. If the animal doesnt exists it should tell the user animal doesnt exists please check your spelling
router.put('/get-animal-by-params-id/:id', function(req,res){
    const {id} = req.params;
    const {animalType} = req.body;
    let itemFound = false;
    animalArray.forEach((item)=>{
        if(item.id === +id){
            itemFound = true;
            item.animalType = animalType;
        }
    });

    if(itemFound){
        res.json({message: `Animal with the id:${id} Updated`});
    }else{
        res.status(404).json({message: "Not found! Please try again"});
    }
});

//create a Put request to update the animalName using animalName params. If successfully updated the name, your program should tell the user that successfully updated and send back the updated animal object. If the animal doesnt exists it should tell the user animal doesnt exists please check your spelling
router.put('/get-animal-by-params-name/:name', function(req,res){
    const {name} = req.params;
    const {animalType} = req.body;
    let itemFound = false;
    animalArray.forEach((item)=>{
        if(item.name === +name){
            itemFound = true;
            item.animalType = animalType;
        }
    });

    if(itemFound){
        res.json({message: `Animal with the name:${name} Updated`});
    }else{
        res.status(404).json({message: "Not found! Please try again"});
    }
});

//Delete resquest ================================================================================================
//create a delete request to delete the animalName using animalName params. If successfully deleted, your program should tell the user that successfully deleted the animal, and returns the deleted animal to the user. create a Put request to update the animalName using params. If successfully updated the name, your program should tell the user that successfully updated and send back the updated animal object. If the animal doesnt exists it should tell the user animal doesnt exists please check your spelling
router.delete('/get-animal-by-params-name/:name', function(req,res){
    const {name} = req.params;
    let itemIndex = null;
    let foundItem = false;
    animalArray.forEach(function(item,index){
        if(item.name === +name){
            itemIndex = index;
            foundItem = true;
        }
    });

    if(!foundItem){
        res.status(409).json({message: "Sorry, not found!"});
    }else{
        animalArray.splice(itemIndex,1);
        res.json({message: "Animal Deleted"});
    };
});

//create a delete request to delete the animalName using ID params. If successfully deleted, your program should tell the user that successfully deleted the animal, and returns the deleted animal to the user. create a Put request to update the animalName using params. If successfully updated the name, your program should tell the user that successfully updated and send back the updated animal object. If the animal doesnt exists it should tell the user animal doesnt exists please check your spelling
router.delete('/get-animal-by-params-id/:id', function(req,res){
    const {id} = req.params;
    let itemIndex = null;
    let foundItem = false;
    animalArray.forEach(function(item,index){
        if(item.id === +id){
            itemIndex = index;
            foundItem = true;
        }
    });

    if(!foundItem){
        res.status(409).json({message: "Sorry, not found!"});
    }else{
        animalArray.splice(itemIndex,1);
        res.json({message: "Animal Deleted"});
    };
});


module.exports = router;
