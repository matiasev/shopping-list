(function(){
  'use strict';

  angular
    .module('starter')
    .controller('myController', [ myController]);

    function myController(){
      let vm = this;
      let list = new getList();

      vm.itens = list.produtos;
      vm.numero = vm.itens.length;

      vm.adicionarItem = function(item){
        if(item != null){
          for (let i = 0; i < vm.itens.length; i++) {
            let el = vm.itens[i];
            if(item.nome == el.nome){
              alert("Item já adicionado!");
              delete vm.addItem;
              return;
            }
          }
          vm.itens.push(item);
          vm.numero = vm.itens.length;
          list.save();
          delete vm.addItem;
          
        }else{
          alert("Campo vazio!");
        }
      }

      vm.editar = function(item, index){
        vm.addItem = angular.copy(item);
        vm.addItem.index = index;
        vm.mostra = true;
      }

      vm.salvar = function(item){
        let itens = list.produtos.map(function(el, i){
          debugger;
          if (i === item.index) {
            delete item.index;
            return item;
          }
          return el;
        });
        list.produtos = itens;
        list.save();
        vm.itens = list.produtos;
        delete vm.addItem;
        vm.mostra = false;
      }

      vm.removeItem = function(item){
        if (confirm('Deseja remover este item?')) {
          vm.itens.splice(item, 1);
          vm.numero = vm.itens.length;
          list.save();
        }
      }

      vm.selecionado = function(item){
        item.done = !item.done;
        list.save();
      }
    }
}());