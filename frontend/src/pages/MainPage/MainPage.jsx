import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Cards from "../../components/Cards/Cards";
import "./MainPageStyle.css";

const MainPage = () => {
  const [index, setIndex] = useState(0);
  const imgH = "460px";
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {/* <Carousel variant='dark' activeIndex={index} onSelect={handleSelect} style={{height:"460px"}}>
        <Carousel.Item style={{height:"460px"}}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="d-block w-100"
            src="/assets/carro/5.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Segurança no Transporte Público: Sua Prioridade</h3>
            <p>
              Não permita que a insegurança afete sua viagem no transporte
              público. Adote medidas de precaução para garantir sua segurança e
              a de seus pertences durante o trajeto.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{height:"460px"}}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="d-block w-100"
            src="/assets/carro/4.jpg"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Transporte Público Escolar: Segurança e Conforto</h3>
            <p>
              O transporte público escolar oferece segurança e conforto para os
              alunos, além de ajudar a reduzir o trânsito e as emissões de gases
              poluentes. Com rotas e horários específicos, os estudantes podem
              chegar à escola de forma pontual e tranquila.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{height:"460px"}}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            className="d-block w-100"
            src="/assets/carro/6.jpg"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>
              Benefícios de Utilizar o Transporte Público em Todas as Atividades
            </h3>
            <p>
              Além de ser uma opção econômica, utilizar o transporte público
              para todas as atividades diárias também ajuda a reduzir o trânsito
              e a emissão de gases poluentes. Desfrute de uma vida mais
              sustentável e ativa ao adotar essa prática.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
      <div className="sectionA">
        <div className="carrosel">
          <div className="bg bg1">
            <img
              className="img"
              src="/assets/bg2/dando-mole-na-rua.jpg"
              alt="Homem dando mole na rua pra perder o celular no centro da cidade"
            />
          </div>
          <div className="bg bg2">
            <img
              className="img"
              src="/assets/bg2/homem-na-cidade-tentando-parar-de-taxi.jpg"
              alt="Homem acenando para chamar o transporte"
            />
          </div>
          <div className="bg bg3">
            <img
              className="img"
              src="/assets/bg2/pessoas-na-estacao.jpg"
              alt="Pessoas se movimentando em uma estação de trem"
            />
          </div>
          <div className="bg bg4">
            <img
              className="img"
              src="/assets/bg2/pessoas.jpg"
              alt="Pessoas esperando em um ponto de ônibus"
            />
          </div>
          <div className="bg bg5">
            <img
              className="img"
              src="/assets/bg2/trem-vindo.jpg"
              alt="Imagem de um trem se aproximando da estação"
            />
          </div>
        </div>
        <div className="texto">
          <h1>RioCard+</h1>
          <h2>
            Bem-vindo à nossa página de transporte público! Aqui você encontrará
            informações úteis sobre o transporte público disponível em sua
            cidade.
          </h2>
          <p>
            Sabemos que o transporte público pode ser uma opção econômica e
            conveniente para muitas pessoas que desejam evitar o trânsito,
            economizar dinheiro e ajudar a reduzir a poluição do ar. É por isso
            que estamos comprometidos em fornecer informações precisas e
            atualizadas sobre as opções de transporte público disponíveis em sua
            região. Oferecemos uma variedade de informações sobre ônibus, metrô,
            trem e outras opções de transporte público, incluindo horários,
            rotas e tarifas. Você também pode encontrar dicas úteis para tornar
            sua viagem de transporte público mais confortável e conveniente,
            como como planejar sua rota, como pagar sua tarifa e como se manter
            seguro durante sua viagem. Nós acreditamos que o transporte público
            é uma parte vital da vida urbana e estamos empenhados em torná-lo
            mais acessível e fácil de usar para todos. Esperamos que as
            informações e recursos encontrados nesta página ajudem você a
            aproveitar ao máximo sua experiência de transporte público em sua
            cidade.
          </p>
          <img
            id="logo"
            src="/assets/RIOPREFEITURA-horizontal-branco.png"
            alt="Logo da prefeitura do estado do Rio de Janeiro"
          />
        </div>
      </div>
      <Cards/>
    </>
  );
};
export default MainPage;
