class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const formas_pagamento = ['dinheiro', 'debito', 'credito']
        if(formas_pagamento.includes(metodoDePagamento)){
            const prices = {cafe: 3, chantily: 1.5, suco: 6.2, sanduiche: 6.5, queijo: 2, salgado: 7.25, combo1: 9.5, combo2: 7.5}
            let tot = 0;
            for(let i = 0; i < itens.length; i++){
                const element = itens[i];
                const product_name = element.slice(0, element.indexOf(','));
                const product_quantity = parseInt(element.slice(element.indexOf(',')+1));
                tot += prices[product_name] * product_quantity
            }
            tot = this.calcula_valor_total(tot, metodoDePagamento)
            //return `R$ ${tot.toFixed(2).replace('.', ',')}`
            return this.formata_total(valor=tot, casas_decimais=2)
        }
        return 'Forma de pagamento inválida!';
    }

    forma_pagamento_valida(forma_pagamento, formas_pagamento_validas){
        
    }    

    calcula_valor_total(valor, metodoDePagamento) {
        let valor_total = 0;
        if (metodoDePagamento == 'credito'){
            valor_total = valor * 1.03
        } else if (metodoDePagamento == 'dinheiro') {
            valor_total = valor * 0.95
        } else {
            valor_total = valor
        }
        return valor_total
    }

    formata_total(valor, casas_decimais){
        return `R$ ${valor.toFixed(casas_decimais).replace('.', ',')}`
    }

}

export { CaixaDaLanchonete };