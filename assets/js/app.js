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
       })}
    
    
    
    
    

    
})