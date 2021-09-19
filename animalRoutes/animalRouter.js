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
        animalArray.forEach((animal)=>{
            if(animal.animalName === req.query.team){
                foundAnimal = animal;
            }
        });

    if(!foundAnimal){
        res.send('Animal not found');
    }else{
        res.json({foundAnimal})
    }
    res.json({foundAnimal});
    }
});

router.get('/get-animal-array', function(req,res){
    res.json({animalArray});
});

//create a Get request that uses params id to query to animal by id
router.get('/get-animal-by-params-id/:id',function(req,res){
    let foundAnimal
    animalArray.forEach((animal)=>{
        if(animal.id ===  +req.params.id){
            foundAnimal = animal.animalName;
        }
    });

    res.json({foundAnimal, animalName: req.params.teamName});
});

//create a Get request that uses params animalName to query to animal by animalName
router.get('/get-animal-by-params-name/:name', function(req,res){
    let foundAnimal
    animalArray.forEach((animal)=>{
        if(animal.animalName === req.params.name){
            foundAnimal = animal;
        }
    });
    res.json({foundAnimal, id: req.params.id});
});


// create ========================================================================================================
// create a Post request to create a new animal and if there's duplicate in the array, you should let the user know that the animal already exists and please pick another animal. If the user sends in an empty object your program will tell the user "sorry no empty data"
router.post('/', function (req,res){
    if(animalArray.id || animalArray.animalName === req.body.id || req.body.animalName){
        req.send('animal already exists and please pick another animal');
    }else{
        animalArray.push(req.body);
    }
    res.json(animalArray); 
});

//Update request ==================================================================================================
//create a Put request to update the animalName using ID params. If successfully updated the name, your program should tell the user that successfully updated and send back the updated animal object. If the animal doesnt exists it should tell the user animal doesnt exists please check your spelling
router.put('/get-animal-by-params-id/:id', function(req,res){
    animalArray.forEach((animal)=>{
        if(animal.id === req.params.id){
            res.send('animal Updated');
        }else{
            res.send('animal does not exisits, please check your spelling')
        }
    });
})

//create a Put request to update the animalName using animalName params. If successfully updated the name, your program should tell the user that successfully updated and send back the updated animal object. If the animal doesnt exists it should tell the user animal doesnt exists please check your spelling
router.put('/get-animal-by-params-name/:name', function(req,res){
    animalArray.forEach((animal)=>{
        if(animal.name === req.params.name){
            res.send('animal Updated');
        }else{
            res.send('animal does not exisits, please check your spelling')
        }
    });
})

//Delete resquest ================================================================================================
//create a delete request to delete the animalName using animalName params. If successfully deleted, your program should tell the user that successfully deleted the animal, and returns the deleted animal to the user. create a Put request to update the animalName using params. If successfully updated the name, your program should tell the user that successfully updated and send back the updated animal object. If the animal doesnt exists it should tell the user animal doesnt exists please check your spelling
router.delete('/get-animal-by-params-name/:name', function(req,res){
    const getIndex = animalArray.findIndex(i => i.name == req.params);
    animalArray.forEach((obj)=>{
        if(obj.name === req.params.name){
            animalArray.splice(getIndex,1);
            res.send("Obj deleted")
        }
    });
});

//create a delete request to delete the animalName using ID params. If successfully deleted, your program should tell the user that successfully deleted the animal, and returns the deleted animal to the user. create a Put request to update the animalName using params. If successfully updated the name, your program should tell the user that successfully updated and send back the updated animal object. If the animal doesnt exists it should tell the user animal doesnt exists please check your spelling
router.delete('/get-animal-by-params-id/:id', function(req,res){
    const getIndex = animalArray.findIndex(i => i.id == req.params);
    animalArray.forEach((obj)=>{
        if(obj.id === req.params.id){
            animalArray.splice(getIndex,1);
            res.send("Obj deleted")
        }
    });
});


module.exports = router;
