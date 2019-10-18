function addZeros(a, b) {
    for (a = parseInt(a);
        ("" + a).length < b;) a = "0" + a;
    return a.toString()
}

function updateTimer() {
    var a = jQuery(".black-week-2017-left-days .count"),
        b = new Date("November 20, 2017 00:00:00"),
        c = ~~((b - new Date) / 1e3),
        d = {
            dias: c / 86400
        },
        e = {
            horas: c % 86400 / 3600,
            minutos: c % 3600 / 60,
            segundos: c % 60
        },
        f = "";
    for (var g in d) f += ~~d[g] + " " + g + ", ";
    var h = "";
    for (var g in e) h += addZeros(e[g], 2) + ":";
    a.html(f.substring(0, f.length - 2)), a.append('<small class="hours">e ' + h.substring(0, h.length - 1) + ".</span>")
}

function updateTimer2() {
    var a = jQuery(".black-week-2017-left-days-2 .count"),
        b = new Date("November 26, 2017 00:00:00"),
        c = ~~((b - new Date) / 1e3),
        d = {
            dias: c / 86400
        },
        e = {
            horas: c % 86400 / 3600,
            minutos: c % 3600 / 60,
            segundos: c % 60
        },
        f = "";
    for (var g in d) f += ~~d[g] + " " + g + ", ";
    var h = "";
    for (var g in e) h += addZeros(e[g], 2) + ":";
    a.html(f.substring(0, f.length - 2)), a.append('<small class="hours">e ' + h.substring(0, h.length - 1) + ".</span>")
}

