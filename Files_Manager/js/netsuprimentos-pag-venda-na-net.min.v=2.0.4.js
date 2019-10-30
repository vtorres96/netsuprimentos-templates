/* -------------------------------------------------------
 * b2bnaweb - Net Suprimentos
 * Copyright (c) 2016 - 2019
 * ------------------------------------------------------- */
$(document).ready(function() {
    var a = $("html,body"),
        b = $(".porque_vender_na_net");
    $(".bg_venda_com_a_net .round").click(function(c) {
            a.animate({
                    scrollTop: b.offset().top - 60,
                    scrollLeft: 0
                },
                300
            );
        }),
        IMask($('.seja_parceiro [name="cnpj"]')[0], {
            mask: "00.000.000/0000-00"
        }),
        IMask($('.seja_parceiro [name="telefone"]')[0], {
            mask: [{
                    mask: "(00) 0000-0000"
                },
                {
                    mask: "(00) 00000-0000"
                }
            ]
        }),
        $('[name="x-input-radio"]').change(function() {
            "vtex" == $('[name="x-input-radio"]:checked').val() ?
                ($('.seja_parceiro [name="plataforma"]').hide(),
                    $('.seja_parceiro [name="plataforma"]').val("VTEX")) :
                "dmCommerce" == $('[name="x-input-radio"]:checked').val() ?
                ($('.seja_parceiro [name="plataforma"]').hide(),
                    $('.seja_parceiro [name="plataforma"]').val("DMCommerce")) :
                ($('.seja_parceiro [name="plataforma"]').show(),
                    $('.seja_parceiro [name="plataforma"]').val(""));
        });
    var c = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>';
    $(".seja_parceiro form").submit(function(a) {
            a.preventDefault();
        }),
        $(".seja_parceiro form").validate({
            rules: {
                nFantasia: {
                    required: !0
                },
                rSocial: {
                    required: !0
                },
                cnpj: {
                    required: !0,
                    minlength: 18
                },
                contato: {
                    required: !0
                },
                cargo: {
                    required: !0
                },
                site: {
                    required: !0
                },
                "x-input-radio": {
                    required: !0
                },
                plataforma: {
                    required: !0
                },
                email: {
                    required: !0,
                    email: !0
                },
                telefone: {
                    required: !0,
                    minlength: 14
                }
            },
            messages: {
                nFantasia: {
                    required: c + " Informe o nome fantasia da empresa."
                },
                rSocial: {
                    required: c + " Informe a RazÃ£o Social"
                },
                cnpj: {
                    required: c + " Informe o CNPJ",
                    minlength: c + " CNPJ invÃ¡lido"
                },
                contato: {
                    required: c + " Informe um nome para contato"
                },
                cargo: {
                    required: c + " Informe o cargo do contato"
                },
                site: {
                    required: c + " Informe o site da empresa"
                },
                "x-input-radio": {
                    required: c + " Selecione a Plataforma"
                },
                plataforma: {
                    required: c + " Informe a Plataforma"
                },
                email: {
                    required: c + " Informe seu e-mail.",
                    email: c + " Informe um e-mail vÃ¡lido."
                },
                telefone: {
                    required: c + " Informe seu telefone.",
                    minlength: c + " Telefone invÃ¡lido"
                }
            },
            errorPlacement: function(a, b) {
                "x-input-radio" == b.attr("name") ?
                    a.appendTo(b.closest(".plataforma > label")) :
                    a.insertAfter(b);
            },
            unhighlight: function(a, b, c) {},
            submitHandler: function(a) {
                if (!$(".inputButtons button").hasClass("finish")) {
                    $(".inputButtons button").addClass("active");
                    var b = {
                        unique: "Email",
                        "fields[0][EmailAddress]": $('.seja_parceiro [name="email"]').val(),
                        "fields[1][Email]": $('.seja_parceiro [name="email"]').val(),
                        "fields[2][NomeFantasia]": $(
                            '.seja_parceiro [name="nFantasia"]'
                        ).val(),
                        "fields[3][RazaoSocial]": $(
                            '.seja_parceiro [name="rSocial"]'
                        ).val(),
                        "fields[4][CNPJ]": $('.seja_parceiro [name="cnpj"]').val(),
                        "fields[5][Site]": $('.seja_parceiro [name="site"]').val(),
                        "fields[6][Plataforma]": $(
                            '.seja_parceiro [name="plataforma"]'
                        ).val(),
                        "fields[7][Contato]": $('.seja_parceiro [name="contato"]').val(),
                        "fields[8][Cargo]": $('.seja_parceiro [name="cargo"]').val(),
                        "fields[9][Telefone]": $('.seja_parceiro [name="telefone"]').val()
                    };
                    $.ajax({
                        url: "//landfy.smartcampaign.com.br/landfy/api/4503c6b0-b084-11e8-8e39-0e7eae3ca056",
                        data: b,
                        type: "POST",
                        success: function(a) {
                            console.log(a),
                                $(".inputButtons button").removeClass("active"),
                                $(".inputButtons button").addClass("finish"),
                                swal(
                                    "Pronto!",
                                    "As informaÃ§Ãµes foram enviadas!",
                                    "success"
                                ).then(function() {});
                        },
                        error: function(a) {
                            $(".inputButtons button").removeClass("active"),
                                $(".inputButtons button").removeClass("finish"),
                                swal(
                                    "Erro!",
                                    "VocÃª jÃ¡ nos enviou as informaÃ§Ãµes favor aguardar!",
                                    "error"
                                ).then(function() {});
                        }
                    });
                }
            }
        });
});