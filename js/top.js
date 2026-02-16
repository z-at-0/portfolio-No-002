$url_1 = "./star/index.html";
$url_2 = "./animal/index.html";
$url_3 = "./forest/index.html";
function center() {
	var w = Math.floor(($(window).width() - $(".item-box").width()) / 2);
	var h = Math.floor(($(window).height() - $(".item-box").height()) / 2);
	$(".item-box").css({
        "top": h,
        "left": w
    });
}
function st(){
  setTimeout(function(){
            $(".item").fadeOut(1500);
        },1200);
}
$(window).load(function() {//item位置中央調節 and 0.7秒毎に1item表示
	center();
	$(".item")
		.each(function(i){
    		$(this).delay(200 * i).animate({opacity:1}, 800);
		});
});
$(window).resize(function() {//常時item位置中央調節 
	center();
});
$(function() {
    var i = $(".item").length;
    var i_l = i - 1;//最後の番号
    var i_l_2 = i - 2;//最後から二番目の番号
    if(i <= 2) {// item数 3個以下の処理
    	$(".item:last").addClass("item-last");
    } else {// item数 4個以上の処理
		$(".item").each(function(q){
			if(q > 1){//三つ目のitemからclass追加
				$(this).addClass("item-adjustment");
				if( (q == i_l_2) && (q % 2 == 0)) {//最後から二番目のitem処理
						$(this).removeClass('item-adjustment');
				}
				if( q == i_l){//最後のitem処理
					if(q % 2 == 0) {//item数　奇数の処理
						$(this).removeClass("item-adjustment");
						$(this).addClass("item-last");
					} else {//item数　偶数の処理
						$(this).removeClass('item-adjustment');
					}
				}		
			}
		});
    }	
});
$(function() {//クリックした要素を中央へ移動(他はフェードアウト)
	var item = $(".item");
  var i_max = $(".item").length;//最大item数チェック
  var i_stage = Math.floor(($(".item").length + 1) / 2);//段数チェック
  var total_height = 170 * i_stage;//全体の高さ挿入
  var total_width = 426;//全体の幅挿入
	$(".item").click(function () {
    var index = $(".item").index(this) + 1;//クリックした要素の番号
    item.not(this).stop().animate({//クリックしてない要素をフェードアウト
			"opacity": "0"
		},500);
    if(index == 1) {//item数　1個目の処理
      var correct_height = (total_height - 170)/ 2;//(340-170)/2=85 中心から85px上に移動する為の変数
      var correct_width = Math.floor((total_width - 213)/ 2);//(426-213)/2=106 中心から106px左に移動する為の変数
      $(this).animate({ 
        top:correct_height,
        left:correct_width
      });
      st();
      setTimeout(function(){
          location.href = $url_1;
      }, 3000);
    }
		if(index == 2) {//item数　2個目の処理
			var correct_height = (total_height - 170)/ 2;//(340-170)/2=85 中心から85px上に移動する為の変数
			var correct_width = -Math.floor((total_width - 213)/ 2);//(426-213)/2=106 中心から106px左に移動する為の変数
			$(this).animate({ 
				top:correct_height,
				left:correct_width
			});
			st();
      setTimeout(function(){//一時的にリンク解除
          location.href = $url_2;
      }, 3000);
		}
    if(index == 3) {//item数　3個目の処理
      var correct_height = -(total_height - 170)/ 2;//(340-170)/2=85 中心から85px上に移動する為の変数
      $(this).animate({ 
        top:correct_height
      });
      st();
      setTimeout(function(){//一時的にリンク解除
          location.href = $url_3;
      }, 3000);
    }
	});	
});
$(function() {
  $(".item")
    .hover(
      function () {
        $(this).find("h3").stop().animate({
          paddingTop: 72,
        paddingBottom: 60,
        paddingLeft: 10,
        paddingRight: 10
        }, 350, "swing" );
      },
      function () {
        $(this).find("h3").stop().animate({
          paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 0,
        paddingRight: 0
        }, 350, "swing" );
      }
    );
});
$(function() {
$(".item").click(function(){
  $(this).unbind();
});
});

