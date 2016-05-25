//Загрузка документа
$(document).ready(function () {

    //Для кроссбраузерных плейсхолдеров
    var $inputFields = $('.placeholder input[type="text"], .placeholder textarea');

    $inputFields.each(function () {
        if ($(this).val() != '') $(this).css({backgroundColor: '#fff'});
    });
    $inputFields.blur(function () {
        if ($(this).val() == '') $(this).css({backgroundColor: 'transparent'});
    });
    $inputFields.focus(function () {
        $(this).css({backgroundColor: '#fff'});
    });
    $inputFields.change(function () {
        if ($(this).val() != '') $(this).css({backgroundColor: '#fff'});
    });
    $inputFields.mouseover(function () {
        if ($(this).val() != '') $(this).css({backgroundColor: '#fff'});
    });

    $modalOverlay = $('.modal-overlay');
    $modalWindow = $('.modal-window');
    $openModal = $('.open-modal');
    $body = $('body');
    $html = $('html');

    $modalOverlay.hide();
    $modalWindow.hide();
    $modalWindow.click(function (e) {
        e.stopPropagation();
    });

    $openModal.click(function (e) {
        e.preventDefault();
        var $el = $(this);
        var $win = $($el.attr('href'));

        if ($el.attr('data-theme')) {
            $win.find('form input[name="theme"]').val($el.attr('data-theme'));
        }

        openModal($win);
    });

    $modalOverlay.click(function () {
        closeModal();
    });
});

var $modalOverlay;
var $modalWindow;
var $openModal;
var $body;
var $html;

var closeModal = function () {
    $modalWindow.css({'display': 'none'});
    $modalOverlay.css({'display': 'none'}).children().appendTo($body);
    $html.css({'overflow': 'auto', 'width': 'auto'})
};
var openModal = function ($el) {
    $el.appendTo($modalOverlay).css({'display': 'block'});
    $html.css({'overflow': 'hidden', 'width': $html.outerWidth()});
    $modalOverlay.css({'overflow-y': 'scroll', 'display': 'block'});
};

//Отправка
function sendForm(elem) {
    var form = $(elem);
    var uri = form.attr('action');
    var str = "";
    var error = 0;
    form.find('.rfield').each(function () {
        var input = $(this);
        if (input.val().length == 0) {
            error++;
            input.addClass('invalid');
        }
        else {
            input.removeClass('invalid');
        }
    });
    if (error == 0) {
        form.find('input[type="text"], input[type="hidden"], select,  textarea').each(function () {
            var input = $(this);
            str += input.attr('name') + '=' + input.val() + '&';
        });
        var Data = str.substring(0, str.length - 1);
        $.ajax({
            url: uri,
            async: true,
            type: 'POST',
            data: Data,
            processData: false,
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'HTML',
            success: function (data, textStatus, xhr) {
                if (data.length > 0) {
                    form.find('input[type="text"], textarea').each(function () {
                        var input = $(this);
                        input.val('').removeClass('invalid').removeAttr('style');
                    });
                    closeModal();
                    openModal($('#msg'));
                    setTimeout(function () {
                        closeModal()
                    }, 2000);
                } else {
                    alert('Ваша заявка не принята! Возможно вы не заполнили все поля!');
                }
            },
            dataFilter: function (data, dataType) {
                return data;
            }
        });
    }
}
