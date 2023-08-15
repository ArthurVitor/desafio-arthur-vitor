class CaixaDaLanchonete { 

    constructor () {
        this.itens_validos = { // objeto com todos os itens validos, seu respectivo preco e se é ou não um item extra
            cafe: {
                preco:3,
                item_extra:false,
                item_prin_nome:null,
            },
            chantily: {
                preco:1.5,
                item_extra:true,
                item_prin_nome:'cafe',
            },
            suco: {
                preco:6.2,
                item_extra:false,
                item_prin_nome:null,
            },
            sanduiche: {
                preco:6.5,
                item_extra: false,
                item_prin_nome: null,
            },
            queijo: {
                preco:2,
                item_extra: true,
                item_prin_nome: 'sanduiche',
            },
            salgado: {
                preco:7.25,
                item_extra: false,
                item_prin_nome: null,
            },
            combo1: {
                preco:9.5,
                item_extra: false,
                item_prin_nome: null,
            },
            combo2: {
                preco: 7.5,
                item_extra: false,
                item_prin_nome: null
            }
        }
        this.metodo_pagamento_valido = ['dinheiro', 'credito', 'debito'] // metodos de pagamento validos
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if(itens.length > 0 === false) { // verifica se o cacrinho está vázio
            return "Não há itens no carrinho de compra!"
        }

        if(this.valida_itens(itens) === false){ // verifica se os itens recebidos são todos validos
            return "Item inválido!"
        }

        if(this.valida_forma_pagamento(metodoDePagamento) === false) { // verifica se a forma de pagamento é valida
            return "Forma de pagamento inválida!"
        }
        const res = this.calcula_total(metodoDePagamento, itens) // calcula o valor total da compra com base na forma de pagamento e quantidade
        return res
    }

    valida_itens(itens) {
        for (let i = 0; i < itens.length; i++){
            const element = itens[i];
            const item_name = element.slice(0, element.indexOf(',')); // retorna apenas o nome do item sem a quantidade ("cafe,1" => "cafe")
            if(this.itens_validos.hasOwnProperty(item_name)){ // verifica se o item está dentro dos itens validos
                continue
            } else {
                return false;
            }
        }
    }

    valida_forma_pagamento(metodo) {
        return this.metodo_pagamento_valido.includes(metodo) ? true : false // retorna true caso o metodo de pagamento seja valido, retorna else caso não
    }

    calcula_total(metodoPagamento, itens){
        const compra_names = itens.map(item => item.slice(0, item.indexOf(','))) // retorna um array com todos os itens comprados
        let total_bruto = 0;
        for(let i = 0; i < itens.length; i++){
            const element = itens[i]
            const item_name = compra_names[i]
            const item_quantity = parseInt(element.slice(element.indexOf(',')+1)) // retorna apenas a quantidade de itens comprados ("cafe,1" => 1)
            
            if(item_quantity > 0) {
                if(this.itens_validos[item_name].item_extra) { // verifica se é um item extra (queijo, chantily ...)
                    if(compra_names.includes(this.itens_validos[item_name].item_prin_nome)) { // checa se o item principal está no pedido (cafe, sanduiche ...)
                        total_bruto += this.itens_validos[item_name].preco * item_quantity // incrementa o valor total da compra
                    } else {
                        return 'Item extra não pode ser pedido sem o principal'
                    }
                } else {
                    total_bruto += this.itens_validos[item_name].preco * item_quantity // incrementa o valor total da compra
                }
            } else {
                return 'Quantidade inválida!'
            }
        
        }
        let total_liquido = this.calcula_taxa(total_bruto, metodoPagamento) // total_liquido = total_liquido - (descontos: taxas)
        return total_liquido
    }

    calcula_taxa(valor, metodoPagamento) {
        if(metodoPagamento === 'dinheiro') {
            valor *= 0.95
        } else if (metodoPagamento === 'credito') {
            valor *= 1.03
        }
        let valor_formatado = `R$ ${valor.toFixed(2)}`.replace('.', ',') // formata o valor total no padrao desejado (35.00 => R$ 35,00)
        return valor_formatado
    }
}

export { CaixaDaLanchonete };
