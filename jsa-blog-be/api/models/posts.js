const PATH = "./data.json"
const fs = require("fs");

class  Posts {

    add(newPost){
        const data = this.readData();
        data.unshift(newPost);
        this.storeData(data);
    }

    get(){
        return this.readData();
    }

    readData(){
        try{
            return JSON.parse(fs.readFileSync(PATH, 'utf8'));
        }catch(err){
            console.log(err);
            return false;
        }
    }

    storeData(data){
        try{
            fs.writeFileSync(PATH,JSON.stringify(data))
        } catch(err){
            console.log(err);
        }
    }


}

module.exports = Posts;