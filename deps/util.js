
function log (log) { 
    var li = document.createElement("li");
    li.className = "log";
	li.appendChild( document.createTextNode( log ) ); 
	document.getElementById("results").appendChild( li );
}

function assert( value, desc ) { 
	var li = document.createElement("li");
	li.className = value ? "pass" : "fail"; 
	li.appendChild( document.createTextNode( desc ) ); 
	document.getElementById("results").appendChild( li ); 
} 

(function(){ 
  var queue = [], paused = false; 

  this.test = function(fn){ 
    queue.push( fn ); 
    runTest(); 
  }; 

  this.pause = function(){ 
    paused = true; 
  }; 

  this.resume = function(){ 
    paused = false; 
    setTimeout(runTest, 1); 
  }; 

  function runTest(){ 
    if ( !paused && queue.length ) { 
     queue.shift()(); 
     if ( !paused ) { 
        resume(); 
      } 
    } 
  } 
})();