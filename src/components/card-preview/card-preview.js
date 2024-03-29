import 'slick-carousel/slick/slick.min';
import 'slick-carousel/slick/slick.css';

const $cardPreview = $('.js-card-preview__slider');

$cardPreview.slick({
  dots: true,
  dotsClass: 'card-preview__dots',
  nextArrow: '<div class="card-preview__arrow_action_next"></div>',
  prevArrow: '<div class="card-preview__arrow_action_prev"></div>',
});
