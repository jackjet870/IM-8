/*
 * 弹窗
 * @authors xiayoutao (xiayoutao2015@sina.com)
 * @date    2017-05-23 10:00:00
 * @version 1.0.0
 */
var popup = (function(mod){
	var cache = {}; // 缓存数据
	var settings = {
		elem : 'dialog', //填充内容id值
		time : 2000, // 自动隐藏时间
	}; // 配置信息
	/*
	* 模板数据
	*/
	var tpl = {
		toast : [
			'<div class="mask_transparent"></div>',
			'<div class="toast">',
				'<i class="icon-toast icon-{#type#}"></i>',
				'<p class="toast-content">{#content#}</p>',
			'</div>'
		].join(''),
		dialog : [
			'<div class="mask-transparent"></div>',
			'<div class="dialog {#type#}">',
				'<div class="dialog-hd"><strong class="dialog-title">{#title#}</strong></div>',
				'<div class="dialog-bd">{#content#}</div>',
				'<div class="dialog-ft">',
					'<a href="javascript:;" class="dialog-btn dialog-btn-default">{#cancel#}</a>',
					'<a href="javascript:;" class="dialog-btn dialog-btn-primary">{#ok#}</a>',
				'</div>',
			'</div>'
		].join('')
	};
	mod.toast = function(option){
		mod.init();
		var type = option.type || 'tips',
			content = option.content || settings.content,
			time = option.time || settings.time,
			data = {
				type    : type,
				content : content
			},
			html = mod.formateString(tpl['toast'], data);
		$('#' + settings.elem).html(html).off('click').fadeIn(100);
		if(type !== 'loading'){
			cache['timer'] = setTimeout(function () {
				mod.hide();
			}, time);
		}
	};
	mod.dialog = function(option){
		mod.init();
		var type         = option.type         || 'alert',
			title        = option.title        || settings.title,
			content      = option.content      || settings.content,
			ok_title     = option.ok_title     || '确定',
			cancel_title = option.cancel_title || '取消',
			ok           = option.success      || mod.hide,
			cancel       = option.cancel       || mod.hide,
			data = {
				type    : type,
				title   : title,
				ok      : ok_title,
				cancel  : cancel_title,
				content : content
			};
		var html = mod.formateString(tpl['dialog'], data);
		$('#' + settings.elem).html(html).off('click').fadeIn(100);
		$(document).on('click', '.dialog-btn-primary', function(){
			ok();         // 执行点击确定事件
			mod.hide();   // 隐藏弹出层
		});
		$(document).on('click', '.dialog-btn-default', function(){
			cancel();    // 执行点击取消事件
			mod.hide();  // 隐藏弹出层
		});
	};
	mod.init = function(){
		// 判断页面是否存在指定的容器
		if($('.dialog-box').length <= 0){
			$('body').append('<div class="dialog-box" id="'+ settings.elem +'"></div>');
		}
	};
	/*
	* 隐藏弹出层
	*/
	mod.hide = function(){
		clearTimeout(cache['timer']); // 清空计时器
		$('#' + settings.elem).off('click').fadeOut(100);  // 弹出层隐藏
	};
	// 遮罩层绑定点击事件
	$(document).on('click', '.mask_transparent', function(){
		var $dialog = $('#' + settings.elem);
		if ($dialog.css('display') === 'none') return;
		mod.hide();
	});
	/*
	* 格式化模版
	*/
	mod.formateString = function(str, data){
		var html = '';
		if(data instanceof Array){
			for(var i = 0, len = data.length; i < len; i++){
				html += arguments.callee(str, data[i]);
			}
			return html;
		}else{
			return str.replace(/\{#(\w+)#\}/g, function(match, key){
				return typeof data === 'string' ? data : (typeof data[key] === 'undefined' ? '' : data[key]);
			});
		}
	}
	return mod;
})(popup || {});