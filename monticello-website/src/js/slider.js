import $ from 'jquery';
import 'slick-carousel';
import newsList from './lib/createNews';

const slider = $('#newsList');
const sliderTitle = $('#titleBlock');
let newsItemHtml = '';

function getNewsHtml(item) {
    let newsHtml = `
    <div class="news__container-card">
        <div class="news__card">
            <a  class="news__link" href="image/${item.img}" data-lightbox="news${item.id}">
                <img src="image/${item.img}" alt="photo ${item.id}" class="news__photo">
            </a>
            <div class="news__info-block">
                <strong class="news__strong">${item.title}</strong>
                <p class="news__info">${item.info}</p>
                <div class="row">
                    <img src="image/${item.authorImg}" alt="${item.authorName}" class="news__main-photo">
                    <div class="news__main-info">
                        <p class="news__name">${item.authorName}</p>
                        <p class="news__date">${item.date}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return newsHtml;
};

newsList.forEach(function (item) {
    newsItemHtml += getNewsHtml(item);
});
// console.log(newsItemHtml);

slider.append(newsItemHtml);
slider.slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    responsive: [{
            breakpoint: 1105,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                arrows: false,
            }
        },
    ],
});

sliderTitle.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    dotsClass: "vertical-dots",
});