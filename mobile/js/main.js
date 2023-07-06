$(function(){
  var goTop = $('.go_top');

  $(window).scroll(function(){
      if($(this).scrollTop() > 50){
        goTop.fadeIn();
      }else{
        goTop.fadeOut();
      }
  });
  goTop.click(function(e){
		e.preventDefault();
		$('html,body').stop().animate({scrollTop:0},1000);
	});

	var searchBtn = $('.buttons_wrap .search');
	var closeBtn = $('.close');
  var asideBtn = $('.aside');

  searchBtn.click(function(){
		$('body').addClass('search_open');
    if($('body').hasClass('search_open')){
      $('.search_form input').focus();
    }else{
      $('.search_form input').blur();
    }
  });
  closeBtn.click(function(){
    $('.search_form input').val('');
    $('body').removeClass('search_open open_aside'); 
	});
  asideBtn.click(function(){
    $('aside .main_menu > li >ul').css({display:'none'});
    $('body').addClass('open_aside');
  });
  $('aside .main_menu > li').click(function(e){
    e.preventDefault();
    $(this).siblings('li').find('ul').slideUp();
    $(this).find('ul').slideToggle();
  });
  //--------------------INDEX.HTML--------------------
  if($('.main_slide').length > 0){
    var swiper = new Swiper(".mySwiper", {
      loop: true,
      autoplay: {
          delay: 5000,
      },
      pagination: {
        el: ".mySwiper .swiper-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".mySwiper .swiper-button-next",
        prevEl: ".mySwiper .swiper-button-prev",
      }
    });

    var tabMenu = $('.item_tab_menu >li'),
        tabContents = $('.item_tab_content');

    tabMenu.click(function(e){
      e.preventDefault(); 
      var idx= $(this).index();
      $(this).addClass('active').siblings('li').removeClass('active');
      tabContents.hide();
      tabContents.eq(idx).show();
    });
    tabMenu.eq(0).trigger('click');

    var swiper2 = new Swiper(".item_tab_content", {
      loop: true,
      slidesPerView: "auto",
      centeredSlides: true,
      // spaceBetween: 5,
      pagination: {
        el: ".item_tab_content .swiper-pagination",
        clickable: true,
      },
      autoplay: {
          delay: 5000,
      },
    });
    var swiper3 = new Swiper(".how_to_wrap", {
      loop: true,
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 30,
      pagination: {
        el: ".how_to_wrap .swiper-pagination",
        clickable: true,
      },
      autoplay: {
          delay: 5000,
      },
    });

    let makeupLinks = $('.makeup_links')
    let makeupLinksOST = makeupLinks.offset().top;
    let makeupLinksHeight = makeupLinks.outerHeight();
    let brandHeight = $('.brand').outerHeight();

    let brandOST = $('.brand').offset().top;
    $(window).scroll(function(){
      fadeanimation(makeupLinksOST,makeupLinks,makeupLinksHeight*2);
      fadeanimation(brandOST,$('.brand'),brandHeight*2);
    });
    function fadeanimation(targetOST,target,position) {
      if($(window).scrollTop() > targetOST-position){
        if(!target.hasClass('active')){ 
          target.addClass('active'); 
        }
      }
    }//fadeanimation
  }
  //---------------------LIST.HTML---------------------
  if($('.product_list').length > 0){
    $('.list_count').text($('.product_list li').length);
  }
  //---------------------LIST & DETAIL---------------------
  if($('.colors').length > 0){
    $('.colors span').each(function(){
      var targetColor = $(this).text();
      $(this).css({backgroundColor : targetColor});
    });
  }
  //---------------------DETAIL.HTML-------------------
  if($('.product_slide').length > 0){
    var swiper = new Swiper(".product_slide", {
      pagination: {
        el: ".product_slide .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".product_slide .swiper-button-next",
        prevEl: ".product_slide .swiper-button-prev",
      }
    });
    $('.colors span').click(function(){
      $(this).addClass('active').siblings().removeClass('active');
      var colorTitle = $(this).attr('data-title');
      var colorDesc = $(this).attr('data-desc');
      $('.color_title').text(colorTitle);
      $('.color_desc').text(colorDesc);
  
      var idx = $(this).index();
      $('.select_colors option').eq(idx).prop("selected",true);

      changeImg(idx);
    });
    $('.colors span').eq(0).trigger('click');

    $('.select_colors').change(function(){
      var selectedColor = $(this).val();
      var selectedColorIdx = $('.select_colors option:selected').index(); 
      $('.color_title').text(selectedColor);
      $('.color_desc').text( $('.colors span').eq(selectedColorIdx).attr('data-desc') );
      $('.colors span').eq(selectedColorIdx).addClass('active').siblings().removeClass('active');

      changeImg(selectedColorIdx);
    });
    function changeImg(idx){
      $('.swiper-slide').each(function(i){ 
        var targetImg =`images/list_04_${idx}_${i}.jpg`;
        $(this).find('img').attr('src',targetImg);
          //0번을 클릭하면 리스트 3개의 이미지가 0_0, 0_1, 0_2로 변경
          // `images/list_04_${idx}_${i}.jpg` //0_0
            //`images/list_04_${idx}_${i}.jpg` //0_1
            //`images/list_04_${idx}_${i}.jpg` //0_2

          //1번을 클릭하면 리스트 3개의 이미지가 1-0, 1-1, 1-2로 변경
          //`images/list_04_${idx}_${i}.jpg` //1_0
          //`images/list_04_${idx}_${i}.jpg` //1_1
          //`images/list_04_${idx}_${i}.jpg` //1_2

          //2번을 클릭하면 리스트 3개의 이미지가 2-0, 2-1, 2-2로 변경
          //`images/list_04_${idx}_${i}.jpg` //2_0
          //`images/list_04_${idx}_${i}.jpg` //2_1
          //`images/list_04_${idx}_${i}.jpg` //2_2
      });
    }
    var plusBtn = $('.plus'),
        minusBtn = $('.minus'),
        unitPrice = $('.unitprice').attr('data-price'),
        total = $('.total'),
        amount = $('.amount');
        
    plusBtn.click(function(e){
      e.preventDefault();
        var currentAmount = amount.text();
        amount.text(++currentAmount);
        total.text((unitPrice * currentAmount).toLocaleString('en'));
    });
    minusBtn.click(function(e){
      e.preventDefault();
        var currentAmount = amount.text();

        if(currentAmount > 1){
            amount.text(--currentAmount);
        } else{
            alert('상품수량은 1개 이하로 설정할 수 없습니다.');
        }
        total.text((unitPrice * currentAmount).toLocaleString('en'));
    });
  
    var accordian = $('.tab_contents .section');
      accordian.click(function(){
        $(this).siblings('div').find('p').slideUp();
        $(this).find('p').slideToggle();
      });

    $('.tab_menu li').click(function(e){
      e.preventDefault();
      var idx = $(this).index();
      $('.tab_contents > div').eq(idx).css({display:'block'}).siblings().css({display:'none'});
      $(this).addClass('active').siblings().removeClass('active');
    });
    $('.tab_menu li').eq(0).trigger('click');
  }
  if(('.rating').length > 0){
    $('.rating').each(function(){
      var targetRate = $(this).attr('data-rate'); 
      
      /*반복문 1,2,3
      for(var i=0; i<targetRate;i++) {
          $(this).find('.fa-star').eq(i).css({color:'var(--primary-color'});
      }*/

      //css선택자 (-n+3)
      $(this).find(`.fa-star:nth-child(-n+${targetRate})`).css({color:'orange'});
    });
  }
  //---------------------CART.HTML-------------------
  if($('.cart_list').length > 0){
    const estimateList = $('.items li');
    let allCheck = $('.cart_list #all'),
        del = $('.cart_box_top .close_btn'),
        productsInCart,
        totalPrice,
        total = $('.total'),
        plusBtn = $('.plus'),
        minusBtn = $('.minus'); 

    allCheck.click(function(){
      productsInCart = $('.cart_list li').filter(function() { return $(this).css("display") != "none" });
      if( allCheck.prop('checked') ){
        productsInCart.find('input[type="checkbox"]').prop('checked',true); //현재 보여지는 상품만 체크 하기..
        //현재 체크된 상품의 인덱스 번호
        $('.cart_box_top').find('input[type="checkbox"]:checked').each(function(){
          let idx = $(this).parents('li').index();
          estimateList.eq(idx).show();
        });
      }else{
        $('.checked').prop('checked',false);
      }
      if($('.cart_box_top').find('input[type="checkbox"]:checked').length == 0){
        estimateList.hide();
        total.text('0');
      }else{
        price();
      }
    });
    allCheck.trigger('click');

    $('.checked').click(function(){
      var checkAmount = $('.checked').length;
      var checkedCount = $('.cart_box_top').find('input[type="checkbox"]:checked').length;
    
      if( checkAmount == checkedCount ){
        allCheck.prop('checked',true);
      }else{
        allCheck.prop('checked',false);
      }
      let idx = $(this).parents('li').index();
      let currentPrice = parseInt(total.text().replace(/,/g,""));
      let checked = parseInt($(this).parents('li').find('.unitprice').text().replace(/,/g,""));

      if($(this).prop('checked') == false){ //체크 해제
        estimateList.eq(idx).hide();
        totalPrice = currentPrice - checked;
      }else{                                //체크
        estimateList.eq(idx).show();
        totalPrice = currentPrice + checked;
      }
      total.text(totalPrice.toLocaleString('en'));
    });//$('.checked').click

    del.click(function(){
      $(this).siblings().find('input[type="checkbox"]').prop('checked',false); //삭제 버튼 누른 상품 선택 해제
      $(this).parents('li').hide(); //삭제 버튼 누른 상품 삭제
      $(this).parents('li').find('.unitprice').text('0');
      let idx = $(this).parents('li').index();
      estimateList.eq(idx).hide();
      price();
    });
    plusBtn.click(function(e){
      e.preventDefault();
      let unitPrice = $(this).parent().siblings().attr('data-price');
      let amount = $(this).siblings('em');
      let currentAmount = amount.text();
      amount.text(++currentAmount);
      $(this).parent().siblings('p').text((unitPrice * currentAmount).toLocaleString('en'));
      if($(this).parents('li').find('input[type="checkbox"]').prop('checked') == false){
        $(this).parents('li').find('input[type="checkbox"]').trigger('click');
      }
      receipt();
    });
    minusBtn.click(function(e){
      e.preventDefault();
      let unitPrice = $(this).parent().siblings().attr('data-price');
      let amount = $(this).siblings('em');
      let currentAmount = amount.text();
      if(currentAmount > 1){
        amount.text(--currentAmount);
      } else{
        alert('상품수량은 1개 이하로 설정할 수 없습니다.');
      }
      $(this).parent().siblings('p').text((unitPrice * currentAmount).toLocaleString('en'));
      receipt();
    });

    function receipt(){
      $('.cart_desc').find('.unitprice').each(function(i){
        let receiptPrice = $(this).text();
        $('.estimate .items li').eq(i).find('.price').text(receiptPrice);
      });
      price();
    }
    function price(){
      totalPrice = (parseInt($('.price1').text().replace(/,/g,""))) + (parseInt($('.price2').text().replace(/,/g,"")));
      total.text(totalPrice.toLocaleString('en'));
    }
  }
  //---------------------LOGIN.HTML-------------------
  if($('.join_form').length > 0){
    var $btnSubmit = $('.join_form input[type="submit"]'),
        $fields = $('.join_form .input');

    $btnSubmit.click(function(){
      $fields.each(function(){
        var value= $(this).val();
        if(value == ''){
          $(this).addClass('error');
        }
      });
    });
  }
  if($('.goback').length > 0){
    var goBack = $('.goback');
    
    goBack.click(function(){
      if(history.length > 1){
        window.history.back();
      }else{
        location.replace('./index.html'); //history 안쌓임
      }
    });
  }
});//ready