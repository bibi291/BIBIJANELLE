var removecartitembuttons = document.getElementsByClassName('king')
console.log(removecartitembuttons)
for (var i = 0; i < removecartitembuttons.length; i++) {
    var button = removecartitembuttons[i]
    button.addEventListener('click', function(event) {
        var buttonclicked = event.target
        buttonclicked.parentElement.parentElement.remove()
        update();
    })
}

function update() {
    var sectionp1 = document.getElementsByClassName('section-p1')
    for (var i = 0; i < sectionp1.length; i++) {
        var sectionp1 = sectionp1[i]
       function name(params) {
         var priceElement = sectionp1.getElementbyClassname('class-price')[0]
       }
        function name(params) {
            console.log('priceElement')
        }
    }

}