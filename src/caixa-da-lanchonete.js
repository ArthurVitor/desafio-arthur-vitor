class CaixaDaLanchonete { 

    constructor () {
        this.itens_validos = {
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
        this.metodo_pagamento_valido = ['dinheiro', 'credito', 'debito']
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length <= 0) {
          return "Não há itens no carrinho de compra!";
        }
    
        if (!this.valida_itens(itens)) {
          return "Item inválido!";
        }
    
        if (!this.valida_forma_pagamento(metodoDePagamento)) {
          return "Forma de pagamento inválida!";
        }
        const res = this.calcula_total(metodoDePagamento, itens);
        return res;
      }

    valida_itens(itens) {
        let validation = false;
        for (let i = 0; i < itens.length; i++) {
          const element = itens[i];
          const item_name = element.slice(0, element.indexOf(","));
          if (this.itens_validos.hasOwnProperty(item_name)) {
            validation = true;
          }
          return validation;
        }
    }

    valida_forma_pagamento(metodo) {
        return this.metodo_pagamento_valido.includes(metodo) ? true : false
    }

    calcula_total(metodoPagamento, itens){
        const compra_names = itens.map(item => item.slice(0, item.indexOf(',')))
        let total_bruto = 0;
        for(let i = 0; i < itens.length; i++){
            const element = itens[i]
            const item_name = compra_names[i]
            const item_quantity = parseInt(element.slice(element.indexOf(',')+1))
            
            if(item_quantity > 0) {
                if(this.itens_validos[item_name].item_extra) {
                    if(compra_names.includes(this.itens_validos[item_name].item_prin_nome)) {
                        total_bruto += this.itens_validos[item_name].preco * item_quantity
                    } else {
                        return 'Item extra não pode ser pedido sem o principal'
                    }
                } else {
                    total_bruto += this.itens_validos[item_name].preco * item_quantity
                }
            } else {
                return 'Quantidade inválida!'
            }
        
        }
        let total_liquido = this.calcula_taxa(total_bruto, metodoPagamento)
        return total_liquido
    }

    calcula_taxa(valor, metodoPagamento) {
        if(metodoPagamento === 'dinheiro') {
            valor *= 0.95
        } else if (metodoPagamento === 'credito') {
            valor *= 1.03
        }
        let valor_formatado = `R$ ${valor.toFixed(2)}`.replace('.', ',')
        return valor_formatado
    }
}

export { CaixaDaLanchonete };
