var arkad = {
};

arkad.ui = {
};

arkad.ui.AjaxPopForm = function () {
    var retVal = false;
    $(".arkad-form-popup").live("submit", function (event) {
        event.preventDefault();
        var form = $(this);
        $.ajax({
            url: form.attr('action'),
            type: "POST",   
            data: form.serialize(),
            success: function (data) {
            alert('close ss');
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("Error '" + jqXhr.status + "' (textStatus: '" + textStatus + "', errorThrown: '" + errorThrown + "')");
            },
            complete: function () {
            }
        });
    });
};

arkad.ui.AjaxForm = function () {
    var retVal = false;
    $(".arkad-form").live("submit", function (event) {
        event.preventDefault();
        var form = $(this);
        $.ajax({
            url: form.attr('action'),
            type: "POST",   
            data: form.serialize(),
            success: function (data) {
                $(".arkad-form").html(data);
                $.validator.unobtrusive.parse("form");
            },
            error: function (jqXhr, textStatus, errorThrown) {
                alert("Error '" + jqXhr.status + "' (textStatus: '" + textStatus + "', errorThrown: '" + errorThrown + "')");
            },
            complete: function () {
            }
        });
    });
};

arkad.ui.modal = {
    init: function(url, params, successMessage, closeAction) {

        globalSuccessMessage = successMessage;
        globalCloseAction = closeAction;

        $.get(url, params, function(data) {
            $(data).modal({
                    closeHTML: "<a href='#' title='Close' class='modal-close'>بستن</a>",
                    position: ["15%",],
                    overlayId: 'simplemodal-overlay',
                    containerId: 'simplemodal-container',
                    onOpen: arkad.ui.modal.open,
                    onShow: arkad.ui.modal.show,
                    onClose: arkad.ui.modal.close,
                    persist: true,
                    closed: true
                });
        });
    },
    open: function(dialog) {
        // add padding to the buttons in firefox/mozilla
        if ($.browser.mozilla) {
            $('#simplemodal-container .button').css({
                    'padding-bottom': '2px',
                });
        }
        // input field font size
        if ($.browser.safari) {
            $('#simplemodal-container .text').css({
                    'font-size': '.9em'
                });
        }
        // dynamically determine height
        var h = 500;
        var delay = 0;
        dialog.overlay.fadeIn(delay, function() {
            dialog.container.fadeIn(delay, function() {
                dialog.data.fadeIn(delay, function() {
                    $('#simplemodal-container .arkad-form').animate({
                            height: h
                        }, function() {
                            //$('#simplemodal-container .contact-title').html(title);
                            $('#simplemodal-container arkad-form').fadeIn(delay, function() {
                            });
                        });
                });
            });
        });
    },//end of open
    show: function(dialog) {
        var delay = 0;
        $('#simplemodal-container .button').click(function(e) {
            e.preventDefault();
            var form = $('#simplemodal-container form');
            $('#simplemodal-container form').fadeOut(delay);
            $('#simplemodal-container .arkad-form').animate({
                    height: '80px'
                }, function() {
                    $('#simplemodal-container .arkad-form').fadeIn(delay, function() {
                        $.ajax({
                                url: form.attr('action'),
                                data: $('#simplemodal-container form').serialize(),
                                type: 'POST',
                                cache: false,
                                dataType: 'html',
                                success: function(data) {
                                    $(".arkad-form").html(data);
                                    alert(globalSuccessMessage);
                                    $('#simplemodal-container').fadeOut(200,
                                        function() {
                                            $('#simplemodal-container .reform').html(globalSuccessMessage);
                                            arkad.ui.modal.close(dialog);
                                        });
                                },
                                error: function(jqXhr, textStatus, errorThrown) {
                                    alert("Error '" + jqXhr.status + "' (textStatus: '" + textStatus + "', errorThrown: '" + errorThrown + "')");
                                },
                                complete: function() {
                                    arkad.ui.modal.close(dialog);
                                    $("#simplemodal-container").dialog("close");
                                }
                            });
                    });
                });
        });
    },
    close: function(dialog) {
        $("#simplemodal-container").remove();
        $("#simplemodal-overlay").remove();
        $.modal.close();
        globalCloseAction();
//                $('#simplemodal-container form').remove();
//                dialog.container.fadeOut(50);
//                dialog.overlay.fadeOut(200);
//                $('#simplemodal-container form').fadeOut(100);
//                $('#simplemodal-container .arkad-form').animate({
//                    height: 40
//                }, function () {
//                    dialog.data.fadeOut(200, function () {
//                        dialog.container.fadeOut(200, function () {
//                            dialog.overlay.fadeOut(200, function () {
//                            alert('close');
//                                $.modal.close();
//                            });
//                        });
//                    });
//                });
    },
    validate: function() {
        return true;
    },
    error: function(xhr) {
        alert(xhr.statusText);
    }
};

arkad.ui.updateStyleSheet= function (filename) {
    var newstylesheet = "style_" + filename + ".css";
    if ($("#dynamic_css").length == 0) {
        $("head").append("<link>")
        css = $("head").children(":last");
        css.attr({
          id: "dynamic_css",
          rel:  "stylesheet",
          type: "text/css",
          href: newstylesheet
        });
    } else {
        $("#dynamic_css").attr("href",newstylesheet);
    }
};