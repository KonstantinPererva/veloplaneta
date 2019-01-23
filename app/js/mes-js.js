if (document.querySelector('.message-list__item')) {
    var item = document.querySelectorAll('.message-list__item');

    item.getElementsList = function () {
        [].forEach.call(item, function (el) {
            el.btn = el.querySelector('.message-block');

            if (el.querySelector('.article-list')) {
                el.dropdown = el.querySelector('.article-list');
            }

            el.arrrow = el.querySelector('.message-block__ico');
        });
    };

    item.deodownListArticle = function () {
        [].forEach.call(item, function (el) {
            el.btn.addEventListener('click', function () {
                [].forEach.call(item, function (el) {
                    el.arrrow.classList.remove('message-block__ico_active');
                    el.dropdown.style.display = 'none';
                });

                el.dropdown.style.display = 'block';

                el.arrrow.classList.add('message-block__ico_active');
            })
        })
    };

    item.innit = function () {
        item.getElementsList();
        item.deodownListArticle()
    };

    item.innit()
}