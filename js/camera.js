const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");
let imagemURL = "";

botaoIniciarCamera.addEventListener('click', async function () {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";
    video.play();
});

botaoTirarFoto.addEventListener('click', function () {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL('image/jpeg');

    video.style.display = "none";
    botaoTirarFoto.style.display = "none";
    mensagem.style.display = "block";
});

botaoEnviarFoto.addEventListener('click', () => {
    const dadosExistentes = localStorage.getItem("cadastro");
    const dadosFormulario = JSON.parse(dadosExistentes);

    dadosFormulario.imagem = imagemURL;

    localStorage.setItem("cadastro", JSON.stringify(dadosFormulario));

    window.location.href = "./abrir-conta-form-3.html";
});
