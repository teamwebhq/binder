function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}import{Controller}from"../controller.js";import{parseDuration,parseBoolean}from"../util.js";class DynamicFrame extends Controller{init(){var _this=this;return _asyncToGenerator(function*(){_this.contents="";_this._reqAbort=[];_this.args.executeScripts=parseBoolean(_this.args.executeScripts);if(_this.args.autoRefresh){_this.setAutoRefresh()}if(!_this.args.delay)_this.args.delay=0;if(_this.args.stateKey){_this.loadState();const handleStateChange=()=>{let qs=_this.loadState();if(_this._internal.currentQs!==qs){_this._internal.currentQs=qs;_this.refresh()}};window.addEventListener("popstate",()=>handleStateChange());window.addEventListener("pushstate",()=>handleStateChange())}if(parseBoolean(_this.args.contained)){_this.containFrame()}if(_this.renderOnInit)yield _this.loadContent()})()}refresh(){var _this=this;return _asyncToGenerator(function*(){yield _this.loadContent();yield _this.render()})()}bind(){super.bind();if(this.args.mountPoint&& typeof this.args.mountPoint==="string"){this.mountPoint=this.querySelector(this.args.mountPoint)}if(!this.mountPoint){this.mountPoint=this.root}}setAutoRefresh(){const interval=parseDuration(this.args.autoRefresh);if(interval===undefined){console.error(`[${this.tag}] Undefined interval passed to setAutoRefresh`);return}if(this._internal.autoRefreshInterval){window.clearInterval(this._internal.autoRefreshInterval)}this._internal.autoRefreshInterval=window.setInterval(()=>this.refresh(),interval)}loadContent(e){var _this=this;return _asyncToGenerator(function*(){let url=_this.endpoint();url.search=new URLSearchParams(_this.params());_this._reqAbort.forEach(controller=>controller.abort());_this._reqAbort=[];const abortController=new AbortController;_this._reqAbort.push(abortController);let ok=true;const sendReq=function(){var _ref=_asyncToGenerator(function*(){try{let response=yield fetch(url,{signal:abortController.signal});let text=yield response.text();_this.updateContent(text)}catch(err){console.error(err);ok=false}});return function sendReq(){return _ref.apply(this,arguments)}}();yield Promise.allSettled([new Promise(resolve=>setTimeout(resolve,_this.args.delay)),sendReq()]);_this.saveState();_this.bind();return ok})()}updateContent(content,mode=null){if(!mode)mode=this.args.mode||"replace";const template=document.createElement("template");template.innerHTML=content;let deferredScripts=[];if(this.args.executeScripts){let scripts=template.content.querySelectorAll("script");[...scripts].forEach(script=>{let newScript=document.createElement("script");[...script.attributes].forEach(attr=>newScript.setAttribute(attr.name,attr.value));if(script.innerHTML)newScript.appendChild(document.createTextNode(script.innerHTML));if(script.hasAttribute("defer")){deferredScripts.push([script,newScript])}else{script.replaceWith(newScript)}})}if(mode==="replace"){this.mountPoint.replaceChildren(template.content)}else if(mode==="append"){this.mountPoint.appendChild(template.content)}else if(mode==="prepend"){this.mountPoint.prepend(template.content)}deferredScripts.forEach(scriptPair=>{let[originalScript,newScript]=scriptPair;originalScript.replaceWith(newScript)})}params(values={}){let params=new URLSearchParams(values);Object.entries(values).forEach(([key,val])=>{if(Array.isArray(val)){params.delete(key);val.forEach(item=>params.append(key,item))}});for(let attr of this.attributes){if(attr.nodeName.startsWith(":param-")){params.append(attr.nodeName.substr(7),attr.nodeValue)}}return params}setParams(values={}){for(let attr of this.attributes){if(attr.nodeName.startsWith(":param-")){this.removeAttribute(attr.nodeName)}}Object.entries(values).forEach(([key,val])=>{this.setAttribute(`:param-${key}`,val)})}endpoint(){let url=this.args.url;if(!this.args.url){console.error(`${this.tag}: No :url attribute specified`);return}if(!url.startsWith("http"))url=window.location.origin+url;return new URL(url)}loadState(){if(!this.args.stateKey)return;let qs=window.location.search;if(!qs)return;qs=qs.substring(1);let qsParts=Object.fromEntries(qs.split("&").map(part=>part.split("=")));if(qsParts[`${this.args.stateKey}-url`]){this.args.url=qsParts[`${this.args.stateKey}-url`];delete qsParts[`${this.args.stateKey}-url`]}for(let attr of this.attributes){if(attr.nodeName.startsWith(":param-")){this.removeAttribute(attr.nodeName)}}for(let[key,value]of Object.entries(qsParts)){if(key.endsWith("-url"))continue;if(!key.startsWith(this.args.stateKey))continue;key=key.replace(`${this.args.stateKey}-param-`,"");this.setAttribute(`:param-${key}`,value)}return qs}saveState(){if(!this.args.stateKey)return;let qsParts=Object.fromEntries(new URLSearchParams(window.location.search));qsParts[`${this.args.stateKey}-url`]=this.args.url;for(const key of Object.keys(qsParts)){if(key.startsWith(`${this.args.stateKey}-param-`)){delete qsParts[key]}}for(const[key1,value]of this.params()){qsParts[`${this.args.stateKey}-param-${key1}`]=value}const qs=Object.entries(qsParts).map(part=>`${part[0]}=${part[1]}`).join("&");if(this._internal.currentQs!==qs){window.history.pushState(qs,"",`?${qs}`);this._internal.currentQs=qs}}containFrame(){const loadUrl=url=>{let[origin,query]=url.split("?");if(!query)query="";const params=Object.fromEntries(query.split("&").map(part=>part.split("=")));this.setParams(params);this.args.url=origin};this.addEventListener("click",e=>{let target=e.target||e.srcElement;if(target.tagName==="A"&&this.belongsToController(target)){e.preventDefault();const href=target.getAttribute("href");loadUrl(href);this.loadContent()}});var _this=this;this.addEventListener("submit",function(){var _ref=_asyncToGenerator(function*(e){e.preventDefault();const method=e.target.getAttribute("method")||"GET";const action=e.target.getAttribute("action")||"/";const encoding=e.target.getAttribute("enctype")||"application/x-www-form-urlencoded";const skipValidation=e.target.getAttribute("novalidate")!==undefined;if(!skipValidation&&!e.target.checkValidity()){console.warn("Form is not valid");return}const formData=new FormData(e.target);if(method.toUpperCase()=="POST"){let response=yield fetch(action,{method:"POST",body:formData,headers:{"Content-Type":encoding}});if(response.redirected){loadUrl(response.url);_this.render()}else{_this.innerHTML=yield response.text()}}else if(method.toUpperCase()=="GET"){const query=Object.fromEntries(new URLSearchParams(formData));_this.setParams(query);_this.args.url=action;_this.render()}return false});return function(e){return _ref.apply(this,arguments)}}())}}export{DynamicFrame}
//# sourceMappingURL=dynamic_frame.js.map