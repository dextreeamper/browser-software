window.addEventListener('load', function(){
    // toggleMenu();
}, false);


function toggleMenu(){
    var $menuButton = $('.toggleMenuButton');
    var $menu = $('.menu');
    // open and close the toggle menu.
    $menuButton.click(function(event){
        event.stopPropagation();
        $menu.toggleClass('toggleMenu');
        // toggle class for the menu button for adding a color.
        $menuButton.toggleClass('toggleMenuButton--accent');
    });
    // close the menu when the user click outside of the menu container.
    $(window).on('click', function(){
        $menu.removeClass('toggleMenu');
        // remove the accent color on the toggleMenu
        $menuButton.removeClass('toggleMenuButton--accent');        
    });
}

