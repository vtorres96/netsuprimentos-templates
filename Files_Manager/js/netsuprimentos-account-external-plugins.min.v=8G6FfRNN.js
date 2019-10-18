;
! function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery)
}(function (e) {
    var t, n = navigator.userAgent,
        a = /iphone/i.test(n),
        i = /chrome/i.test(n),
        r = /android/i.test(n);
    e.mask = {
        definitions: {
            9: "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, e.fn.extend({
        caret: function (e, t) {
            var n;
            return 0 === this.length || this.is(":hidden") ? void 0 : "number" == typeof e ? (t = "number" == typeof t ? t : e, this.each(function () {
                this.setSelectionRange ? this.setSelectionRange(e, t) : this.createTextRange && (n = this.createTextRange(), n.collapse(!0), n.moveEnd("character", t), n.moveStart("character", e), n.select())
            })) : (this[0].setSelectionRange ? (e = this[0].selectionStart, t = this[0].selectionEnd) : document.selection && document.selection.createRange && (n = document.selection.createRange(), e = 0 - n.duplicate().moveStart("character", -1e5), t = e + n.text.length), {
                begin: e,
                end: t
            })
        },
        unmask: function () {
            return this.trigger("unmask")
        },
        mask: function (n, o) {
            var c, l, u, f, s, h, g, d;
            if (!n && this.length > 0) {
                c = e(this[0]);
                var m = c.data(e.mask.dataName);
                return m ? m() : void 0
            }
            return o = e.extend({
                autoclear: e.mask.autoclear,
                placeholder: e.mask.placeholder,
                completed: null
            }, o), l = e.mask.definitions, u = [], f = g = n.length, s = null, e.each(n.split(""), function (e, t) {
                "?" == t ? (g--, f = e) : l[t] ? (u.push(new RegExp(l[t])), null === s && (s = u.length - 1), f > e && (h = u.length - 1)) : u.push(null)
            }), this.trigger("unmask").each(function () {
                function c() {
                    if (o.completed) {
                        for (var e = s; h >= e; e++)
                            if (u[e] && C[e] === m(e)) return;
                        o.completed.call(w)
                    }
                }

                function m(e) {
                    return o.placeholder.charAt(e < o.placeholder.length ? e : 0)
                }

                function p(e) {
                    for (; ++e < g && !u[e];);
                    return e
                }

                function v(e) {
                    for (; --e >= 0 && !u[e];);
                    return e
                }

                function b(e, t) {
                    var n, a;
                    if (!(0 > e)) {
                        for (n = e, a = p(t); g > n; n++)
                            if (u[n]) {
                                if (!(g > a && u[n].test(C[a]))) break;
                                C[n] = C[a], C[a] = m(a), a = p(a)
                            } A(), w.caret(Math.max(s, e))
                    }
                }

                function k(e) {
                    var t, n, a, i;
                    for (t = e, n = m(e); g > t; t++)
                        if (u[t]) {
                            if (a = p(t), i = C[t], C[t] = n, !(g > a && u[a].test(i))) break;
                            n = i
                        }
                }

                function y() {
                    var e = w.val(),
                        t = w.caret();
                    if (e.length < d.length) {
                        for (T(!0); t.begin > 0 && !u[t.begin - 1];) t.begin--;
                        if (0 === t.begin)
                            for (; t.begin < s && !u[t.begin];) t.begin++;
                        w.caret(t.begin, t.begin)
                    } else {
                        for (T(!0); t.begin < g && !u[t.begin];) t.begin++;
                        w.caret(t.begin, t.begin)
                    }
                    c()
                }

                function x() {
                    T(), w.val() != N && w.change()
                }

                function j(e) {
                    if (!w.prop("readonly")) {
                        var t, n, i, r = e.which || e.keyCode;
                        d = w.val(), 8 === r || 46 === r || a && 127 === r ? (t = w.caret(), n = t.begin, i = t.end, i - n === 0 && (n = 46 !== r ? v(n) : i = p(n - 1), i = 46 === r ? p(i) : i), S(n, i), b(n, i - 1), e.preventDefault()) : 13 === r ? x.call(this, e) : 27 === r && (w.val(N), w.caret(0, T()), e.preventDefault())
                    }
                }

                function R(t) {
                    if (!w.prop("readonly")) {
                        var n, a, i, o = t.which || t.keyCode,
                            l = w.caret();
                        if (!(t.ctrlKey || t.altKey || t.metaKey || 32 > o) && o && 13 !== o) {
                            if (l.end - l.begin !== 0 && (S(l.begin, l.end), b(l.begin, l.end - 1)), n = p(l.begin - 1), g > n && (a = String.fromCharCode(o), u[n].test(a))) {
                                if (k(n), C[n] = a, A(), i = p(n), r) {
                                    var f = function () {
                                        e.proxy(e.fn.caret, w, i)()
                                    };
                                    setTimeout(f, 0)
                                } else w.caret(i);
                                l.begin <= h && c()
                            }
                            t.preventDefault()
                        }
                    }
                }

                function S(e, t) {
                    var n;
                    for (n = e; t > n && g > n; n++) u[n] && (C[n] = m(n))
                }

                function A() {
                    w.val(C.join(""))
                }

                function T(e) {
                    var t, n, a, i = w.val(),
                        r = -1;
                    for (t = 0, a = 0; g > t; t++)
                        if (u[t]) {
                            for (C[t] = m(t); a++ < i.length;)
                                if (n = i.charAt(a - 1), u[t].test(n)) {
                                    C[t] = n, r = t;
                                    break
                                } if (a > i.length) {
                                S(t + 1, g);
                                break
                            }
                        } else C[t] === i.charAt(a) && a++, f > t && (r = t);
                    return e ? A() : f > r + 1 ? o.autoclear || C.join("") === D ? (w.val() && w.val(""), S(0, g)) : A() : (A(), w.val(w.val().substring(0, r + 1))), f ? t : s
                }
                var w = e(this),
                    C = e.map(n.split(""), function (e, t) {
                        return "?" != e ? l[e] ? m(t) : e : void 0
                    }),
                    D = C.join(""),
                    N = w.val();
                w.data(e.mask.dataName, function () {
                    return e.map(C, function (e, t) {
                        return u[t] && e != m(t) ? e : null
                    }).join("")
                }), w.one("unmask", function () {
                    w.off(".mask").removeData(e.mask.dataName)
                }).on("focus.mask", function () {
                    if (!w.prop("readonly")) {
                        clearTimeout(t);
                        var e;
                        N = w.val(), e = T(), t = setTimeout(function () {
                            A(), e == n.replace("?", "").length ? w.caret(0, e) : w.caret(e)
                        }, 10)
                    }
                }).on("blur.mask", x).on("keydown.mask", j).on("keypress.mask", R).on("input.mask paste.mask", function () {
                    w.prop("readonly") || setTimeout(function () {
                        var e = T(!0);
                        w.caret(e), c()
                    }, 0)
                }), i && r && w.off("input.mask").on("input.mask", y), T()
            })
        }
    })
});
! function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && module.exports ? module.exports = e(require("jquery")) : e(jQuery)
}(function (e) {
    e.extend(e.fn, {
        validate: function (t) {
            if (!this.length) return void(t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var i = e.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new e.validator(t, this[0]), e.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function (t) {
                i.settings.submitHandler && (i.submitButton = t.target), e(this).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== e(this).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.on("submit.validate", function (t) {
                function n() {
                    var n, s;
                    return i.settings.submitHandler ? (i.submitButton && (n = e("<input type='hidden'/>").attr("name", i.submitButton.name).val(e(i.submitButton).val()).appendTo(i.currentForm)), s = i.settings.submitHandler.call(i, i.currentForm, t), i.submitButton && n.remove(), void 0 !== s ? s : !1) : !0
                }
                return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, n()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : n() : (i.focusInvalid(), !1)
            })), i)
        },
        valid: function () {
            var t, i, n;
            return e(this[0]).is("form") ? t = this.validate().form() : (n = [], t = !0, i = e(this[0].form).validate(), this.each(function () {
                t = i.element(this) && t, t || (n = n.concat(i.errorList))
            }), i.errorList = n), t
        },
        rules: function (t, i) {
            if (this.length) {
                var n, s, r, a, o, l, u = this[0];
                if (t) switch (n = e.data(u.form, "validator").settings, s = n.rules, r = e.validator.staticRules(u), t) {
                    case "add":
                        e.extend(r, e.validator.normalizeRule(i)), delete r.messages, s[u.name] = r, i.messages && (n.messages[u.name] = e.extend(n.messages[u.name], i.messages));
                        break;
                    case "remove":
                        return i ? (l = {}, e.each(i.split(/\s/), function (t, i) {
                            l[i] = r[i], delete r[i], "required" === i && e(u).removeAttr("aria-required")
                        }), l) : (delete s[u.name], r)
                }
                return a = e.validator.normalizeRules(e.extend({}, e.validator.classRules(u), e.validator.attributeRules(u), e.validator.dataRules(u), e.validator.staticRules(u)), u), a.required && (o = a.required, delete a.required, a = e.extend({
                    required: o
                }, a), e(u).attr("aria-required", "true")), a.remote && (o = a.remote, delete a.remote, a = e.extend(a, {
                    remote: o
                })), a
            }
        }
    }), e.extend(e.expr[":"], {
        blank: function (t) {
            return !e.trim("" + e(t).val())
        },
        filled: function (t) {
            var i = e(t).val();
            return null !== i && !!e.trim("" + i)
        },
        unchecked: function (t) {
            return !e(t).prop("checked")
        }
    }), e.validator = function (t, i) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = i, this.init()
    }, e.validator.format = function (t, i) {
        return 1 === arguments.length ? function () {
            var i = e.makeArray(arguments);
            return i.unshift(t), e.validator.format.apply(this, i)
        } : void 0 === i ? t : (arguments.length > 2 && i.constructor !== Array && (i = e.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), e.each(i, function (e, i) {
            t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function () {
                return i
            })
        }), t)
    }, e.extend(e.validator, {
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
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (e) {
                this.lastActive = e, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(e)))
            },
            onfocusout: function (e) {
                this.checkable(e) || !(e.name in this.submitted) && this.optional(e) || this.element(e)
            },
            onkeyup: function (t, i) {
                var n = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === i.which && "" === this.elementValue(t) || -1 !== e.inArray(i.keyCode, n) || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
            },
            onclick: function (e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function (t, i, n) {
                "radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(n) : e(t).addClass(i).removeClass(n)
            },
            unhighlight: function (t, i, n) {
                "radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(n) : e(t).removeClass(i).addClass(n)
            }
        },
        setDefaults: function (t) {
            e.extend(e.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            equalTo: "Please enter the same value again.",
            maxlength: e.validator.format("Please enter no more than {0} characters."),
            minlength: e.validator.format("Please enter at least {0} characters."),
            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
            range: e.validator.format("Please enter a value between {0} and {1}."),
            max: e.validator.format("Please enter a value less than or equal to {0}."),
            min: e.validator.format("Please enter a value greater than or equal to {0}."),
            step: e.validator.format("Please enter a multiple of {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function t(t) {
                    var i = e.data(this.form, "validator"),
                        n = "on" + t.type.replace(/^validate/, ""),
                        s = i.settings;
                    s[n] && !e(this).is(s.ignore) && s[n].call(i, this, t)
                }
                this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var i, n = this.groups = {};
                e.each(this.settings.groups, function (t, i) {
                    "string" == typeof i && (i = i.split(/\s/)), e.each(i, function (e, i) {
                        n[i] = t
                    })
                }), i = this.settings.rules, e.each(i, function (t, n) {
                    i[t] = e.validator.normalizeRule(n)
                }), e(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t), this.settings.invalidHandler && e(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function () {
                return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function () {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++) this.check(t[e]);
                return this.valid()
            },
            element: function (t) {
                var i, n, s = this.clean(t),
                    r = this.validationTargetFor(s),
                    a = this,
                    o = !0;
                return void 0 === r ? delete this.invalid[s.name] : (this.prepareElement(r), this.currentElements = e(r), n = this.groups[r.name], n && e.each(this.groups, function (e, t) {
                    t === n && e !== r.name && (s = a.validationTargetFor(a.clean(a.findByName(e))), s && s.name in a.invalid && (a.currentElements.push(s), o = o && a.check(s)))
                }), i = this.check(r) !== !1, o = o && i, i ? this.invalid[r.name] = !1 : this.invalid[r.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e(t).attr("aria-invalid", !i)), o
            },
            showErrors: function (t) {
                if (t) {
                    var i = this;
                    e.extend(this.errorMap, t), this.errorList = e.map(this.errorMap, function (e, t) {
                        return {
                            message: e,
                            element: i.findByName(t)[0]
                        }
                    }), this.successList = e.grep(this.successList, function (e) {
                        return !(e.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function () {
                e.fn.resetForm && e(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
                var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                this.resetElements(t)
            },
            resetElements: function (e) {
                var t;
                if (this.settings.unhighlight)
                    for (t = 0; e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, ""), this.findByName(e[t].name).removeClass(this.settings.validClass);
                else e.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
            },
            numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            },
            objectLength: function (e) {
                var t, i = 0;
                for (t in e) e[t] && i++;
                return i
            },
            hideErrors: function () {
                this.hideThese(this.toHide)
            },
            hideThese: function (e) {
                e.not(this.containers).text(""), this.addWrapper(e).hide()
            },
            valid: function () {
                return 0 === this.size()
            },
            size: function () {
                return this.errorList.length
            },
            focusInvalid: function () {
                if (this.settings.focusInvalid) try {
                    e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (t) {}
            },
            findLastActive: function () {
                var t = this.lastActive;
                return t && 1 === e.grep(this.errorList, function (e) {
                    return e.element.name === t.name
                }).length && t
            },
            elements: function () {
                var t = this,
                    i = {};
                return e(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                    var n = this.name || e(this).attr("name");
                    return !n && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = e(this).closest("form")[0]), n in i || !t.objectLength(e(this).rules()) ? !1 : (i[n] = !0, !0)
                })
            },
            clean: function (t) {
                return e(t)[0]
            },
            errors: function () {
                var t = this.settings.errorClass.split(" ").join(".");
                return e(this.settings.errorElement + "." + t, this.errorContext)
            },
            resetInternals: function () {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([])
            },
            reset: function () {
                this.resetInternals(), this.currentElements = e([])
            },
            prepareForm: function () {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function (e) {
                this.reset(), this.toHide = this.errorsFor(e)
            },
            elementValue: function (t) {
                var i, n, s = e(t),
                    r = t.type;
                return "radio" === r || "checkbox" === r ? this.findByName(t.name).filter(":checked").val() : "number" === r && "undefined" != typeof t.validity ? t.validity.badInput ? "NaN" : s.val() : (i = t.hasAttribute("contenteditable") ? s.text() : s.val(), "file" === r ? "C:\\fakepath\\" === i.substr(0, 12) ? i.substr(12) : (n = i.lastIndexOf("/"), n >= 0 ? i.substr(n + 1) : (n = i.lastIndexOf("\\"), n >= 0 ? i.substr(n + 1) : i)) : "string" == typeof i ? i.replace(/\r/g, "") : i)
            },
            check: function (t) {
                t = this.validationTargetFor(this.clean(t));
                var i, n, s, r = e(t).rules(),
                    a = e.map(r, function (e, t) {
                        return t
                    }).length,
                    o = !1,
                    l = this.elementValue(t);
                if ("function" == typeof r.normalizer) {
                    if (l = r.normalizer.call(t, l), "string" != typeof l) throw new TypeError("The normalizer should return a string value.");
                    delete r.normalizer
                }
                for (n in r) {
                    s = {
                        method: n,
                        parameters: r[n]
                    };
                    try {
                        if (i = e.validator.methods[n].call(this, l, t, s.parameters), "dependency-mismatch" === i && 1 === a) {
                            o = !0;
                            continue
                        }
                        if (o = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!i) return this.formatAndAdd(t, s), !1
                    } catch (u) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + s.method + "' method.", u), u instanceof TypeError && (u.message += ".  Exception occurred when checking element " + t.id + ", check the '" + s.method + "' method."), u
                    }
                }
                return o ? void 0 : (this.objectLength(r) && this.successList.push(t), !0)
            },
            customDataMessage: function (t, i) {
                return e(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || e(t).data("msg")
            },
            customMessage: function (e, t) {
                var i = this.settings.messages[e];
                return i && (i.constructor === String ? i : i[t])
            },
            findDefined: function () {
                for (var e = 0; e < arguments.length; e++)
                    if (void 0 !== arguments[e]) return arguments[e]
            },
            defaultMessage: function (t, i) {
                var n = this.findDefined(this.customMessage(t.name, i.method), this.customDataMessage(t, i.method), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[i.method], "<strong>Warning: No message defined for " + t.name + "</strong>"),
                    s = /\$?\{(\d+)\}/g;
                return "function" == typeof n ? n = n.call(this, i.parameters, t) : s.test(n) && (n = e.validator.format(n.replace(s, "{$1}"), i.parameters)), n
            },
            formatAndAdd: function (e, t) {
                var i = this.defaultMessage(e, t);
                this.errorList.push({
                    message: i,
                    element: e,
                    method: t.method
                }), this.errorMap[e.name] = i, this.submitted[e.name] = i
            },
            addWrapper: function (e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
            },
            defaultShowErrors: function () {
                var e, t, i;
                for (e = 0; this.errorList[e]; e++) i = this.errorList[e], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (e = 0; this.successList[e]; e++) this.showLabel(this.successList[e]);
                if (this.settings.unhighlight)
                    for (e = 0, t = this.validElements(); t[e]; e++) this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function () {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function () {
                return e(this.errorList).map(function () {
                    return this.element
                })
            },
            showLabel: function (t, i) {
                var n, s, r, a, o = this.errorsFor(t),
                    l = this.idOrName(t),
                    u = e(t).attr("aria-describedby");
                o.length ? (o.removeClass(this.settings.validClass).addClass(this.settings.errorClass), o.html(i)) : (o = e("<" + this.settings.errorElement + ">").attr("id", l + "-error").addClass(this.settings.errorClass).html(i || ""), n = o, this.settings.wrapper && (n = o.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(n) : this.settings.errorPlacement ? this.settings.errorPlacement(n, e(t)) : n.insertAfter(t), o.is("label") ? o.attr("for", l) : 0 === o.parents("label[for='" + this.escapeCssMeta(l) + "']").length && (r = o.attr("id"), u ? u.match(new RegExp("\\b" + this.escapeCssMeta(r) + "\\b")) || (u += " " + r) : u = r, e(t).attr("aria-describedby", u), s = this.groups[t.name], s && (a = this, e.each(a.groups, function (t, i) {
                    i === s && e("[name='" + a.escapeCssMeta(t) + "']", a.currentForm).attr("aria-describedby", o.attr("id"))
                })))), !i && this.settings.success && (o.text(""), "string" == typeof this.settings.success ? o.addClass(this.settings.success) : this.settings.success(o, t)), this.toShow = this.toShow.add(o)
            },
            errorsFor: function (t) {
                var i = this.escapeCssMeta(this.idOrName(t)),
                    n = e(t).attr("aria-describedby"),
                    s = "label[for='" + i + "'], label[for='" + i + "'] *";
                return n && (s = s + ", #" + this.escapeCssMeta(n).replace(/\s+/g, ", #")), this.errors().filter(s)
            },
            escapeCssMeta: function (e) {
                return e.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
            },
            idOrName: function (e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            },
            validationTargetFor: function (t) {
                return this.checkable(t) && (t = this.findByName(t.name)), e(t).not(this.settings.ignore)[0]
            },
            checkable: function (e) {
                return /radio|checkbox/i.test(e.type)
            },
            findByName: function (t) {
                return e(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
            },
            getLength: function (t, i) {
                switch (i.nodeName.toLowerCase()) {
                    case "select":
                        return e("option:selected", i).length;
                    case "input":
                        if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
                }
                return t.length
            },
            depend: function (e, t) {
                return this.dependTypes[typeof e] ? this.dependTypes[typeof e](e, t) : !0
            },
            dependTypes: {
                "boolean": function (e) {
                    return e
                },
                string: function (t, i) {
                    return !!e(t, i.form).length
                },
                "function": function (e, t) {
                    return e(t)
                }
            },
            optional: function (t) {
                var i = this.elementValue(t);
                return !e.validator.methods.required.call(this, i, t) && "dependency-mismatch"
            },
            startRequest: function (t) {
                this.pending[t.name] || (this.pendingRequest++, e(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
            },
            stopRequest: function (t, i) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], e(t).removeClass(this.settings.pendingClass), i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            },
            previousValue: function (t, i) {
                return e.data(t, "previousValue") || e.data(t, "previousValue", {
                    old: null,
                    valid: !0,
                    message: this.defaultMessage(t, {
                        method: i
                    })
                })
            },
            destroy: function () {
                this.resetForm(), e(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
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
        addClassRules: function (t, i) {
            t.constructor === String ? this.classRuleSettings[t] = i : e.extend(this.classRuleSettings, t)
        },
        classRules: function (t) {
            var i = {},
                n = e(t).attr("class");
            return n && e.each(n.split(" "), function () {
                this in e.validator.classRuleSettings && e.extend(i, e.validator.classRuleSettings[this])
            }), i
        },
        normalizeAttributeRule: function (e, t, i, n) {
            /min|max|step/.test(i) && (null === t || /number|range|text/.test(t)) && (n = Number(n), isNaN(n) && (n = void 0)), n || 0 === n ? e[i] = n : t === i && "range" !== t && (e[i] = !0)
        },
        attributeRules: function (t) {
            var i, n, s = {},
                r = e(t),
                a = t.getAttribute("type");
            for (i in e.validator.methods) "required" === i ? (n = t.getAttribute(i), "" === n && (n = !0), n = !!n) : n = r.attr(i), this.normalizeAttributeRule(s, a, i, n);
            return s.maxlength && /-1|2147483647|524288/.test(s.maxlength) && delete s.maxlength, s
        },
        dataRules: function (t) {
            var i, n, s = {},
                r = e(t),
                a = t.getAttribute("type");
            for (i in e.validator.methods) n = r.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), this.normalizeAttributeRule(s, a, i, n);
            return s
        },
        staticRules: function (t) {
            var i = {},
                n = e.data(t.form, "validator");
            return n.settings.rules && (i = e.validator.normalizeRule(n.settings.rules[t.name]) || {}), i
        },
        normalizeRules: function (t, i) {
            return e.each(t, function (n, s) {
                if (s === !1) return void delete t[n];
                if (s.param || s.depends) {
                    var r = !0;
                    switch (typeof s.depends) {
                        case "string":
                            r = !!e(s.depends, i.form).length;
                            break;
                        case "function":
                            r = s.depends.call(i, i)
                    }
                    r ? t[n] = void 0 !== s.param ? s.param : !0 : (e.data(i.form, "validator").resetElements(e(i)), delete t[n])
                }
            }), e.each(t, function (n, s) {
                t[n] = e.isFunction(s) && "normalizer" !== n ? s(i) : s
            }), e.each(["minlength", "maxlength"], function () {
                t[this] && (t[this] = Number(t[this]))
            }), e.each(["rangelength", "range"], function () {
                var i;
                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
            }), e.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function (t) {
            if ("string" == typeof t) {
                var i = {};
                e.each(t.split(/\s/), function () {
                    i[this] = !0
                }), t = i
            }
            return t
        },
        addMethod: function (t, i, n) {
            e.validator.methods[t] = i, e.validator.messages[t] = void 0 !== n ? n : e.validator.messages[t], i.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
        },
        methods: {
            required: function (t, i, n) {
                if (!this.depend(n, i)) return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var s = e(i).val();
                    return s && s.length > 0
                }
                return this.checkable(i) ? this.getLength(t, i) > 0 : t.length > 0
            },
            email: function (e, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
            },
            url: function (e, t) {
                return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(e)
            },
            date: function (e, t) {
                return this.optional(t) || !/Invalid|NaN/.test(new Date(e).toString())
            },
            dateISO: function (e, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
            },
            number: function (e, t) {
                return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function (e, t) {
                return this.optional(t) || /^\d+$/.test(e)
            },
            minlength: function (t, i, n) {
                var s = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || s >= n
            },
            maxlength: function (t, i, n) {
                var s = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || n >= s
            },
            rangelength: function (t, i, n) {
                var s = e.isArray(t) ? t.length : this.getLength(t, i);
                return this.optional(i) || s >= n[0] && s <= n[1]
            },
            min: function (e, t, i) {
                return this.optional(t) || e >= i
            },
            max: function (e, t, i) {
                return this.optional(t) || i >= e
            },
            range: function (e, t, i) {
                return this.optional(t) || e >= i[0] && e <= i[1]
            },
            step: function (t, i, n) {
                var s = e(i).attr("type"),
                    r = "Step attribute on input type " + s + " is not supported.",
                    a = ["text", "number", "range"],
                    o = new RegExp("\\b" + s + "\\b"),
                    l = s && !o.test(a.join());
                if (l) throw new Error(r);
                return this.optional(i) || t % n === 0
            },
            equalTo: function (t, i, n) {
                var s = e(n);
                return this.settings.onfocusout && s.not(".validate-equalTo-blur").length && s.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function () {
                    e(i).valid()
                }), t === s.val()
            },
            remote: function (t, i, n, s) {
                if (this.optional(i)) return "dependency-mismatch";
                s = "string" == typeof s && s || "remote";
                var r, a, o, l = this.previousValue(i, s);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), l.originalMessage = l.originalMessage || this.settings.messages[i.name][s], this.settings.messages[i.name][s] = l.message, n = "string" == typeof n && {
                    url: n
                } || n, o = e.param(e.extend({
                    data: t
                }, n.data)), l.old === o ? l.valid : (l.old = o, r = this, this.startRequest(i), a = {}, a[i.name] = t, e.ajax(e.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: a,
                    context: r.currentForm,
                    success: function (e) {
                        var n, a, o, u = e === !0 || "true" === e;
                        r.settings.messages[i.name][s] = l.originalMessage, u ? (o = r.formSubmitted, r.resetInternals(), r.toHide = r.errorsFor(i), r.formSubmitted = o, r.successList.push(i), r.invalid[i.name] = !1, r.showErrors()) : (n = {}, a = e || r.defaultMessage(i, {
                            method: s,
                            parameters: t
                        }), n[i.name] = l.message = a, r.invalid[i.name] = !0, r.showErrors(n)), l.valid = u, r.stopRequest(i, u)
                    }
                }, n)), "pending")
            }
        }
    });
    var t, i = {};
    e.ajaxPrefilter ? e.ajaxPrefilter(function (e, t, n) {
        var s = e.port;
        "abort" === e.mode && (i[s] && i[s].abort(), i[s] = n)
    }) : (t = e.ajax, e.ajax = function (n) {
        var s = ("mode" in n ? n : e.ajaxSettings).mode,
            r = ("port" in n ? n : e.ajaxSettings).port;
        return "abort" === s ? (i[r] && i[r].abort(), i[r] = t.apply(this, arguments), i[r]) : t.apply(this, arguments)
    })
});