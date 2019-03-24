//javascript function  match takes in large string from image-to-text api, and then 
//parses the string into an array of strings. Then it searches for any matches
//between the array of strings and the ingredient database foodData, and returns 
//the info. If no matches are found, the food is presumed safe 
//and a message is printed

import Environment from './config/environment';
import firebase from './config/firebase';


function match (mystr) {
    console.log('hi'); 
    var o = new Object(); 
    var promise1 = new Promise(function(resolve, reject) {
        console.log('here'); 
        resolve(mystr.split(", ")); 
      });
    return promise1.then ((resArray) => {for (i = 0; i < resArray.length; i++){
        console.log('lala'); 
        resArray[i] = resArray[i].replace(/[^a-zA-Z0-9À-ž\s]/g, ""); 
        resArray[i] = resArray[i].replace(/(\r\n|\n|\r)/gm, "");
        resArray[i] = resArray[i].toLowerCase(); 
        }
        console.log(resArray); 
        return resArray }, 
            (err) => {console.log(err); })
    .then (res => {
        var o = new Object(); 
        for (i = 0; i<res.length; i++){
            o[res[i]] = true; 
        }
        console.log(o);  
        return o; 
    }).then(obj => {
        console.log("nearly there!"); 
        return getNearbyPosts(obj); 
    }); 
}

getNearbyPosts = function (object){
    console.log(object); 
    var query = firebase.database().ref().orderByKey();
    var listOfItems = [];
    
    // We return the promise created by query.once
    return query.once("value").then((snapshot) => {
    
      // our inital .then will do some data filtering
      snapshot.forEach((childSnapshot) => {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(object[key]); 
        if(object[key] == true){
          listOfItems.push(childSnapshot.key);
        }
      });
      if (listOfItems.length == 0) {
          return ["Safe to eat!"]; 
      }
      console.log("complete"); 
      console.log(listOfItems); 
      // We return here to continue the chain. The next .then that picks this up will have this result
      return listOfItems;
    });
  }
  


export default match;