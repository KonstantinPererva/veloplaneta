"use strict";

document.addEventListener("DOMContentLoaded", function () {

  var Select = function Select(node) {

    var self = this;
    self.node = node;
    self.list = [];
    self.text = "";

    var listItems = self.node.querySelectorAll(".form-select__item");

    self.init = function () {
      self.list = self.node.querySelector(".form-select__list");
      self.text = self.node.querySelector(".form-select__head");

      self.addListeners();
    };

    self.addListeners = function () {

      listItems.forEach(function (item) {
        item.addEventListener("click", function (event) {
          self.changeText(event.target);
        });
      });

      self.text.addEventListener('click', function (event) {
        self.open(event.target);
      });
    };

    self.open = function (node) {

      if (node.nextElementSibling !== null) {
        node.nextElementSibling.classList.add("open");
        event.target.classList.add("rotate");
      }
    };

    self.close = function () {
      self.list.classList.remove("open");
      self.text.classList.remove("rotate");
    };

    self.changeText = function (node) {
      self.text.innerHTML = node.innerHTML;
      self.close();
    };
  };

  var selectArr = document.querySelectorAll("[data-type='select']");
  for (var i = 0; i < selectArr.length; i++) {
    var select = new Select(selectArr[i]);
    select.init();
    // selectArr[i] = select;
  }

  /**
   * user
   */

  $(".user").on("click", function () {
    $(this).find($(".drop-box")).toggleClass("active");
  });

  ///////////////

  function makeResizableDiv(div) {
    var element = document.querySelector(div);
    var resizers = document.querySelectorAll(div + ' .resizer');

    var _loop = function _loop(_i) {
      var currentResizer = resizers[_i];
      currentResizer.addEventListener('mousedown', function (e) {
        e.preventDefault();
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
      });

      function resize(e) {
        if (currentResizer.classList.contains('bottom-right')) {
          element.style.width = e.pageX - element.getBoundingClientRect().left + 'px';
        }
      }

      function stopResize() {
        window.removeEventListener('mousemove', resize);
      }
    };

    for (var _i = 0; _i < resizers.length; _i++) {
      _loop(_i);
    }
  }

  makeResizableDiv('.resizable');

  //zoom

  // $('a.photo').zoom({url: 'photo-big.jpg'});

  $('a.photo').zoom({
    url: $(this).next().attr("src")
  });
});