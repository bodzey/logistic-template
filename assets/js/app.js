/* jQuery */
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
    let viewportmeta = document.querySelector('meta[name="viewport"]')
    if (viewportmeta) {
        viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0'
        document.body.addEventListener('gesturestart', function () {
            viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6'
        }, false)
    }
}



$(function () {

    let intro = $("#intro")
    let header = $("#header")
    let introH = intro.innerHeight()
    let headerH = header.innerHeight()
    let scrollTop = $(window).scrollTop()

    /*Header Scroll
    ======================================*/

    headerScroll()

    $(window).on("scroll resize", function () {
        headerScroll()

    })

    function headerScroll() {
        introH = intro.innerHeight()
        headerH = header.innerHeight()

        let scrollTop = $(this).scrollTop()
    
        if (scrollTop >= (introH - headerH)) {
            header.addClass("header--dark")
        } else {
            header.removeClass("header--dark")
        }
    }

    /*Smooth Scroll
    ======================================*/
    $("[data-scroll").on("click", function (event) {
        event.preventDefault()

        let scrollEl = $(this).data("scroll")
        let scrollElPos = $(scrollEl).offset().top

        console.log(scrollElPos)
        $("html, body").animate({
            scrollTop: scrollElPos - headerH
        }, 600)
    })
    
    
    /* ScrollSpy
    ======================================*/
    let windowH = $(window).height()

    scrollSpy(scrollTop)

    $(window).on("scroll", function () {
        scrollTop = $(this).scrollTop()
        
        scrollSpy(scrollTop)
   })
    
    
    function scrollSpy(scrollTop) {
        $("[data-scrollspy]").each(function () {

            let $this = $(this)
            let sectionId = $this.data("scrollspy")
            let sectionOffset = $this.offset().top
            sectionOffset = sectionOffset - (windowH * 0.3)
            
            if (scrollTop >= sectionOffset) {
                $('#nav [data-scroll]').removeClass('active')
                $('#nav [data-scroll="'+ sectionId +'"]').addClass('active')
            }

            if (scrollTop == 0) {
                $('#nav [data-scroll]').removeClass('active')
            }
        })
    }
    
    /* Modal
    =====================================*/

    $('[data-modal]').on('click', function(event) {
        event.preventDefault();
        let modal = $(this).data('modal');

        $('body').addClass('no-scroll');
        $(modal).addClass('show');

        setTimeout(function() {
            $(modal).find('.modal__content').css({
                transform: 'scale(1)',
                opacity: '1'
            });
        });
    });


    $('[data-modal-close]').on('click', function(event) {
        event.preventDefault();
        let modal = $(this).parents('.modal');
        modalClose(modal);
    });


    $('.modal').on('click', function() {
        let modal = $(this);
        modalClose(modal);
    });


    $('.modal__content').on('click', function(event) {
        event.stopPropagation();
    });


    function modalClose(modal) {
        modal.find('.modal__content').css({
            transform: 'scale(0.5)',
            opacity: '0'
        });

        setTimeout(function() {
            $('body').removeClass('no-scroll');
            modal.removeClass('show');
        }, 200);
    }
    

    
})