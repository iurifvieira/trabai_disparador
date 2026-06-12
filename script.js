// função para botao de enviar  imagem para o campo de midia
document.querySelectorAll('.drop-zone__input').forEach((inputElement) => {
    const dropZoneElement = inputElement.closest('.midia-grupo');

    if (!dropZoneElement) return;

    // clicar na área ou no label abre o seletor
    dropZoneElement.addEventListener('click', (e) => {
        // evitar que clique no botão interno dispare duas vezes
        if (e.target.classList.contains('drop-zone-button')) return;
        inputElement.click();
    });

    inputElement.addEventListener('change', () => {
        if (inputElement.files.length) {
            updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
    });

    dropZoneElement.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZoneElement.classList.add('midia-grupo--over');
    });

    dropZoneElement.addEventListener('dragleave', () => {
        dropZoneElement.classList.remove('midia-grupo--over');
    });

    dropZoneElement.addEventListener('dragend', () => {
        dropZoneElement.classList.remove('midia-grupo--over');
    });

    dropZoneElement.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }
        dropZoneElement.classList.remove('midia-grupo--over');
    });
});

function updateThumbnail(dropZoneElement, file) {
    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }

    if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
    }

    thumbnailElement.dataset.label = file.name;

    if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
    } else {
        thumbnailElement.style.backgroundImage = null;
    }
}

// função para botoes auxiliares no campo de digitação de mensagem
const campo = document.getElementById("meuCampo");
const botoes = document.querySelectorAll(".button-mensagem");

if (campo) {
    //  Passa por cada botão e adiciona o evento de clique
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            // Pega o texto de dentro do botão clicado
            const textoDoBotao = botao.textContent;

            // Adiciona o texto ao campo 
            campo.value += textoDoBotao + " ";

            // Devolve o foco para o campo de texto
            campo.focus();
        });
    });
}

// funcao para digitacao de mensagens, aparece no card do celular 
const campoDigitacao = document.getElementById("meuCampo");
const balaoCelular = document.getElementById("balaoZap");

if (campoDigitacao && balaoCelular) {
    //  pega o que é digitado 
    campoDigitacao.addEventListener("input", () => {
        const textoAtual = campoDigitacao.value;
        
        // Se o campo não estiver vazio, mostra o balão e atualiza o texto
        if (textoAtual.trim() !== "") {
            balaoCelular.style.display = "block";
            balaoCelular.textContent = textoAtual;
        } else {
            // Se o usuário apagar tudo, o balão some
            balaoCelular.style.display = "none";
        }
    });
}

// Função de foto de perfil do usuário
const fotoUsuario = document.getElementById("fotoUsuario");
const inputFotoUsuario = document.getElementById("inputFotoUsuario");
const perfilFotoStorage = "perfilFotoUsuario";

if (fotoUsuario && inputFotoUsuario) {
    const fotoSalva = localStorage.getItem(perfilFotoStorage);
    if (fotoSalva) {
        fotoUsuario.src = fotoSalva;
    }

    inputFotoUsuario.addEventListener("change", () => {
        if (!inputFotoUsuario.files || !inputFotoUsuario.files[0]) return;
        const arquivo = inputFotoUsuario.files[0];

        if (!arquivo.type.startsWith("image/")) {
            alert("Por favor, selecione uma imagem válida.");
            return;
        }

        const leitor = new FileReader();
        leitor.onload = () => {
            fotoUsuario.src = leitor.result;
            localStorage.setItem(perfilFotoStorage, leitor.result);
        };
        leitor.readAsDataURL(arquivo);
    });
}