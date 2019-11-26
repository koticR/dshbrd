var dropdown = (function() {

  var _currentFormDropdown = null;

  var mod = {};

  mod.open = function() {
    helper.setObject({
      object: state.get(),
      path: "dropdown",
      newValue: true
    });
  };

  mod.close = function() {
    helper.setObject({
      object: state.get(),
      path: "dropdown",
      newValue: false
    });
  };

  mod.toggle = function() {
    if (state.get().dropdown) {
      helper.setObject({
        object: state.get(),
        path: "dropdown",
        newValue: false
      });
    } else {
      helper.setObject({
        object: state.get(),
        path: "dropdown",
        newValue: true
      });
    };
  };

  var bind = {};

  var documentEvent = {};

  documentEvent.add = function() {
    document.addEventListener("click", documentEvent.clickOut, false);
  };

  documentEvent.remove = function() {
    document.removeEventListener("click", documentEvent.clickOut, false);
  };

  documentEvent.clickOut = function() {
    var path = event.composedPath();
    if (!path.includes(_currentFormDropdown)) {
      close();
    };
  };

  bind.formDropdown = function() {
    var allFormDropdown = helper.eA(".form-dropdown");
    allFormDropdown.forEach(function(arrayItem, index) {
      var formDropdown = arrayItem;
      var formDropdownToggle = formDropdown.querySelector(".form-dropdown-toggle");
      var allFormDropdownMenuItem = formDropdown.querySelectorAll(".form-dropdown-menu-item");
      formDropdownToggle.addEventListener("click", function() {
        _currentFormDropdown = formDropdown;
        mod.toggle();
        render.toggle();
      }, false);
      allFormDropdownMenuItem.forEach(function(arrayItem, index) {
        arrayItem.addEventListener("click", function() {
          mod.close();
          render.close();
        }, false);
      });
    });
  };

  var render = {};

  render.offset = function() {
    var formDropdownMenu = _currentFormDropdown.querySelector(".form-dropdown-menu");
    if (state.get().dropdown) {
      var box = formDropdownMenu.getBoundingClientRect();
      if (box.right > window.innerWidth) {
        helper.addClass(formDropdownMenu, "form-dropdown-menu-left");
      } else {
        helper.addClass(formDropdownMenu, "form-dropdown-menu-right");
      };
      if (box.bottom > window.innerHeight) {
        helper.addClass(formDropdownMenu, "form-dropdown-menu-top");
      } else {
        helper.addClass(formDropdownMenu, "form-dropdown-menu-bottom");
      };
    } else {
      helper.removeClass(formDropdownMenu, "form-dropdown-menu-left");
      helper.removeClass(formDropdownMenu, "form-dropdown-menu-right");
      helper.removeClass(formDropdownMenu, "form-dropdown-menu-top");
      helper.removeClass(formDropdownMenu, "form-dropdown-menu-bottom");
    };
  };

  render.toggle = function() {
    if (state.get().dropdown) {
      render.open();
    } else {
      render.close();
    };
  };

  render.close = function() {
    helper.removeClass(_currentFormDropdown, "form-dropdown-open");
    render.offset();
    documentEvent.remove();
    _currentFormDropdown = null;
  };

  render.open = function() {
    helper.addClass(_currentFormDropdown, "form-dropdown-open");
    render.offset();
    documentEvent.add();
  };

  var close = function() {
    mod.close();
    render.close();
    var allFormDropdown = helper.eA(".form-dropdown");
    allFormDropdown.forEach(function(arrayItem, index) {
      helper.removeClass(arrayItem, "form-dropdown-open");
    });
  };

  var init = function() {
    mod.close();
    bind.formDropdown();
  };

  // exposed methods
  return {
    init: init,
    bind: bind,
    render: render,
    close: close
  };

})();
