let log = console.log;
let initialWidth = undefined;

window.onload = function () {

    initialWidth = ( document.body.clientWidth < 768 ) ? "mobile" : "desktop";
    /*Set onload responsiveness of the browser, subsequent change on width is
     * handled by makeResponsive function*/
    if ( initialWidth === "mobile" )
        useMobileWidth();
    else
        useDesktopWidth();

    window.onresize = function () {
        makeResponsive();
    }
}

function useMobileWidth () {
    let flowBotton = document.getElementById( "flow-btn" );
    let dashbord = document.getElementById( "dashboard" );

    flowBotton.onclick = function () {
        toggle( "dashboard" );
        /*
       ( dashbord.style.display !== "block" ) ? setDisplay(
        { id : "dashboard", display : "block" } ) :
        displayNone( "dashboard", "id" );
        */
        console.log( this );
    }
    initialWidth = "mobile";

}

function useDesktopWidth () {
    initialWidth = "desktop";

}

function makeResponsive () {
    let currentWidth = document.body.clientWidth;
    if ( initialWidth === "desktop" && currentWidth < 768 )
        useMobileWidth();
    else if ( initialWidth === "mobile" && currentWidth > 768 )
        useDesktopWidth();
}

function setAttributes ( el, attrs ) {
    Object.keys( attrs ).forEach( key => el.setAttribute( key, attrs[key] ) );
    return el;
}