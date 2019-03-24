//javascript function  match takes in large string from image-to-text api, and then 
//parses the string into an array of strings. Then it searches for any matches
//between the array of strings and the ingredient database foodData, and returns 
//the info. If no matches are found, the food is presumed safe 
//and a message is printed

import Environment from './config/environment';
import firebase from './config/firebase';

function match(str){
    //foodData will be the dataset
    var count=0;
    var newarray=[];
    //str will be a string of 
    var strarray=str.split(","); //separates each string into index
    for (var i=0;i<strarray.length;i++){ //check for strarray[i] in database str2

        //for (var j in foodData){
        //    if (strarray[i]===j){
        //        //retrieve info about foodData[j]
        //        newarray[i]=foodData[j];
        //       count++;
        //    }
        var query = firebase.database().ref().orderByKey();
        query.once("value")
          .then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
              var key = childSnapshot.key;
              var childData = childSnapshot.val();
              if(strarray[i]===key){
                  console.log("working");
                  newarray[i]=key;
                  count++;
              }
              console.log(key);
              console.log("hi");
          });
        });
        }

    if(count===0){
        console.log("Safe to Eat! Enjoy!"); //if no matches are found
    }
    return newarray;
}

export default match;