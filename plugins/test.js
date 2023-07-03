export default function(context){
    // console.log(context);
    context.app.hello = function(){
        console.log("Hello");
    }
}