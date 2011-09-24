Ti.include("style/searchProduct.js")
Titanium.UI.setBackgroundColor('#000');

var apikey = '27a938d71da5f481d0ec3ce442a23cf5';
var target = '';
var category = 'ALL';
var sort = 'popularityrank';
var pageNo = 1;
var SEARCH_COUNT = 20;
var IMAGE_WIDTH = 90;
var searchSuccessFlg = true;
var serchUpdateFlg = false;
var nextSearchFlg = false;
// API：商品検索
var API_URL_SEARCH = "http://api.kakaku.com/WebAPI/ItemSearch/Ver1.0/ItemSearch.aspx";
//
// create root window
//
var win = Titanium.UI.createWindow();
win.backgroundColor = '#fff';
win.open({
	animated : true
});

// ダミー検索フィールド配置（これがないと、検索フィールドの挙動が変）
var searchText = Titanium.UI.createTextField(styles["dummysearch"]);
win.add(searchText);
// 検索フィールド配置
var searchText = Titanium.UI.createTextField(styles["searchField"]);
searchText.addEventListener('return', function(e) {
	search();
});
win.add(searchText);

// 検索カテゴリ
var searchControler = Ti.UI.createView(styles["searchControler"]);
var categoryLabel = Ti.UI.createLabel(styles["categoryLabel"]);
var sepalateLabel = Ti.UI.createLabel(styles["sepalateLabel"]);
var categoryPicker = Ti.UI.createPicker();
var selectData = [];
// 検索カテゴリ - プルダウン項目設定
for(var i = 0; i < 12; i++) {
	var styeleName = 'selectData' + i;
	selectData[i] = Ti.UI.createPickerRow(styles[styeleName]);
}
// turn on the selection indicator (off by default)
categoryPicker.selectionIndicator = true;
categoryPicker.add(selectData);
searchControler.add(categoryLabel);
searchControler.add(sepalateLabel);
searchControler.add(categoryPicker);
win.add(searchControler);

// 表示順
var sortControler = Ti.UI.createView(styles["sortControler"]);
var sortLabel = Ti.UI.createLabel(styles["sortLabel"]);
var sepalateLabel = Ti.UI.createLabel(styles["sepalateLabel"]);
var sortPicker = Ti.UI.createPicker();
var sortData = [];
// 表示順 - プルダウン項目設定
for(var i = 0; i < 4; i++) {
	var styeleName = 'sortData' + i;
	sortData[i] = Ti.UI.createPickerRow(styles[styeleName]);
}
// turn on the selection indicator (off by default)
sortPicker.selectionIndicator = true;
sortPicker.add(sortData);
sortControler.add(sortLabel);
sortControler.add(sepalateLabel);
sortControler.add(sortPicker);
win.add(sortControler);

// 検索ボタン
var searchButton = Titanium.UI.createButton(styles["searchButton"]);
searchButton.addEventListener('click', search);
win.add(searchButton);

// TODO debug
// var label = Ti.UI.createLabel({
// text : 'Make a move',
// top : 180,
// width : 'auto',
// height : 'auto',
// textAlign : 'center'
// });
// win.add(label);

var tv = Ti.UI.createTableView({
	style : Titanium.UI.iPhone.TableViewStyle.GROUPED,
	showVerticalScrollIndicator : false
});

// 処理中プログレス
var actInd = Titanium.UI.createActivityIndicator(styles['activityIndicator']);
actInd.addEventListener('android:back', function() {
	actInd.hide();
});
win.add(actInd);

// 処理結果メッセージ
var noSearchResultLabel = Ti.UI.createLabel({
	text : '検索条件に一致する商品はありませんでした。\n検索条件を指定しなおして下さい',
	color : FONT_LABEL_COLOR,
	top : 200,
	width : 'auto',
	height : 'auto',
	textAlign : 'center'
});

