function closure(){
    let i = 0 ; 
    return {
        add : (number)=>{
            i+=number;
        },
        get : ()=>{
            return i;
        }
    }
}

const temp = closure();

module.exports = temp;