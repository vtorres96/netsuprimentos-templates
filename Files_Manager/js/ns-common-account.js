/* -------------------------------------------------------
 * b2bnaweb - Net Suprimentos
 * Copyright (c) 2016 - 2019
 * ------------------------------------------------------- */
(NS_Account = {
  documentReady: function() {
    NS_Account.Functions.changeContent(),
      "account" == $("body").attr("class") &&
        (NS_Account.Functions.actionsModal(),
        NS_Account.Functions.verificationModal());
  },
  windowOnload: function() {},
  ajaxStop: function() {},
  Functions: {
    removeDefault: function() {
      document.querySelectorAll("link").forEach(function(a) {
        (a.href.match(/bootstrap/) ||
          a.href.match(/style.css/) ||
          a.href.match("//maxcdn.bootstrapcdn.com/font-awesome/")) &&
          a.parentNode.removeChild(a);
      });
    },
    changeContent: function() {
      $(".account__profile h4").append(
        $('<a href="#editar-perfil" class="js--edit-profile">Editar</a>')
      ),
        $(".account__address h4").append(
          $(
            '<a href="#address-edit" class="js--edit-address">Inserir endereÃƒÂ§o</a>'
          )
        ),
        $(".js--edit-date").on("click", function(a) {
          $(".address-update").trigger("click");
        }),
        $(".js--edit-addres").on("click", function(a) {
          $(".address-update").trigger("click");
        }),
        $(".address-form .row").each(function() {
          _element = $(this);
          var a = _element.find(".control-group").clone();
          _element.before(a), _element.remove();
        }),
        $("body").append($('<div class="has--overlay"></div>'));
    },
    actionsModal: function() {
      var a = $(".account__information"),
        b = $("#editar-perfil"),
        c = $("#address-edit"),
        d = ".close, .btn-link, .has--overlay",
        e = $(".delete"),
        f = "#profile-submit",
        g = $(".has--overlay");
      b.show(),
        c.show(),
        $("body").on("click", d, function() {
          a.removeClass("is--profile-active is--address-active"),
            b.removeClass("is--active"),
            c.removeClass("is--active"),
            g.removeClass("is--active"),
            $("body").removeClass("modal-open");
        }),
        $("#address-remove .btn-link").on("click", function(a) {
          a.preventDefault(),
            $("#address-remove").removeClass("is--active"),
            $("#address-remove #exclude").hide();
        }),
        $("body").on("click", f, function() {
          a.removeClass("is--profile-active is--address-active"),
            b.removeClass("is--active"),
            c.removeClass("is--active");
        }),
        e.on("click", function() {
          $("#address-remove").toggleClass("is--active"),
            $("#address-remove #exclude").show(),
            g.addClass("is--active");
        }),
        $(".js--edit-profile").on("click", function(c) {
          c.preventDefault(),
            c.stopPropagation(),
            a.addClass("is--profile-active"),
            b.addClass("is--active"),
            g.addClass("is--active"),
            "True" === $("input#isCorporate").val() &&
              $("#business-toggle").trigger("click");
        }),
        $(".js--edit-address").on("click", function(b) {
          b.preventDefault(),
            b.stopPropagation(),
            a.addClass("is--address-active"),
            c.addClass("is--active"),
            g.addClass("is--active");
        }),
        $("#address-update").on("click", function(b) {
          a.addClass("is--address-active"),
            c.addClass("is--active"),
            g.addClass("is--active");
        }),
        $("#business-toggle").on("click", function() {
          "on" == $(this).attr("data")
            ? $(this).addClass("is--active")
            : $(this).removeClass("is--active");
        });
    },
    verificationModal: function() {
      var a = document.querySelector("#profile-submit"),
        b = document.querySelector("#form-submit"),
        c = ".modal-body .controls input";
      $("body").on("click", c, function(a) {
        var b = $(this);
        !!b.parents(".controls").hasClass("in--error-radio") &&
          b.parents(".controls").removeClass("in--error-radio"),
          !!b.hasClass("in--error") && b.removeClass("in--error");
      }),
        $("body").on("keyup", c, function(a) {
          var b = $(this);
          !("" == b.val() || !b.hasClass("in--error")) &&
            b.removeClass("in--error");
        }),
        a.addEventListener("click", function(a) {
          "" === $("input#firstName").val() &&
            $("input#firstName").addClass("in--error"),
            "" === $("input#lastName").val() &&
              $("input#lastName").addClass("in--error"),
            "" === $("input#document").val() &&
              $("input#document").addClass("in--error"),
            !$("input[name=gender]").is(":checked") &&
              $("input[name=gender]")
                .parents(".controls")
                .addClass("in--error-radio"),
            "" === $("input#birthDate").val() &&
              $("input#birthDate").addClass("in--error"),
            "" === $("input#email").val() &&
              $("input#email").addClass("in--error"),
            "" === $("input#homePhone").val() &&
              $("input#homePhone").addClass("in--error"),
            "True" === $("input#isCorporate").val() &&
              (console.log("Truuee"),
              "" === $("input#corporateName").val() &&
                $("input#corporateName").addClass("in--error"),
              "" === $("input#fancyName").val() &&
                $("input#fancyName").addClass("in--error"),
              "" === $("input#businessDocument").val() &&
                $("input#businessDocument").addClass("in--error"),
              "" === $("input#stateRegistration").val() &&
                $("input#stateRegistration").addClass("in--error"));
        }),
        b.addEventListener("click", function() {
          "" === $("input#addressName").val() &&
            $("input#addressName").addClass("in--error"),
            "" === $("input#receiverName").val() &&
              $("input#receiverName").addClass("in--error"),
            "" === $("input#postalCode").val() &&
              $("input#postalCode").addClass("in--error");
        });
    },
    sendToCL: function() {
      var a = {
        header: {
          Accept: "application/vnd.vtex.ds.v10+json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers":
            "x-vtex-api-appKey, x-vtex-api-appToken, Content-Type, Accept, REST-Range, VtexIdclientAutCookie",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, OPTIONS, PATCH",
          "Access-Control-Allow-Origin": "*"
        },
        url: "/api/dataentities/CL/documents/" + _userID,
        method: "PATCH"
      };
      $.ajax(a)
        .done(function(a) {})
        .fail(function(a, b, c) {});
    }
  }
}),
  $(
    (function() {
      NS_Account.documentReady();
    })(),
    window.addEventListener("DOMContentLoaded", function() {
      NS_Account.windowOnload();
    }),
    $(document).ajaxStop(function() {
      NS_Account.ajaxStop();
    })
  );

