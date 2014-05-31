$(document).ready(function(){
  var guitar = Raphael(25,10,1200,400);
  guitar.canvas.setAttribute('id','Guitar');
  var fretboard = guitar.rect(0, 0, 1100, 200,10);
  fretboard.attr({fill: "rgb(164,111,65)",'stroke-width':0,'stroke':"#fff" });
  fret_bars = new Array();
  for(var i=1;i<11; i++){
    guitar.rect(i*100,0,15,200).attr({fill:"#CCCCCC",'stroke-width':0,'stroke':"#fff"});
  }
  var fret_dot = guitar.circle(260,100,20);
  fret_dot.attr({fill:"#ffffff",'stroke-width':0,'stroke':"#fff" });
  var fret_dot1 = guitar.circle(460,100,20);
  fret_dot1.attr({fill:"#ffffff",'stroke-width':0,'stroke':"#fff" });
  var fret_dot2 = guitar.circle(660,100,20);
  fret_dot2.attr({fill:"#ffffff",'stroke-width':0,'stroke':"#fff" });
  var fret_dot3 = guitar.circle(860,100,20);
  fret_dot3.attr({fill:"#ffffff",'stroke-width':0,'stroke':"#fff" });
  for(var i =0; i<1100;i=i+3){
    guitar.rect(i,20,1,10).attr({fill:"#8A8A8A",'stroke-width':0,'stroke':"#000" });
  }
  for(var i =0; i<1100;i=i+3){
    guitar.rect(i,50,1,10).attr({fill:"#8A8A8A",'stroke-width':0,'stroke':"#000" });
  }
  for(var i =0; i<1100;i=i+3){
    guitar.rect(i,80,1,10).attr({fill:"#8A8A8A",'stroke-width':0,'stroke':"#000" });
  }
  for(var i =0; i<1100;i=i+3){
    guitar.rect(i,110,1,10).attr({fill:"#8A8A8A",'stroke-width':0,'stroke':"#000" });
  }
  for(var i =0; i<1100;i=i+3){
    guitar.rect(i,140,1,10).attr({fill:"#8A8A8A",'stroke-width':0,'stroke':"#000" });
  }
  for(var i =0; i<1100;i=i+3){
    guitar.rect(i,170,1,10).attr({fill:"#8A8A8A",'stroke-width':0,'stroke':"#000" });
  }
  E2_string_list = new Array(guitar.circle(0,25,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  for(var i =40;i<1100;i=i+100){
    E2_string_list.push(guitar.circle(i,25,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  }
  B_string_list = new Array(guitar.circle(0,55,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  for(var i =40;i<1100;i=i+100){
    B_string_list.push(guitar.circle(i,55,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  }
  G_string_list = new Array(guitar.circle(0,85,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  for(var i =40;i<1100;i=i+100){
    G_string_list.push(guitar.circle(i,85,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  }
  D_string_list = new Array(guitar.circle(0,115,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  for(var i =40;i<1100;i=i+100){
    D_string_list.push(guitar.circle(i,115,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  }
  A_string_list = new Array(guitar.circle(0,145,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  for(var i =40;i<1100;i=i+100){
    A_string_list.push(guitar.circle(i,145,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  }
  E_string_list = new Array(guitar.circle(0,175,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  for(var i =40;i<1100;i=i+100){
    E_string_list.push(guitar.circle(i,175,10).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  }
  string_list= new Array(E_string_list,A_string_list,D_string_list,G_string_list,B_string_list,E2_string_list);
function computeScale(string_list,string_number,start_fret,scale,scale_rules,counter){
    highest_fret=10;
    fret=start_fret;
    moved_up=0;
    a=string_list[string_number];
    b=a[fret];
    scale.push(b);
    while(fret+scale_rules[counter%scale_rules.length]<= highest_fret){
      fret = fret+scale_rules[counter%scale_rules.length];
      if((fret == 3 && string_number==2) || (fret==4 && string_number==2) || (fret==9 && string_number ==3) || (fret==10 && string_number==3)){
        if(stored==0){
        }
        else{
          stored = new Array(counter+1,fret);
        }
      }
      a=string_list[string_number];
      b=a[fret];
      scale.push(b);
      counter++;
      if(moved_up==0 && fret>=5){
        moved_up = new Array(fret%5,counter);
      }
    }
    if (string_number !=5){
      computeScale(string_list,string_number+1,moved_up[0],scale,scale_rules,moved_up[1]);
    }
    return new Array(scale,stored);
  }

  function fillInScale(string_list,scale,scale_rules,stored){

    var k=0;
    if(stored[1]==2){
      k=0;
    }
    if(stored[1]==3){
      k=1;
    }
    if(stored[1]==9){
      k=0;
    }
    if(stored[1]==10){
      k=1;
    }
    var a=computeScale(string_list,0,k,scale,scale_rules,stored[0]);
    a = a[0]
    var b= new Array();
    for(var i=0;i<a.length;i++){
      if(scale.indexOf(a[i])== -1){
        b.push(a[i]);
      }
    }
    for(var i= b.length-1; i>=0;i = i-1){
      scale.unshift(b[i]);
    }
    return a;
  }
  E= computeScale(string_list,0,0,[],[2,2,1,2,2,2,1],0);
  E = fillInScale(string_list,E[0],[2,2,1,2,2,2,1],E[1]);
  var E_button= guitar.circle(60,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var E_text = guitar.text(60, 300, "E").attr({"font-size":30});
  E_flag=1;
  E_text.node.onclick = function () {
    E_flag++;
    if(E_flag%2==0){
      for(var i =0; i<E.length;i++){
        E[i].show();
        E_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<E.length;i++){
        E[i].hide();
        E_button.attr({fill:"#FF6600"});
      }
    }
  };
  E_button.node.onclick = function () {
    E_flag++;
    if(E_flag%2==0){
      for(var i =0; i<E.length;i++){
        E[i].show();
        E_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<E.length;i++){
        E[i].hide();
        E_button.attr({fill:"#FF6600"});
      }
    }
  };
  F= computeScale(string_list,0,1,[],[2,2,1,2,2,2,1],0);
  F = fillInScale(string_list,F[0],[2,2,1,2,2,2,1],F[1]);
  var F_button= guitar.circle(120,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var F_text = guitar.text(120, 300, "F").attr({"font-size":30});
  F_flag=1;
  F_text.node.onclick = function () {
    F_flag++;    
    if(F_flag%2==0){
      for(var i =0; i<F.length;i++){
        F[i].show();
        F_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<F.length;i++){
        F[i].hide();
        F_button.attr({fill:"#FF6600"});
      }
    }

  };
  F_button.node.onclick = function () {
    F_flag++;    
    if(F_flag%2==0){
      for(var i =0; i<F.length;i++){
        F[i].show();
        F_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<F.length;i++){
        F[i].hide();
        F_button.attr({fill:"#FF6600"});
      }
    }

  };
  Gm= computeScale(string_list,0,2,[],[2,2,1,2,2,2,1],0);
  Gm = fillInScale(string_list,Gm[0],[2,2,1,2,2,2,1],Gm[1]);
  var Gm_button= guitar.circle(180,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var Gm_text = guitar.text(180, 300, "Gm").attr({"font-size":30});
  Gm_flag=1;
  Gm_text.node.onclick = function () {
    Gm_flag++;
    if(Gm_flag%2==0){
      for(var i =0; i<Gm.length;i++){
        Gm[i].show();
        Gm_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<Gm.length;i++){
        Gm[i].hide();
        Gm_button.attr({fill:"#FF6600"});
      }
    }

  };
  Gm_button.node.onclick = function () {
    Gm_flag++;
    if(Gm_flag%2==0){
      for(var i =0; i<Gm.length;i++){
        Gm[i].show();
        Gm_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<Gm.length;i++){
        Gm[i].hide();
        Gm_button.attr({fill:"#FF6600"});
      }
    }

  };
  var G= computeScale(string_list,0,3,[],[2,2,1,2,2,2,1],0);
  var G = fillInScale(string_list,G[0],[2,2,1,2,2,2,1],G[1]);
  var G_button= guitar.circle(240,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var G_text = guitar.text(240, 300, "G").attr({"font-size":30});
  G_flag=1;
  G_text.node.onclick = function () {
    G_flag++;    
    if(G_flag%2==0){
      for(var i =0; i<G.length;i++){
        G[i].show();
        G_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<G.length;i++){
        G[i].hide();
        G_button.attr({fill:"#FF6600"});
      }
    }

  };
  G_button.node.onclick = function () {
    G_flag++;
    if(G_flag%2==0){
      for(var i =0; i<G.length;i++){
        G[i].show();
        G_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<G.length;i++){
        G[i].hide();
        G_button.attr({fill:"#FF6600"});
      }
    }

  };
  Am= computeScale(string_list,0,4,[],[2,2,1,2,2,2,1],0);
  Am = fillInScale(string_list,Am[0],[2,2,1,2,2,2,1],Am[1]);
  var Am_button= guitar.circle(300,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var Am_text = guitar.text(300, 300, "Am").attr({"font-size":30});
  Am_flag=1;
  Am_text.node.onclick = function () {
    Am_flag++;    
    if(Am_flag%2==0){
      for(var i =0; i<Am.length;i++){
        Am[i].show();
        Am_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<Am.length;i++){
        Am[i].hide();
        Am_button.attr({fill:"#FF6600"});
      }
    }

  };
  Am_button.node.onclick = function () {
    Am_flag++;    
    if(Am_flag%2==0){
      for(var i =0; i<Am.length;i++){
        Am[i].show();
        Am_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<Am.length;i++){
        Am[i].hide();
        Am_button.attr({fill:"#FF6600"});
      }
    }
  };
  A= computeScale(string_list,0,5,[],[2,2,1,2,2,2,1],0);
  A = fillInScale(string_list,A[0],[2,2,1,2,2,2,1],A[1]);
  var A_button= guitar.circle(360,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var A_text = guitar.text(360, 300, "A").attr({"font-size":30});
  A_flag=1;
  A_text.node.onclick = function () {
    A_flag++;    
    if(A_flag%2==0){
      for(var i =0; i<A.length;i++){
        A[i].show();
        A_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<A.length;i++){
        A[i].hide();
        A_button.attr({fill:"#FF6600"});
      }
    }

  };
  A_button.node.onclick = function () {
    A_flag++;
    if(A_flag%2==0){
      for(var i =0; i<A.length;i++){
        A[i].show();
        A_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<A.length;i++){
        A[i].hide();
        A_button.attr({fill:"#FF6600"});
      }
    }
  };
  Bm= computeScale(string_list,0,6,[],[2,2,1,2,2,2,1],0);
  Bm = fillInScale(string_list,Bm[0],[2,2,1,2,2,2,1],Bm[1]);
  var Bm_button= guitar.circle(420,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var Bm_text = guitar.text(420, 300, "Bm").attr({"font-size":30});
  Bm_flag=1;
  Bm_text.node.onclick = function () {
    Bm_flag++;    
    if(Bm_flag%2==0){
      for(var i =0; i<Bm.length;i++){
        Bm[i].show();
        Bm_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<Bm.length;i++){
        Bm[i].hide();
        Bm_button.attr({fill:"#FF6600"});
      }
    }

  };
  Bm_button.node.onclick = function () {
    Bm_flag++;
    if(Bm_flag%2==0){
      for(var i =0; i<Bm.length;i++){
        Bm[i].show();
        Bm_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<Bm.length;i++){
        Bm[i].hide();
        Bm_button.attr({fill:"#FF6600"});
      }
    }
  };
  B= computeScale(string_list,0,7,[],[2,2,1,2,2,2,1],0);
  B = fillInScale(string_list,B[0],[2,2,1,2,2,2,1],B[1]);
  var B_button= guitar.circle(480,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var B_text = guitar.text(480, 300, "B").attr({"font-size":30});
  B_flag=1;
  B_text.node.onclick = function () {
    B_flag++;    
    if(B_flag%2==0){
      for(var i =0; i<B.length;i++){
        B[i].show();
        B_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<B.length;i++){
        B[i].hide();
        B_button.attr({fill:"#FF6600"});
      }
    }
  };
  B_button.node.onclick = function () {
    B_flag++;
    if(B_flag%2==0){
      for(var i =0; i<B.length;i++){
        B[i].show();
        B_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<B.length;i++){
        B[i].hide();
        B_button.attr({fill:"#FF6600"});
      }
    }
  };
  C= computeScale(string_list,1,3,[],[2,2,1,2,2,2,1],0);
  C = fillInScale(string_list,C[0],[2,2,1,2,2,2,1],C[1]);
  var C_button= guitar.circle(540,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var C_text = guitar.text(540, 300, "C").attr({"font-size":30});
  C_flag=1;
  C_text.node.onclick = function () {
    C_flag++;    
    if(C_flag%2==0){
      for(var i =0; i<C.length;i++){
        C[i].show();
        C_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<C.length;i++){
        C[i].hide();
        C_button.attr({fill:"#FF6600"});
      }
    }

  };
  C_button.node.onclick = function () {
    C_flag++;    
    if(C_flag%2==0){
      for(var i =0; i<C.length;i++){
        C[i].show();
        C_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<C.length;i++){
        C[i].hide();
        C_button.attr({fill:"#FF6600"});
      }
    }
  };
  Dm= computeScale(string_list,1,4,[],[2,2,1,2,2,2,1],0);
  Dm = fillInScale(string_list,Dm[0],[2,2,1,2,2,2,1],Dm[1]);
  var Dm_button= guitar.circle(600,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var Dm_text = guitar.text(600, 300, "Dm").attr({"font-size":30});
  Dm_flag=1;
  Dm_text.node.onclick = function () {
    Dm_flag++;
    if(Dm_flag%2==0){
      for(var i =0; i<Dm.length;i++){
        Dm[i].show();
        Dm_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<Dm.length;i++){
        Dm[i].hide();
        Dm_button.attr({fill:"#FF6600"});
      }
    }
  };
  Dm_button.node.onclick = function () {
    Dm_flag++;    
    if(Dm_flag%2==0){
      for(var i =0; i<Dm.length;i++){
        Dm[i].show();
        Dm_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<Dm.length;i++){
        Dm[i].hide();
        Dm_button.attr({fill:"#FF6600"});
      }
    }
  };
  D= computeScale(string_list,1,5,[],[2,2,1,2,2,2,1],0);
  D = fillInScale(string_list,D[0],[2,2,1,2,2,2,1],D[1]);
  var D_button= guitar.circle(660,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var D_text = guitar.text(660, 300, "D").attr({"font-size":30});
  var D_flag=1;
  D_text.node.onclick = function () {
    D_flag++;    
    if(D_flag%2==0){
      for(var i =0; i<D.length;i++){
        D[i].show();
        D_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<D.length;i++){
        D[i].hide();
        D_button.attr({fill:"#FF6600"});
      }
    }
  };
  D_button.node.onclick = function () {
    D_flag++;    
    if(D_flag%2==0){
      for(var i =0; i<D.length;i++){
        D[i].show();
        D_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<D.length;i++){
        D[i].hide();
        D_button.attr({fill:"#FF6600"});
      }
    }
  };
  Em= computeScale(string_list,1,6,[],[2,2,1,2,2,2,1],0);
  Em = fillInScale(string_list,Em[0],[2,2,1,2,2,2,1],Em[1]);
  var Em_button= guitar.circle(720,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var Em_text = guitar.text(720, 300, "Em").attr({"font-size":30});
  Em_flag=1;
  Em_text.node.onclick = function () {
    Em_flag++;
    if(Em_flag%2==0){
      for(var i =0; i<Em.length;i++){
        Em[i].show();
        Em_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<Em.length;i++){
        Em[i].hide();
        Em_button.attr({fill:"#FF6600"});
      }
    }
  };
  Em_button.node.onclick = function () {
    Em_flag++;    
    if(Em_flag%2==0){
      for(var i =0; i<Em.length;i++){
        Em[i].show();
        Em_button.attr({fill:"red"});
      }
    }
    else{
      for(var i =0; i<Em.length;i++){
        Em[i].hide();
        Em_button.attr({fill:"#FF6600"});
      }
    }
  };
  $("#Guitar").hide();
});
