//有xml网页不支持div.innerHTML='<pre><span></span><br></pre><textarea></textarea>'所以逐层元素建立。
//h5.noear.org有css控制textares所以删除css和<style>。
//https://gajim.org/index.php xml不支持document.write()

var text=document.documentElement.outerHTML;
var links = [].slice.call(document.querySelectorAll('link'));
for (var i in links) {
	if (links[i].href.match(/\.css$/i)) {
		links[i].href = '';
	}
}
var styles = [].slice.call(document.querySelectorAll('style'));
for (var i in styles) {
	styles[i].remove();
}
var style = document.createElement('style');
style.innerHTML = 'textarea,pre{margin:0;padding:0;outline:0;border:0;}.expandingArea{z-index:999;position:relative;border:1px solid#888;background:#fff;}.expandingArea>textarea,.expandingArea>pre{padding:5px;background:transparent;font:400 13px/16px helvetica,arial,sans-serif;white-space:pre-wrap;word-wrap:break-word;}.expandingArea>textarea{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;-ms-box-sizing:border-box;box-sizing:border-box;width:100%;height:100px;}.expandingArea.active>textarea{overflow:hidden;position:absolute;top:0;left:0;height:100%;resize:none;}.expandingArea>pre{display:none;}.expandingArea.active>pre{display:block;visibility:hidden;}';
document.head.appendChild(style);
var div = document.createElement('div');
div.setAttribute('class', 'expandingArea');
document.body.insertBefore(div, document.body.childNodes[0]);
document.querySelector('.expandingArea').appendChild(document.createElement('pre'));
document.querySelector('.expandingArea pre').appendChild(document.createElement('span'));
document.querySelector('.expandingArea pre').appendChild(document.createElement('br'));
document.querySelector('.expandingArea').appendChild(document.createElement('textarea'));
document.querySelector('.expandingArea textarea').value = '<!--原网页加载js文件后元素源码：-->' + text;
function makeExpandingArea(container) {
	var area = container.querySelector('textarea');
	var span = container.querySelector('span');
	if (area.addEventListener) {
		area.addEventListener('input', function () {
			span.textContent = area.value;
		}, false);
		span.textContent = area.value;
	}
	container.className += ' active';
}
var areas = document.querySelectorAll('.expandingArea');
var l = areas.length;
while (l--) {
	makeExpandingArea(areas[l]);
}