function sendClientBF() {
    var a = $('[name="firstName"]').val().split(" "),
        b = a[0],
        c = a[a.length - 1],
        d = $('[name="email"]').val(),
        e = {
            firstName: b,
            lastName: c,
            email: d,
            isNewsletterOptIn: !0,
            clientBlackFriday: !0
        },
        f = $(".btn-blackweek-2017").html();
    $(".btn-blackweek-2017").html('<i class="fa fa-spinner rotate-loading" aria-hidden="true"></i>'), $.ajax({
        headers: {
            Accept: "application/vnd.vtex.ds.v10+json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(e),
        type: "PATCH",
        url: "https://api.vtexcrm.com.br/b2bnaweb/dataentities/CL/documents/",
        success: function (a, b, c) {
            "403" == c.status ? ($(".btn-blackweek-2017").html(f), $(".black-week-mailing-return").html('<div class="alert alert-error" role="alert">Ops. Tente novamente ou entre em contato com nosso SAC.</div>')) : ($(".btn-blackweek-2017").html(f), $(".black-week-mailing-return").html('<div class="alert alert-success" role="alert">VocÃª vai aproveitar as melhores promoÃ§Ãµes, obrigado pelo cadastro.</div>'))
        },
        error: function (a) {
            $(".btn-blackweek-2017").html(f), $(".black-week-mailing-return").html('<div class="alert alert-error" role="alert">Ops. Tente novamente ou entre em contato com nosso SAC.</div>')
        }
    })
}

function slick_Categories_BlackWeek(a) {
    switch (a) {
        case "mobile":
            $(".black-week-2017-categories-list").slick({
                autoplay: !0,
                infinite: !0,
                arrows: !0,
                dots: !0,
                slidesToShow: 2,
                slidesToScroll: 2,
                slide: "li"
            });
            break;
        default:
            $(".black-week-2017-categories-list").slick("unslick")
    }
}

function slick_Features_BlackWeek(a) {
    switch (a) {
        case "mobile":
            $(".black-week-2017-features-list").slick({
                autoplay: !0,
                infinite: !0,
                arrows: !0,
                dots: !0,
                slidesToShow: 1,
                slidesToScroll: 1,
                slide: "li"
            });
            break;
        default:
            $(".black-week-2017-categories-list").slick("unslick")
    }
}! function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    a.extend(a.fn, {
        validate: function (b) {
            if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var c = a.data(this[0], "validator");
            return c || (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function (b) {
                c.submitButton = b.currentTarget, a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0)
            }), this.on("submit.validate", function (b) {
                function d() {
                    var d, e;
                    return c.submitButton && (c.settings.submitHandler || c.formSubmitted) && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), !c.settings.submitHandler || (e = c.settings.submitHandler.call(c, c.currentForm, b), d && d.remove(), void 0 !== e && e)
                }
                return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
            })), c)
        },
        valid: function () {
            var b, c, d;
            return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function () {
                (b = c.element(this) && b) || (d = d.concat(c.errorList))
            }), c.errorList = d), b
        },
        rules: function (b, c) {
            var d, e, f, g, h, i, j = this[0];
            if (null != j && (!j.form && j.hasAttribute("contenteditable") && (j.form = this.closest("form")[0], j.name = this.attr("name")), null != j.form)) {
                if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                        break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function (a, b) {
                            i[b] = f[b], delete f[b]
                        }), i) : (delete e[j.name], f)
                }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                    required: h
                }, g)), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                    remote: h
                })), g
            }
        }
    }), a.extend(a.expr.pseudos || a.expr[":"], {
        blank: function (b) {
            return !a.trim("" + a(b).val())
        },
        filled: function (b) {
            var c = a(b).val();
            return null !== c && !!a.trim("" + c)
        },
        unchecked: function (b) {
            return !a(b).prop("checked")
        }
    }), a.validator = function (b, c) {
        this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function (b, c) {
        return 1 === arguments.length ? function () {
            var c = a.makeArray(arguments);
            return c.unshift(b), a.validator.format.apply(this, c)
        } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) {
            b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function () {
                return c
            })
        }), b)
    }, a.extend(a.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            pendingClass: "pending",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: a([]),
            errorLabelContainer: a([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (a) {
                this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
            },
            onfocusout: function (a) {
                this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
            },
            onkeyup: function (b, c) {
                var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b.name in this.invalid) && this.element(b)
            },
            onclick: function (a) {
                a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
            },
            highlight: function (b, c, d) {
                "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
            },
            unhighlight: function (b, c, d) {
                "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
            }
        },
        setDefaults: function (b) {
            a.extend(a.validator.defaults, b)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: a.validator.format("Please enter no more than {0} characters."),
            minlength: a.validator.format("Please enter at least {0} characters."),
            rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
            range: a.validator.format("Please enter a value between {0} and {1}."),
            max: a.validator.format("Please enter a value less than or equal to {0}."),
            min: a.validator.format("Please enter a value greater than or equal to {0}."),
            step: a.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function b(b) {
                    !this.form && this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0], this.name = a(this).attr("name"));
                    var c = a.data(this.form, "validator"),
                        d = "on" + b.type.replace(/^validate/, ""),
                        e = c.settings;
                    e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b)
                }
                this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var c, d = this.groups = {};
                a.each(this.settings.groups, function (b, c) {
                    "string" == typeof c && (c = c.split(/\s/)), a.each(c, function (a, c) {
                        d[c] = b
                    })
                }), c = this.settings.rules, a.each(c, function (b, d) {
                    c[b] = a.validator.normalizeRule(d)
                }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
            },
            form: function () {
                return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function () {
                this.prepareForm();
                for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                return this.valid()
            },
            element: function (b) {
                var c, d, e = this.clean(b),
                    f = this.validationTargetFor(e),
                    g = this,
                    h = !0;
                return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function (a, b) {
                    b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a)))) && e.name in g.invalid && (g.currentElements.push(e), h = g.check(e) && h)
                }), c = !1 !== this.check(f), h = h && c, this.invalid[f.name] = !c, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h
            },
            showErrors: function (b) {
                if (b) {
                    var c = this;
                    a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function (a, b) {
                        return {
                            message: a,
                            element: c.findByName(b)[0]
                        }
                    }), this.successList = a.grep(this.successList, function (a) {
                        return !(a.name in b)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function () {
                a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(b)
            },
            resetElements: function (a) {
                var b;
                if (this.settings.unhighlight)
                    for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
                else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            },
            objectLength: function (a) {
                var b, c = 0;
                for (b in a) void 0 !== a[b] && null !== a[b] && !1 !== a[b] && c++;
                return c
            },
            hideErrors: function () {
                this.hideThese(this.toHide)
            },
            hideThese: function (a) {
                a.not(this.containers).text(""), this.addWrapper(a).hide()
            },
            valid: function () {
                return 0 === this.size()
            },
            size: function () {
                return this.errorList.length
            },
            focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (b) {}
            },
            findLastActive: function () {
                var b = this.lastActive;
                return b && 1 === a.grep(this.errorList, function (a) {
                    return a.element.name === b.name
                }).length && b
            },
            elements: function () {
                var b = this,
                    c = {};
                return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                    var d = this.name || a(this).attr("name");
                    return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0], this.name = d), !(d in c || !b.objectLength(a(this).rules())) && (c[d] = !0, !0)
                })
            },
            clean: function (b) {
                return a(b)[0]
            },
            errors: function () {
                var b = this.settings.errorClass.split(" ").join(".");
                return a(this.settings.errorElement + "." + b, this.errorContext)
            },
            resetInternals: function () {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([])
            },
            reset: function () {
                this.resetInternals(), this.currentElements = a([])
            },
            prepareForm: function () {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function (a) {
                this.reset(), this.toHide = this.errorsFor(a)
            },
            elementValue: function (b) {
                var c, d, e = a(b),
                    f = b.type;
                return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && void 0 !== b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/")) >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c) : "string" == typeof c ? c.replace(/\r/g, "") : c)
            },
            check: function (b) {
                b = this.validationTargetFor(this.clean(b));
                var c, d, e, f, g = a(b).rules(),
                    h = a.map(g, function (a, b) {
                        return b
                    }).length,
                    i = !1,
                    j = this.elementValue(b);
                if ("function" == typeof g.normalizer ? f = g.normalizer : "function" == typeof this.settings.normalizer && (f = this.settings.normalizer), f) {
                    if ("string" != typeof (j = f.call(b, j))) throw new TypeError("The normalizer should return a string value.");
                    delete g.normalizer
                }
                for (d in g) {
                    e = {
                        method: d,
                        parameters: g[d]
                    };
                    try {
                        if ("dependency-mismatch" === (c = a.validator.methods[d].call(this, j, b, e.parameters)) && 1 === h) {
                            i = !0;
                            continue
                        }
                        if (i = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                        if (!c) return this.formatAndAdd(b, e), !1
                    } catch (k) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", k), k instanceof TypeError && (k.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), k
                    }
                }
                if (!i) return this.objectLength(g) && this.successList.push(b), !0
            },
            customDataMessage: function (b, c) {
                return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
            },
            customMessage: function (a, b) {
                var c = this.settings.messages[a];
                return c && (c.constructor === String ? c : c[b])
            },
            findDefined: function () {
                for (var a = 0; a < arguments.length; a++)
                    if (void 0 !== arguments[a]) return arguments[a]
            },
            defaultMessage: function (b, c) {
                "string" == typeof c && (c = {
                    method: c
                });
                var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
                    e = /\$?\{(\d+)\}/g;
                return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d
            },
            formatAndAdd: function (a, b) {
                var c = this.defaultMessage(a, b);
                this.errorList.push({
                    message: c,
                    element: a,
                    method: b.method
                }), this.errorMap[a.name] = c, this.submitted[a.name] = c
            },
            addWrapper: function (a) {
                return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
            },
            defaultShowErrors: function () {
                var a, b, c;
                for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                if (this.settings.unhighlight)
                    for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function () {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function () {
                return a(this.errorList).map(function () {
                    return this.element
                })
            },
            showLabel: function (b, c) {
                var d, e, f, g, h = this.errorsFor(b),
                    i = this.idOrName(b),
                    j = a(b).attr("aria-describedby");
                h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), (e = this.groups[b.name]) && (g = this, a.each(g.groups, function (b, c) {
                    c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"))
                })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h)
            },
            errorsFor: function (b) {
                var c = this.escapeCssMeta(this.idOrName(b)),
                    d = a(b).attr("aria-describedby"),
                    e = "label[for='" + c + "'], label[for='" + c + "'] *";
                return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e)
            },
            escapeCssMeta: function (a) {
                return a.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function (a) {
                return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
            },
            validationTargetFor: function (b) {
                return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0]
            },
            checkable: function (a) {
                return /radio|checkbox/i.test(a.type)
            },
            findByName: function (b) {
                return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']")
            },
            getLength: function (b, c) {
                switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                }
                return b.length
            },
            depend: function (a, b) {
                return !this.dependTypes[typeof a] || this.dependTypes[typeof a](a, b)
            },
            dependTypes: {
                boolean: function (a) {
                    return a
                },
                string: function (b, c) {
                    return !!a(b, c.form).length
                },
                function: function (a, b) {
                    return a(b)
                }
            },
            optional: function (b) {
                var c = this.elementValue(b);
                return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
            },
            startRequest: function (b) {
                this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0)
            },
            stopRequest: function (b, c) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.submitButton && a("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function (b, c) {
                return c = "string" == typeof c && c || "remote", a.data(b, "previousValue") || a.data(b, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(b, {
                        method: c
                    })
                })
            },
            destroy: function () {
                this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function (b, c) {
            b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
        },
        classRules: function (b) {
            var c = {},
                d = a(b).attr("class");
            return d && a.each(d.split(" "), function () {
                this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
            }), c
        },
        normalizeAttributeRule: function (a, b, c, d) {
            /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0)
        },
        attributeRules: function (b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
            return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
        },
        dataRules: function (b) {
            var c, d, e = {},
                f = a(b),
                g = b.getAttribute("type");
            for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
            return e
        },
        staticRules: function (b) {
            var c = {},
                d = a.data(b.form, "validator");
            return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
        },
        normalizeRules: function (b, c) {
            return a.each(b, function (d, e) {
                if (!1 === e) return void delete b[d];
                if (e.param || e.depends) {
                    var f = !0;
                    switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                    }
                    f ? b[d] = void 0 === e.param || e.param : (a.data(c.form, "validator").resetElements(a(c)), delete b[d])
                }
            }), a.each(b, function (d, e) {
                b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e
            }), a.each(["minlength", "maxlength"], function () {
                b[this] && (b[this] = Number(b[this]))
            }), a.each(["rangelength", "range"], function () {
                var c;
                b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
            }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
        },
        normalizeRule: function (b) {
            if ("string" == typeof b) {
                var c = {};
                a.each(b.split(/\s/), function () {
                    c[this] = !0
                }), b = c
            }
            return b
        },
        addMethod: function (b, c, d) {
            a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
        },
        methods: {
            required: function (b, c, d) {
                if (!this.depend(d, c)) return "dependency-mismatch";
                if ("select" === c.nodeName.toLowerCase()) {
                    var e = a(c).val();
                    return e && e.length > 0
                }
                return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0
            },
            email: function (a, b) {
                return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
            },
            url: function (a, b) {
                return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(a)
            },
            date: function (a, b) {
                return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
            },
            dateISO: function (a, b) {
                return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
            },
            number: function (a, b) {
                return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
            },
            digits: function (a, b) {
                return this.optional(b) || /^\d+$/.test(a)
            },
            minlength: function (b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d
            },
            maxlength: function (b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e <= d
            },
            rangelength: function (b, c, d) {
                var e = a.isArray(b) ? b.length : this.getLength(b, c);
                return this.optional(c) || e >= d[0] && e <= d[1]
            },
            min: function (a, b, c) {
                return this.optional(b) || a >= c
            },
            max: function (a, b, c) {
                return this.optional(b) || a <= c
            },
            range: function (a, b, c) {
                return this.optional(b) || a >= c[0] && a <= c[1]
            },
            step: function (b, c, d) {
                var e, f = a(c).attr("type"),
                    g = "Step attribute on input type " + f + " is not supported.",
                    h = ["text", "number", "range"],
                    i = new RegExp("\\b" + f + "\\b"),
                    j = f && !i.test(h.join()),
                    k = function (a) {
                        var b = ("" + a).match(/(?:\.(\d+))?$/);
                        return b && b[1] ? b[1].length : 0
                    },
                    l = function (a) {
                        return Math.round(a * Math.pow(10, e))
                    },
                    m = !0;
                if (j) throw new Error(g);
                return e = k(d), (k(b) > e || l(b) % l(d) != 0) && (m = !1), this.optional(c) || m
            },
            equalTo: function (b, c, d) {
                var e = a(d);
                return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                    a(c).valid()
                }), b === e.val()
            },
            remote: function (b, c, d, e) {
                if (this.optional(c)) return "dependency-mismatch";
                e = "string" == typeof e && e || "remote";
                var f, g, h, i = this.previousValue(c, e);
                return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && {
                    url: d
                } || d, h = a.param(a.extend({
                    data: b
                }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, {
                    mode: "abort",
                    port: "validate" + c.name,
                    dataType: "json",
                    data: g,
                    context: f.currentForm,
                    success: function (a) {
                        var d, g, h, j = !0 === a || "true" === a;
                        f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, {
                            method: e,
                            parameters: b
                        }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j)
                    }
                }, d)), "pending")
            }
        }
    });
    var b, c = {};
    return a.ajaxPrefilter ? a.ajaxPrefilter(function (a, b, d) {
        var e = a.port;
        "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
    }) : (b = a.ajax, a.ajax = function (d) {
        var e = ("mode" in d ? d : a.ajaxSettings).mode,
            f = ("port" in d ? d : a.ajaxSettings).port;
        return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
    }), a
}),
function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    "use strict";
    var b = window.Slick || {};
    b = function () {
        function b(b, d) {
            var e, f = this;
            f.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(b),
                appendDots: a(b),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (b, c) {
                    return a('<button type="button" />').text(c + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, f.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: !1,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                swiping: !1,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, a.extend(f, f.initials), f.activeBreakpoint = null, f.animType = null, f.animProp = null, f.breakpoints = [], f.breakpointSettings = [], f.cssTransitions = !1, f.focussed = !1, f.interrupted = !1, f.hidden = "hidden", f.paused = !0, f.positionProp = null, f.respondTo = null, f.rowCount = 1, f.shouldClick = !0, f.$slider = a(b), f.$slidesCache = null, f.transformType = null, f.transitionType = null, f.visibilityChange = "visibilitychange", f.windowWidth = 0, f.windowTimer = null, e = a(b).data("slick") || {}, f.options = a.extend({}, f.defaults, d, e), f.currentSlide = f.options.initialSlide, f.originalSettings = f.options, void 0 !== document.mozHidden ? (f.hidden = "mozHidden", f.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (f.hidden = "webkitHidden", f.visibilityChange = "webkitvisibilitychange"), f.autoPlay = a.proxy(f.autoPlay, f), f.autoPlayClear = a.proxy(f.autoPlayClear, f), f.autoPlayIterator = a.proxy(f.autoPlayIterator, f), f.changeSlide = a.proxy(f.changeSlide, f), f.clickHandler = a.proxy(f.clickHandler, f), f.selectHandler = a.proxy(f.selectHandler, f), f.setPosition = a.proxy(f.setPosition, f), f.swipeHandler = a.proxy(f.swipeHandler, f), f.dragHandler = a.proxy(f.dragHandler, f), f.keyHandler = a.proxy(f.keyHandler, f), f.instanceUid = c++, f.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, f.registerBreakpoints(), f.init(!0)
        }
        var c = 0;
        return b
    }(), b.prototype.activateADA = function () {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        })
    }, b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) {
        var e = this;
        if ("boolean" == typeof c) d = c, c = null;
        else if (c < 0 || c >= e.slideCount) return !1;
        e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : !0 === d ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b)
        }), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateHeight = function () {
        var a = this;
        if (1 === a.options.slidesToShow && !0 === a.options.adaptiveHeight && !1 === a.options.vertical) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.animate({
                height: b
            }, a.options.speed)
        }
    }, b.prototype.animateSlide = function (b, c) {
        var d = {},
            e = this;
        e.animateHeight(), !0 === e.options.rtl && !1 === e.options.vertical && (b = -b), !1 === e.transformsEnabled ? !1 === e.options.vertical ? e.$slideTrack.animate({
            left: b
        }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
            top: b
        }, e.options.speed, e.options.easing, c) : !1 === e.cssTransitions ? (!0 === e.options.rtl && (e.currentLeft = -e.currentLeft), a({
            animStart: e.currentLeft
        }).animate({
            animStart: b
        }, {
            duration: e.options.speed,
            easing: e.options.easing,
            step: function (a) {
                a = Math.ceil(a), !1 === e.options.vertical ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
            },
            complete: function () {
                c && c.call()
            }
        })) : (e.applyTransition(), b = Math.ceil(b), !1 === e.options.vertical ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () {
            e.disableTransition(), c.call()
        }, e.options.speed))
    }, b.prototype.getNavTarget = function () {
        var b = this,
            c = b.options.asNavFor;
        return c && null !== c && (c = a(c).not(b.$slider)), c
    }, b.prototype.asNavFor = function (b) {
        var c = this,
            d = c.getNavTarget();
        null !== d && "object" == typeof d && d.each(function () {
            var c = a(this).slick("getSlick");
            c.unslicked || c.slideHandler(b, !0)
        })
    }, b.prototype.applyTransition = function (a) {
        var b = this,
            c = {};
        !1 === b.options.fade ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, !1 === b.options.fade ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function () {
        var a = this;
        a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function () {
        var a = this;
        a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function () {
        var a = this,
            b = a.currentSlide + a.options.slidesToScroll;
        a.paused || a.interrupted || a.focussed || (!1 === a.options.infinite && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 == 0 && (a.direction = 1))), a.slideHandler(b))
    }, b.prototype.buildArrows = function () {
        var b = this;
        !0 === b.options.arrows && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
            b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), !0 !== b.options.infinite && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, b.prototype.buildDots = function () {
        var b, c, d = this;
        if (!0 === d.options.dots) {
            for (d.$slider.addClass("slick-dotted"), c = a("<ul />").addClass(d.options.dotsClass), b = 0; b <= d.getDotCount(); b += 1) c.append(a("<li />").append(d.options.customPaging.call(this, d, b)));
            d.$dots = c.appendTo(d.options.appendDots), d.$dots.find("li").first().addClass("slick-active")
        }
    }, b.prototype.buildOut = function () {
        var b = this;
        b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) {
            a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
        }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), !0 !== b.options.centerMode && !0 !== b.options.swipeToSlide || (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), !0 === b.options.draggable && b.$list.addClass("draggable")
    }, b.prototype.buildRows = function () {
        var a, b, c, d, e, f, g, h = this;
        if (d = document.createDocumentFragment(), f = h.$slider.children(), h.options.rows > 1) {
            for (g = h.options.slidesPerRow * h.options.rows, e = Math.ceil(f.length / g), a = 0; a < e; a++) {
                var i = document.createElement("div");
                for (b = 0; b < h.options.rows; b++) {
                    var j = document.createElement("div");
                    for (c = 0; c < h.options.slidesPerRow; c++) {
                        var k = a * g + (b * h.options.slidesPerRow + c);
                        f.get(k) && j.appendChild(f.get(k))
                    }
                    i.appendChild(j)
                }
                d.appendChild(i)
            }
            h.$slider.empty().append(d), h.$slider.children().children().children().css({
                width: 100 / h.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, b.prototype.checkResponsive = function (b, c) {
        var d, e, f, g = this,
            h = !1,
            i = g.$slider.width(),
            j = window.innerWidth || a(window).width();
        if ("window" === g.respondTo ? f = j : "slider" === g.respondTo ? f = i : "min" === g.respondTo && (f = Math.min(j, i)), g.options.responsive && g.options.responsive.length && null !== g.options.responsive) {
            e = null;
            for (d in g.breakpoints) g.breakpoints.hasOwnProperty(d) && (!1 === g.originalSettings.mobileFirst ? f < g.breakpoints[d] && (e = g.breakpoints[d]) : f > g.breakpoints[d] && (e = g.breakpoints[d]));
            null !== e ? null !== g.activeBreakpoint ? (e !== g.activeBreakpoint || c) && (g.activeBreakpoint = e, "unslick" === g.breakpointSettings[e] ? g.unslick(e) : (g.options = a.extend({}, g.originalSettings, g.breakpointSettings[e]), !0 === b && (g.currentSlide = g.options.initialSlide), g.refresh(b)), h = e) : (g.activeBreakpoint = e, "unslick" === g.breakpointSettings[e] ? g.unslick(e) : (g.options = a.extend({}, g.originalSettings, g.breakpointSettings[e]), !0 === b && (g.currentSlide = g.options.initialSlide), g.refresh(b)), h = e) : null !== g.activeBreakpoint && (g.activeBreakpoint = null, g.options = g.originalSettings, !0 === b && (g.currentSlide = g.options.initialSlide), g.refresh(b), h = e), b || !1 === h || g.$slider.trigger("breakpoint", [g, h])
        }
    }, b.prototype.changeSlide = function (b, c) {
        var d, e, f, g = this,
            h = a(b.currentTarget);
        switch (h.is("a") && b.preventDefault(), h.is("li") || (h = h.closest("li")), f = g.slideCount % g.options.slidesToScroll != 0, d = f ? 0 : (g.slideCount - g.currentSlide) % g.options.slidesToScroll, b.data.message) {
            case "previous":
                e = 0 === d ? g.options.slidesToScroll : g.options.slidesToShow - d, g.slideCount > g.options.slidesToShow && g.slideHandler(g.currentSlide - e, !1, c);
                break;
            case "next":
                e = 0 === d ? g.options.slidesToScroll : d, g.slideCount > g.options.slidesToShow && g.slideHandler(g.currentSlide + e, !1, c);
                break;
            case "index":
                var i = 0 === b.data.index ? 0 : b.data.index || h.index() * g.options.slidesToScroll;
                g.slideHandler(g.checkNavigable(i), !1, c), h.children().trigger("focus");
                break;
            default:
                return
        }
    }, b.prototype.checkNavigable = function (a) {
        var b, c, d = this;
        if (b = d.getNavigableIndexes(), c = 0, a > b[b.length - 1]) a = b[b.length - 1];
        else
            for (var e in b) {
                if (a < b[e]) {
                    a = c;
                    break
                }
                c = b[e]
            }
        return a
    }, b.prototype.cleanUpEvents = function () {
        var b = this;
        b.options.dots && null !== b.$dots && (a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), !0 === b.options.accessibility && b.$dots.off("keydown.slick", b.keyHandler)), b.$slider.off("focus.slick blur.slick"), !0 === b.options.arrows && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide), !0 === b.options.accessibility && (b.$prevArrow && b.$prevArrow.off("keydown.slick", b.keyHandler), b.$nextArrow && b.$nextArrow.off("keydown.slick", b.keyHandler))), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), !0 === b.options.accessibility && b.$list.off("keydown.slick", b.keyHandler), !0 === b.options.focusOnSelect && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.cleanUpSlideEvents = function () {
        var b = this;
        b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.cleanUpRows = function () {
        var a, b = this;
        b.options.rows > 1 && (a = b.$slides.children().children(), a.removeAttr("style"), b.$slider.empty().append(a))
    }, b.prototype.clickHandler = function (a) {
        !1 === this.shouldClick && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    }, b.prototype.destroy = function (b) {
        var c = this;
        c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            a(this).attr("style", a(this).data("originalStyling"))
        }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
    }, b.prototype.disableTransition = function (a) {
        var b = this,
            c = {};
        c[b.transitionType] = "", !1 === b.options.fade ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function (a, b) {
        var c = this;
        !1 === c.cssTransitions ? (c.$slides.eq(a).css({
            zIndex: c.options.zIndex
        }), c.$slides.eq(a).animate({
            opacity: 1
        }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
            opacity: 1,
            zIndex: c.options.zIndex
        }), b && setTimeout(function () {
            c.disableTransition(a), b.call()
        }, c.options.speed))
    }, b.prototype.fadeSlideOut = function (a) {
        var b = this;
        !1 === b.cssTransitions ? b.$slides.eq(a).animate({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
            opacity: 0,
            zIndex: b.options.zIndex - 2
        }))
    }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) {
        var b = this;
        null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.focusHandler = function () {
        var b = this;
        b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (c) {
            c.stopImmediatePropagation();
            var d = a(this);
            setTimeout(function () {
                b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
            }, 0)
        })
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () {
        return this.currentSlide
    }, b.prototype.getDotCount = function () {
        var a = this,
            b = 0,
            c = 0,
            d = 0;
        if (!0 === a.options.infinite)
            if (a.slideCount <= a.options.slidesToShow) ++d;
            else
                for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else if (!0 === a.options.centerMode) d = a.slideCount;
        else if (a.options.asNavFor)
            for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
        else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
        return d - 1
    }, b.prototype.getLeft = function (a) {
        var b, c, d, e, f = this,
            g = 0;
        return f.slideOffset = 0, c = f.$slides.first().outerHeight(!0), !0 === f.options.infinite ? (f.slideCount > f.options.slidesToShow && (f.slideOffset = f.slideWidth * f.options.slidesToShow * -1, e = -1, !0 === f.options.vertical && !0 === f.options.centerMode && (2 === f.options.slidesToShow ? e = -1.5 : 1 === f.options.slidesToShow && (e = -2)), g = c * f.options.slidesToShow * e), f.slideCount % f.options.slidesToScroll != 0 && a + f.options.slidesToScroll > f.slideCount && f.slideCount > f.options.slidesToShow && (a > f.slideCount ? (f.slideOffset = (f.options.slidesToShow - (a - f.slideCount)) * f.slideWidth * -1, g = (f.options.slidesToShow - (a - f.slideCount)) * c * -1) : (f.slideOffset = f.slideCount % f.options.slidesToScroll * f.slideWidth * -1, g = f.slideCount % f.options.slidesToScroll * c * -1))) : a + f.options.slidesToShow > f.slideCount && (f.slideOffset = (a + f.options.slidesToShow - f.slideCount) * f.slideWidth, g = (a + f.options.slidesToShow - f.slideCount) * c), f.slideCount <= f.options.slidesToShow && (f.slideOffset = 0, g = 0), !0 === f.options.centerMode && f.slideCount <= f.options.slidesToShow ? f.slideOffset = f.slideWidth * Math.floor(f.options.slidesToShow) / 2 - f.slideWidth * f.slideCount / 2 : !0 === f.options.centerMode && !0 === f.options.infinite ? f.slideOffset += f.slideWidth * Math.floor(f.options.slidesToShow / 2) - f.slideWidth : !0 === f.options.centerMode && (f.slideOffset = 0, f.slideOffset += f.slideWidth * Math.floor(f.options.slidesToShow / 2)), b = !1 === f.options.vertical ? a * f.slideWidth * -1 + f.slideOffset : a * c * -1 + g, !0 === f.options.variableWidth && (d = f.slideCount <= f.options.slidesToShow || !1 === f.options.infinite ? f.$slideTrack.children(".slick-slide").eq(a) : f.$slideTrack.children(".slick-slide").eq(a + f.options.slidesToShow), b = !0 === f.options.rtl ? d[0] ? -1 * (f.$slideTrack.width() - d[0].offsetLeft - d.width()) : 0 : d[0] ? -1 * d[0].offsetLeft : 0, !0 === f.options.centerMode && (d = f.slideCount <= f.options.slidesToShow || !1 === f.options.infinite ? f.$slideTrack.children(".slick-slide").eq(a) : f.$slideTrack.children(".slick-slide").eq(a + f.options.slidesToShow + 1), b = !0 === f.options.rtl ? d[0] ? -1 * (f.$slideTrack.width() - d[0].offsetLeft - d.width()) : 0 : d[0] ? -1 * d[0].offsetLeft : 0, b += (f.$list.width() - d.outerWidth()) / 2)), b
    }, b.prototype.getOption = b.prototype.slickGetOption = function (a) {
        return this.options[a]
    }, b.prototype.getNavigableIndexes = function () {
        var a, b = this,
            c = 0,
            d = 0,
            e = [];
        for (!1 === b.options.infinite ? a = b.slideCount : (c = -1 * b.options.slidesToScroll, d = -1 * b.options.slidesToScroll, a = 2 * b.slideCount); c < a;) e.push(c), c = d + b.options.slidesToScroll, d += b.options.slidesToScroll <= b.options.slidesToShow ? b.options.slidesToScroll : b.options.slidesToShow;
        return e
    }, b.prototype.getSlick = function () {
        return this
    }, b.prototype.getSlideCount = function () {
        var b, c, d = this;
        return c = !0 === d.options.centerMode ? d.slideWidth * Math.floor(d.options.slidesToShow / 2) : 0, !0 === d.options.swipeToSlide ? (d.$slideTrack.find(".slick-slide").each(function (e, f) {
            if (f.offsetLeft - c + a(f).outerWidth() / 2 > -1 * d.swipeLeft) return b = f, !1
        }), Math.abs(a(b).attr("data-slick-index") - d.currentSlide) || 1) : d.options.slidesToScroll
    }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(a)
            }
        }, b)
    }, b.prototype.init = function (b) {
        var c = this;
        a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), !0 === c.options.accessibility && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
    }, b.prototype.initADA = function () {
        var b = this,
            c = Math.ceil(b.slideCount / b.options.slidesToShow),
            d = b.getNavigableIndexes().filter(function (a) {
                return a >= 0 && a < b.slideCount
            });
        b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== b.$dots && (b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) {
            var e = d.indexOf(c);
            a(this).attr({
                role: "tabpanel",
                id: "slick-slide" + b.instanceUid + c,
                tabindex: -1
            }), -1 !== e && a(this).attr({
                "aria-describedby": "slick-slide-control" + b.instanceUid + e
            })
        }), b.$dots.attr("role", "tablist").find("li").each(function (e) {
            var f = d[e];
            a(this).attr({
                role: "presentation"
            }), a(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + b.instanceUid + e,
                "aria-controls": "slick-slide" + b.instanceUid + f,
                "aria-label": e + 1 + " of " + c,
                "aria-selected": null,
                tabindex: "-1"
            })
        }).eq(b.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var e = b.currentSlide, f = e + b.options.slidesToShow; e < f; e++) b.$slides.eq(e).attr("tabindex", 0);
        b.activateADA()
    }, b.prototype.initArrowEvents = function () {
        var a = this;
        !0 === a.options.arrows && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, a.changeSlide), !0 === a.options.accessibility && (a.$prevArrow.on("keydown.slick", a.keyHandler), a.$nextArrow.on("keydown.slick", a.keyHandler)))
    }, b.prototype.initDotEvents = function () {
        var b = this;
        !0 === b.options.dots && (a("li", b.$dots).on("click.slick", {
            message: "index"
        }, b.changeSlide), !0 === b.options.accessibility && b.$dots.on("keydown.slick", b.keyHandler)), !0 === b.options.dots && !0 === b.options.pauseOnDotsHover && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.initSlideEvents = function () {
        var b = this;
        b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
    }, b.prototype.initializeEvents = function () {
        var b = this;
        b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), !0 === b.options.accessibility && b.$list.on("keydown.slick", b.keyHandler), !0 === b.options.focusOnSelect && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(b.setPosition)
    }, b.prototype.initUI = function () {
        var a = this;
        !0 === a.options.arrows && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), !0 === a.options.dots && a.slideCount > a.options.slidesToShow && a.$dots.show()
    }, b.prototype.keyHandler = function (a) {
        var b = this;
        a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && !0 === b.options.accessibility ? b.changeSlide({
            data: {
                message: !0 === b.options.rtl ? "next" : "previous"
            }
        }) : 39 === a.keyCode && !0 === b.options.accessibility && b.changeSlide({
            data: {
                message: !0 === b.options.rtl ? "previous" : "next"
            }
        }))
    }, b.prototype.lazyLoad = function () {
        function b(b) {
            a("img[data-lazy]", b).each(function () {
                var b = a(this),
                    c = a(this).attr("data-lazy"),
                    d = a(this).attr("data-srcset"),
                    e = a(this).attr("data-sizes") || g.$slider.attr("data-sizes"),
                    f = document.createElement("img");
                f.onload = function () {
                    b.animate({
                        opacity: 0
                    }, 100, function () {
                        d && (b.attr("srcset", d), e && b.attr("sizes", e)), b.attr("src", c).animate({
                            opacity: 1
                        }, 200, function () {
                            b.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                        }), g.$slider.trigger("lazyLoaded", [g, b, c])
                    })
                }, f.onerror = function () {
                    b.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), g.$slider.trigger("lazyLoadError", [g, b, c])
                }, f.src = c
            })
        }
        var c, d, e, f, g = this;
        if (!0 === g.options.centerMode ? !0 === g.options.infinite ? (e = g.currentSlide + (g.options.slidesToShow / 2 + 1), f = e + g.options.slidesToShow + 2) : (e = Math.max(0, g.currentSlide - (g.options.slidesToShow / 2 + 1)), f = g.options.slidesToShow / 2 + 1 + 2 + g.currentSlide) : (e = g.options.infinite ? g.options.slidesToShow + g.currentSlide : g.currentSlide, f = Math.ceil(e + g.options.slidesToShow), !0 === g.options.fade && (e > 0 && e--, f <= g.slideCount && f++)), c = g.$slider.find(".slick-slide").slice(e, f), "anticipated" === g.options.lazyLoad)
            for (var h = e - 1, i = f, j = g.$slider.find(".slick-slide"), k = 0; k < g.options.slidesToScroll; k++) h < 0 && (h = g.slideCount - 1), c = c.add(j.eq(h)), c = c.add(j.eq(i)), h--, i++;
        b(c), g.slideCount <= g.options.slidesToShow ? (d = g.$slider.find(".slick-slide"), b(d)) : g.currentSlide >= g.slideCount - g.options.slidesToShow ? (d = g.$slider.find(".slick-cloned").slice(0, g.options.slidesToShow), b(d)) : 0 === g.currentSlide && (d = g.$slider.find(".slick-cloned").slice(-1 * g.options.slidesToShow), b(d))
    }, b.prototype.loadSlider = function () {
        var a = this;
        a.setPosition(), a.$slideTrack.css({
            opacity: 1
        }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.next = b.prototype.slickNext = function () {
        this.changeSlide({
            data: {
                message: "next"
            }
        })
    }, b.prototype.orientationChange = function () {
        var a = this;
        a.checkResponsive(), a.setPosition()
    }, b.prototype.pause = b.prototype.slickPause = function () {
        var a = this;
        a.autoPlayClear(), a.paused = !0
    }, b.prototype.play = b.prototype.slickPlay = function () {
        var a = this;
        a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
    }, b.prototype.postSlide = function (b) {
        var c = this;
        if (!c.unslicked && (c.$slider.trigger("afterChange", [c, b]), c.animating = !1, c.slideCount > c.options.slidesToShow && c.setPosition(), c.swipeLeft = null, c.options.autoplay && c.autoPlay(), !0 === c.options.accessibility && (c.initADA(), c.options.focusOnChange))) {
            a(c.$slides.get(c.currentSlide)).attr("tabindex", 0).focus()
        }
    }, b.prototype.prev = b.prototype.slickPrev = function () {
        this.changeSlide({
            data: {
                message: "previous"
            }
        })
    }, b.prototype.preventDefault = function (a) {
        a.preventDefault()
    }, b.prototype.progressiveLazyLoad = function (b) {
        b = b || 1;
        var c, d, e, f, g, h = this,
            i = a("img[data-lazy]", h.$slider);
        i.length ? (c = i.first(), d = c.attr("data-lazy"), e = c.attr("data-srcset"), f = c.attr("data-sizes") || h.$slider.attr("data-sizes"), g = document.createElement("img"), g.onload = function () {
            e && (c.attr("srcset", e), f && c.attr("sizes", f)), c.attr("src", d).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), !0 === h.options.adaptiveHeight && h.setPosition(), h.$slider.trigger("lazyLoaded", [h, c, d]), h.progressiveLazyLoad()
        }, g.onerror = function () {
            b < 3 ? setTimeout(function () {
                h.progressiveLazyLoad(b + 1)
            }, 500) : (c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), h.$slider.trigger("lazyLoadError", [h, c, d]), h.progressiveLazyLoad())
        }, g.src = d) : h.$slider.trigger("allImagesLoaded", [h])
    }, b.prototype.refresh = function (b) {
        var c, d, e = this;
        d = e.slideCount - e.options.slidesToShow, !e.options.infinite && e.currentSlide > d && (e.currentSlide = d), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), c = e.currentSlide, e.destroy(!0), a.extend(e, e.initials, {
            currentSlide: c
        }), e.init(), b || e.changeSlide({
            data: {
                message: "index",
                index: c
            }
        }, !1)
    }, b.prototype.registerBreakpoints = function () {
        var b, c, d, e = this,
            f = e.options.responsive || null;
        if ("array" === a.type(f) && f.length) {
            e.respondTo = e.options.respondTo || "window";
            for (b in f)
                if (d = e.breakpoints.length - 1, f.hasOwnProperty(b)) {
                    for (c = f[b].breakpoint; d >= 0;) e.breakpoints[d] && e.breakpoints[d] === c && e.breakpoints.splice(d, 1), d--;
                    e.breakpoints.push(c), e.breakpointSettings[c] = f[b].settings
                } e.breakpoints.sort(function (a, b) {
                return e.options.mobileFirst ? a - b : b - a
            })
        }
    }, b.prototype.reinit = function () {
        var b = this;
        b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), !0 === b.options.focusOnSelect && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
    }, b.prototype.resize = function () {
        var b = this;
        a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () {
            b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
        }, 50))
    }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) {
        var d = this;
        if ("boolean" == typeof a ? (b = a, a = !0 === b ? 0 : d.slideCount - 1) : a = !0 === b ? --a : a, d.slideCount < 1 || a < 0 || a > d.slideCount - 1) return !1;
        d.unload(), !0 === c ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, d.reinit()
    }, b.prototype.setCSS = function (a) {
        var b, c, d = this,
            e = {};
        !0 === d.options.rtl && (a = -a), b = "left" == d.positionProp ? Math.ceil(a) + "px" : "0px", c = "top" == d.positionProp ? Math.ceil(a) + "px" : "0px", e[d.positionProp] = a, !1 === d.transformsEnabled ? d.$slideTrack.css(e) : (e = {}, !1 === d.cssTransitions ? (e[d.animType] = "translate(" + b + ", " + c + ")", d.$slideTrack.css(e)) : (e[d.animType] = "translate3d(" + b + ", " + c + ", 0px)", d.$slideTrack.css(e)))
    }, b.prototype.setDimensions = function () {
        var a = this;
        !1 === a.options.vertical ? !0 === a.options.centerMode && a.$list.css({
            padding: "0px " + a.options.centerPadding
        }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), !0 === a.options.centerMode && a.$list.css({
            padding: a.options.centerPadding + " 0px"
        })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), !1 === a.options.vertical && !1 === a.options.variableWidth ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : !0 === a.options.variableWidth ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
        var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
        !1 === a.options.variableWidth && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }, b.prototype.setFade = function () {
        var b, c = this;
        c.$slides.each(function (d, e) {
            b = c.slideWidth * d * -1, !0 === c.options.rtl ? a(e).css({
                position: "relative",
                right: b,
                top: 0,
                zIndex: c.options.zIndex - 2,
                opacity: 0
            }) : a(e).css({
                position: "relative",
                left: b,
                top: 0,
                zIndex: c.options.zIndex - 2,
                opacity: 0
            })
        }), c.$slides.eq(c.currentSlide).css({
            zIndex: c.options.zIndex - 1,
            opacity: 1
        })
    }, b.prototype.setHeight = function () {
        var a = this;
        if (1 === a.options.slidesToShow && !0 === a.options.adaptiveHeight && !1 === a.options.vertical) {
            var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
            a.$list.css("height", b)
        }
    }, b.prototype.setOption = b.prototype.slickSetOption = function () {
        var b, c, d, e, f, g = this,
            h = !1;
        if ("object" === a.type(arguments[0]) ? (d = arguments[0], h = arguments[1], f = "multiple") : "string" === a.type(arguments[0]) && (d = arguments[0], e = arguments[1], h = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? f = "responsive" : void 0 !== arguments[1] && (f = "single")), "single" === f) g.options[d] = e;
        else if ("multiple" === f) a.each(d, function (a, b) {
            g.options[a] = b
        });
        else if ("responsive" === f)
            for (c in e)
                if ("array" !== a.type(g.options.responsive)) g.options.responsive = [e[c]];
                else {
                    for (b = g.options.responsive.length - 1; b >= 0;) g.options.responsive[b].breakpoint === e[c].breakpoint && g.options.responsive.splice(b, 1), b--;
                    g.options.responsive.push(e[c])
                } h && (g.unload(), g.reinit())
    }, b.prototype.setPosition = function () {
        var a = this;
        a.setDimensions(), a.setHeight(), !1 === a.options.fade ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
    }, b.prototype.setProps = function () {
        var a = this,
            b = document.body.style;
        a.positionProp = !0 === a.options.vertical ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), void 0 === b.WebkitTransition && void 0 === b.MozTransition && void 0 === b.msTransition || !0 === a.options.useCSS && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && !1 !== a.animType && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && !1 !== a.animType
    }, b.prototype.setSlideClasses = function (a) {
        var b, c, d, e, f = this;
        if (c = f.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), f.$slides.eq(a).addClass("slick-current"), !0 === f.options.centerMode) {
            var g = f.options.slidesToShow % 2 == 0 ? 1 : 0;
            b = Math.floor(f.options.slidesToShow / 2), !0 === f.options.infinite && (a >= b && a <= f.slideCount - 1 - b ? f.$slides.slice(a - b + g, a + b + 1).addClass("slick-active").attr("aria-hidden", "false") : (d = f.options.slidesToShow + a, c.slice(d - b + 1 + g, d + b + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? c.eq(c.length - 1 - f.options.slidesToShow).addClass("slick-center") : a === f.slideCount - 1 && c.eq(f.options.slidesToShow).addClass("slick-center")), f.$slides.eq(a).addClass("slick-center")
        } else a >= 0 && a <= f.slideCount - f.options.slidesToShow ? f.$slides.slice(a, a + f.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : c.length <= f.options.slidesToShow ? c.addClass("slick-active").attr("aria-hidden", "false") : (e = f.slideCount % f.options.slidesToShow, d = !0 === f.options.infinite ? f.options.slidesToShow + a : a, f.options.slidesToShow == f.options.slidesToScroll && f.slideCount - a < f.options.slidesToShow ? c.slice(d - (f.options.slidesToShow - e), d + e).addClass("slick-active").attr("aria-hidden", "false") : c.slice(d, d + f.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== f.options.lazyLoad && "anticipated" !== f.options.lazyLoad || f.lazyLoad()
    }, b.prototype.setupInfinite = function () {
        var b, c, d, e = this;
        if (!0 === e.options.fade && (e.options.centerMode = !1), !0 === e.options.infinite && !1 === e.options.fade && (c = null, e.slideCount > e.options.slidesToShow)) {
            for (d = !0 === e.options.centerMode ? e.options.slidesToShow + 1 : e.options.slidesToShow, b = e.slideCount; b > e.slideCount - d; b -= 1) c = b - 1, a(e.$slides[c]).clone(!0).attr("id", "").attr("data-slick-index", c - e.slideCount).prependTo(e.$slideTrack).addClass("slick-cloned");
            for (b = 0; b < d + e.slideCount; b += 1) c = b, a(e.$slides[c]).clone(!0).attr("id", "").attr("data-slick-index", c + e.slideCount).appendTo(e.$slideTrack).addClass("slick-cloned");
            e.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                a(this).attr("id", "")
            })
        }
    }, b.prototype.interrupt = function (a) {
        var b = this;
        a || b.autoPlay(), b.interrupted = a
    }, b.prototype.selectHandler = function (b) {
        var c = this,
            d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
            e = parseInt(d.attr("data-slick-index"));
        if (e || (e = 0), c.slideCount <= c.options.slidesToShow) return void c.slideHandler(e, !1, !0);
        c.slideHandler(e)
    }, b.prototype.slideHandler = function (a, b, c) {
        var d, e, f, g, h, i = null,
            j = this;
        if (b = b || !1, !(!0 === j.animating && !0 === j.options.waitForAnimate || !0 === j.options.fade && j.currentSlide === a)) {
            if (!1 === b && j.asNavFor(a), d = a, i = j.getLeft(d), g = j.getLeft(j.currentSlide), j.currentLeft = null === j.swipeLeft ? g : j.swipeLeft, !1 === j.options.infinite && !1 === j.options.centerMode && (a < 0 || a > j.getDotCount() * j.options.slidesToScroll)) return void(!1 === j.options.fade && (d = j.currentSlide, !0 !== c ? j.animateSlide(g, function () {
                j.postSlide(d)
            }) : j.postSlide(d)));
            if (!1 === j.options.infinite && !0 === j.options.centerMode && (a < 0 || a > j.slideCount - j.options.slidesToScroll)) return void(!1 === j.options.fade && (d = j.currentSlide, !0 !== c ? j.animateSlide(g, function () {
                j.postSlide(d)
            }) : j.postSlide(d)));
            if (j.options.autoplay && clearInterval(j.autoPlayTimer), e = d < 0 ? j.slideCount % j.options.slidesToScroll != 0 ? j.slideCount - j.slideCount % j.options.slidesToScroll : j.slideCount + d : d >= j.slideCount ? j.slideCount % j.options.slidesToScroll != 0 ? 0 : d - j.slideCount : d, j.animating = !0, j.$slider.trigger("beforeChange", [j, j.currentSlide, e]), f = j.currentSlide, j.currentSlide = e, j.setSlideClasses(j.currentSlide), j.options.asNavFor && (h = j.getNavTarget(), h = h.slick("getSlick"), h.slideCount <= h.options.slidesToShow && h.setSlideClasses(j.currentSlide)), j.updateDots(), j.updateArrows(), !0 === j.options.fade) return !0 !== c ? (j.fadeSlideOut(f), j.fadeSlide(e, function () {
                j.postSlide(e)
            })) : j.postSlide(e), void j.animateHeight();
            !0 !== c ? j.animateSlide(i, function () {
                j.postSlide(e)
            }) : j.postSlide(e)
        }
    }, b.prototype.startLoad = function () {
        var a = this;
        !0 === a.options.arrows && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), !0 === a.options.dots && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function () {
        var a, b, c, d, e = this;
        return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), d < 0 && (d = 360 - Math.abs(d)), d <= 45 && d >= 0 ? !1 === e.options.rtl ? "left" : "right" : d <= 360 && d >= 315 ? !1 === e.options.rtl ? "left" : "right" : d >= 135 && d <= 225 ? !1 === e.options.rtl ? "right" : "left" : !0 === e.options.verticalSwiping ? d >= 35 && d <= 135 ? "down" : "up" : "vertical"
    }, b.prototype.swipeEnd = function (a) {
        var b, c, d = this;
        if (d.dragging = !1, d.swiping = !1, d.scrolling) return d.scrolling = !1, !1;
        if (d.interrupted = !1, d.shouldClick = !(d.touchObject.swipeLength > 10), void 0 === d.touchObject.curX) return !1;
        if (!0 === d.touchObject.edgeHit && d.$slider.trigger("edge", [d, d.swipeDirection()]), d.touchObject.swipeLength >= d.touchObject.minSwipe) {
            switch (c = d.swipeDirection()) {
                case "left":
                case "down":
                    b = d.options.swipeToSlide ? d.checkNavigable(d.currentSlide + d.getSlideCount()) : d.currentSlide + d.getSlideCount(), d.currentDirection = 0;
                    break;
                case "right":
                case "up":
                    b = d.options.swipeToSlide ? d.checkNavigable(d.currentSlide - d.getSlideCount()) : d.currentSlide - d.getSlideCount(), d.currentDirection = 1
            }
            "vertical" != c && (d.slideHandler(b), d.touchObject = {}, d.$slider.trigger("swipe", [d, c]))
        } else d.touchObject.startX !== d.touchObject.curX && (d.slideHandler(d.currentSlide), d.touchObject = {})
    }, b.prototype.swipeHandler = function (a) {
        var b = this;
        if (!(!1 === b.options.swipe || "ontouchend" in document && !1 === b.options.swipe || !1 === b.options.draggable && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, !0 === b.options.verticalSwiping && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
            case "start":
                b.swipeStart(a);
                break;
            case "move":
                b.swipeMove(a);
                break;
            case "end":
                b.swipeEnd(a)
        }
    }, b.prototype.swipeMove = function (a) {
        var b, c, d, e, f, g, h = this;
        return f = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !(!h.dragging || h.scrolling || f && 1 !== f.length) && (b = h.getLeft(h.currentSlide), h.touchObject.curX = void 0 !== f ? f[0].pageX : a.clientX, h.touchObject.curY = void 0 !== f ? f[0].pageY : a.clientY, h.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(h.touchObject.curX - h.touchObject.startX, 2))), g = Math.round(Math.sqrt(Math.pow(h.touchObject.curY - h.touchObject.startY, 2))), !h.options.verticalSwiping && !h.swiping && g > 4 ? (h.scrolling = !0, !1) : (!0 === h.options.verticalSwiping && (h.touchObject.swipeLength = g), c = h.swipeDirection(), void 0 !== a.originalEvent && h.touchObject.swipeLength > 4 && (h.swiping = !0, a.preventDefault()), e = (!1 === h.options.rtl ? 1 : -1) * (h.touchObject.curX > h.touchObject.startX ? 1 : -1), !0 === h.options.verticalSwiping && (e = h.touchObject.curY > h.touchObject.startY ? 1 : -1), d = h.touchObject.swipeLength, h.touchObject.edgeHit = !1, !1 === h.options.infinite && (0 === h.currentSlide && "right" === c || h.currentSlide >= h.getDotCount() && "left" === c) && (d = h.touchObject.swipeLength * h.options.edgeFriction, h.touchObject.edgeHit = !0), !1 === h.options.vertical ? h.swipeLeft = b + d * e : h.swipeLeft = b + d * (h.$list.height() / h.listWidth) * e, !0 === h.options.verticalSwiping && (h.swipeLeft = b + d * e), !0 !== h.options.fade && !1 !== h.options.touchMove && (!0 === h.animating ? (h.swipeLeft = null, !1) : void h.setCSS(h.swipeLeft))))
    }, b.prototype.swipeStart = function (a) {
        var b, c = this;
        if (c.interrupted = !0, 1 !== c.touchObject.fingerCount || c.slideCount <= c.options.slidesToShow) return c.touchObject = {}, !1;
        void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (b = a.originalEvent.touches[0]), c.touchObject.startX = c.touchObject.curX = void 0 !== b ? b.pageX : a.clientX, c.touchObject.startY = c.touchObject.curY = void 0 !== b ? b.pageY : a.clientY, c.dragging = !0
    }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () {
        var a = this;
        null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function () {
        var b = this;
        a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, b.prototype.unslick = function (a) {
        var b = this;
        b.$slider.trigger("unslick", [b, a]), b.destroy()
    }, b.prototype.updateArrows = function () {
        var a = this;
        Math.floor(a.options.slidesToShow / 2), !0 === a.options.arrows && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && !1 === a.options.centerMode ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && !0 === a.options.centerMode && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, b.prototype.updateDots = function () {
        var a = this;
        null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").end(), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active"))
    }, b.prototype.visibility = function () {
        var a = this;
        a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
    }, a.fn.slick = function () {
        var a, c, d = this,
            e = arguments[0],
            f = Array.prototype.slice.call(arguments, 1),
            g = d.length;
        for (a = 0; a < g; a++)
            if ("object" == typeof e || void 0 === e ? d[a].slick = new b(d[a], e) : c = d[a].slick[e].apply(d[a].slick, f), void 0 !== c) return c;
        return d
    }
}), setInterval(updateTimer, 1e3), setInterval(updateTimer2, 1e3), $(".black-week-2017-calendar").css("margin-top", "8px"), $("#black-week-mailing").validate({
    rules: {
        firstName: {
            required: !0,
            minlength: 3
        },
        email: {
            required: !0
        }
    },
    messages: {
        firstName: {
            required: "Por favor, informe seu nome",
            minlength: "O nome deve ter pelo menos 3 caracteres"
        },
        email: {
            required: "Ã‰ necessÃ¡rio informar um email"
        },
        mensagem: {
            required: "A mensagem nÃ£o pode ficar em branco"
        }
    },
    submitHandler: function (a) {
        sendClientBF()
    }
}), $(".slider-banner-produto h2").remove(), $(".slider-banner-produto").slick({
    autoplay: !0,
    dots: !0,
    infinite: !0,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: !0,
    slide: "ul"
}), $(window).width() < 455 && slick_Categories_BlackWeek(window.innerWidth < 455 ? "mobile" : "normal"), window.addEventListener("resize", function () {
    slick_Categories_BlackWeek(window.innerWidth < 455 ? "mobile" : "normal")
}), $(window).width() < 455 && slick_Features_BlackWeek(window.innerWidth < 455 ? "mobile" : "normal"), window.addEventListener("resize", function () {
    slick_Features_BlackWeek(window.innerWidth < 455 ? "mobile" : "normal")
}), $(".black-week-2017-brands-list").slick({
    autoplay: !0,
    infinite: !0,
    arrows: !0,
    dots: !0,
    slidesToShow: 6,
    slidesToScroll: 2,
    slide: "li",
    responsive: [{
        breakpoint: 1920,
        settings: {
            slidesToShow: 6,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 1600,
        settings: {
            slidesToShow: 6,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 1440,
        settings: {
            slidesToShow: 6,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 455,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 2
        }
    }]
}), $(".black-week-2017-prateleira .prateleira").slick({
    autoplay: !0,
    infinite: !0,
    arrows: !0,
    dots: !0,
    slidesToShow: 5,
    slidesToScroll: 2,
    slide: "ul",
    responsive: [{
        breakpoint: 1920,
        settings: {
            slidesToShow: 5,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 1600,
        settings: {
            slidesToShow: 5,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 1440,
        settings: {
            slidesToShow: 5,
            slidesToScroll: 2
        }
    }, {
        breakpoint: 455,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
    }]
});