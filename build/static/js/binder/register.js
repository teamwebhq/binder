function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{Promise.resolve(value).then(_next,_throw)}}function _async_to_generator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(undefined)})}}import{pascalToKebab}from"./util.js";const registerControllers=/*#__PURE__*/function(){var _ref=_async_to_generator(function*(...controllers){const allUndefinedElements=[...document.querySelectorAll(":not(:defined)")];allUndefinedElements.forEach(el=>el.setAttribute("data-controller",el.localName));const registerController=/*#__PURE__*/function(){var _ref=_async_to_generator(function*(controller){const controllerName=controller.name;const controllerTag=controller.tag||pascalToKebab(controllerName);if(window.customElements.get(controllerTag)){console.warn(`Controller "${controllerTag}" is already registered, skipping...`);return}if(!controllerTag.includes("-")){console.error(`[${controllerName}] Controller tag name must contain a hyphen but got <${controllerTag}>`)}window.customElements.define(controllerTag,class extends controller{},{})});return function registerController(controller){return _ref.apply(this,arguments)}}();yield Promise.allSettled(controllers.map(controller=>registerController(controller)))});return function registerControllers(){return _ref.apply(this,arguments)}}();export{registerControllers};
//# sourceMappingURL=register.js.map