$(document).ready(
  setTimeout(function() {
    setInterval(trocaHeaderPorDiv, 2000);
    setInterval(limiteMaximoDadosPessoaisPF, 2000);
    setInterval(limiteMaximoDadosPessoaisPJ, 2000);
    setInterval(limiteMaximoDadosPessoaisEndereco, 2000);

    function trocaHeaderPorDiv() {
      let headerGerado = $("header")[2];
      let novo = $("<div/>");
      let antigo = $(headerGerado);
      antigo.before(novo);
      novo.append(antigo.children());
      antigo.remove();
    }

    function limiteMaximoDadosPessoaisPF() {
      $("[name=firstName]").attr("maxlength", "50");
      $("[name=lastName]").attr("maxlength", "50");
      $("[name=document]").attr("maxlength", "14");
      $("[name=homePhone]").attr("maxlength", "15");
    }

    function limiteMaximoDadosPessoaisPJ() {
      $("[name=corporateName]").attr("maxlength", "50");
      $("[name=corporateDocument]").attr("maxlength", "18");
      $("[name=businessPhone]").attr("maxlength", "15");
      $("[name=stateRegistration]").attr("maxlength", "18");
      $("[name=tradeName]").attr("maxlength", "30");
    }

    function limiteMaximoDadosPessoaisEndereco() {
      $(".vtex-address-form__street :input").attr("maxlength", "80");
      $(".vtex-address-form__number :input").attr("maxlength", "30");
      $(".vtex-address-form__complement :input").attr("maxlength", "50");
      $(".vtex-address-form__neighborhood :input").attr("maxlength", "30");
      $(".vtex-address-form__city :input").attr("maxlength", "30");
      $(".vtex-address-form__receiverName :input").attr("maxlength", "80");
    }
  }, 2000)
);
