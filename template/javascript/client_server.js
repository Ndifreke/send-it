function clientRequest( method = "GET", path ){

   let req = new XMLHttpRequest();
   if (path.indexOf( "http" ) === -1){
      let origin = window.location.origin;
      log( origin + "/sendIt/public/" + path );
      req.open( method, origin + "/sendIt/public/" + path );
      req.setRequestHeader( "Content-Type", "text/javascript" );
   } else {
      //cross origin request
      req.open( method, path );
      req.setRequestHeader( "Access-Control-Allow-Origin", "*" );
      req.setRequestHeader( "Access-Control-Allow-Headers",
       "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With" );
      req.setRequestHeader( "Access-Control-Allow-Methods", "GET, PUT, POST" );
   }

   req.onreadystatechange = function ( ){
      if (req.readyState === 4){
         log( req.responseText )
      }
   }
   req.send( null );

}