!(function(t) {
  var e = {};

  function n(o) {
    if (e[o]) return e[o].exports;
    var r = (e[o] = { i: o, l: !1, exports: {} });
    return t[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = t),
    (n.c = e),
    (n.d = function(t, e, o) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: o });
    }),
    (n.r = function(t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (n.t = function(t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var o = Object.create(null);
      if (
        (n.r(o),
        Object.defineProperty(o, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var r in t)
          n.d(
            o,
            r,
            function(e) {
              return t[e];
            }.bind(null, r)
          );
      return o;
    }),
    (n.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return n.d(e, "a", e), e;
    }),
    (n.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.p = ""),
    n((n.s = 1));
})([
  ,
  function(t, e, n) {
    "use strict";
    n.r(e);
    n(2);
    const o = {
      Methods: {
        init_default() {
          o.Methods.stuffs(),
            o.Methods.cartEmpty(),
            o.Methods.cartFixed(),
            o.Methods.paymentDeposit(),
            o.Methods.paymentDepositOnActive();
        },
        init_load() {
          o.Methods.paymentDeposit();
        },
        stuffs() {
          $("body")
            .find("#cart-choose-more-products")
            .attr("href", "/epis-e-seguranca");
        },
        getInformationProduct(t) {
          vtexjs.checkout.getOrderForm().done(e => {
            if (0 != e.items.length || null != e.items.length) {
              var n = e.items.map((t, e, n) => ({
                productName: t.name,
                productValue: t.sellingPrice,
                productImage: t.imageUrl,
                productId: t.id
              }));
              t(n);
            }
          });
        },
        cartEmpty() {
          const t = $(".ns-cta");
          o.Methods.getInformationProduct(e => {
            let n = e;
            0 != n.length && null != n.length ? t.show() : t.hide();
          }),
            $("body").on("click", ".item-remove .item-link-remove", function() {
              o.Methods.getInformationProduct(e => {
                let n = e;
                0 != n.length && null != n.length ? t.show() : t.hide();
              });
            });
        },
        cotation() {
          var t = $(".ns-cotation__form"),
            e = (t.find("#cotationName"), t.find("#cotationEmail")),
            n = t.find("#cotationPhone"),
            o = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          n.keyup(function() {
            var t = $(this)
              .val()
              .replace(/\D/g, "")
              .replace(/^0/, "");
            t.length > 10
              ? $(this).val(t.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3"))
              : t.length > 5
              ? $(this).val(
                  t.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3")
                )
              : t.length > 2
              ? $(this).val(t.replace(/^(\d\d)(\d{0,5})/, "($1) $2"))
              : $(this).val(t.replace(/^(\d*)/, "($1"));
          }),
            t.submit(function(t) {
              if (o.test(e.val()) && n.val().length >= 14) {
                n.hasClass("has--error") && n.removeClass("has--error"),
                  console.log("clickou");
                $.ajax({
                  type: "GET",
                  url:
                    "https://cdn.netsuprimentos.com.br/scripts/sendmail/sendmail_cotation.php",
                  crossDomain: !0,
                  async: !1,
                  data: {
                    name: "Teste",
                    sendTo: "wellington.rocha@netsuprimentos.com.br",
                    phone: "111111111"
                  },
                  success: function(t, e, n) {
                    console.log(t);
                  },
                  error: function(t, e, n) {
                    console.log(t);
                  }
                });
              } else !n.hasClass("has--error") && n.addClass("has--error");
              return !1;
            });
        },
        paymentDeposit() {
          $(".custom202PaymentGroupPaymentGroup .payment-description").html(
            '\n\t\t\tPague fazendo um depósito bancário no: \n\t\t\t<br>\n\t\t\t<strong style="font-size:18px;display: block;padding: 10px 0;">\n\t\t\t<i style="\n\t\t\tbackground: url(\'https://io.vtex.com.br/checkout-ui/5.16.7/img/sprite-debit-banks.png\'); \n\t\t\tbackground-position: -10px 50%;\n\t\t\tdisplay: inline-block;\n\t\t\tvertical-align: middle; \n\t\t\twidth: 50px; \n\t\t\theight: 50px; \n\t\t\tmargin-right: 5px;">\n\t\t\t</i> \n\t\t\tBanco ITAÚ (cod. 341)\n\t\t\t</strong>\n\t\t\tRazão Social: <strong>B2B WEB DISTRIBUICAO DE PRODUTOS LTDA</strong>\n\t\t\t<br>\n\t\t\tCNPJ: <strong class="label label-warning">19.812.763/0001-65</strong>\n\t\t\t<br>Agência: <strong class="label label-warning">7648</strong>\n\t\t\t<br>Conta-corrente: <strong class="label label-warning">22544-4</strong>\n\t\t\t<br>'
          );
        },
        paymentDepositOnActive() {
          const t = $(".pg-deposito-bancario");
          $("body").on("click", t, () => {
            o.Methods.paymentDeposit();
          });
        },
        cartFixed() {
          window.innerWidth > 768 &&
            $(window).scroll(function() {
              var t = $(window).scrollTop(),
                e = $(".orderform-template-holder").offset().top,
                n = $(".cart-fixed"),
                o = t + n.height(),
                r = $(".ns-footer").offset().top;
              t >= e && o + 30 <= r
                ? n.addClass("is--fixed")
                : n.removeClass("is--fixed"),
                o + 30 >= r && !n.hasClass("is--fixed")
                  ? n.addClass("is--absolute")
                  : n.removeClass("is--absolute");
            });
        }
      }
    };
    document.addEventListener("DOMContentLoaded", function() {
      o.Methods.init_default();
    }),
      window.addEventListener("load", function() {
        o.Methods.init_load();
      });
  },
  function(t, e, n) {}
]);

$(document).ready(
  setTimeout(function() {
    setInterval(limiteMaximoDadosPessoaisPF, 2000);
    setInterval(limiteMaximoDadosPessoaisPJ, 2000);
    setInterval(limiteMaximoDadosPessoaisEndereco, 2000);

    function limiteMaximoDadosPessoaisPF() {
      $("#client-first-name").attr("maxlength", "50");
      $("#client-last-name").attr("maxlength", "50");
      $("#client-document").attr("maxlength", "14");
      $("#client-phone").attr("maxlength", "15");
    }

    function limiteMaximoDadosPessoaisPJ() {
      $("#client-company-name").attr("maxlength", "50");
      $("#client-company-ie").attr("maxlength", "18");
      $("#client-company-document").attr("maxlength", "18");
    }

    function limiteMaximoDadosPessoaisEndereco() {
      $("#ship-street").attr("maxlength", "80");
      $("#ship-number").attr("maxlength", "30");
      $("#ship-more-info").attr("maxlength", "50");
      $("#ship-neighborhood").attr("maxlength", "30");
      $("#ship-city").attr("maxlength", "30");
      $("#ship-name").attr("maxlength", "80");
    }
  }, 2000)
);
