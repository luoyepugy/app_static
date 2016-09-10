/*城市数据*/
var cityData = [
{
	id: '1',
	text: '北京市',
	children: [{text: "北京市", id: "1", province_id: "1"}]
},{
	id: '2',
	text: '天津市',
	children: [{text: "天津市", id: "2", province_id: "2"}]
},{
	id: '3',
	text: '上海市',
	children: [{"text":"上海市","id":"3","province_id":"3"}]
},{
	id: '4',
	text: '重庆市',
	children: [{"text":"重庆市","id":"4","province_id":"4"}]
},{
	id: '5',
	text: '河北省',
	children: [{"text":"石家庄市","id":"5","province_id":"5"},{"text":"唐山市","id":"6","province_id":"5"},{"text":"秦皇岛市","id":"7","province_id":"5"},{"text":"邯郸市","id":"8","province_id":"5"},{"text":"邢台市","id":"9","province_id":"5"},{"text":"保定市","id":"10","province_id":"5"},{"text":"张家口市","id":"11","province_id":"5"},{"text":"承德市","id":"12","province_id":"5"},{"text":"沧州市","id":"13","province_id":"5"},{"text":"廊坊市","id":"14","province_id":"5"},{"text":"衡水市","id":"15","province_id":"5"}]
},{
	id: '6',
	text: '山西省',
	children: [{"text":"太原市","id":"16","province_id":"6"},{"text":"大同市","id":"17","province_id":"6"},{"text":"阳泉市","id":"18","province_id":"6"},{"text":"长治市","id":"19","province_id":"6"},{"text":"晋城市","id":"20","province_id":"6"},{"text":"朔州市","id":"21","province_id":"6"},{"text":"晋中市","id":"22","province_id":"6"},{"text":"运城市","id":"23","province_id":"6"},{"text":"忻州市","id":"24","province_id":"6"},{"text":"临汾市","id":"25","province_id":"6"},{"text":"吕梁市","id":"26","province_id":"6"}]
},{
	id: '7',
	text: '台湾省',
	children: [{"text":"台北市","id":"27","province_id":"7"},{"text":"高雄市","id":"28","province_id":"7"},{"text":"基隆市","id":"29","province_id":"7"},{"text":"台中市","id":"30","province_id":"7"},{"text":"台南市","id":"31","province_id":"7"},{"text":"新竹市","id":"32","province_id":"7"},{"text":"嘉义市","id":"33","province_id":"7"},{"text":"台北县","id":"34","province_id":"7"},{"text":"宜兰县","id":"35","province_id":"7"},{"text":"桃园县","id":"36","province_id":"7"},{"text":"新竹县","id":"37","province_id":"7"},{"text":"苗栗县","id":"38","province_id":"7"},{"text":"台中县","id":"39","province_id":"7"},{"text":"彰化县","id":"40","province_id":"7"},{"text":"南投县","id":"41","province_id":"7"},{"text":"云林县","id":"42","province_id":"7"},{"text":"嘉义县","id":"43","province_id":"7"},{"text":"台南县","id":"44","province_id":"7"},{"text":"高雄县","id":"45","province_id":"7"},{"text":"屏东县","id":"46","province_id":"7"},{"text":"澎湖县","id":"47","province_id":"7"},{"text":"台东县","id":"48","province_id":"7"},{"text":"花莲县","id":"49","province_id":"7"}]
},{
	id: '8',
	text: '辽宁省',
	children: [{"text":"沈阳市","id":"50","province_id":"8"},{"text":"大连市","id":"51","province_id":"8"},{"text":"鞍山市","id":"52","province_id":"8"},{"text":"抚顺市","id":"53","province_id":"8"},{"text":"本溪市","id":"54","province_id":"8"},{"text":"丹东市","id":"55","province_id":"8"},{"text":"锦州市","id":"56","province_id":"8"},{"text":"营口市","id":"57","province_id":"8"},{"text":"阜新市","id":"58","province_id":"8"},{"text":"辽阳市","id":"59","province_id":"8"},{"text":"盘锦市","id":"60","province_id":"8"},{"text":"铁岭市","id":"61","province_id":"8"},{"text":"朝阳市","id":"62","province_id":"8"},{"text":"葫芦岛市","id":"63","province_id":"8"}]
},{
	id: '9', 
	text: '吉林省',
	children: [{"text":"长春市","id":"64","province_id":"9"},{"text":"吉林市","id":"65","province_id":"9"},{"text":"四平市","id":"66","province_id":"9"},{"text":"辽源市","id":"67","province_id":"9"},{"text":"通化市","id":"68","province_id":"9"},{"text":"白山市","id":"69","province_id":"9"},{"text":"松原市","id":"70","province_id":"9"},{"text":"白城市","id":"71","province_id":"9"},{"text":"延边市","id":"72","province_id":"9"}]
},{
	id: '10',
	text: '黑龙江省',
	children: [{"text":"哈尔滨市","id":"73","province_id":"10"},{"text":"齐齐哈尔市","id":"74","province_id":"10"},{"text":"鹤岗市","id":"75","province_id":"10"},{"text":"双鸭山市","id":"76","province_id":"10"},{"text":"鸡西市","id":"77","province_id":"10"},{"text":"大庆市","id":"78","province_id":"10"},{"text":"伊春市","id":"79","province_id":"10"},{"text":"牡丹江市","id":"80","province_id":"10"},{"text":"佳木斯市","id":"81","province_id":"10"},{"text":"七台河市","id":"82","province_id":"10"},{"text":"黑河市","id":"83","province_id":"10"},{"text":"绥化市","id":"84","province_id":"10"},{"text":"大兴安岭","id":"85","province_id":"10"}]
},{
	id: '11',
	text: '江苏省',
	children: [{"text":"南京市","id":"86","province_id":"11"},{"text":"无锡市","id":"87","province_id":"11"},{"text":"徐州市","id":"88","province_id":"11"},{"text":"常州市","id":"89","province_id":"11"},{"text":"苏州市","id":"90","province_id":"11"},{"text":"南通市","id":"91","province_id":"11"},{"text":"连云港市","id":"92","province_id":"11"},{"text":"淮安市","id":"93","province_id":"11"},{"text":"盐城市","id":"94","province_id":"11"},{"text":"扬州市","id":"95","province_id":"11"},{"text":"镇江市","id":"96","province_id":"11"},{"text":"泰州市","id":"97","province_id":"11"},{"text":"宿迁市","id":"98","province_id":"11"}]
},{
	id: '12',
	text: '浙江省',
	children: [{"text":"杭州市","id":"99","province_id":"12"},{"text":"宁波市","id":"100","province_id":"12"},{"text":"温州市","id":"101","province_id":"12"},{"text":"嘉兴市","id":"102","province_id":"12"},{"text":"湖州市","id":"103","province_id":"12"},{"text":"绍兴市","id":"104","province_id":"12"},{"text":"金华市","id":"105","province_id":"12"},{"text":"衢州市","id":"106","province_id":"12"},{"text":"舟山市","id":"107","province_id":"12"},{"text":"台州市","id":"108","province_id":"12"},{"text":"丽水市","id":"109","province_id":"12"}]
},{
	id: '13',
	text: '安徽省',
	children: [{"text":"合肥市","id":"110","province_id":"13"},{"text":"芜湖市","id":"111","province_id":"13"},{"text":"蚌埠市","id":"112","province_id":"13"},{"text":"淮南市","id":"113","province_id":"13"},{"text":"马鞍山市","id":"114","province_id":"13"},{"text":"淮北市","id":"115","province_id":"13"},{"text":"铜陵市","id":"116","province_id":"13"},{"text":"安庆市","id":"117","province_id":"13"},{"text":"黄山市","id":"118","province_id":"13"},{"text":"滁州市","id":"119","province_id":"13"},{"text":"阜阳市","id":"120","province_id":"13"},{"text":"宿州市","id":"121","province_id":"13"},{"text":"巢湖市","id":"122","province_id":"13"},{"text":"六安市","id":"123","province_id":"13"},{"text":"亳州市","id":"124","province_id":"13"},{"text":"池州市","id":"125","province_id":"13"},{"text":"宣城市","id":"126","province_id":"13"}]
},{
	id: '14',
	text: '福建省',
	children: [{"text":"福州市","id":"127","province_id":"14"},{"text":"厦门市","id":"128","province_id":"14"},{"text":"莆田市","id":"129","province_id":"14"},{"text":"三明市","id":"130","province_id":"14"},{"text":"泉州市","id":"131","province_id":"14"},{"text":"漳州市","id":"132","province_id":"14"},{"text":"南平市","id":"133","province_id":"14"},{"text":"龙岩市","id":"134","province_id":"14"},{"text":"宁德市","id":"135","province_id":"14"}]
},{
	id: '15',
	text: '江西省',
	children: [{"text":"南昌市","id":"136","province_id":"15"},{"text":"景德镇市","id":"137","province_id":"15"},{"text":"萍乡市","id":"138","province_id":"15"},{"text":"九江市","id":"139","province_id":"15"},{"text":"新余市","id":"140","province_id":"15"},{"text":"鹰潭市","id":"141","province_id":"15"},{"text":"赣州市","id":"142","province_id":"15"},{"text":"吉安市","id":"143","province_id":"15"},{"text":"宜春市","id":"144","province_id":"15"}]
},{
	id: '16',
	text: '山东省',
	children: [{"text":"济南市","id":"383","province_id":"16"},{"text":"青岛市","id":"384","province_id":"16"},{"text":"淄博市","id":"385","province_id":"16"},{"text":"枣庄市","id":"386","province_id":"16"},{"text":"东营市","id":"387","province_id":"16"},{"text":"烟台市","id":"388","province_id":"16"},{"text":"潍坊市","id":"389","province_id":"16"},{"text":"济宁市","id":"390","province_id":"16"},{"text":"泰安市","id":"391","province_id":"16"},{"text":"威海市","id":"392","province_id":"16"},{"text":"日照市","id":"393","province_id":"16"},{"text":"莱芜市","id":"394","province_id":"16"},{"text":"临沂市","id":"395","province_id":"16"},{"text":"德州市","id":"396","province_id":"16"},{"text":"聊城市","id":"397","province_id":"16"},{"text":"滨州市","id":"398","province_id":"16"},{"text":"菏泽市","id":"399","province_id":"16"}]
},{
	id: '17',
	text: '河南省',
	children: [{"text":"郑州市","id":"400","province_id":"17"},{"text":"开封市","id":"401","province_id":"17"},{"text":"洛阳市","id":"402","province_id":"17"},{"text":"平顶山市","id":"403","province_id":"17"},{"text":"安阳市","id":"404","province_id":"17"},{"text":"鹤壁市","id":"405","province_id":"17"},{"text":"新乡市","id":"406","province_id":"17"},{"text":"焦作市","id":"407","province_id":"17"},{"text":"濮阳市","id":"408","province_id":"17"},{"text":"许昌市","id":"409","province_id":"17"},{"text":"漯河市","id":"410","province_id":"17"},{"text":"三门峡市","id":"411","province_id":"17"},{"text":"南阳市","id":"412","province_id":"17"},{"text":"商丘市","id":"413","province_id":"17"},{"text":"信阳市","id":"414","province_id":"17"},{"text":"周口市","id":"415","province_id":"17"},{"text":"驻马店市","id":"416","province_id":"17"},{"text":"济源市","id":"417","province_id":"17"}]
},{
	id: '18',
	text: '湖北省',
	children: [{"text":"武汉市","id":"418","province_id":"18"},{"text":"黄石市","id":"419","province_id":"18"},{"text":"十堰市","id":"420","province_id":"18"},{"text":"荆州市","id":"421","province_id":"18"},{"text":"宜昌市","id":"422","province_id":"18"},{"text":"襄樊市","id":"423","province_id":"18"},{"text":"鄂州市","id":"424","province_id":"18"},{"text":"荆门市","id":"425","province_id":"18"},{"text":"孝感市","id":"426","province_id":"18"},{"text":"黄冈市","id":"427","province_id":"18"},{"text":"咸宁市","id":"428","province_id":"18"},{"text":"随州市","id":"429","province_id":"18"},{"text":"仙桃市","id":"430","province_id":"18"},{"text":"天门市","id":"431","province_id":"18"},{"text":"潜江市","id":"432","province_id":"18"},{"text":"神农架林区","id":"433","province_id":"18"},{"text":"恩施市","id":"434","province_id":"18"}]
},{
	id: '19',
	text: '湖南省',
	children: [{"text":"长沙市","id":"435","province_id":"19"},{"text":"株洲市","id":"436","province_id":"19"},{"text":"湘潭市","id":"437","province_id":"19"},{"text":"衡阳市","id":"438","province_id":"19"},{"text":"邵阳市","id":"439","province_id":"19"},{"text":"岳阳市","id":"440","province_id":"19"},{"text":"常德市","id":"441","province_id":"19"},{"text":"张家界市","id":"442","province_id":"19"},{"text":"益阳市","id":"443","province_id":"19"},{"text":"郴州市","id":"444","province_id":"19"},{"text":"永州市","id":"445","province_id":"19"},{"text":"怀化市","id":"446","province_id":"19"},{"text":"娄底市","id":"447","province_id":"19"},{"text":"湘西市","id":"448","province_id":"19"}]
},{
	id: '20',
	text: '广东省',
	children: [{"text":"广州市","id":"449","province_id":"20"},{"text":"深圳市","id":"450","province_id":"20"},{"text":"珠海市","id":"451","province_id":"20"},{"text":"汕头市","id":"452","province_id":"20"},{"text":"韶关市","id":"453","province_id":"20"},{"text":"佛山市","id":"454","province_id":"20"},{"text":"江门市","id":"455","province_id":"20"},{"text":"湛江市","id":"456","province_id":"20"},{"text":"茂名市","id":"457","province_id":"20"},{"text":"肇庆市","id":"458","province_id":"20"},{"text":"惠州市","id":"459","province_id":"20"},{"text":"梅州市","id":"460","province_id":"20"},{"text":"汕尾市","id":"461","province_id":"20"},{"text":"河源市","id":"462","province_id":"20"},{"text":"阳江市","id":"463","province_id":"20"},{"text":"清远市","id":"464","province_id":"20"},{"text":"东莞市","id":"465","province_id":"20"},{"text":"中山市","id":"466","province_id":"20"},{"text":"潮州市","id":"467","province_id":"20"},{"text":"揭阳市","id":"468","province_id":"20"}]
},{
	id: '21',
	text: '甘肃省',
	children: [{"text":"兰州市","id":"470","province_id":"21"},{"text":"金昌市","id":"471","province_id":"21"},{"text":"白银市","id":"472","province_id":"21"},{"text":"天水市","id":"473","province_id":"21"},{"text":"嘉峪关市","id":"474","province_id":"21"},{"text":"武威市","id":"475","province_id":"21"},{"text":"张掖市","id":"476","province_id":"21"},{"text":"平凉市","id":"477","province_id":"21"},{"text":"酒泉市","id":"478","province_id":"21"},{"text":"庆阳市","id":"479","province_id":"21"},{"text":"定西市","id":"480","province_id":"21"},{"text":"陇南市","id":"481","province_id":"21"},{"text":"临夏","id":"482","province_id":"21"},{"text":"甘南","id":"483","province_id":"21"}]
},{
	id: '22',
	text: '四川省',
	children: [{"text":"成都市","id":"484","province_id":"22"},{"text":"自贡市","id":"485","province_id":"22"},{"text":"攀枝花市","id":"486","province_id":"22"},{"text":"泸州市","id":"487","province_id":"22"},{"text":"德阳市","id":"488","province_id":"22"},{"text":"绵阳市","id":"489","province_id":"22"},{"text":"广元市","id":"490","province_id":"22"},{"text":"遂宁市","id":"491","province_id":"22"},{"text":"内江市","id":"492","province_id":"22"},{"text":"乐山市","id":"493","province_id":"22"},{"text":"南充市","id":"494","province_id":"22"},{"text":"眉山市","id":"495","province_id":"22"},{"text":"宜宾市","id":"496","province_id":"22"},{"text":"广安市","id":"497","province_id":"22"},{"text":"达州市","id":"498","province_id":"22"},{"text":"雅安市","id":"499","province_id":"22"},{"text":"巴中市","id":"500","province_id":"22"},{"text":"资阳市","id":"501","province_id":"22"},{"text":"阿坝","id":"502","province_id":"22"},{"text":"甘孜","id":"503","province_id":"22"},{"text":"凉山","id":"504","province_id":"22"}]
},{
	id: '23',
	text: '贵州省',
	children: [{"text":"贵阳市","id":"505","province_id":"23"},{"text":"六盘水市","id":"506","province_id":"23"},{"text":"遵义市","id":"507","province_id":"23"},{"text":"安顺市","id":"508","province_id":"23"},{"text":"铜仁地区","id":"509","province_id":"23"},{"text":"毕节地区","id":"510","province_id":"23"},{"text":"黔西南","id":"511","province_id":"23"},{"text":"黔东南","id":"512","province_id":"23"},{"text":"黔南","id":"513","province_id":"23"}]
},{
	id: '24',
	text: '海南省',
	children: [{"text":"海口市","id":"514","province_id":"24"},{"text":"三亚市","id":"515","province_id":"24"},{"text":"五指山市","id":"516","province_id":"24"},{"text":"琼海市","id":"517","province_id":"24"},{"text":"儋州市","id":"518","province_id":"24"},{"text":"文昌市","id":"519","province_id":"24"},{"text":"万宁市","id":"520","province_id":"24"},{"text":"东方市","id":"521","province_id":"24"},{"text":"澄迈县","id":"522","province_id":"24"},{"text":"定安县","id":"523","province_id":"24"},{"text":"屯昌县","id":"524","province_id":"24"},{"text":"临高县","id":"525","province_id":"24"},{"text":"白沙","id":"526","province_id":"24"},{"text":"昌江","id":"527","province_id":"24"},{"text":"乐东","id":"528","province_id":"24"},{"text":"陵水","id":"529","province_id":"24"},{"text":"保亭","id":"530","province_id":"24"},{"text":"琼中","id":"531","province_id":"24"}]
},{
	id: '25',
	text: '云南省',
	children: [{"text":"昆明市","id":"532","province_id":"25"},{"text":"曲靖市","id":"533","province_id":"25"},{"text":"玉溪市","id":"534","province_id":"25"},{"text":"保山市","id":"535","province_id":"25"},{"text":"昭通市","id":"536","province_id":"25"},{"text":"丽江市","id":"537","province_id":"25"},{"text":"思茅市","id":"538","province_id":"25"},{"text":"临沧市","id":"539","province_id":"25"},{"text":"文山","id":"540","province_id":"25"},{"text":"红河","id":"541","province_id":"25"},{"text":"西双版纳","id":"542","province_id":"25"},{"text":"楚雄","id":"543","province_id":"25"},{"text":"大理","id":"544","province_id":"25"},{"text":"德宏","id":"545","province_id":"25"},{"text":"怒江","id":"546","province_id":"25"},{"text":"迪庆","id":"547","province_id":"25"}]
},{
	id: '26',
	text: '青海省',
	children: [{"text":"西宁市","id":"548","province_id":"26"},{"text":"海东地区","id":"549","province_id":"26"},{"text":"海北","id":"550","province_id":"26"},{"text":"黄南","id":"551","province_id":"26"},{"text":"海南","id":"552","province_id":"26"},{"text":"果洛","id":"553","province_id":"26"},{"text":"玉树","id":"554","province_id":"26"},{"text":"海西","id":"555","province_id":"26"}]
},
	{
	id: '27',
	text: '陕西省',
	children: [{"text":"西安市","id":"556","province_id":"27"},{"text":"铜川市","id":"557","province_id":"27"},{"text":"宝鸡市","id":"558","province_id":"27"},{"text":"咸阳市","id":"559","province_id":"27"},{"text":"渭南市","id":"560","province_id":"27"},{"text":"延安市","id":"561","province_id":"27"},{"text":"汉中市","id":"562","province_id":"27"},{"text":"榆林市","id":"563","province_id":"27"},{"text":"安康市","id":"564","province_id":"27"},{"text":"商洛市","id":"565","province_id":"27"}]
},
	{
	id: '28',
	text: '广西壮族自治区',
	children: [{"text":"南宁市","id":"566","province_id":"28"},{"text":"柳州市","id":"567","province_id":"28"},{"text":"桂林市","id":"568","province_id":"28"},{"text":"梧州市","id":"569","province_id":"28"},{"text":"北海市","id":"570","province_id":"28"},{"text":"防城港市","id":"571","province_id":"28"},{"text":"钦州市","id":"572","province_id":"28"},{"text":"贵港市","id":"573","province_id":"28"},{"text":"玉林市","id":"574","province_id":"28"},{"text":"百色市","id":"575","province_id":"28"},{"text":"贺州市","id":"576","province_id":"28"},{"text":"河池市","id":"577","province_id":"28"},{"text":"来宾市","id":"578","province_id":"28"},{"text":"崇左市","id":"579","province_id":"28"}]
	},
	{
	id: '29',
	text: '西藏自治区',
	children: [{"text":"拉萨市","id":"580","province_id":"29"},{"text":"那曲地区","id":"581","province_id":"29"},{"text":"昌都地区","id":"582","province_id":"29"},{"text":"山南地区","id":"583","province_id":"29"},{"text":"日喀则地区","id":"584","province_id":"29"},{"text":"阿里地区","id":"585","province_id":"29"},{"text":"林芝地区","id":"586","province_id":"29"}]
},{
	id: '30',
	text: '宁夏回族自治区',
	children: [{"text":"银川市","id":"587","province_id":"30"},{"text":"石嘴山市","id":"588","province_id":"30"},{"text":"吴忠市","id":"589","province_id":"30"},{"text":"固原市","id":"590","province_id":"30"},{"text":"中卫市","id":"591","province_id":"30"}]
},{
	id: '31',
	text: '新疆维吾尔自治区',
	children: [{"text":"乌鲁木齐市","id":"592","province_id":"31"},{"text":"克拉玛依市","id":"593","province_id":"31"},{"text":"石河子市　","id":"594","province_id":"31"},{"text":"阿拉尔市","id":"595","province_id":"31"},{"text":"图木舒克市","id":"596","province_id":"31"},{"text":"五家渠市","id":"597","province_id":"31"},{"text":"吐鲁番市","id":"598","province_id":"31"},{"text":"阿克苏市","id":"599","province_id":"31"},{"text":"喀什市","id":"600","province_id":"31"},{"text":"哈密市","id":"601","province_id":"31"},{"text":"和田市","id":"602","province_id":"31"},{"text":"阿图什市","id":"603","province_id":"31"},{"text":"库尔勒市","id":"604","province_id":"31"},{"text":"昌吉市　","id":"605","province_id":"31"},{"text":"阜康市","id":"606","province_id":"31"},{"text":"米泉市","id":"607","province_id":"31"},{"text":"博乐市","id":"608","province_id":"31"},{"text":"伊宁市","id":"609","province_id":"31"},{"text":"奎屯市","id":"610","province_id":"31"},{"text":"塔城市","id":"611","province_id":"31"},{"text":"乌苏市","id":"612","province_id":"31"},{"text":"阿勒泰市","id":"613","province_id":"31"}]
},{
	id: '32',
	text: '内蒙古自治区',
	children: [{"text":"呼和浩特市","id":"614","province_id":"32"},{"text":"包头市","id":"615","province_id":"32"},{"text":"乌海市","id":"616","province_id":"32"},{"text":"赤峰市","id":"617","province_id":"32"},{"text":"通辽市","id":"618","province_id":"32"},{"text":"鄂尔多斯市","id":"619","province_id":"32"},{"text":"呼伦贝尔市","id":"620","province_id":"32"},{"text":"巴彦淖尔市","id":"621","province_id":"32"},{"text":"乌兰察布市","id":"622","province_id":"32"},{"text":"锡林郭勒盟","id":"623","province_id":"32"},{"text":"兴安盟","id":"624","province_id":"32"},{"text":"阿拉善盟","id":"625","province_id":"32"}]
},{
	id: '33',
	text: '澳门特别行政区',
	children: [{"text":"澳门特别行政区","id":"626","province_id":"33"}]
},{
	id: '34',
	text: '香港特别行政区',
	children: [{"text":"香港特别行政区","id":"627","province_id":"34"}]
},

]

