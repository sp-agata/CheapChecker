// API：アイテム情報取得API
var API_URL_SEARCH = "http://api.kakaku.com/WebAPI/ItemInfo/Ver1.0/ItemInfo.ashx";
var productID = '';
var apikey = '27a938d71da5f481d0ec3ce442a23cf5';

var FONT_LABEL_COLOR = '#000000';
var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';
//縦向き指定
win.orientationModes = [Titanium.UI.PORTRAIT];

//プロダクトID
productID = win.productCode;

// var label1 = Titanium.UI.createLabel({
// color : '#999',
// text : win.productCode,
// font : {
// fontSize : 20,
// fontFamily : 'Helvetica Neue'
// },
// textAlign : 'center',
// width : 'auto',
// height : 60
// });
// win.add(label1);
// アイテム情報検索
productSearch();

// 検索処理を実行
function productSearch() {
	var httpClient = Ti.Network.createHTTPClient();

	httpClient.open('GET', getSearchURL());
	httpClient.onload = function() {
		Ti.API.info(httpClient.responseText);
		// XML 文字列を Titanium.XML.parseString() を使って DOM に変換する
		var xmlDom = Titanium.XML.parseString(httpClient.responseText);
		setView(xmlDom);
	};
	httpClient.send();
}

// アイテム情報取得検索APIのURLを作成
function getSearchURL() {
	return API_URL_SEARCH + "?ApiKey=" + apikey + "&ProductID=" + productID + "&ResultSet=medium";
}

function setView(xmlDom) {
	var elementsItem = xmlDom.documentElement.getElementsByTagName("Item");
	var elementItem = elementsItem.item(0);
	var photoImageView = Ti.UI.createImageView({
		image : "http://img.kakaku.com/images/productimage/fullscale/" + productID + ".jpg",
		top : 0,
		left : 0,
		width : '100%'
	});
	win.add(photoImageView);
	var detailView = Ti.UI.createView({
		layout : 'vertical',
		top : 400,
		left : 5,
		width : 'auto',
		height : 'auto'
	});
	var productName = Ti.UI.createLabel({
		width : 'auto',
		height : 'auto',
		color : FONT_LABEL_COLOR,
		top : 5,
		left : 5
	});
	productName.text = '商　品　名：' + elementItem.getElementsByTagName("ProductName").item(0).text;
	detailView.add(productName);

	var makerName = Ti.UI.createLabel({
		width : 'auto',
		height : 'auto',
		color : FONT_LABEL_COLOR,
		top : 5,
		left : 5
	});
	makerName.text = 'メーカー名：' + elementItem.getElementsByTagName("MakerName").item(0).text;
	detailView.add(makerName);

	var lowestPrice = Ti.UI.createLabel({
		width : 'auto',
		height : 'auto',
		color : FONT_LABEL_COLOR,
		top : 5,
		left : 5
	});
	lowestPrice.text = '最安値価格：' + elementItem.getElementsByTagName("LowestPrice").item(0).text;
	detailView.add(lowestPrice);

	var itemPageUrl = Ti.UI.createLabel({
		width : 'auto',
		height : 'auto',
		color : FONT_LABEL_COLOR,
		top : 5,
		left : 5
	});
	itemPageUrl.text = 'サ ンプ ル：' + elementItem.getElementsByTagName("ItemPageUrl").item(0).text;
	detailView.add(itemPageUrl);

	win.add(detailView);

	var buttonView = Ti.UI.createView({
		layout : 'horizontal',
		top : 700,
		bottom : 5,
		left : 5,
		rigth : 5,
		width : 'auto',
		height : 'auto'
	});

	// アイテムページ
	var itemPageButton = Titanium.UI.createButton({
		title : '価格.comへ',
		left : 5,
		width : 'auto',
		height : 60
	});
	itemPageButton.addEventListener('click', function() {
		var intent = Ti.Android.createIntent({
			action : Ti.Android.ACTION_VIEW,
			data : elementItem.getElementsByTagName("ItemPageUrl").item(0).text
		});
		Ti.Android.currentActivity.startActivity(intent);
	});
	buttonView.add(itemPageButton);

	win.add(buttonView);
}