import $ from 'jquery';
import '../../node_modules/lightbox2/dist/js/lightbox-plus-jquery';
import './slider';

// see more
const htmlGallery = `
<div class="col-6 col-xl-12">
    <div class="row gallery__row">
        <a href="image/gallery_photo04.jpg" data-lightbox="gallery-list-photo" class="gallery__link">
            <img src="image/gallery_photo02.jpg" alt="photo 2" class="gallery__photo gallery__photo_left">
        </a>
        <a href="image/gallery_photo05.jpg" data-lightbox="gallery-list-photo" class="gallery__link">
            <img src="image/gallery_photo03.jpg" alt="photo 3" class="gallery__photo">
        </a>
    </div>
</div>
<div class="col-6 col-xl-12">
    <div class="row gallery__row">
        <a href="image/gallery_photo04.jpg" data-lightbox="gallery-list-photo" class="gallery__link">
            <img src="image/gallery_photo04.jpg" alt="photo 4" class="gallery__photo gallery__photo_left">
        </a>
        <a href="image/gallery_photo05.jpg" data-lightbox="gallery-list-photo" class="gallery__link">
            <img src="image/gallery_photo05.jpg" alt="photo 5" class="gallery__photo">
        </a>
    </div>
</div>
`
seeMore.addEventListener("click", function () {
    document.getElementById('more-photo').classList.add('active-flex');
    $('#more-photo').append(htmlGallery);
    // document.getElementById('seeMore').classList.add('display-none');
});

// btn burger
let btn = document.querySelector('#burgerMenuBtnItem');
btn.addEventListener('click', function () {
    document.documentElement.classList.toggle('menu-open');
});

// menu scroll blocks
let positions = [];
let currentActive = null;
let links = $('.scroll-to');

$(".anchor").each(function () {
    positions.push({
        top: $(this).position().top - 100,
        a: links.filter('[href="#' + $(this).attr('id') + '"]')
    });
});

positions = positions.reverse();

$(window).on('scroll', function () {
    let winTop = $(window).scrollTop();
    // console.log(winTop);
    for (let i = 0; i < positions.length; i++) {
        if (positions[i].top < winTop) {
            if (currentActive !== i) {
                currentActive = i;
                links.removeClass('active');
                positions[i].a.addClass("active");
            }
            break;
        }
    }
});

//scroll
function scrollNav() {
    $('.menu__link').click(function () {
        $('html').removeClass("menu-open");
        $('#burgerMenuBtn').prop('checked', false);

        $(".active").removeClass("active");
        $(this).addClass("active");
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
        return false;
    });
}

function btnScroll() {
    $('.scroll-block').click(function () {
        $('html, body').stop().animate({
            scrollTop: $('#project').offset().top
        }, 1000);
        return false;
    });
}

function scrollTop() {
    $('.link-to-top').click(function () {
        $('html, body').stop().animate({
            scrollTop: $('#top').offset().top
        }, 1000);
        return false;
    });
}

function showTopScroll() {
    if (pageYOffset > 900) {
        document.getElementById('showScroll').classList.add('scroll-active');
    } else {
        document.getElementById('showScroll').classList.remove('scroll-active');
    }
}

function showHeaderMenu() {
    if (pageYOffset > 200) {
        document.getElementById('menu').classList.add('menu-active');
    } else {
        document.getElementById('menu').classList.remove('menu-active');
    }
}
btnScroll();
scrollNav();
scrollTop();
setInterval(showTopScroll, 100);
setInterval(showHeaderMenu, 100);

let input = $('.validate-input .input');

$('.validate-form').on('submit', function () {
    let check = true;

    for (let i = 0; i < input.length; i++) {
        if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
        }
    }

    return check;
});


$('.validate-form .input').each(function () {
    $(this).focus(function () {
        hideValidate(this);
    });
});

function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
        }
    } else {
        if ($(input).val().trim() == '') {
            return false;
        }
    }
}

function showValidate(input) {
    let thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
}

function hideValidate(input) {
    let thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
}