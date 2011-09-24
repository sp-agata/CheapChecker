var OBJECT_HEIGHT = 60;
var OBJECT_WIDTH = 80;
var COMMON_TOP_PADDING = 5;
var COMMON_LEFT_PADDING = 5;
var SEARCH_CONTROLER_SORT = OBJECT_HEIGHT+COMMON_TOP_PADDING;
var SEARCH_CONTROLER_BUTTON = OBJECT_HEIGHT+SEARCH_CONTROLER_SORT;
var SEARCH_RESULT_POSITION = OBJECT_HEIGHT+SEARCH_CONTROLER_BUTTON;
var FONT_SIZE = 18;
var FONT_LABEL_COLOR = '#000000';

var styles = {
	dummysearch : {
		value : '',
		height : 0,
		top : 0,
		left : 0,
		right : 0,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	},
	searchField : {
		value : '',
		height : OBJECT_HEIGHT,
		top : COMMON_TOP_PADDING,
		left : COMMON_LEFT_PADDING,
		right : 60,
		hintText : '検索条件を入力して下さい。',
		clearButtonMode : Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
		returnKeyType : Titanium.UI.RETURNKEY_SEARCH,
		borderStyle : Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
	},
	searchControler : {
		layout : 'horizontal',
		top : SEARCH_CONTROLER_SORT,
		left : COMMON_LEFT_PADDING,
		width : 'auto',
		height : OBJECT_HEIGHT
	},
	categoryLabel : {
		text : 'カテゴリ',
		font : {
			fontSize : FONT_SIZE
		},
		color : FONT_LABEL_COLOR,
		width : OBJECT_WIDTH,
		height : OBJECT_HEIGHT,
		left : COMMON_LEFT_PADDING
	},
	sepalateLabel : {
		text : '：',
		font : {
			fontSize : FONT_SIZE
		},
		color : FONT_LABEL_COLOR,
		width : '15',
		height : OBJECT_HEIGHT
	},
	selectData0 : {
		title : '全て',
		custom_item : 'ALL',
		fontSize : FONT_SIZE
	},
	selectData1 : {
		title : 'パソコン関連',
		custom_item : 'Pc',
		fontSize : FONT_SIZE
	},
	selectData2 : {
		title : '家電',
		custom_item : 'Kaden',
		fontSize : FONT_SIZE
	},
	selectData3 : {
		title : 'カメラ',
		custom_item : 'Camera',
		fontSize : FONT_SIZE
	},
	selectData4 : {
		title : 'ゲーム',
		custom_item : 'Game',
		fontSize : FONT_SIZE
	},
	selectData5 : {
		title : '楽器',
		custom_item : 'Gakki',
		fontSize : FONT_SIZE
	},
	selectData6 : {
		title : '自動車・バイク',
		custom_item : 'Kuruma',
		fontSize : FONT_SIZE
	},
	selectData7 : {
		title : 'スポーツ・レジャー',
		custom_item : 'Sports',
		fontSize : FONT_SIZE
	},
	selectData8 : {
		title : 'ブランド・腕時計',
		custom_item : 'Brand',
		fontSize : FONT_SIZE
	},
	selectData9 : {
		title : 'ベビー・キッズ',
		custom_item : 'Baby',
		fontSize : FONT_SIZE
	},
	selectData10 : {
		title : 'ペット',
		custom_item : 'Pet',
		fontSize : FONT_SIZE
	},
	selectData11 : {
		title : 'ビューティー・ヘルス',
		custom_item : 'Beauty_Health',
		fontSize : FONT_SIZE
	},
	sortControler : {
		layout : 'horizontal',
		top : SEARCH_CONTROLER_BUTTON,
		left : COMMON_LEFT_PADDING,
		width : 'auto',
		height : OBJECT_HEIGHT
	},
	sortLabel : {
		text : '表示順',
		font : {
			fontSize : FONT_SIZE
		},
		color : FONT_LABEL_COLOR,
		width : OBJECT_WIDTH,
		height : OBJECT_HEIGHT,
		left : COMMON_LEFT_PADDING
	},
	sortData0 : {
		title : '人気',
		custom_item : 'popularityrank',
		fontSize : FONT_SIZE
	},
	sortData1 : {
		title : '発売日',
		custom_item : 'daterank',
		fontSize : FONT_SIZE
	},
	sortData2 : {
		title : '安い',
		custom_item : 'pricerank',
		fontSize : FONT_SIZE
	},
	sortData3 : {
		title : '高い',
		custom_item : '-pricerank',
		fontSize : FONT_SIZE
	},
	searchButton : {
		title : '検索する',
		height : OBJECT_HEIGHT,
		width : 200,
		top : SEARCH_CONTROLER_BUTTON,
		right : 10
	},
	noSearchResultLabel : {
		top : SEARCH_RESULT_POSITION,
		textAlign : 'center',
		color : FONT_LABEL_COLOR,
		width : 200,
		height : 60,
		text : '検索条件に一致する商品はありませんでした。'
	},
	resultRow : {
		top : COMMON_TOP_PADDING,
		left : COMMON_LEFT_PADDING,
		width : 'auto',
		height : 'auto'
	},
	photoImageView : {
		top : COMMON_TOP_PADDING,
		left : 0,
		width : 'auto',
		height : 'auto'
		// },
		// categoryLabel : {
		// },
		// categoryLabel : {
		// },
		// categoryLabel : {
		// },
		// categoryLabel : {
		// },
		// categoryLabel : {
	},
	activityIndicator : {
		bottom : 10,
		height : 50,
		width : 10,
		style : Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN
	}
};
