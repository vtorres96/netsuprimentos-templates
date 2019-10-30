$(document).ready(function() {
    $("#address-edit").prependTo("body"),
        $("#address-remove").prependTo("body"),
        $(".modal").removeClass("hide"),
        $("form#formMC")
        .find("*[data-target]")
        .each(function() {
            $(this).val($($(this).data("target")).val()),
                $("#isCorporate").val("True"),
                $(this).on("keyup", function() {
                    $($(this).data("target")).val($(this).val());
                });
        }),
        $("#formMC").validate({
            rules: {
                mcNome: {
                    required: !0
                },
                mcSobrenome: {
                    required: !0
                },
                mcCPF: {
                    required: !0
                },
                mcEmail: {
                    required: !0,
                    email: !0
                },
                mcTelefone: {
                    required: !0
                },
                mcNomeEmpresa: {
                    required: function() {
                        return "" == $("#mcNomeEmpresa").val() &&
                            "" == $("#mcEstado").val() &&
                            "" == $("#mcCnpj").val() &&
                            "" == $("#mcCidade").val() ?
                            !1 :
                            !0;
                    }
                },
                mcEstado: {
                    required: function() {
                        return "" == $("#mcNomeEmpresa").val() &&
                            "" == $("#mcEstado").val() &&
                            "" == $("#mcCnpj").val() &&
                            "" == $("#mcCidade").val() ?
                            !1 :
                            !0;
                    }
                },
                mcCnpj: {
                    required: function() {
                        return "" == $("#mcNomeEmpresa").val() &&
                            "" == $("#mcEstado").val() &&
                            "" == $("#mcCnpj").val() &&
                            "" == $("#mcCidade").val() ?
                            !1 :
                            !0;
                    }
                },
                mcCidade: {
                    required: function() {
                        return "" == $("#mcNomeEmpresa").val() &&
                            "" == $("#mcEstado").val() &&
                            "" == $("#mcCnpj").val() &&
                            "" == $("#mcCidade").val() ?
                            !1 :
                            !0;
                    }
                }
            },
            messages: {
                mcNome: "Infome o seu primeiro nome.",
                mcSobrenome: "Infome o seu sobrenome.",
                mcCPF: {
                    required: "Infome um CPF vÃ¡lido",
                    digits: "Digite somente nÃºmeros"
                },
                mcEmail: {
                    required: "Informe um e-mail.",
                    email: "Informe um e-mail vÃ¡lido."
                },
                mcTelefone: {
                    required: "Infome um telefone para contato",
                    digits: "Digite somente nÃºmeros"
                },
                mcNomeEmpresa: {
                    required: "Informe a RazÃ£o Social da empresa"
                },
                mcEstado: {
                    required: "Infome o Nome Fantasia da empresa"
                },
                mcCnpj: {
                    required: "Infome o CNPJ da empresa",
                    digits: "Digite somente nÃºmeros"
                },
                mcCidade: {
                    required: 'Infome a InscriÃ§Ã£o Estadual da empresa ou escreva "Isento"'
                }
            },
            submitHandler: function(e, t) {
                return (
                    t.preventDefault(),
                    "" == $("#mcNomeEmpresa").val() &&
                    "" == $("#mcEstado").val() &&
                    "" == $("#mcCnpj").val() &&
                    "" == $("#mcCidade").val() ?
                    ($("#business-data").hide(),
                        $("#isCorporate").val("False"),
                        $("#profile-submit").trigger("click")) :
                    ($("#business-data").show(),
                        $("#isCorporate").val("True"),
                        $("#profile-submit").trigger("click")), !1
                );
            }
        });
});