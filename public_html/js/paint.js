$(function(){
    max_w = $(document).width();
    max_h = $(document).height();
       
    /*
    $('#myCanvas').css('width', max_w);
    $('#myCanvas').css('height', max_h*0.9);
    */
   
    $('#show-graph').click(function(){
        $('#canvas').hide();
        max_w = $(document).width();
        max_h = $(document).height();
        createGraph();
        $('#canvas').slideDown(2000);
   }); 
   
   function createGraph(){
        var c=document.getElementById("myCanvas");
        c.width = max_w;
        c.height = max_h*0.9;
        var ctx=c.getContext("2d");
        
        //ctx.clearRect(0, 0, c.width, c.height);
        
       var graph = {
            //масив значень
            vars: new Array(200, 32, 480, 360, 1200, 320, 50, 195, 320, 150),
            //масив кольорів
            colors: new Array('red', 'green', 'blue', 'yellow', 'black', 'lime'),
            //відступ зліва
            left: 0.05*c.width,
            //відступ знизу
            bottom: 0.05*c.height,
            //відстань від тексту до графіка
            marg: 3,
            //колір тексту
            color: 'black'
        };
        
        graph.maxitem = Math.max.apply(Math, graph.vars);
        //ширина стовпця в залежності від кількості значень та доступної ширини канваса
        graph.width = (c.width-(graph.left*2))/graph.vars.length;
        //ширина стовця не повинна перевишувати 7% ширини канваса
        graph.width = graph.width>(c.width*0.07)?(c.width*0.07):graph.width;
        //шрифт
        graph.textheight = graph.width*0.5;
        graph.font = graph.textheight+'px arial';
        ctx.textAlign = "center";
        graph.avheight = c.height - (graph.bottom * 2) - graph.textheight;
        
        alert(c.height);
        
        drawGraph(ctx, c, graph);
    }
   
    //функція для малювання стовпчикової діаграми
    function drawGraph(ctx, c, graph){
        //встановлюємо початкову координату у
        var y = c.height-graph.bottom;
        var len = graph.colors.length;
        var t= (graph.vars[0]/graph.maxitem) * graph.avheight;
        ctx.beginPath();
        ctx.moveTo(graph.left+graph.width/2, y-t);
        alert(graph.avheight);
        
        graph.vars.forEach(function(item, index){
            var st = (graph.width * index) + graph.left;
            var h = item / graph.maxitem * graph.avheight;
            
            ctx.fillStyle=graph.colors[index%len];
            
            ctx.fillRect(st, (y-h), graph.width, h);
            ctx.fillStyle=graph.color;
            ctx.font = graph.font;
            
            
            ctx.lineTo(st+graph.width/2, (y-h));
            ctx.moveTo(st+graph.width/2, (y-h));
            
            ctx.fillText(item, st+graph.width/2, (y-h)-graph.marg, graph.width);
            
        });
      
        ctx.strokeStyle = "#aaa";
        ctx.lineWidth = 3;
        ctx.stroke();
    }
});