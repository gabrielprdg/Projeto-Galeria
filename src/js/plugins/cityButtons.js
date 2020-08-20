import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300

function filterByCity(city) {
    $('[wm-city]').each(function(i, e) {
        const isTarget = $(this).attr('wm-city') === city ||
            city === null // Verificando se se a cidade contida dentro do atributo é o alvo da funcao 
        if (isTarget) {
            $(this).parent().removeClass('d-none') // Pegando o elemento pai da imagem que no caso é a div 
            $(this).fadeIn(duration) //mostrando a imagem
        } else {
            $(this).fadeOut(duration, () => { //caso o valor do atributo nao for o alvo da funcao 
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.cityButtons = function() {
    const cities = new Set //Basicamente o Set é um objeto capaz de coletar dados sem os repetir e construir um obj em cima desses dados
    $('[wm-city]').each(function(i, e) {
        cities.add($(e).attr('wm-city')) // Pegando o que há dentro do atributo wm-city(que no caso sao as cidades) e jogando dentro cities 
    })
    console.log(Array.from(cities))
    const btns = Array.from(cities).map(city => { // tranformando cities em array 
        const btn = $('<button>').addClass(['btn', 'btn-primary']).html(city) //Crio um button com a classe btn 
        btn.click(e => filterByCity(city)) // Na hora que os botoes sao clicados e disparado a funcao pra mostrar as cidades
        return btn
    })

    const btnAll = $('<button>')
        .addClass(['btn', 'btn-danger', 'active']).html('Todas') //criando botoes com todas a imagens
    btnAll.click(e => filterByCity(null)) //passando null pra funcao pra ele nao everificar quem é o alvo e assim mostrar todas as imgs
    btns.push(btnAll)

    const btnGroup = $('<div>').addClass(['btn-group'])
    btnGroup.append(btns)

    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function() {
    $('[wm-city-buttons]').cityButtons()
})