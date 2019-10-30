var validadeForm = function() {
    var checked = [];
    $(".x-submit").on("click", function(e) {
        $(".x-email__input--error").hide(), (checked = []);
        var email = $("#email").val(),
            i = 1,
            field = "",
            form_input = $(".x-input_form:checked"),
            length = form_input.length;
        if (
            (form_input.each(function() {
                    (field += "fields[" + i + "][" + $(this).attr("id") + "]=" + !0),
                    i != length && (field += "&"),
                        i++;
                }),
                (i = 0),
                field)
        )
            var dataToSend = "unique=Email&fields[0][Email]=" + email + "&" + field;
        else console.info("field nulo");
        return (
            "" == email ?
            $(".x-email__input").append(
                '<p class="x-email__input--error"> DIGITE SEU EMAIL </p>'
            ) :
            $.ajax({
                url: "http://landfy.smartcampaign.com.br/landfy/api/4f33f642-eca2-11e7-8ad3-0e7eae3ca056",
                data: dataToSend,
                success: function(data) {
                    $("html, body").animate({
                                scrollTop: 0
                            },
                            600
                        ),
                        $("main").append(
                            '<h2 style="height:400px; display:inline-flex; align-items: center; color:#ffc000; font-weight: bold; "> OBRIGADO POR PARTICIPAR </h2>'
                        ),
                        $(".x-title, .x-form").hide();
                },
                error: function(data) {
                    alert("Ocorreu um erro, tente novamente mais tarde.");
                }
            }), !1
        );
    });
};
$(document).ready(function() {
    validadeForm();
});