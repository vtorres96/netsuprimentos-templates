sliderBrands = function () {
    $("section#topMarcas").length > -1 && ($("section#topMarcas .slider-wrapper").slick({
        slidesToShow: 7,
        slidesToScroll: 2,
        dots: !1,
        arrows: !0,
        infinite: !0,
        autoplay: !0,
        autoplaySpeed: 2e3,
        responsive: [{
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }]
    }), $("section#topMarcas").fadeIn())
};
var form = document.querySelector(".x-form-bf-news");
form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var name = document.querySelector('.x-form-bf-news input[name="nome"]').value,
        email = document.querySelector('.x-form-bf-news input[name="email"]').value,
        segmento = document.querySelector('.x-form-bf-news select[name="segmento"]').value;
    if (null != name && "" != name) {
        var formData = {
            Unique: "Email",
            "fields[1][Nome]": name,
            "fields[2][Email]": email,
            "fields[3][Source]": "Blackfriday",
            "fields[4][Segmento]": segmento
        };
        $.ajax({
            url: "https://landfy.smartcampaign.com.br/landfy/api/05b1ab4c-d7e0-11e8-bc9f-0e7eae3ca056",
            data: formData,
            success: function (res) {
                1 == res.response ? alert("Dados enviados com sucesso!") : 0 == res.response ? alert("Email jÃ¡ cadastrado") : alert("Ops, algo deu errado. Tente novamente"), document.querySelector('.x-form-bf-news input[name="nome"]').value = "", document.querySelector('.x-form-bf-news input[name="email"]').value = "", console.log(res)
            }
        })
    } else alert("Verifique se todos os dados foram preenchidos corretamente")
}), $(document).ready(function () {
    sliderBrands(), $(".x-banner-blackfriday ul").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: !1,
        dots: !0,
        arrows: !0
    }), $(".x-vitrine .prateleira ul").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: !0,
        dots: !1,
        arrows: !0
    })
});