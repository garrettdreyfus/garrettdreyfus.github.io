$(document).ready(function(){
  var bass = Raphael(25, 10, 1200, 400);
  bass.canvas.setAttribute('id', 'Bass');
  var fretboard = bass.rect(0, 0, 1100, 200,10);
  fretboard.attr({fill: "rgb(164,111,65)",'stroke-width':0,'stroke':"#fff" });
  fret_bars = new Array();
  for(var i=1;i<11; i++){
    bass.rect(i*100,0,15,200).attr({fill:"#CCCCCC",'stroke-width':0,'stroke':"#fff"});
  }
  var fret_dot = bass.circle(260,100,20);
  fret_dot.attr({fill:"#ffffff",'stroke-width':0,'stroke':"#fff" });
  var fret_dot1 = bass.circle(460,100,20);
  fret_dot1.attr({fill:"#ffffff",'stroke-width':0,'stroke':"#fff" });
  var fret_dot2 = bass.circle(660,100,20);
  fret_dot2.attr({fill:"#ffffff",'stroke-width':0,'stroke':"#fff" });
  var fret_dot3 = bass.circle(860,100,20);
  fret_dot3.attr({fill:"#ffffff",'stroke-width':0,'stroke':"#fff" });
  var G_string = bass.rect(10,30,1100,10);
  var D_string = bass.rect(10,80,1100,10);
  var A_string = bass.rect(10,130,1100,10);
  var E_string = bass.rect(10,180,1100,10);
  G_string.attr({fill:"#BmCC6CC",'stroke-width':0,'stroke':"#000" });
  D_string.attr({fill:"#BmCC6CC",'stroke-width':0,'stroke':"#000" });
  A_string.attr({fill:"#BmCC6CC",'stroke-width':0,'stroke':"#000" });
  E_string.attr({fill:"#BmCC6CC",'stroke-width':0,'stroke':"#000" });
  for(var i =0; i<1100;i=i+3){
    bass.rect(i,20,1,10).attr({fill:"#8A8A8A",'stroke-width':0,'stroke':"#000" });
  }
  for(var i =0; i<1100;i=i+3){
    bass.rect(i,70,1,10).attr({fill:"#8A8A8A",'stroke-width':0,'stroke':"#000" });
  }
  for(var i =0; i<1100;i=i+3){
    bass.rect(i,120,1,10).attr({fill:"#8A8A8A",'stroke-width':0,'stroke':"#000" });
  }
  for(var i =0; i<1100;i=i+3){
    bass.rect(i,170,1,10).attr({fill:"#8A8A8A",'stroke-width':0,'stroke':"#000" });
  }
  G_string_list = new Array(bass.circle(0,25,15).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  for(var i =40;i<1100;i=i+100){
    G_string_list.push(bass.circle(i,25,15).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  }
  D_string_list = new Array(bass.circle(0,75,15).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  for(var i =40;i<1100;i=i+100){
    D_string_list.push(bass.circle(i,75,15).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  }
  A_string_list = new Array(bass.circle(0,125,15).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  for(var i =40;i<1100;i=i+100){
    A_string_list.push(bass.circle(i,125,15).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  }
  E_string_list = new Array(bass.circle(0,175,15).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  for(var i =40;i<1100;i=i+100){
    E_string_list.push(bass.circle(i,175,15).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" }).hide());
  }
  string_list= new Array(E_string_list,A_string_list,D_string_list,G_string_list);
  function computeScale(string_list,string_number,start_fret,scale,scale_rules,counter){
    highest_fret=10;
    fret=start_fret;
    moved_up=0;
    a=string_list[string_number];
    b=a[fret];
    scale.push(b);
    stored =0;
    while(fret+scale_rules[counter%scale_rules.length]<= highest_fret){
      fret = fret+scale_rules[counter%scale_rules.length];
      if((fret == 3 && string_number==2) || (fret==4 && string_number==2) || (fret==9 && string_number ==3) || (fret==10 && string_number==3)){
        if(stored==0){
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
    if (string_number !=3){
      computeScale(string_list,string_number+1,moved_up[0],scale,scale_rules,moved_up[1]);
    }
    return new Array(scale,stored);
  }
  function fillInScale(string_list,scale,scale_rules,stored){
    if(stored[1]==2){
      a=computeScale(string_list,0,0,scale,scale_rules,stored[0]);
    }
    if(stored[1]==3){
      a=computeScale(string_list,0,1,scale,scale_rules,stored[0]);
    }
    if(stored[1]==9){
      a=computeScale(string_list,0,0,scale,scale_rules,stored[0]);
    }
    if(stored[1]==10){
      a=computeScale(string_list,0,1,scale,scale_rules,stored[0]);
    }
    a = a[0]
    b= new Array();
    for(var i=0;i<a.length;i++){
      if(scale.indexOf(a[i])== -1){
        b.push(a[i]);
      }
    }
    for(var i= b.length-1; i>=0;i = i-1){
      scale.unshift(b[i]);
    }
    return a
  }
  
  var E= computeScale(string_list,0,0,[],[2,2,1,2,2,2,1],0);
  var E = fillInScale(string_list,E[0],[2,2,1,2,2,2,1],E[1]);
  var E_button= bass.circle(60,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var E_text = bass.text(60, 300, "E").attr({"font-size":30});
  var E_flag=0;
  E_text.node.onclick = function () {
    
    if(E_flag%2==0){
      for(var i =0; i<E.length;i++){
        E[i].show();
        E_button.attr({fill:"red"});
      }
      E_flag++;
    }
    else{
      for(var i =0; i<E.length;i++){
        E[i].hide();
        E_button.attr({fill:"#FF6600"});
      }
      E_flag++;
    }

  };
  E_button.node.onclick = function () {
    if(E_flag%2==0){
      for(var i =0; i<E.length;i++){
        E[i].show();
        E_button.attr({fill:"red"});
      }
      E_flag++;
    }
    else{
      for(var i =0; i<E.length;i++){
        E[i].hide();
        E_button.attr({fill:"#FF6600"});
      }
      E_flag++;
    }

  };
  var F= computeScale(string_list,0,1,[],[2,2,1,2,2,2,1],0);
  var F = fillInScale(string_list,F[0],[2,2,1,2,2,2,1],F[1]);
  var F_button= bass.circle(120,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var F_text = bass.text(120, 300, "F").attr({"font-size":30});
  var F_flag=0;
  F_text.node.onclick = function () {
    if(F_flag%2==0){
      for(var i =0; i<F.length;i++){
        F[i].show();
        F_button.attr({fill:"red"});
      }
      F_flag++;
    }
    else{
      for(var i =0; i<F.length;i++){
        F[i].hide();
        F_button.attr({fill:"#FF6600"});
      }
      F_flag++;
    }

  };
  F_button.node.onclick = function () {
    if(F_flag%2==0){
      for(var i =0; i<F.length;i++){
        F[i].show();
        F_button.attr({fill:"red"});
      }
      F_flag++;
    }
    else{
      for(var i =0; i<F.length;i++){
        F[i].hide();
        F_button.attr({fill:"#FF6600"});
      }
      F_flag++;
    }

  };
  var Gm= computeScale(string_list,0,2,[],[2,2,1,2,2,2,1],0);
  var Gm = fillInScale(string_list,Gm[0],[2,2,1,2,2,2,1],Gm[1]);
  var Gm_button= bass.circle(180,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var Gm_text = bass.text(180, 300, "Gm").attr({"font-size":30});
  var Gm_flag=0;
  Gm_text.node.onclick = function () {
    if(Gm_flag%2==0){
      for(var i =0; i<Gm.length;i++){
        Gm[i].show();
        Gm_button.attr({fill:"red"});
      }
      Gm_flag++;
    }
    else{
      for(var i =0; i<Gm.length;i++){
        Gm[i].hide();
        Gm_button.attr({fill:"#FF6600"});
      }
      Gm_flag++;
    }

  };
  Gm_button.node.onclick = function () {
    if(Gm_flag%2==0){
      for(var i =0; i<Gm.length;i++){
        Gm[i].show();
        Gm_button.attr({fill:"red"});
      }
      Gm_flag++;
    }
    else{
      for(var i =0; i<Gm.length;i++){
        Gm[i].hide();
        Gm_button.attr({fill:"#GmGm6600"});
      }
      Gm_flag++;
    }

  };
  var G= computeScale(string_list,0,3,[],[2,2,1,2,2,2,1],0);
  var G = fillInScale(string_list,G[0],[2,2,1,2,2,2,1],G[1]);
  var G_button= bass.circle(240,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var G_text = bass.text(240, 300, "G").attr({"font-size":30});
  var G_flag=0;
  G_text.node.onclick = function () {
    if(G_flag%2==0){
      for(var i =0; i<G.length;i++){
        G[i].show();
        G_button.attr({fill:"red"});
      }
      G_flag++;
    }
    else{
      for(var i =0; i<G.length;i++){
        G[i].hide();
        G_button.attr({fill:"#FF6600"});
      }
      G_flag++;
    }

  };
  G_button.node.onclick = function () {
    if(G_flag%2==0){
      for(var i =0; i<G.length;i++){
        G[i].show();
        G_button.attr({fill:"red"});
      }
      G_flag++;
    }
    else{
      for(var i =0; i<G.length;i++){
        G[i].hide();
        G_button.attr({fill:"#FF6600"});
      }
      G_flag++;
    }

  };
  var Am= computeScale(string_list,0,4,[],[2,2,1,2,2,2,1],0);
  var Am = fillInScale(string_list,Am[0],[2,2,1,2,2,2,1],Am[1]);
  var Am_button= bass.circle(300,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var Am_text = bass.text(300, 300, "Am").attr({"font-size":30});
  var Am_flag=0;
  Am_text.node.onclick = function () {
    if(Am_flag%2==0){
      for(var i =0; i<Am.length;i++){
        Am[i].show();
        Am_button.attr({fill:"red"});
      }
      Am_flag++;
    }
    else{
      for(var i =0; i<Am.length;i++){
        Am[i].hide();
        Am_button.attr({fill:"#FF6600"});
      }
      Am_flag++;
    }

  };
  Am_button.node.onclick = function () {
    if(Am_flag%2==0){
      for(var i =0; i<Am.length;i++){
        Am[i].show();
        Am_button.attr({fill:"red"});
      }
      Am_flag++;
    }
    else{
      for(var i =0; i<Am.length;i++){
        Am[i].hide();
        Am_button.attr({fill:"#FF6600"});
      }
      Am_flag++;
    }
  };
  var A= computeScale(string_list,0,5,[],[2,2,1,2,2,2,1],0);
  var A = fillInScale(string_list,A[0],[2,2,1,2,2,2,1],A[1]);
  var A_button= bass.circle(360,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var A_text = bass.text(360, 300, "A").attr({"font-size":30});
  var A_flag=0;
  A_text.node.onclick = function () {
    if(A_flag%2==0){
      for(var i =0; i<A.length;i++){
        A[i].show();
        A_button.attr({fill:"red"});
      }
      A_flag++;
    }
    else{
      for(var i =0; i<A.length;i++){
        A[i].hide();
        A_button.attr({fill:"#FF6600"});
      }
      A_flag++;
    }

  };
  A_button.node.onclick = function () {
    if(A_flag%2==0){
      for(var i =0; i<A.length;i++){
        A[i].show();
        A_button.attr({fill:"red"});
      }
      A_flag++;
    }
    else{
      for(var i =0; i<A.length;i++){
        A[i].hide();
        A_button.attr({fill:"#FF6600"});
      }
      A_flag++;
    }
  };
  var Bm= computeScale(string_list,0,6,[],[2,2,1,2,2,2,1],0);
  var Bm = fillInScale(string_list,Bm[0],[2,2,1,2,2,2,1],Bm[1]);
  var Bm_button= bass.circle(420,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var Bm_text = bass.text(420, 300, "Bm").attr({"font-size":30});
  var Bm_flag=0;
  Bm_text.node.onclick = function () {
    if(Bm_flag%2==0){
      for(var i =0; i<Bm.length;i++){
        Bm[i].show();
        Bm_button.attr({fill:"red"});
      }
      Bm_flag++;
    }
    else{
      for(var i =0; i<Bm.length;i++){
        Bm[i].hide();
        Bm_button.attr({fill:"#FF6600"});
      }
      Bm_flag++;
    }

  };
  Bm_button.node.onclick = function () {
    if(Bm_flag%2==0){
      for(var i =0; i<Bm.length;i++){
        Bm[i].show();
        Bm_button.attr({fill:"red"});
      }
      Bm_flag++;
    }
    else{
      for(var i =0; i<Bm.length;i++){
        Bm[i].hide();
        Bm_button.attr({fill:"#FF6600"});
      }
      Bm_flag++;
    }
  };
  var B= computeScale(string_list,0,7,[],[2,2,1,2,2,2,1],0);
  var B = fillInScale(string_list,B[0],[2,2,1,2,2,2,1],B[1]);
  var B_button= bass.circle(480,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var B_text = bass.text(480, 300, "B").attr({"font-size":30});
  var B_flag=0;
  B_text.node.onclick = function () {
    if(B_flag%2==0){
      for(var i =0; i<B.length;i++){
        B[i].show();
        B_button.attr({fill:"red"});
      }
      B_flag++;
    }
    else{
      for(var i =0; i<B.length;i++){
        B[i].hide();
        B_button.attr({fill:"#FF6600"});
      }
      B_flag++;
    }
  };
  B_button.node.onclick = function () {
    if(B_flag%2==0){
      for(var i =0; i<B.length;i++){
        B[i].show();
        B_button.attr({fill:"red"});
      }
      B_flag++;
    }
    else{
      for(var i =0; i<B.length;i++){
        B[i].hide();
        B_button.attr({fill:"#FF6600"});
      }
      B_flag++;
    }
  };
  var C= computeScale(string_list,1,3,[],[2,2,1,2,2,2,1],0);
  var C = fillInScale(string_list,C[0],[2,2,1,2,2,2,1],C[1]);
  var C_button= bass.circle(540,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var C_text = bass.text(540, 300, "C").attr({"font-size":30});
  var C_flag=0;
  C_text.node.onclick = function () {
    if(C_flag%2==0){
      for(var i =0; i<C.length;i++){
        C[i].show();
        C_button.attr({fill:"red"});
      }
      C_flag++;
    }
    else{
      for(var i =0; i<C.length;i++){
        C[i].hide();
        C_button.attr({fill:"#FF6600"});
      }
      C_flag++;
    }

  };
  C_button.node.onclick = function () {
    if(C_flag%2==0){
      for(var i =0; i<C.length;i++){
        C[i].show();
        C_button.attr({fill:"red"});
      }
      C_flag++;
    }
    else{
      for(var i =0; i<C.length;i++){
        C[i].hide();
        C_button.attr({fill:"#FF6600"});
      }
      C_flag++;
    }
  };
  var Dm= computeScale(string_list,1,4,[],[2,2,1,2,2,2,1],0);
  var Dm = fillInScale(string_list,Dm[0],[2,2,1,2,2,2,1],Dm[1]);
  var Dm_button= bass.circle(600,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var Dm_text = bass.text(600, 300, "Dm").attr({"font-size":30});
  var Dm_flag=0;
  Dm_text.node.onclick = function () {
    if(Dm_flag%2==0){
      for(var i =0; i<Dm.length;i++){
        Dm[i].show();
        Dm_button.attr({fill:"red"});
      }
      Dm_flag++;
    }
    else{
      for(var i =0; i<Dm.length;i++){
        Dm[i].hide();
        Dm_button.attr({fill:"#FF6600"});
      }
      Dm_flag++;
    }
  };
  Dm_button.node.onclick = function () {
    if(Dm_flag%2==0){
      for(var i =0; i<Dm.length;i++){
        Dm[i].show();
        Dm_button.attr({fill:"red"});
      }
      Dm_flag++;
    }
    else{
      for(var i =0; i<Dm.length;i++){
        Dm[i].hide();
        Dm_button.attr({fill:"#FF6600"});
      }
      Dm_flag++;
    }
  };
  var D= computeScale(string_list,1,5,[],[2,2,1,2,2,2,1],0);
  var D = fillInScale(string_list,D[0],[2,2,1,2,2,2,1],D[1]);
  var D_button= bass.circle(660,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var D_text = bass.text(660, 300, "D").attr({"font-size":30});
  var D_flag=0;
  D_text.node.onclick = function () {
    if(D_flag%2==0){
      for(var i =0; i<D.length;i++){
        D[i].show();
        D_button.attr({fill:"red"});
      }
      D_flag++;
    }
    else{
      for(var i =0; i<D.length;i++){
        D[i].hide();
        D_button.attr({fill:"#FF6600"});
      }
      D_flag++;
    }
  };
  D_button.node.onclick = function () {
    if(D_flag%2==0){
      for(var i =0; i<D.length;i++){
        D[i].show();
        D_button.attr({fill:"red"});
      }
      D_flag++;
    }
    else{
      for(var i =0; i<D.length;i++){
        D[i].hide();
        D_button.attr({fill:"#FF6600"});
      }
      D_flag++;
    }
  };
  var Em= computeScale(string_list,1,6,[],[2,2,1,2,2,2,1],0);
  var Em = fillInScale(string_list,Em[0],[2,2,1,2,2,2,1],Em[1]);
  var Em_button= bass.circle(720,300,30).attr({fill:"#FF6600",'stroke-width':0,'stroke':"#000" });
  var Em_text = bass.text(720, 300, "Em").attr({"font-size":30});
  var Em_flag=0;
  Em_text.node.onclick = function () {
    if(Em_flag%2==0){
      for(var i =0; i<Em.length;i++){
        Em[i].show();
        Em_button.attr({fill:"red"});
      }
      Em_flag++;
    }
    else{
      for(var i =0; i<Em.length;i++){
        Em[i].hide();
        Em_button.attr({fill:"#FF6600"});
      }
      Em_flag++;
    }
  };
  Em_button.node.onclick = function () {
    if(Em_flag%2==0){
      for(var i =0; i<Em.length;i++){
        Em[i].show();
        Em_button.attr({fill:"red"});
      }
      Em_flag++;
    }
    else{
      for(var i =0; i<Em.length;i++){
        Em[i].hide();
        Em_button.attr({fill:"#FF6600"});
      }
      Em_flag++;
    }
  };
});
