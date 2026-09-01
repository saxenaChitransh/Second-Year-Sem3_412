console.log("start");
Process.nexttick(()=>{
    console.log("nexttick");  

});
setTimeout(() => {
    console.log("First setTimeout");
    
}, 5000);

setTimeout(() => {
    console.log("Second setTimeout");
    
}, 0);

