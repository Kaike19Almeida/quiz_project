import Produto from "./components/Produto";
import Site from "./components/Site";

function Produtos() {
    return (
        <div>
           <Site/>
            <h1> Produtos</h1>
            <p>Bem-vindo a página de produtos</p>

            <hr/>

            <Produto nome= "maçã" desconto="20" preco="R$ 3,99"/>
            <Produto nome="Uva" preco="R$2,50"/>
            <Produto nome="Pera" preco="R$7,75"/>
            
        </div>
    );
}
export default Produtos;

 