//テキストのカウントアップ+バーの設定
var bar = new ProgressBar.Line(splash_text, {//id名を指定
	easing: 'easeInOut',//アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能
	duration: 1000,//時間指定(1000＝1秒)
	strokeWidth: 0.2,//進捗ゲージの太さ
	color: '#555',//進捗ゲージのカラー
	trailWidth: 0.2,//ゲージベースの線の太さ
	trailColor: '#bbb',//ゲージベースの線のカラー
	text: {//テキストの形状を直接指定				
		style: {//天地中央に配置
			position: 'absolute',
			left: '50%',
			top: '50%',
			padding: '0',
			margin: '-30px 0 0 0',//バーより上に配置
			transform:'translate(-50%,-50%)',
			'font-size':'1rem',
			color: '#fff',
		},
		autoStyleContainer: false //自動付与のスタイルを切る
	},
	step: function(state, bar) {
		bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
	}
});

//アニメーションスタート
bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画します
	$("#splash_text").fadeOut(10);//フェイドアウトでローディングテキストを削除
	$(".loader_cover-up").addClass("coveranime");//カバーが上に上がるクラス追加
	$(".loader_cover-down").addClass("coveranime");//カバーが下に下がるクラス追加
	$("#splash").fadeOut();//#splashエリアをフェードアウト
});



//スクロールした際の動きを関数でまとめる
function PageTopAnime() {

	var scroll = $(window).scrollTop(); //スクロール値を取得
	if (scroll >= 200){//200pxスクロールしたら
		$('#page-top').removeClass('DownMove');		// DownMoveというクラス名を除去して
		$('#page-top').addClass('UpMove');			// UpMoveというクラス名を追加して出現
	}else{//それ以外は
		if($('#page-top').hasClass('UpMove')){//UpMoveというクラス名が既に付与されていたら
			$('#page-top').removeClass('UpMove');	//  UpMoveというクラス名を除去し
			$('#page-top').addClass('DownMove');	// DownMoveというクラス名を追加して非表示
		}
	}
	
	var wH = window.innerHeight; //画面の高さを取得
	var footerPos =  $('#footer').offset().top; //footerの位置を取得
	if(scroll+wH >= (footerPos+10)) {
		var pos = (scroll+wH) - footerPos+10 //スクロールの値＋画面の高さからfooterの位置＋10pxを引いた場所を取得し
		$('#page-top').css('bottom',pos);	//#page-topに上記の値をCSSのbottomに直接指定してフッター手前で止まるようにする
	}else{//それ以外は
		if($('#page-top').hasClass('UpMove')){//UpMoveというクラス名がついていたら
			$('#page-top').css('bottom','10px');// 下から10pxの位置にページリンクを指定
		}
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top').click(function () {
$('body,html').animate({
	scrollTop: 0//ページトップまでスクロール
}, 300);//ページトップスクロールの速さ。数字が大きいほど遅くなる
return false;//リンク自体の無効化
});


//任意のタブにURLからリンクするための設定
function GethashID (hashIDName){
	if(hashIDName){
	  //タブ設定
	  $('.tab li').find('a').each(function() { //タブ内のaタグ全てを取得
		var idName = $(this).attr('href'); //タブ内のaタグのリンク名（例）#lunchの値を取得 
		if(idName == hashIDName){ //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
		  var parentElm = $(this).parent(); //タブ内のaタグの親要素（li）を取得
		  $('.tab li').removeClass("active"); //タブ内のliについているactiveクラスを取り除き
		  $(parentElm).addClass("active"); //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
		  //表示させるエリア設定
		  $(".area").removeClass("is-active"); //もともとついているis-activeクラスを取り除き
		  $(hashIDName).addClass("is-active"); //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加
		}
	});
	}
}

  //タブをクリックしたら
$('.tab a').on('click', function() {
	var idName = $(this).attr('href'); //タブ内のリンク名を取得
	GethashID (idName);//設定したタブの読み込みと
	return false;//aタグを無効にする
});


  // 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
	  $('.tab li:first-of-type').addClass("active"); //最初のliにactiveクラスを追加
	  $('.area:first-of-type').addClass("is-active"); //最初の.areaにis-activeクラスを追加
	var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
	GethashID (hashName);//設定したタブの読み込み
});



//Profileへスクロール
$('.profile').click(function(){

    let position = $('.profile-section').offset().top;

    $('body,html').animate({
		scrollTop:position-30//ページトップまでスクロール。数値はページトップから下方向の位置
	},300);//スクロールの速さ。数字が大きいほど遅くなる
	//return false;//リンク自体の無効化。これをしないとリンク先へ遷移<a ref="#"></a>⇒アニメーションなしでページTOP遷移 ⇒<a ref="javascript:void(0)">にすればreturn falseは不要
});

//Skillsへスクロール
$('.skills').click(function(){

    let position = $('.skills-section').offset().top;

    $('body,html').animate({
		scrollTop:position-30//ページトップまでスクロール。数値はページトップから下方向の位置
	},300);//スクロールの速さ。数字が大きいほど遅くなる
	//return false;//リンク自体の無効化。これをしないとリンク先へ遷移<a ref="#"></a>⇒アニメーションなしでページTOP遷移 ⇒<a ref="javascript:void(0)">にすればreturn falseは不要
});

//Worksへスクロール
$('.works').click(function(){

    let position = $('.works-section').offset().top;

    $('body,html').animate({
		scrollTop:position-30//ページトップまでスクロール。数値はページトップから下方向の位置
	},300);//スクロールの速さ。数字が大きいほど遅くなる
	//return false;//リンク自体の無効化。これをしないとリンク先へ遷移<a ref="#"></a>⇒アニメーションなしでページTOP遷移 ⇒<a ref="javascript:void(0)">にすればreturn falseは不要
});

//Contactへスクロール
$('.contact').click(function(){

    let position = $('.contact-section').offset().top;

    $('body,html').animate({
		scrollTop:position-30//ページトップまでスクロール。数値はページトップから下方向の位置
	},300);//スクロールの速さ。数字が大きいほど遅くなる
	//return false;//リンク自体の無効化。これをしないとリンク先へ遷移<a ref="#"></a>⇒アニメーションなしでページTOP遷移 ⇒<a ref="javascript:void(0)">にすればreturn falseは不要
});

// スクロール連動アニメーション
$(function () {

    // aimation呼び出し
    if ($('.js-scroll-trigger').length) {
        scrollAnimation();
    }

    // aimation関数
    function scrollAnimation() {
        $(window).scroll(function () {
            $(".js-scroll-trigger").each(function () {
				//関数定義
                let position = $(this).offset().top,
				 //.offset().topは、ドキュメント最上部を基準に指定要素の位置のY座標を戻り値として返します。
                scroll = $(window).scrollTop(),
				 //scrollTop()メソッドは、垂直方向のスクロール位置を戻り値として返します。従って、＄(window)に対して、.scrollTop()を指定することで、ブラウザのスクロール位置を取得することが可能となります。
                windowHeight = $(window).height();
				 //$(window).height()ではウィンドウの高さを取得し、格納しています。

                if (scroll > position - windowHeight +200) {
                    $(this).addClass('is-active');
                }

				if (scroll < position - windowHeight +200) {
                    $(this).removeClass('is-active');
                }
            });
        });
    }
    $(window).trigger('scroll');
	//リロード時などに、is-activeクラスが外れてしまうのを防いでいます。

});