export default function escolheCategoria(categorias, categoriaSelecionada){
  for (let categoria of categorias){
    if (categoria.nomeDaCategoria === categoriaSelecionada){
      return categoria;
    }
  }
}