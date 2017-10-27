/********************************************************************************

	SYNCER 〜 知識、感動をみんなと同期(Sync)するブログ

	* 配布場所
	https://syncer.jp/how-to-use-geolocation-api

	* 最終更新日時
	2015/08/16 03:17

	* 作者
	あらゆ

	** 連絡先
	Twitter: https://twitter.com/arayutw
	Facebook: https://www.facebook.com/arayutw
	Google+: https://plus.google.com/114918692417332410369/
	E-mail: info@syncer.jp

	※ バグ、不具合の報告、提案、ご要望など、お待ちしております。
	※ 申し訳ありませんが、ご利用者様、個々の環境における問題はサポートしていません。

********************************************************************************/


// ユーザーの端末がGeoLocation APIに対応しているかの判定

var location_lat = null;
var location_lng = null;


var location_flag = false;


function getMyLocation(){

	if (location_lat != null){

		return (location_lat, location_lng);
	}

	return null;
}

// 対応している場合
if( navigator.geolocation )
{
	// 現在地を取得
	navigator.geolocation.getCurrentPosition(

		// [第1引数] 取得に成功した場合の関数
		function( position )
		{
			// 取得したデータの整理
			var data = position.coords ;

			// データの整理
			location_lat = data.latitude ;
			location_lng = data.longitude ;
			var accLatlng = data.accuracy ;

			// アラート表示
//			alert( "あなたの現在位置は、\n[" + lat + "," + lng + "]\nです。" ) ;

			// loadTest(); // index.html の関数
			location_flag = true;

			// HTMLへの書き出し
			// document.getElementById( 'result' ).innerHTML = '<dl><dt>緯度</dt><dd>' + location_lat + '</dd><dt>経度</dt><dd>' + location_lng + '</dd><dt>緯度、経度の精度</dt><dd>' + accLatlng;
		},

		// [第2引数] 取得に失敗した場合の関数
		function( error )
		{
			// エラーコード(error.code)の番号
			// 0:UNKNOWN_ERROR				原因不明のエラー
			// 1:PERMISSION_DENIED			利用者が位置情報の取得を許可しなかった
			// 2:POSITION_UNAVAILABLE		電波状況などで位置情報が取得できなかった
			// 3:TIMEOUT					位置情報の取得に時間がかかり過ぎた…

			// エラー番号に対応したメッセージ
			var errorInfo = [
				"原因不明のエラーが発生しました…。" ,
				"位置情報の取得が許可されませんでした…。" ,
				"電波状況などで位置情報が取得できませんでした…。" ,
				"位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
			] ;

			// エラー番号
			var errorNo = error.code ;

			// エラーメッセージ
			var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ;

			// アラート表示
			alert( errorMessage ) ;

			// HTMLに書き出し
			document.getElementById("result").innerHTML = errorMessage;
		} ,

		// [第3引数] オプション
		{
			"enableHighAccuracy": false,
			"timeout": 8000,
			"maximumAge": 2000,
		}

	) ;
}

// 対応していない場合
else
{
	// エラーメッセージ
	var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ;

	// アラート表示
	alert( errorMessage ) ;

	// HTMLに書き出し
	document.getElementById( 'result' ).innerHTML = errorMessage ;
}
