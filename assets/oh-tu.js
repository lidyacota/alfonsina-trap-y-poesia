/* The original game, adapted to the page's single scrolling surface. */
(() => {
  const canvas=document.getElementById('game-canvas'),ctx=canvas.getContext('2d');
  const container=document.getElementById('game-container'),poem=document.getElementById('poem-layer');
  const start=document.getElementById('start-screen'),score=document.getElementById('score'),controls=document.getElementById('controls');
  let running=false,visible=false,hearts=[],eaten=new Set(),x=20,y=20,dx=0,dy=0,rotation=0,last=0,phase=0;
  const radius=()=>window.innerWidth<600?30:65;
  function layout(){
    const oldWidth=canvas.width||container.clientWidth;
    canvas.width=container.clientWidth;canvas.height=poem.offsetHeight;
    x=Math.max(0,Math.min(canvas.width-radius()*2,x*canvas.width/oldWidth));
    const origin=poem.getBoundingClientRect(),walker=document.createTreeWalker(poem,NodeFilter.SHOW_TEXT);let node,index=0;hearts=[];
    while(node=walker.nextNode()){
      for(let i=0;i<node.textContent.length;i++,index++){
        if(index%9!==0||!/[a-záéíóúñ]/i.test(node.textContent[i]))continue;
        const range=document.createRange();range.setStart(node,i);range.setEnd(node,i+1);const rect=range.getBoundingClientRect();
        hearts.push({id:index,x:rect.left-origin.left+rect.width/2,y:rect.top-origin.top+rect.height/2});
      }
    }
    draw();
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);ctx.font=window.innerWidth<600?'1.2rem Arial':'3rem Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#ff00ff';
    for(const h of hearts)if(!eaten.has(h.id))ctx.fillText('♥',h.x,h.y);
    if(!running)return;
    const r=radius(),open=Math.abs(Math.sin(phase))*.25*Math.PI;
    ctx.save();ctx.translate(x+r,y+r);ctx.rotate(rotation);ctx.beginPath();ctx.arc(0,0,r,open,Math.PI*2-open);ctx.lineTo(0,0);ctx.fillStyle='rgba(255,255,0,.95)';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1;ctx.stroke();ctx.restore();
  }
  function updateVisibility(){
    const rect=container.getBoundingClientRect();visible=rect.top<innerHeight-90&&rect.bottom>150;
    controls.classList.toggle('active',running&&visible);
    if(!visible){dx=0;dy=0;}
  }
  window.startBanquete=()=>{if(running)return;running=true;start.style.display='none';container.focus({preventScroll:true});layout();requestAnimationFrame(()=>{window.scrollTo({top:window.scrollY+container.getBoundingClientRect().top-125,behavior:'instant'});updateVisibility();});};
  window.changeDir=(direction)=>{
    if(!running)return;container.focus({preventScroll:true});
    const dirs={up:[0,-1,-Math.PI/2],down:[0,1,Math.PI/2],left:[-1,0,Math.PI],right:[1,0,0]};
    [dx,dy,rotation]=dirs[direction];
  };
  container.addEventListener('keydown',e=>{if(e.key.startsWith('Arrow')&&running){e.preventDefault();window.changeDir(e.key.slice(5).toLowerCase());}if(e.key==='Escape'){dx=0;dy=0;}});
  for(const control of [start,...controls.querySelectorAll('.btn')])control.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();control.click();}});
  window.addEventListener('blur',()=>{dx=0;dy=0;});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){dx=0;dy=0;}});
  document.addEventListener('pointerdown',e=>{if(!container.contains(e.target)){dx=0;dy=0;}});
  window.addEventListener('scroll',updateVisibility,{passive:true});
  new ResizeObserver(()=>{if(running)layout();}).observe(poem);
  document.fonts.ready.then(()=>{if(running)layout();});
  function frame(now){
    const dt=Math.min((now-last)/1000,.04);last=now;
    if(running&&visible&&!document.hidden){
      const r=radius(),speed=145;x=Math.max(-r,Math.min(canvas.width-r,x+dx*speed*dt));y=Math.max(-r,Math.min(canvas.height-r,y+dy*speed*dt));phase+=dt*10;
      for(const h of hearts)if(!eaten.has(h.id)&&Math.hypot(h.x-x-r,h.y-y-r)<r){eaten.add(h.id);score.textContent=String(eaten.size);}
      if(dx||dy){const point=container.getBoundingClientRect().top+y+r;if(point>innerHeight*.72)window.scrollBy({top:point-innerHeight*.72,behavior:'instant'});else if(point<150)window.scrollBy({top:point-150,behavior:'instant'});}
      draw();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
