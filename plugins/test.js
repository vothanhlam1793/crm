export default function(context, inject){
    inject('hello', function(){
        console.log("Hello", context);
    });
}