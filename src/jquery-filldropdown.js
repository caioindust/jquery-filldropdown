/*!
 * filldropdown  v2.0
 * By: Caio Humberto Francisco 
 * Date: 26/09/2013 11:34
 * Update: 04/07/2014 19:38
*/

; (function ($, window, document, undefined) {

    var pluginName = "filldropdown";

    function Plugin(element, options) {
        this.element = element;

        this.options = $.extend(true, $.fn.filldropdown.defaults, options, $(this.element).data());

        if (typeof this.options.onsuccessafter === "string" && this.options.onsuccessafter !== "") {
            this.options.onsuccessafter = eval(this.options.onsuccessafter);
        }

        if (typeof this.options.onsuccess === "string" && this.options.onsuccess !== "") {
            this.options.onsuccess = eval(this.options.onsuccess);
        }

        if (typeof this.options.onerrorafter === "string" && this.options.onerrorafter !== "") {
            this.options.onerrorafter = eval(this.options.onerrorafter);
        }

        if (typeof this.options.onerror === "string" && this.options.onerror !== "") {
            this.options.onerror = eval(this.options.onerror);
        }

        if (typeof this.options.data === "string" && this.options.data !== "") {
            if (typeof eval(this.options.data) === "function") {
                this.options.data = eval(this.options.data);
            }
        }

        this.xhr;
        this._defaults = $.fn.filldropdown.defaults;
        this._name = pluginName;

        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            var parent = this;

            $(this.element).on("change", function () {

                if (parent.xhr && parent.xhr.readystate !== 4) {
                    parent.xhr.abort();
                }

                if ($(this).val() === "") {
                    $(parent.options.target).empty();
                    $(parent.options.target).append("<option value=\"\">" + parent.options.firstitemtext + "</option>");
                } else {
                    $(parent.options.target).empty();
                    $(parent.options.target).append("<option value=\"\">" + parent.options.waittext + "</option>");

                    //console.log(JSON.stringify(parent.options.paramiters));

                    var data = parent.options.paramiters;
                    if (typeof eval(parent.options.paramiters) === "function") {
                        var fn_data = eval(parent.options.paramiters);
                        data = fn_data(this);
                    }

                    parent.xhr = $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        cache: false,
                        dataType: "json",
                        url: parent.options.urlaction,
                        data: JSON.stringify(data),
                        traditional: true,
                        success: function (json) {
                            if (typeof parent.options.onsuccess === "function") {
                                parent.options.onsuccess(parent, json);
                            }

                            if (typeof parent.options.onsuccessafter === "function") {
                                parent.options.onsuccessafter(parent, json);
                            }
                        },
                        error: function (erro) {
                            if (typeof parent.options.onerror === "function") {
                                parent.options.onerror(parent, erro);
                            }

                            if (typeof parent.options.onerrorafter === "function") {
                                parent.options.onerrorafter(parent, erro);
                            }
                        }
                    });
                }
            });

            $(this.element).change();
        },

        success: function (json) {
            var FirstItemAux = "<option value=\"\">" + this.options.firstitemtext + "</option>";
            $(this.options.target).empty();
            $(this.options.target).append(FirstItemAux);
            var that = this;
            $.each(json, function (index, element) {
                $(that.options.target).append("<option value=\"" + element[that.options.valuefield] + "\">" + element[that.options.textfield] + "</option>");
            });
        },

        error: function (erro) {
            var FirstItemAux = "<option value=\"\">" + this.options.firstitemtext + "</option>";
            $(this.options.target).empty();
            $(this.options.target).append(FirstItemAux);
        },

        destroy: function () {
            $(this.element).unbind("change");
            $.data(this.element, "plugin_" + pluginName, null);
            $(this.element).removeData("plugin_" + pluginName);
        },
        set: function () {
            var args = arguments;
            eval("this['" + Array.prototype.slice.call(args, 0, args.length - 1).join("']['") + "'] = '" + args[args.length - 1] + "'");
        },
        get: function () {
            var args = arguments;
            return eval("this['" + Array.prototype.slice.call(args).join("']['") + "']");
        }
    });

    $.fn[pluginName] = function (options) {
        var args = arguments;

        if (options === undefined || typeof options === "object") {
            return this.each(function () {
                if (!$.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" + pluginName, new Plugin(this, options));
                }
            });
        } else if (typeof options === "string" && options[0] !== "_" && options !== "init") {
            var returns;
            this.each(function () {
                var instance = $.data(this, "plugin_" + pluginName);

                if (instance instanceof Plugin) {

                    if (typeof instance[options] === "function") {
                        returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                    }

                }
            });

            return returns !== undefined ? returns : this;
        }
    };

    $.fn[pluginName].defaults = {
        urlaction: "",
        paramiters: function (sender) {
            return { id: $(sender).val() };
        },
        target: "",
        valuefield: "id",
        textfield: "value",
        firstitemtext: "--Select--",
        waittext: "Wait...",
        onsuccessafter: function () { },// function (sender, json) { },
        onsuccess: function (sender, json) {
            sender.success(json);
        },
        onerrorafter: function () { },//  function (sender, erro) { },
        onerror: function (sender, erro) {
            sender.error(erro);
        }
    };
})(jQuery, window, document);