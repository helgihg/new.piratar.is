$(document).ready(function () {
  if ($('body.articles-page').length) {
    let swiper = setupCarousel('section.representative-articles', 2);
    setupRepresentativeFilter();

    // Select category and representatives using query parameters
    const urlParams = new URLSearchParams(window.location.search);
    let category = urlParams.get('category');
    if (category) {
      $("[data-category='" + category + "']").click();
      let representative = urlParams.get('representative');
      if (representative) {
        $("[data-representative='" + representative + "']").click();
      }
    }
  }
});

const setupRepresentativeFilter = () => {
  const filterCategory = (category) => {
    if (category) {
      $(".swiper-slide").not("[data-category='" + category + "']").addClass("non-swiper-slide").removeClass("swiper-slide").hide();
      $(".swiper-wrapper [data-category='" + category + "']").removeClass("non-swiper-slide").addClass("swiper-slide").show();
    } else {
      $(".non-swiper-slide").removeClass("non-swiper-slide").addClass("swiper-slide").show();
    }
  };

  const filterRepresentative = (representative, category) => {
    if (representative) {
      $(".swiper-slide").not("[data-representative='" + representative + "']").addClass("non-swiper-slide").removeClass("swiper-slide").hide();
      $(".swiper-wrapper [data-representative='" + representative + "']").removeClass("non-swiper-slide").addClass("swiper-slide").show();
    } else {
      filterCategory(category);
    }
  };

  $('.representative-filters a.category').click(function (e) {
    e.preventDefault();
    $this = $(this);
    if (!$this.hasClass('active')) {
      $('.representative-filters > ul > li.active').removeClass('active');
      $this.parent().addClass('active');
      let category = $this.data('category');
      let query = category ? '?category=' + category : '';
      filterCategory(category);
      updateQuery(query);
    }
  });

  $('.representative-filters a.representative').click(function (e) {
    e.preventDefault();
    $this = $(this);
    if (!$this.hasClass('active')) {
      $this.closest('.sub-menu').find('a.representative.active').removeClass('active');
      $this.addClass('active');
      let category = $('.representative-filters .active .category').data('category');
      let representative = $this.data('representative');
      filterRepresentative(representative, category);
      let query = '?category=' + category;
      query = representative ? query + '&representative=' + representative : query;
      updateQuery(query);
    }
  });
};