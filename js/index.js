$in = function () {//hover時挙動
          $(this).stop().animate({
            opacity: 0.4
          }, 120 );
        };
$out = function () {//hover時挙動
        $(this).stop().animate({
          opacity: 1
        }, 120 );
    };
$url = "../index.html";
function st(){
  setTimeout(function(){
            $("body").fadeOut(2000);
        });
}
function size(){
  var w = Math.ceil($("body").width());
  var h = Math.ceil($(window).height());
  var width = w / 5;
  var length = $(".content").length;
  var contents_width = width * length;
  var home_height = Math.ceil(h * 0.12);
  var home_margin = Math.ceil(h * 0.03);
  var home_img_width = Math.ceil($(".home-button a img").width());
  var guide_height = Math.ceil(h * 0.1);
  var guide_margin = Math.ceil(h * 0.04);
  height = (h >= 600) ? Math.ceil(h * 0.65): Math.ceil(h * 0.55);
  $("body").animate({
    "opacity":1
  }, 2700 );
  $(".home-button").css({
    "height":home_height,
    "margin-top":home_margin,
    "margin-bottom":home_margin,
  });
  $(".home-button a img").css(
    "height",home_height
  );
  $(".home-button").css({
    "width":home_img_width,
    "opacity":1
  });
  $(".line-box").css(
    "opacity",1
    );
  $(".contents-box").css({
    "width":contents_width,
    "height":height
  });
  $(".content").css(
    "width",width
  );
  $(".guide-box").css({//下部メニューの高さ＆マージン調整
    "height":guide_height,
    "margin-top":guide_margin,
    "margin-bottom":guide_margin
    });
  var img_width = Math.ceil($(".guide-box a img").width());
  var a_img_width = img_width + 20;
  var guide_width = img_width * 4 + 80;
  $(".guide-box").css({
    "width":guide_width,
    "opacity":1
  });
  $(".guide-box a").css({
    "width": a_img_width
  });
}
function images(){
 var content_width = Math.ceil($(".content").width()); 
  $(".content-img")
    .each(function(i){
      var element = $(this);
      var img = new Image();
      img.src = element.attr('src');
      var width = Math.ceil(img.width);
      var height = Math.ceil(img.height);
      if(width != 0 || height != 0){//img値チェック
        var left_check_this = (width / 2);
        if(left_check_this < content_width) {//画像が小さい場合
          var origin = (left_check_this - content_width);
          element.css (
            "margin-left",origin
          );
        }else{//画像が小さくない場合
          var left = Math.ceil(-(width / 2));
          element.css (
            "margin-left",left
          );
        }
      }
      $(this).delay(200 * i).animate({opacity:1}, 800);
    });
}
$(window).load(function() {
  size();
  images();

});
$(window).resize(function() {
  size();
  images();
});
$(function() {
  $(".home-button a img").hover($in,$out);
  $(".content").hover($in,$out);



/*問題
1.contentを移動させた後に画面の大きさを変えるとcontent位置が狂う
　▶︎一つ一つのcontentにインデックスを振る
    移動時は常に+5/-5/0/最大数等のインデックスの計算を行い変数へ代入
    変数を元にリサイズ時のcontentサイズを再計算し、一番最初のcontentのLEFTの位置を指定する
2.contentを移動させている時にホバーさせるとコンテンツの移動アニメーションが止まってしまう
　▶︎contentにマウスが重なった場合のif文を挿入する
    現在アニメーションが起きているか？
      稼働中のアニメーションがクリックの場合
        ホバーアニメーションを行わない
      稼働中のアニメーションがホバーの場合
        ホバーアニメーション稼動させる


*/
/*
$(".content").bind({
    "mouseenter":function(){
      if(!$(".content").is(":animated")){
        $(this).stop().animate({
          opacity: 0.4
        }, 220 );
      }
    },
    "mouseleave":function(){
      if(!$(".content").is(":animated")){
        $(this).stop().animate({
          opacity: 1
        }, 220 );
      }
    }
});
*/





/*
  $(document).on("mouseenter", ".content", function() {
    if(!$(".content").is(":animated")){
        $(this).stop().animate({
          opacity: 0.4
        }, 220 );
    }
  });
  $(document).on("mouseleave", ".content", function() {
    if(!$(".content").is(":animated")){
        $(this).stop().animate({
          opacity: 1
        }, 220 );
    }
  });*/



  $(".guide-box a").hover($in,$out);
});
$(function(){//ガイドボタンリンク無効
  $(".guide-box a").click(function(){
    return false;
  })
});
$(function(){
  $(".home-button").click(function(){
    st();
    setTimeout(function(){
      location.href = $url;
    }, 2300);
    return false;
  }),
  $(".home-button a img").click(function(){
    $(this).unbind();
  }),
  $(".next").click(function(){
    var position = $(".content:first-child").position();
    var content_width = $(".content").width();
    var content_length = $(".content").length;
    var fast_position = position.left;
    var check_position = -(content_length - 5) * content_width;//最後の画像を画面表示させた場合の一番最初のcontentの位置
    var middle_position = -(content_length - 9) * content_width;
    if(fast_position != check_position){//最後の画像が画面表示位置にないか
      if(fast_position > middle_position){
        adjustment = fast_position - content_width * 5;
      $(".content").animate({
        "left":adjustment
      },"slow",function(){
        $(".content").queue([]);//queueを空にする
        $(".content").stop(); 
        });
    } else {
      $(".content").animate({
        "left":check_position
      },900,function(){
        $(".content").queue([]);//queueを空にする
        $(".content").stop(); 
      });
    }
    }
  }),
  $(".back").click(function(){
    var position = $(".content:first-child").position();//一番目の画像位置チェック
    var fast_position = Math.ceil(position.left);//一番目の画像位置チェック
    var content_width = Math.ceil($(".content").width());//各コンテンツのwidthチェック
    var middle_position = -content_width * 5;//コンテンツ５つ分のサイズチェック
    if(fast_position < 0){
      if(fast_position < middle_position){
        var adjustment = fast_position + content_width * 5;
        $(".content").animate({
          "left":adjustment
        },900,function(){
          $(".content").queue([]);//queueを空にする
          $(".content").stop(); 
        });
      } else {
        $(".content").animate({
          "left":0
        },900,function(){
          $(".content").queue([]);//queueを空にする
          $(".content").stop(); 
        });
      }
    }
  }),
  $(".fast-guide").click(function(){
    var position = $(".content:first-child").position();//一番目の画像位置チェック
    var fast_position = Math.ceil(position.left);//一番目の画像位置チェック
    var content_width = Math.ceil($(".content").width());//各コンテンツのwidthチェック
    if(fast_position < 0){
      $(".content").animate({
        "left":0
      },900,function(){
        $(".content").queue([]);//queueを空にする
        $(".content").stop(); 
      });
    }
  }),
  $(".last-guide").click(function(){
    var position = $(".content:first-child").position();//一番目の画像位置チェック
    var fast_position = Math.ceil(position.left);//一番目の画像位置チェック
    var content_width = Math.ceil($(".content").width());//各コンテンツのwidthチェック
    var content_length = $(".content").length;//全コンテンツ数チェック
    var check_position = -(content_length - 5) * content_width;//最後の画像を画面表示させた場合の一番最初のcontentの位置
    if(fast_position >= check_position){//最後の画像が画面表示位置にないか
      $(".content").animate({
        "left":check_position
      },900,function(){
        $(".content").queue([]);//queueを空にする
        $(".content").stop(); 
      });
    }
  })
});
/*console.log(content_length);
    console.log(check_position);
    console.log(position_adjustment_1);
    console.log(position_adjustment_2);
    */