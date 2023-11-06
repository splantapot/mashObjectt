class steps {

    constructor(wMax, hMax, size, context, target) {
        this.wMax = wMax;
        this.hMax = hMax;
        this.sMax = size;
        this.ctx = context;
        this.target = target;
    }

    draw(x, y) {
        this.ctx.strokeStyle = "red"
        this.ctx.beginPath();
        this.ctx.moveTo((x*this.sMax)+(this.sMax/2),(y*this.sMax)+(this.sMax/2))
        this.ctx.lineTo((this.target.x*this.sMax)+(this.sMax/2),(this.target.y*this.sMax)+(this.sMax/2))
        this.ctx.stroke()
    }

    nextStep1() {
        //Regra de aleatoriedade
        let nX = rng(this.wMax);
        let nY = rng(this.hMax);
      
        //Pega o pixel gerado
        let imgData = this.ctx.getImageData(nX * this.sMax, nY * this.sMax, 1, 1);

        this.draw(nX, nY);
      
        //Verifica se já existe bloco lá
        if (imgData.data[0] == 100 && imgData.data[1] == 250 && imgData.data[2] == 100) {
          //Procura um espaço livre se tiver bloco
          return this.nextStep1();
        } else {
          //Informa quais as coordenadas do livre
          return [nX, nY]
        }
    }

    nextStep2(x, y, count = 0) {
       
        //Eixo e direção com base na distância euclidiana
        const lado = [0, 1]
        const dir = [-1, 1]
        let rX = lado[rng(2)]
        let rY = 1 - rX
        rX *= dir[rng(2)]
        rY *= dir[rng(2)]
      
        //Define o novo local
        let nX = x+rX>0&&x+rX<this.wMax? x+rX:x-rX;
        let nY = y+rY>0&&y+rY<this.hMax? y+rY:y-rY;
        
        //Carrega o dado do novo local
        let imgData = this.ctx.getImageData( nX * this.sMax, nY * this.sMax, 1, 1).data;

        this.draw(x,y);

        //Checa se há algo no novo local
        if (imgData[0] == 100 && imgData[1] == 250 && imgData[2] == 100) {
            //Procura um espaço livre se tiver
            if (count >= 10) {
                console.log("Limite excedido: NextStep2");
                return false
            }
            return this.nextStep2(x,y,count+1);
        } else {
            //Informa quais as coordenadas do livre
            return [nX, nY]
        }
    }

    nextStep3(x, y, count = 0) {
        //distância total
        let dx = this.target.x-x;
        let dy = this.target.y-y;

        //Eixo e direção com base na distância euclidiana
        const lado = [0, 1]
        let rX = lado[rng(2)]
        let rY = 1 - rX
        rX *= Math.sign(dx)
        rY *= Math.sign(dy)
      
        //Define o novo local
        let nX = x+rX>0&&x+rX<this.wMax? x+rX:x-rX;
        let nY = y+rY>0&&y+rY<this.hMax? y+rY:y-rY;
        
        //Carrega o dado do novo local
        let imgData = this.ctx.getImageData( nX * this.sMax, nY * this.sMax, 1, 1).data;

        this.draw(x,y);
            
        //Checa se há algo no novo local
        if (imgData[0] == 100 && imgData[1] == 250 && imgData[2] == 100) {
            //Procura um espaço livre se tiver aaa'aa'
            if (count >= 10) {
                console.log("Limite excedido: NextStep3");
                return false;
            }
            return this.nextStep3(x,y,count+1);
        } else {
            //Informa quais as coordenadas do livre
            return [nX, nY];
        }
    }

    nextStep4(x, y, count = 0) {
        const gain = [-1,0,1];

        function check(g, limit) {
            let rG = gain[rng(3)];
            if (g+rG<0 || g+rG>limit) {
                return check(g)
            }
            return g+rG
        }
        
        let nX = check(x, this.wMax)
        let nY = check(y, this.hMax)

        let imgData = this.ctx.getImageData( nX * this.sMax, nY * this.sMax, 1, 1).data;

        this.draw(x,y);
        if (count >= 10) {
            console.log("Limite excedido: NextStep4");
            return false;
        }
        if ((imgData[0] == 100 && imgData[1] == 250 && imgData[2] == 100)) {
            //Procura um espaço livre se tiver aaa'aa'
            
            return this.nextStep4(x,y,count+1);
        } else {
            //Informa quais as coordenadas do livre
            return [nX, nY];
        }
    }
}