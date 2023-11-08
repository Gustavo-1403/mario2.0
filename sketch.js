//variáveis globais
var fundo
var fundoImg
var tubo
var tuboImg
var mario
var marioImg
var chao
var numvem1
var nuvem2
var grupoDeNuvens
var ilha1
var ilha2
var grupoDeIlhas
var moeda1
var grupoDeMoedas
var tartarugaImg
var grupoDeTartarugas
var estrelaImg
var grupoDeEstrelas
var vidas = 1
var score = 0
var gameState = "playP"
var marioCimg
var pulou = false
var paredeE
var reset
var over
var resetImg
var overImg


//preload
function preload() {

  fundoImg = loadImage("assets/fundo.png")
  tuboImg = loadImage("assets/tubo.png")
  marioImg = loadImage("assets/mario1.png")
  nuvem1 = loadImage("assets/nuvem1.png")
  nuvem2 = loadImage("assets/nuvem2.png")
  ilha1 = loadImage("assets/ilha1.png")
  ilha2 = loadImage("assets/ilha2.png")
  moeda1 = loadImage("assets/moeda1.png")
  tartarugaImg = loadAnimation("assets/turtle1.png", "assets/turtle2.png", "assets/turtle3.png", "assets/turtle4.png", "assets/turtle5.png")
  estrelaImg = loadImage("assets/estrela.png")
  marioCimg = loadAnimation("assets/mario1.png", "assets/mario2.png", "assets/mario3.png")
  resetImg = loadImage("assets/reset.png")
  overImg = loadImage("assets/gameOver.png")


}

//setup
function setup() {
  createCanvas(800, 400);

  //grupos
  grupoDeNuvens = new Group()
  grupoDeIlhas = new Group()
  grupoDeMoedas = new Group()
  grupoDeTartarugas = new Group()
  grupoDeEstrelas = new Group()

  //sprites
  score = 0
  fundo = createSprite(400, 100)
  tubo = createSprite(40, 370)
  mario = createSprite(40, 275)
  chao = createSprite(400, 400, 800, 30)
  paredeE = createSprite(0,200,10,400)
  reset = createSprite(400,250)
  over = createSprite(400,150)

  //adicionar imagens e animações
  fundo.addImage(fundoImg)
  tubo.addImage(tuboImg)
  mario.addImage(marioImg)
  mario.addAnimation("correndo", marioCimg)
  reset.addImage(resetImg)
  over.addImage(overImg)

  //tamanho dos sprites
  fundo.scale = 2.5
  tubo.scale = 0.4
  mario.scale = 2
  reset.scale = 0.2
  over.scale = 0.4

  //visibilidade
  chao.visible = false
  paredeE.visible = false
  reset.visible = false
  over.visible = false



}

//draw
function draw() {
  background(200, 200, 200);




  drawSprites();

  if (gameState === "playP") {

    fill("black")
    text("Olá, este é um jogo infinito!",200,200)
    text("Aperte ENTER para começar o jogo!",200,215)
    text("Para pular aperte a tecla ESPAÇO!",200,230)
    text("Tenha um BOM JOGO!!!",200,245)
    text("Créditos: ultrad.com.br",650,390)

    if (keyDown(13)) {
      gameState = "play"
    }

  } else if (gameState === "play") {

    mario.velocityY += 1
    

    gerarNuvens()
    gerarIlhas()

    var select = Math.round(random(1, 3));

    if (World.frameCount % 75 == 0) {
      switch (select) {
        case 1: gerarMoedas();
          break;
        case 2: gerarTartarugas();
          break;
        case 3: gerarEstrelas();
          break;

        default: break;
      }
    }

    //fundo infinito
    if (fundo.x < 0) {
      fundo.x = width / 2 * 3

    }

    if (keyDown(32) && !pulou && mario.collide(tubo)) {
      //velocidade do fundo
      fundo.velocityX = - 6
      mario.velocityY = -20
      tubo.destroy()
      mario.changeAnimation("correndo");
      pulou = true
    }

    if (keyDown(32) && pulou && mario.collide(grupoDeIlhas)) {
      mario.velocityY = -20

    }

    // if(mario.y > height){
    //   gameState = "end"
    // }

    mario.collide(tubo)
    mario.collide(grupoDeIlhas)

    if(mario.isTouching(paredeE) || mario.isTouching(chao)){

      gameState = "end"

    }

    if(mario.isTouching(grupoDeTartarugas)){

      grupoDeTartarugas.destroyEach()
      vidas -= 1

    }

    if (vidas <= 0) {

      gameState = "end";

    }

    if(mario.isTouching(grupoDeEstrelas)){

      grupoDeEstrelas.destroyEach()
      vidas += 1

    }

    if(mario.isTouching(grupoDeMoedas)){

      grupoDeMoedas.destroyEach()
      score += 1

    }


  } else if(gameState === "end"){

    mario.destroy()
    grupoDeEstrelas.destroyEach()
    grupoDeIlhas.destroyEach()
    grupoDeMoedas.destroyEach()
    grupoDeNuvens.destroyEach()
    grupoDeTartarugas.destroyEach()
    reset.visible = true
    over.visible = true
    fundo.velocityX = 0

    if(mousePressedOver(reset)){ window.location.reload() }


  }


  fill("black")
  text("Score: " + score, 700, 50);
  text("Vidas:" + vidas, 640, 50)



}//fim do draw



