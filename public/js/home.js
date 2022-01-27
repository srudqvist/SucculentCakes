


$(()=> {
    // create an instance of the home page
    homeHApp = new HApp("Succulent Cakes");
    homeHApp.initialize();
});

class HApp {
    constructor (name) {
        this.title = name;
    }

    get getTitle() {
        return this.title;
    }


    initialize () {

        let navbar = $(".navbar");
        $(window).scroll(function(){
            let oTop = $(".section-2").offset().top-window.innerHeight;
            if($(window).scrollTop() > oTop){
                navbar.addClass("sticky");
            }else{
                navbar.removeClass("sticky");
            }
        });

        /** Counter Animation */
        // Working
        let nCount = function(selector){
            $(selector).each(function(){
                $(this).animate({
                    Counter: $(this).text() 
                },
                {
                    duration: 10000,
                    easing: "swing",
                    step: function(value){
                        $(this).text(Math.ceil(value));
                    }
                });
            });
        };

        let a = 0;
        $(window).scroll(function(){
            let oTop = $(".section-2").offset().top - window.innerHeight;
            if(a==0 && $(window).scrollTop() >= oTop){
                a++
                nCount(".rect > h1")
            }

        })

    }


    

}