function updateGoods(xmlDom) {

	var data = [];
	var elementsItem = xmlDom.documentElement.getElementsByTagName("Item");

	//TODO test
	// label.text = 'updateGoods:' + elementsItem.length;

	if(elementsItem != null && elementsItem.length > 0) {
		for(var i = 0; i < elementsItem.length > 0; i++) {
			if(elementsItem.length === SEARCH_COUNT) {
				nextSearchFlg = true;
			}else{
				nextSearchFlg = false;
			}

			var elementItem = elementsItem.item(i);

			var row = Ti.UI.createTableViewRow({
				top : 5,
				left : 5,
				bottom : 5,
				width : 'auto',
				height : 'auto'
			});

			var photoImageView = Ti.UI.createImageView({
				image : elementItem.getElementsByTagName("ImageUrl").item(0).text,
				top : 5,
				left : 0,
				width : 'auto',
				height : 'auto'
			});
			row.add(photoImageView);
			// 製品名
			var productNameLabel = Ti.UI.createLabel({
				top : 5,
				left : IMAGE_WIDTH,
				width : 400,
				height : 60,
				color : '#2b4771',
				backgroundColor : '#c0c0ff'
			});
			productNameLabel.text = elementItem.getElementsByTagName("ProductName").item(0).text;
			row.add(productNameLabel);
			// 発売日
			var dateLabel = Ti.UI.createLabel({
				top : 65,
				left : IMAGE_WIDTH,
				width : 'auto',
				height : 'auto'
			});
			var date = elementItem.getElementsByTagName("SaleDate").item(0).text;
			if(date !== '') {
				dateLabel.text = '発売日：' + date;
			}
			row.add(dateLabel);
			// 価格
			var priceLabel = Ti.UI.createLabel({
				color : '#c04000',
				top : 65,
				right : 5,
				width : 'auto',
				height : 'auto'
			});
			priceLabel.text = elementItem.getElementsByTagName("LowestPrice").item(0).text + '円';
			row.add(priceLabel);

			// 製品コメント
			var commentLabel = Ti.UI.createLabel({
				top : 100,
				left : IMAGE_WIDTH,
				width : 'auto',
				height : 'auto'
			});
			commentLabel.text = elementItem.getElementsByTagName("Comment").item(0).text;
			row.add(commentLabel);

			// 製品番号の設定
			row.title = elementItem.getElementsByTagName("ProductID").item(0).text;

			data.push(row);
		}

		tv.top = SEARCH_RESULT_POSITION;

		tv.addEventListener('click', function(e) {
			var webWindow = Ti.UI.createWindow({
				url : 'detail.js',
				fullscreen : false,
				navBarHidden : true,
				productCode : e.rowData.title
			});
			webWindow.addEventListener('android:back', function() {
				webWindow.close();
			});
			webWindow.open({
				animated : true
			});
		});
		// 次のページが存在する場合
		// if(nextSearchFlg == true) {
			// // ページング処理
			// tv.addEventListener('scrollEnd', function() {
				// pageNo = pageNo + 1;
				// serchUpdateFlg = true;
				// search();
			// });
			// nextSearchFlg = false;
		// }

		win.remove(noSearchResultLabel);
		win.add(tv);
	} else {
		win.remove(tv);
		win.add(noSearchResultLabel);
	}

	if(serchUpdateFlg == true) {

		for(var i = 0; i < data.length; i++) {
			tv.insertRowAfter(tv.data[0].rows.length - 1, data[i], {
				animationStyle : Titanium.UI.iPhone.RowAnimationStyle.DOWN
			});
		}
		serchUpdateFlg = false;
	} else {
		tv.setData(data);
	}
	closeLoading();
}

// setSearchResultData();

// 検索処理を実行
function setSearchResultData() {
	//TODO test
	// label.text = 'setSearchResultData:' + getSearchURL();

	showLoading();

	var httpClient = Ti.Network.createHTTPClient();

	httpClient.open('GET', getSearchURL());
	httpClient.onload = function() {
		Ti.API.info(httpClient.responseText);
		// XML 文字列を Titanium.XML.parseString() を使って DOM に変換する
		var xmlDom = Titanium.XML.parseString(httpClient.responseText);
		updateGoods(xmlDom);
	};
	httpClient.send();
}

// 検索APIのURLを作成
function getSearchURL() {
	return API_URL_SEARCH + "?ApiKey=" + apikey + "&Keyword=" + target + "&CategoryGroup=" + category + "&SortOrder=" + sort + "&Charset=utf8&HitNum=" + SEARCH_COUNT + "&PageNum" + pageNo;
}

function showLoading() {
	actInd.show();
	searchSuccessFlg = false;
	actInd.message = 'Loading...';
	// 10秒後に強制解除
	setTimeout(function() {
		if(!searchSuccessFlg) {
			alert('検索に失敗しました');
		}
		actInd.hide();
	}, 10000);
}

function closeLoading() {
	searchSuccessFlg = true;
	actInd.hide();
}

function search() {
	//TODO test
	// label.text = 'searchButton:click';
	// label.text = searchText.value;
	target = searchText.value;
	searchText.blur();
	if(Titanium.Network.online == false) {
		alert('ネットワーク接続が確認できません。\n接続状態を確認して下さい');
	} else if(target === '') {
		alert('検索ワードを入力して下さい');
	} else {
		if(serchUpdateFlg) {
			setSearchResultData();
		} else {
			// 一覧のスクロール位置を初期化
			tv.scrollToTop(0, {
				animated : false
			});
			tv.setData([]);
			setSearchResultData();
		}
	}
}

// カテゴリリストが変更された場合
categoryPicker.addEventListener('change', function(e) {
	category = e.row.custom_item;
	// TODO debug
	// label.text = e.row.custom_item;
});
// 表示順リストが変更された場合
sortPicker.addEventListener('change', function(e) {
	sort = e.row.custom_item;
	// TODO debug
	// label.text = e.row.custom_item;
});