function gerarNuvens() {
  if (frameCount % 75 === 0) {
    var nuvem = createSprite(800, 100, 10, 40);
    nuvem.velocityX = -3

    //switch case vai gerar obstaculos aleatorios 
    //cria uma variavel aleatoria para armazenar um numero aleatorio, e passa essa variável no switch, para entrar no caso aleatorio 

    var aleatorio = Math.round(random(1, 2));
    switch (aleatorio) {
      case 1: nuvem.addImage(nuvem1);
        nuvem.scale = 0.15
        break;
      case 2: nuvem.addImage(nuvem2);
        nuvem.scale = 0.1
        break;

      default: break;
    }

    //definir tamanho do objeto 
    //obstaculo.scale=0.5;

    //atribui tempo de duração do obstaculo
    nuvem.lifetime = 270;

    //adiciona cada obstaculo ao grupo
    grupoDeNuvens.add(nuvem);


  }
}

function gerarIlhas() {
  if (frameCount % 75 === 0) {
    var ilha = createSprite(800, Math.round(random(310, 350)), 10, 10);
    ilha.velocityX = -3

    //switch case vai gerar obstaculos aleatorios 
    //cria uma variavel aleatoria para armazenar um numero aleatorio, e passa essa variável no switch, para entrar no caso aleatorio 

    var aleatorio = Math.round(random(1, 2));
    switch (aleatorio) {
      case 1: ilha.addImage(ilha1);
        ilha.scale = 0.6
        break;
      case 2: ilha.addImage(ilha2);
        ilha.scale = 0.6
        break;

      default: break;
    }

    //definir tamanho do objeto 
    //obstaculo.scale=0.5;

    //atribui tempo de duração do obstaculo
    ilha.lifetime = 270;

    //adiciona cada obstaculo ao grupo
    grupoDeIlhas.add(ilha);


  }
}

function gerarMoedas() {
  var moeda = createSprite(800, Math.round(random(270, 300)), 10, 10);
  moeda.addImage(moeda1);
  moeda.velocityX = -3;
  moeda.lifetime = 270;
  moeda.scale = 0.08;
  grupoDeMoedas.add(moeda);
}

function gerarTartarugas() {
  var tartaruga = createSprite(800, Math.round(random(270, 300)), 10, 10);
  tartaruga.addAnimation("tartaruga", tartarugaImg);
  tartaruga.velocityX = -3;
  tartaruga.lifetime = 270;
  tartaruga.scale = 1;
  tartaruga.mirrorX(-1)
  grupoDeTartarugas.add(tartaruga);
}

function gerarEstrelas() {
  var estrela = createSprite(800, Math.round(random(270, 300)), 10, 10);
  estrela.addImage(estrelaImg);
  estrela.velocityX = -3;
  estrela.lifetime = 270;
  estrela.scale = 0.08;
  grupoDeEstrelas.add(estrela);
}

