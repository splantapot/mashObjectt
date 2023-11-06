const tela = document.getElementById("tela");
const esc = tela.getContext('2d');

const bTela = 10;
const hTela = 50;
const wTela = 50;
tela.height = hTela * bTela;
tela.width = wTela * bTela;

let pontos = [new pixel(bTela, rng(wTela), rng(hTela),"rgb(100,250,100)")];
const pF = new pixel(
    bTela,
    rng(wTela),
    rng(hTela),
    "rgb(250,250,100)"
  );

let end = false;
let endFail = false;

const timer = {
  start: new Date().getTime(),
  now: 0,
  dif: 0
}

const control = new steps(wTela,hTela,bTela,esc,pF);

fps()

function fps() {

  limparTela();
  
  for (p of pontos) {
    p.draw(esc);
    end = p.x==pF.x&&p.y==pF.y;
  }
  
  pF.draw(esc);
  
  //let nextGen = control.nextStep1();
  //let nextGen = control.nextStep2(pontos[pontos.length-1].x,pontos[pontos.length-1].y)
  //let nextGen = control.nextStep3(pontos[pontos.length-1].x,pontos[pontos.length-1].y)
  let nextGen = control.nextStep4(pontos[pontos.length-1].x,pontos[pontos.length-1].y);

  endFail = nextGen === false;

  if (!endFail) {
    pontos.push(new pixel(bTela, nextGen[0], nextGen[1],"rgb(100,250,100)"));
  }

  if (end) { 
    timer.now = new Date().getTime();
    timer.dif = Math.round((timer.now-timer.start)/1000);
    
    pF.color = "rgb(250,100,100)";
    pF.draw(esc);
    console.log(`Goal ok in ${(timer.dif-(timer.dif%60))/60} min and ${timer.dif%60} sec, with ${pontos.length} points.`);
  } else if (endFail) {

    console.log("End fail");
  } else if (!end && !endFail) {

    requestAnimationFrame(fps);
  }
}

function limparTela() {
  for (let y = 0; y < hTela; y++) {
    for (let x = 0; x < wTela; x++) {
      esc.fillStyle = (x+y)%2==0?"rgb(50,50,50)":"black";
      esc.fillRect(x*bTela,y*bTela,bTela,bTela);
    }
  }
}