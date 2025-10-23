document.addEventListener('DOMContentLoaded', () => {
  const selectCifras = document.querySelector('select#cifras');
  const cifraOriginalElement = document.getElementById('cifra_original');
  const cifraElement = document.getElementById('cifra');
  const tomInput = document.querySelector('input#tom');
  const reduzirMeioTom = document.querySelector('button#reduzir_meio_tom');
  const aumentarMeioTom = document.querySelector('button#aumentar_meio_tom');
  const assinaturaToggle = document.getElementById('assinatura');

  if (selectCifras) {
    bancoDeCifras.forEach((cifra, index) => {
      const option = document.createElement('option');
      option.value = cifra.nome;
      option.textContent = cifra.nome;
      if (index === 0) {
        option.selected = true;
      }
      selectCifras.appendChild(option);
    });
  }

  function trocarCifra(cifraNome) {
    const cifraSelecionada = bancoDeCifras.find(
      (cifraDoBanco) => cifraDoBanco.nome === cifraNome
    );

    if (!cifraSelecionada) {
      return;
    }

    appState.tom = cifraSelecionada.tom;
    appState.tomOriginal = cifraSelecionada.tom;
    appState.afinacao = cifraSelecionada.afinacao;
    appState.afinacaoOriginal = cifraSelecionada.afinacao;

    fetch(`examples/${cifraNome}.txt`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Não foi possível carregar a cifra ${cifraNome}`);
        }
        return response.text();
      })
      .then((data) => {
        appState.cifraOriginal = data;
        appState.linhas = checkCifraLines(data);
        if (cifraOriginalElement) {
          cifraOriginalElement.textContent = appState.cifraOriginal;
        }
        if (cifraElement) {
          cifraElement.textContent = appState.cifraOriginal;
        }
        appState.cifras = Cifra.extrairDaCifra(
          afinacoesPorApelido[appState.afinacaoOriginal],
          data
        );
        renderDependingOnWindowSize();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  window.addEventListener('resize', renderDependingOnWindowSize);

  if (selectCifras) {
    selectCifras.addEventListener('change', (event) => {
      trocarCifra(event.target.value);
    });
    if (selectCifras.value) {
      trocarCifra(selectCifras.value);
    } else if (bancoDeCifras.length) {
      trocarCifra(bancoDeCifras[0].nome);
    }
  }

  if (tomInput) {
    tomInput.value = appState.tom;
  }

  const alterarTomEExibir = () => {
    appState.cifras.forEach((cifra) => cifra.alterarTom());
    renderDependingOnWindowSize();
  };

  if (reduzirMeioTom) {
    reduzirMeioTom.addEventListener('click', () => {
      let novoTom = Object.entries(dicionarioTons).filter(
        (nota) => nota[1] === dicionarioTons[appState.tom] - 1
      );
      if (!novoTom.length) {
        novoTom = 'B';
      } else {
        novoTom = novoTom[0][0];
      }
      appState.tom = novoTom;
      if (tomInput) {
        tomInput.value = diegoHackChangeBemois(appState.tom);
      }
      alterarTomEExibir();
    });
  }

  if (aumentarMeioTom) {
    aumentarMeioTom.addEventListener('click', () => {
      let novoTom = Object.entries(dicionarioTons).filter(
        (nota) => nota[1] === dicionarioTons[appState.tom] + 1
      );
      if (!novoTom.length) {
        novoTom = 'C';
      } else {
        novoTom = novoTom[0][0];
      }
      appState.tom = novoTom;
      if (tomInput) {
        tomInput.value = diegoHackChangeBemois(appState.tom);
      }
      alterarTomEExibir();
    });
  }

  if (tomInput) {
    tomInput.addEventListener('change', (event) => {
      let novoTom = event.target.value;
      if (Object.keys(dicionarioNotas).includes(novoTom)) {
        novoTom = Object.entries(dicionarioTons).filter(
          (tom) => tom[1] === dicionarioNotas[novoTom]
        )[0][0];
      } else {
        novoTom = appState.tom;
      }
      appState.tom = novoTom;
      tomInput.value = diegoHackChangeBemois(appState.tom);
      alterarTomEExibir();
    });
  }

  if (assinaturaToggle) {
    assinaturaToggle.addEventListener('change', (event) => {
      appState.premium = event.target.checked;
    });
  }
});
