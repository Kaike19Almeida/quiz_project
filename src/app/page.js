'use client';

import { useState, useEffect } from 'react';
import './home.css';

export default function Quiz() {
  let [perguntaAtual, setPerguntaAtual] = useState(0);
  let [pontuacao, setPontuacao] = useState(0);
  let [finalizado, setFinalizado] = useState(false);
  let [respostaTexto, setRespostaTexto] = useState('');
  let [perguntasEmbaralhadas, setPerguntasEmbaralhadas] = useState([]);
  let [ranking, setRanking] = useState([]);

  function embaralharArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  let perguntasOriginais = [
    { pergunta: 'Qual cantor é conhecido como Rei do Pop?', respostas: ['Elvis Presley', 'Michael Jackson', 'Justin Bieber', 'Freddie Mercury'], correta: 1 },
    { pergunta: 'Digite o nome da cantora de "Rolling in the Deep":', tipo: 'texto', correta: 'Adele' },
    { pergunta: 'Qual é o nome do rapper brasileiro famoso pela música "Kenny G"?', respostas: ['Orochi', 'Matuê', 'Felipe Ret', 'Djonga'], correta: 1 },
    { pergunta: 'Qual banda lançou a música "Bohemian Rhapsody"?', respostas: ['The Beatles', 'Queen', 'Nirvana', 'Pink Floyd'], correta: 1 },
    { pergunta: 'Quem é o artista por trás do hit "333"?', respostas: ['Matuê', 'Veigh', 'BK', 'Teto'], correta: 0 },
    { pergunta: 'Digite o nome da banda que canta "Smells Like Teen Spirit":', tipo: 'texto', correta: 'Nirvana' },
    { pergunta: 'Digite o nome da música mais famosa de Linkin Park lançada nos anos 2000:', tipo: 'texto', correta: 'In The End' }
  ];

  useEffect(() => {
    setPerguntasEmbaralhadas(embaralharArray([...perguntasOriginais]));
  }, []);

  function verificarResposta(indice) {
    let pergunta = perguntasEmbaralhadas[perguntaAtual];
    if (pergunta.tipo === 'texto' && respostaTexto.toLowerCase() === pergunta.correta.toLowerCase()) {
      setPontuacao(pontuacao + 1);
    } else if (indice === pergunta.correta) {
      setPontuacao(pontuacao + 1);
    }
    proximaPergunta();
  }

  function proximaPergunta() {
    if (perguntaAtual === perguntasEmbaralhadas.length - 1) {
      setFinalizado(true);
      setRanking((prevRanking) => [
        ...prevRanking,
        { tentativa: prevRanking.length + 1, pontuacao }
      ]);
    } else {
      setPerguntaAtual(perguntaAtual + 1);
      setRespostaTexto('');
    }
  }

  function reiniciarQuiz() {
    setPerguntaAtual(0);
    setPontuacao(0);
    setFinalizado(false);
    setRespostaTexto('');
    setPerguntasEmbaralhadas(embaralharArray([...perguntasOriginais]));
  }

  function voltarPergunta() {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1);
    }
  }

  return (
    <div className="quiz-container">
      <h1>Quiz sobre Músicas Populares 🎵</h1>
      {finalizado ? (
        <div>
          <h2>Quiz finalizado!</h2>
          <p>Sua pontuação: {pontuacao} de {perguntasEmbaralhadas.length} ({((pontuacao / perguntasEmbaralhadas.length) * 100).toFixed(2)}%)</p>
          <h3>Ranking de Tentativas:</h3>
          <ul>
            {ranking.map((item, index) => (
              <li key={index}>Tentativa {item.tentativa}: {item.pontuacao} pontos</li>
            ))}
          </ul>
          <button className="reiniciar" onClick={reiniciarQuiz}>Reiniciar Quiz</button>
        </div>
      ) : (
        <div>
          <h2>{perguntasEmbaralhadas[perguntaAtual]?.pergunta}</h2>
          {perguntasEmbaralhadas[perguntaAtual]?.tipo === 'texto' ? (
            <>
              <input
                type="text"
                value={respostaTexto}
                onChange={(e) => setRespostaTexto(e.target.value)}
                placeholder="Digite sua resposta"
              />
              <button onClick={() => verificarResposta()}>Responder</button>
            </>
          ) : (
            <div className="opcoes">
              {perguntasEmbaralhadas[perguntaAtual]?.respostas.map((resposta, index) => (
                <button key={index} onClick={() => verificarResposta(index)}>
                  {resposta}
                </button>
              ))}
            </div>
          )}
          <div className="navegacao">
            <button onClick={voltarPergunta}>Voltar</button>
            <button onClick={proximaPergunta}>Próximo</button>
          </div>
        </div>
      )}
    </div>
  );
}
