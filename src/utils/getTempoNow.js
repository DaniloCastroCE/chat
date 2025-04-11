exports.getTimeNow = (date) => {
    if (typeof date === 'undefined') {
        date = new Date()
    }

    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];

    let hoje = {
        data : {
            dia: date.getDate().toString().padStart(2, '0'),
            mes: (date.getMonth() + 1).toString().padStart(2, '0'),
            ano: date.getFullYear(),
        },
        time: {
            h: date.getHours().toString().padStart(2, '0'),
            m: date.getMinutes().toString().padStart(2, '0'),
            s: date.getSeconds().toString().padStart(2, '0'),
        },
        objDate : date,
    }

    Object.assign(hoje, texts = { 
        array_texts: [
            `${hoje.time.h}:${hoje.time.m}:${hoje.time.s}`,
            `Dia ${hoje.data.dia} de ${meses[hoje.data.mes - 1]} de ${hoje.data.ano}`,
            `Dia ${hoje.data.dia} de ${meses[hoje.data.mes - 1]} de ${hoje.data.ano} às ${hoje.time.h}:${hoje.time.m}:${hoje.time.s}`,
            `${hoje.time.h}:${hoje.time.m}:${hoje.time.s} - ${hoje.data.dia}/${hoje.data.mes}/${hoje.data.ano}`
        ]}

    )

    return hoje

}