const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const E=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mem={};
const ld=(k,d)=>{try{const v=localStorage.getItem('gf_'+k);if(v)return JSON.parse(v)}catch{}return k in mem?mem[k]:d};
const sv=(k,v)=>{mem[k]=v;try{localStorage.setItem('gf_'+k,JSON.stringify(v));return true}catch{return false}};
const now=Date.now(),H=36e5;
const G=[['Valorant','FPS',23800,'#492d35','#b25855'],['Fortnite','Battle Royale',18400,'#284b65','#6b9cc4'],['Apex Legends','FPS',12100,'#512c29','#a25f4d'],['Elden Ring','RPG',8700,'#45351f','#8e7545'],['Minecraft','Sandbox',15200,'#1f4a2a','#5fa35a'],['Rocket League','Sports',6900,'#1d3b66','#3f8be0'],['Counter-Strike 2','FPS',21300,'#44381f','#c29a4a'],['Baldur\'s Gate 3','RPG',5400,'#3b2a55','#8a63c9']].map(a=>({n:a[0],g:a[1],p:a[2],a:a[3],b:a[4]}));
const INFO={'Valorant':['Tactical 5v5 shooter where agent abilities meet precise gunplay. Plant or defuse the spike across rounds.','PC'],'Fortnite':['Battle royale with building, big live events and constant seasonal updates.','PC, Console, Mobile'],'Apex Legends':['Fast squad-based battle royale with hero abilities and movement tech.','PC, Console'],'Elden Ring':['Open-world action RPG from FromSoftware. Co-op summons make the bosses easier.','PC, Console'],'Minecraft':['Build, mine and survive in a sandbox world, solo or on shared servers.','PC, Console, Mobile'],'Rocket League':['Car soccer: 3v3 matches with aerial mechanics and a ranked ladder.','PC, Console'],'Counter-Strike 2':['The classic tactical FPS on Source 2, built on economy and tight teamwork.','PC'],"Baldur's Gate 3":['Turn-based D&D RPG with deep choices and 4-player co-op.','PC, Console']};
const S={
 dms:ld('dms',{}),dm:null,users:ld('users',{}),me:ld('me',null),
 posts:ld('posts',null)||[{id:1,u:'Arjun_D',game:'Valorant',t:'Finally hit Ascendant',b:'Clutched a 1v3 on Haven with 12 HP. Never doubting the Sheriff again.',ts:now-12*6e4,base:128,likes:[],c:[]},{id:2,u:'Mika.exe',game:'Apex Legends',t:'Need two for ranked tonight, Diamond+',b:'Mic on, chill comms, no rage. Playing 9-11 PM IST.',ts:now-28*6e4,base:76,likes:[],c:[{u:'Valkor',t:'Count me in!'}]},{id:3,u:'NekoKage',game:'Elden Ring',t:'Malenia finally down',b:'Took 61 attempts. Worth every one.',ts:now-5*H,base:212,likes:[],c:[]}],
 squads:ld('squads',null)||[{id:1,name:'Night Raiders',game:'Valorant',d:'Competitive, 9-11 PM IST',base:9,m:[]},{id:2,name:'Apex Predators',game:'Apex Legends',d:'Diamond+ ranked grind',base:5,m:[]},{id:3,name:'Tarnished Guild',game:'Elden Ring',d:'Co-op bosses and builds',base:7,m:[]},{id:4,name:'Block Builders',game:'Minecraft',d:'Survival server, weekends',base:11,m:[]},{id:5,name:'Victory Royale',game:'Fortnite',d:'Duos and squads, chill',base:6,m:[]}],
 events:ld('events',null)||[{id:1,d:'2026-10-18',type:'Community tournament',t:'Forge Clash: Valorant 5v5',p:'€500 prize pool, 32 teams, single elimination',cap:32,base:21,a:[]},{id:2,d:'2026-10-21',type:'Watch party',t:'Worlds Finals community watch',p:'Hosted in the GameForge lounge',cap:200,base:96,a:[]},{id:3,d:'2026-10-27',type:'Creator night',t:'Clip Forge: community showcase',p:'Bring your best gaming clip',cap:60,base:34,a:[]}],
 filter:'All',gf:'All',per:'w',nid:100
};
const BOARD=[['Zer0Rush',84,2.84,48210],['NekoKage',79,2.61,45970],['Valkor',73,2.57,43804],['RavenAsh',71,2.42,41992],['Mika.exe',66,2.2,38100],['Arjun_D',61,2.05,34450]];
const MUL={w:[1,1],m:[3.4,.62],a:[12,.38]};
const save=()=>{const ok=[sv('users',S.users),sv('posts',S.posts),sv('squads',S.squads),sv('events',S.events),sv('dms',S.dms)].every(Boolean);if(!ok)toast('Browser storage is full. Your upload may not be saved.')};
const me=()=>S.me&&S.users[S.me];
const rank=x=>x<300?['BRONZE','#c58a5a']:x<800?['SILVER','#b9c2d0']:x<2000?['GOLD','#e5c35a']:x<8000?['PLATINUM','#55e2b0']:['DIAMOND','#76ddff'];
const ini=n=>E(n.slice(0,2).toUpperCase());
const ago=t=>{const m=Math.max(1,Math.round((Date.now()-t)/6e4));return m<60?m+' min ago':m<1440?Math.round(m/60)+' h ago':Math.round(m/1440)+' d ago'};
let tt;const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2600)};
const xp=n=>{const u=me();if(u){u.xp=Math.max(0,u.xp+n);save();if(n>0)toast('+'+n+' XP earned')}};
const hash=async s=>{try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('gf:'+s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch{return btoa(s)}};
const modal=h=>{$('#mbody').innerHTML=h;$('#mod').classList.add('show');const f=$('#mbody input,#mbody textarea');if(f)f.focus()};
const closeM=()=>{S.dm=null;$('#mod').classList.remove('show')};
const need=()=>{if(me())return true;authM('login','Log in to do that.');return false};

function authM(mode,msg){
 const su=mode==='signup';
 modal(`<h3>${su?'Create your profile':'Welcome back'}</h3><div class="tabs" style="margin-bottom:6px"><button class="${su?'':'on'}" data-a="authmode" data-m="login">Log in</button><button class="${su?'on':''}" data-a="authmode" data-m="signup">Sign up</button></div>
 <div class="err" style="color:#aab1bf">${msg||''}</div>
 <label for="au">${su?'Username':'Username or email'}</label><input class="in" id="au" autocomplete="username">
 ${su?'<label for="ae">Email</label><input class="in" id="ae" type="email" autocomplete="email">':''}
 <label for="ap">Password</label><input class="in" id="ap" type="password" autocomplete="${su?'new-password':'current-password'}" placeholder="${su?'At least 6 characters':''}">
 <div class="err" id="aerr"></div><button class="pri" style="width:100%;margin-top:10px" data-a="${su?'signup':'login'}">${su?'Create account':'Log in'}</button>
 <p style="color:#7b8292;font-size:12px;margin:14px 0 0">Accounts are stored in this browser only.</p>`);
}
const aerr=m=>$('#aerr').textContent=m;
async function doSignup(){
 const n=$('#au').value.trim(),e=$('#ae').value.trim(),p=$('#ap').value,k=n.toLowerCase();
 if(!/^[A-Za-z0-9_.]{3,16}$/.test(n))return aerr('Username must be 3-16 letters, numbers, _ or .');
 if(!/^\S+@\S+\.\S+$/.test(e))return aerr('Enter a valid email address.');
 if(p.length<6)return aerr('Password needs at least 6 characters.');
 if(S.users[k])return aerr('That username is taken. Try another.');
 if(Object.values(S.users).some(u=>u.email.toLowerCase()===e.toLowerCase()))return aerr('That email already has an account.');
 S.users[k]={name:n,email:e,h:await hash(p),xp:100,joined:Date.now()};S.me=k;sv('me',k);save();closeM();ui();toast('Welcome to GameForge, '+n+'! +100 XP');
}
async function doLogin(){
 const v=$('#au').value.trim().toLowerCase(),p=$('#ap').value;
 const k=S.users[v]?v:Object.keys(S.users).find(x=>S.users[x].email.toLowerCase()===v);
 if(!k||S.users[k].h!==await hash(p))return aerr('Wrong username/email or password.');
 S.me=k;sv('me',k);closeM();ui();toast('Logged in as '+S.users[k].name);
}
function profileM(){
 const u=me(),r=rank(u.xp),k=S.me;
 const sq=S.squads.filter(s=>s.m.includes(k)),ev=S.events.filter(e=>e.a.includes(k)),np=S.posts.filter(p=>p.u===u.name).length;
 modal(`<h3>${E(u.name)}</h3><p style="color:#8c93a5;margin:0 0 12px">${E(u.email)}, joined ${new Date(u.joined).toLocaleDateString()}</p>
 <div class="stats" style="margin:0 0 14px"><div><b>${u.xp}</b><small>XP</small></div><div><b style="color:${r[1]}">${r[0]}</b><small>Rank</small></div><div><b>${np}</b><small>Posts</small></div></div>
 <div class="kick">SQUADS</div>${sq.length?sq.map(s=>`<div class="row"><div>${E(s.name)}<small>${E(s.game)}</small></div></div>`).join(''):'<p class="empty">No squads yet. Pick a game and find one.</p>'}
 <div class="kick" style="margin-top:14px;display:block">EVENTS</div>${ev.length?ev.map(e=>`<div class="row"><div>${E(e.t)}<small>${e.d}</small></div></div>`).join(''):'<p class="empty">No events joined yet.</p>'}
 <button class="dk" style="width:100%;margin-top:16px" data-a="logout">Log out</button>`);
}
function ui(){
 const u=me();$('#dmBtn').hidden=!u;$('#authBtn').textContent=u?u.name+' · '+u.xp+' XP':'Join community';$('#authBtn').dataset.a=u?'profile':'join';
 $('#heroBtn').textContent=u?'View your profile':'Enter the Forge';$('#ctaBtn').textContent=u?'View your profile':'Create your profile';
 $('#sSq').textContent=S.squads.length;$('#sEv').textContent=S.events.length;
 games();posts();evs();lb();
}
function games(){
 const q=$('#gq').value.toLowerCase(),gs=['All',...new Set(G.map(g=>g.g))];
 $('#gchips').innerHTML=gs.map(g=>`<button class="chip ${S.gf===g?'on':''}" data-a="gf" data-g="${E(g)}">${E(g)}</button>`).join('');
 const l=G.filter(g=>(S.gf==='All'||g.g===S.gf)&&g.n.toLowerCase().includes(q));
 $('#ggrid').innerHTML=l.length?l.map(g=>{const c=S.squads.filter(s=>s.game===g.n).length;return`<article class="box"><div class="art" role="button" tabindex="0" data-a="game" data-g="${E(g.n)}" style="--a:${g.a};--b:${g.b}"><small>${E(g.g)}</small><b>${E(g.n)}</b></div><div class="gi"><strong>${E(g.n)}</strong><small>${(g.p/1000).toFixed(1)}K players, ${c} squads</small><div class="acts" style="margin-top:10px;gap:8px"><button class="dk" data-a="sq" data-g="${E(g.n)}">Find squad</button><button class="btn" data-a="game" data-g="${E(g.n)}">Details</button></div></div></article>`}).join(''):'<p class="empty">No games match. Try another search.</p>';
}
function squadM(g){
 const k=S.me,l=S.squads.filter(s=>s.game===g);
 modal(`<h3>${E(g)} squads</h3>${l.length?l.map(s=>{const j=s.m.includes(k);return`<div class="row"><div><b>${E(s.name)}</b><small>${E(s.d)}, ${s.base+s.m.length} members</small></div><button class="dk ${j?'on':''}" data-a="jsq" data-i="${s.id}">${j?'Joined':'Join'}</button></div>`}).join(''):'<p class="empty">No squads for this game yet. Start the first one.</p>'}
 <div class="kick" style="margin-top:18px;display:block">START A SQUAD</div><label for="sn">Squad name</label><input class="in" id="sn" maxlength="28"><label for="sd">Short description</label><input class="in" id="sd" maxlength="60">
 <div class="err" id="aerr"></div><button class="pri" style="width:100%;margin-top:8px" data-a="nsq" data-g="${E(g)}">Create squad</button>`);
}
function posts(){
 const tags=['All',...new Set(S.posts.map(p=>p.game))];
 $('#pchips').innerHTML=tags.map(t=>`<button class="chip ${S.filter===t?'on':''}" data-a="pf" data-g="${E(t)}">${E(t)}</button>`).join('');
 const k=S.me,l=S.posts.filter(p=>S.filter==='All'||p.game===S.filter).sort((a,b)=>b.ts-a.ts);
 $('#feed').innerHTML=l.length?l.map(p=>{const lk=k&&p.likes.includes(k);return`<article class="post"><div class="pm"><span class="av">${ini(p.u)}</span><div><b>${E(p.u)}</b><small>${ago(p.ts)}</small></div><span class="tag">${E(p.game)}</span></div><h3>${E(p.t)}</h3><p>${E(p.b)}</p>${media(p)}<div class="pf"><button class="re ${lk?'on':''}" data-a="like" data-i="${p.id}">${lk?'♥':'♡'} ${p.base+p.likes.length}</button><button class="re" data-a="cmt" data-i="${p.id}">💬 ${p.c.length}</button><button class="re" data-a="share" data-i="${p.id}">Share</button>${me()&&me().name!==p.u?`<button class="re" data-a="dm" data-u="${E(p.u)}">Message</button>`:''}${me()&&me().name===p.u?`<button class="re" data-a="del" data-i="${p.id}">Delete</button>`:''}</div></article>`}).join(''):'<p class="empty">No posts here yet. Be the first to post.</p>';
 const c={};S.posts.forEach(p=>c[p.game]=(c[p.game]||0)+1+p.likes.length);
 $('#trend').innerHTML=Object.entries(c).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([g,n])=>`<button class="tr" data-a="pf" data-g="${E(g)}"><b>${E(g)}</b><small>${n} activity</small></button>`).join('');
}
function postM(){
 modal(`<h3>New post</h3><label for="pg">Game</label><select class="in" id="pg">${G.map(g=>`<option>${E(g.n)}</option>`).join('')}</select><label for="pt">Title</label><input class="in" id="pt" maxlength="80"><label for="pb">Details</label><textarea class="in" id="pb" rows="4" maxlength="400"></textarea><label for="pm">Image or clip (optional)</label><input class="in" id="pm" type="file" accept="image/*,video/mp4,video/webm"><small style="color:#7b8292">Images are resized. Clips: MP4 or WebM under 2 MB.</small><div class="err" id="aerr"></div><button class="pri" style="width:100%;margin-top:8px" data-a="submitpost">Publish post (+20 XP)</button>`);
}
function cmtM(id){
 const p=S.posts.find(x=>x.id==id);if(!p)return;
 modal(`<h3>${E(p.t)}</h3>${p.c.length?p.c.map(c=>`<div class="row"><span class="av">${ini(c.u)}</span><div><b>${E(c.u)}</b><small style="color:#b7bdc8">${E(c.t)}</small></div></div>`).join(''):'<p class="empty">No comments yet.</p>'}<label for="ct">Add a comment</label><input class="in" id="ct" maxlength="200"><button class="pri" style="width:100%;margin-top:12px" data-a="addc" data-i="${id}">Comment</button>`);
}
function evs(){
 const k=S.me;
 $('#evs').innerHTML=S.events.map(e=>{const j=e.a.includes(k),n=e.base+e.a.length,d=new Date(e.d+'T00:00:00'),days=Math.ceil((d-Date.now())/864e5),full=n>=e.cap&&!j;return`<article class="box ev"><div class="dt"><b>${d.getDate()}</b><small>${d.toLocaleString('en',{month:'short'})}</small></div><div><span class="kick">${E(e.type)}</span><h3>${E(e.t)}</h3><p>${E(e.p)}</p><p style="margin-top:4px">${n}/${e.cap} joined, ${days>0?days+' days to go':'happening now'}</p></div><div class="acts2"><button class="${j?'dk on':'pri'}" ${full?'disabled':''} data-a="ev" data-i="${e.id}">${j?'Joined (leave)':full?'Full':'Join event'}</button></div></article>`}).join('');
}
function lb(){
 const [m,w]=MUL[S.per],u=me();
 let r=BOARD.map(b=>({n:b[0],w:Math.round(b[1]*(S.per==='w'?1:m*.55)),kd:b[2].toFixed(2),x:Math.round(b[3]*m*(S.per==='w'?1:w)),me:0}));
 if(u)r.push({n:u.name,w:Math.floor(u.xp/40),kd:(1+Math.min(u.xp,3000)/3000).toFixed(2),x:u.xp,me:1});
 r.sort((a,b)=>b.x-a.x);
 $('#lb').innerHTML=r.slice(0,10).map((x,i)=>{const rk=rank(x.x);return`<tr class="${x.me?'me':''}"><td>${i+1}</td><td><span class="av">${ini(x.n)}</span><b>${E(x.n)}${x.me?' (you)':''}</b></td><td>${x.w}</td><td>${x.kd}</td><td>${x.x.toLocaleString()}</td><td style="color:${rk[1]};font-weight:700;font-size:12px">${rk[0]}</td></tr>`}).join('');
}
function calM(){
 if(!need())return;const k=S.me,l=S.events.filter(e=>e.a.includes(k));
 modal(`<h3>My calendar</h3>${l.length?l.map(e=>`<div class="row"><div><b>${E(e.t)}</b><small>${e.d}, ${E(e.type)}</small></div></div>`).join(''):'<p class="empty">You have not joined any events yet.</p>'}`);
}


const media=p=>p.m&&String(p.m.s).startsWith('data:')?(p.m.t==='v'?`<video class="med" src="${p.m.s}" controls preload="metadata"></video>`:`<img class="med" src="${p.m.s}" alt="Image from ${E(p.u)}">`):'';
const readMedia=f=>new Promise((res,rej)=>{
 const v=/^video\/(mp4|webm)$/.test(f.type);
 if(!v&&!f.type.startsWith('image/'))return rej(new Error('Choose an image, or an MP4/WebM clip.'));
 if(v&&f.size>2e6)return rej(new Error('Clips must be under 2 MB. Trim or compress yours.'));
 const r=new FileReader();r.onerror=()=>rej(new Error('Could not read that file.'));
 r.onload=()=>{if(v)return res({t:'v',s:r.result});
  const i=new Image();i.onerror=()=>rej(new Error('That image could not be opened.'));
  i.onload=()=>{const k=Math.min(1,900/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=Math.round(i.width*k);c.height=Math.round(i.height*k);c.getContext('2d').drawImage(i,0,0,c.width,c.height);res({t:'i',s:c.toDataURL('image/jpeg',.8)})};i.src=r.result};
 r.readAsDataURL(f)});
function gameM(n){
 const g=G.find(x=>x.n===n);if(!g)return;
 const i=INFO[n]||['',''],sq=S.squads.filter(s=>s.game===n),ps=S.posts.filter(p=>p.game===n).sort((a,b)=>b.ts-a.ts).slice(0,3);
 modal(`<div class="art" style="--a:${g.a};--b:${g.b};border-radius:12px;margin-bottom:14px;height:120px"><small>${E(g.g)}</small><b>${E(n)}</b></div><p style="color:#aab1bf;line-height:1.6;margin:0 0 14px">${E(i[0])}</p>
 <div class="stats" style="margin:0 0 14px"><div><b>${(g.p/1000).toFixed(1)}K</b><small>Players</small></div><div><b>${sq.length}</b><small>Squads</small></div><div><b style="font-size:15px">${E(i[1])}</b><small>Platforms</small></div></div>
 <div class="kick">SQUADS</div>${sq.length?sq.map(s=>`<div class="row"><div><b>${E(s.name)}</b><small>${E(s.d)}, ${s.base+s.m.length} members</small></div></div>`).join(''):'<p class="empty">No squads yet. Start the first one.</p>'}
 <div class="kick" style="margin-top:14px;display:block">LATEST POSTS</div>${ps.length?ps.map(p=>`<div class="row"><div><b>${E(p.t)}</b><small>${E(p.u)}, ${ago(p.ts)}</small></div></div>`).join(''):'<p class="empty">No posts about this game yet.</p>'}
 <div class="acts" style="gap:8px;margin-top:16px"><button class="pri" data-a="sq" data-g="${E(n)}">Find squad</button><button class="dk" data-a="postfor" data-g="${E(n)}">Post about it</button></div>`);
}
const pk=(a,b)=>[a,b].sort().join('|');
const thread=p=>S.dms[pk(me().name,p)]||[];
const contacts=()=>{const s=new Set([...BOARD.map(b=>b[0]),...S.posts.map(p=>p.u),...Object.values(S.users).map(u=>u.name)]);s.delete(me().name);return[...s]};
const bubble=m=>{const mine=m.f===me().name;return`<div style="justify-self:${mine?'end':'start'};max-width:80%;background:${mine?'#1d2a10':'#1b2028'};border:1px solid var(--line);padding:8px 12px;border-radius:12px;word-break:break-word">${E(m.t)}<small style="display:block;color:#6f7685;font-size:10px;margin-top:3px">${ago(m.ts)}</small></div>`};
const REPL=['gg! Add me for ranked tonight.',"Sure, I'm online 9-11 PM IST.",'Nice, send me your ID.',"Haha same. Let's squad up."];
function dmM(p){
 if(!need())return;S.dm=p||null;
 if(!p){
  const l=contacts().map(n=>{const t=thread(n);return{n,l:t[t.length-1],ts:t.length?t[t.length-1].ts:0}}).sort((a,b)=>b.ts-a.ts||a.n.localeCompare(b.n));
  return modal(`<h3>Messages</h3><p style="color:#7b8292;font-size:12px;margin:0 0 6px">Chats are stored in this browser. Sample players reply automatically.</p>${l.map(x=>`<div class="row"><span class="av">${ini(x.n)}</span><div><b>${E(x.n)}</b><small>${E((x.l?x.l.t:'Start a conversation').slice(0,40))}</small></div><button class="dk" data-a="dm" data-u="${E(x.n)}">Open</button></div>`).join('')}`);
 }
 const t=thread(p);
 modal(`<h3><button class="re" data-a="dms" aria-label="Back to chats">←</button> ${E(p)}</h3><div id="dmt" style="height:260px;overflow:auto;display:grid;gap:8px;align-content:start;margin-bottom:10px">${t.length?t.map(bubble).join(''):'<p class="empty">Say hi to start the chat.</p>'}</div><div style="display:flex;gap:8px"><input class="in" id="dmi" maxlength="300" placeholder="Message ${E(p)}" aria-label="Message"><button class="pri" data-a="dmsend" data-u="${E(p)}">Send</button></div>`);
 const b=$('#dmt');b.scrollTop=b.scrollHeight;
}
function dmSend(p){
 const t=$('#dmi').value.trim();if(!t)return;
 const key=pk(me().name,p);(S.dms[key]=S.dms[key]||[]).push({f:me().name,t,ts:Date.now()});save();dmM(p);
 if(BOARD.some(b=>b[0]===p)&&!S.users[p.toLowerCase()])setTimeout(()=>{if(!me())return;const m={f:p,t:REPL[Math.floor(Math.random()*REPL.length)],ts:Date.now()};(S.dms[key]=S.dms[key]||[]).push(m);save();const b=$('#dmt');if(S.dm===p&&b){b.insertAdjacentHTML('beforeend',bubble(m));b.scrollTop=b.scrollHeight}},1200+Math.random()*1200);
}
document.addEventListener('click',async ev=>{
 if(ev.target===$('#mod'))return closeM();
 const c=ev.target.closest('[data-a]');if(!c)return;
 const a=c.dataset.a,id=c.dataset.i,k=S.me;
 if(a==='close')closeM();
 else if(a==='join')me()?profileM():authM('signup');
 else if(a==='profile')profileM();
 else if(a==='authmode')authM(c.dataset.m);
 else if(a==='signup')doSignup();
 else if(a==='login')doLogin();
 else if(a==='logout'){S.me=null;sv('me',null);closeM();ui();toast('Logged out.')}
 else if(a==='gf'){S.gf=c.dataset.g;games()}
 else if(a==='sq'){if(need())squadM(c.dataset.g)}
 else if(a==='jsq'){const s=S.squads.find(x=>x.id==id),i=s.m.indexOf(k);if(i<0){s.m.push(k);xp(30)}else{s.m.splice(i,1);xp(-30);toast('Left '+s.name)}save();squadM(s.game);ui()}
 else if(a==='nsq'){const n=$('#sn').value.trim(),d=$('#sd').value.trim();if(n.length<3)return aerr('Squad name needs at least 3 characters.');S.squads.push({id:++S.nid+Date.now(),name:n,game:c.dataset.g,d:d||'Open to everyone',base:1,m:[k]});xp(30);save();squadM(c.dataset.g);ui()}
 else if(a==='pf'){S.filter=c.dataset.g;posts()}
 else if(a==='newpost'){if(need())postM()}
 else if(a==='submitpost'){const t=$('#pt').value.trim(),b=$('#pb').value.trim();if(t.length<3||b.length<3)return aerr('Add a title and some details.');let m=null;const f=$('#pm').files[0];if(f){try{m=await readMedia(f)}catch(x){return aerr(x.message)}}S.posts.push({id:Date.now(),u:me().name,game:$('#pg').value,t,b,m,ts:Date.now(),base:0,likes:[],c:[]});xp(f?30:20);save();closeM();ui()}
 else if(a==='like'){if(!need())return;const p=S.posts.find(x=>x.id==id),i=p.likes.indexOf(k);i<0?p.likes.push(k):p.likes.splice(i,1);save();posts()}
 else if(a==='cmt')cmtM(id);
 else if(a==='addc'){if(!need())return;const t=$('#ct').value.trim();if(!t)return;S.posts.find(x=>x.id==id).c.push({u:me().name,t});save();cmtM(id);posts()}
 else if(a==='share'){const u=location.href.split('#')[0]+'#community';try{await navigator.clipboard.writeText(u);toast('Link copied')}catch{toast('Copy this link: '+u)}}
 else if(a==='del'){S.posts=S.posts.filter(x=>x.id!=id);xp(-20);save();ui();toast('Post deleted')}
 else if(a==='ev'){if(!need())return;const e=S.events.find(x=>x.id==id),i=e.a.indexOf(k);if(i<0){e.a.push(k);xp(50)}else{e.a.splice(i,1);xp(-50);toast('You left the event')}save();ui()}
 else if(a==='cal')calM();else if(a==='game')gameM(c.dataset.g);else if(a==='postfor'){if(need()){postM();$('#pg').value=c.dataset.g}}else if(a==='dms')dmM();else if(a==='dm')dmM(c.dataset.u);else if(a==='dmsend')dmSend(c.dataset.u);
});
$('#gq').addEventListener('input',games);
$('#ltabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$$('#ltabs button').forEach(x=>x.classList.toggle('on',x===b));S.per=b.dataset.p;lb()});
$('#menuBtn').addEventListener('click',()=>$('#links').classList.toggle('open'));
$('#links').addEventListener('click',()=>$('#links').classList.remove('open'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeM();if(e.key==='Enter'&&e.target.matches('.art[data-a]'))e.target.click();if(e.key==='Enter'&&$('#mod').classList.contains('show')&&e.target.matches('#au,#ae,#ap,#dmi')){const b=$('#mbody .pri');if(b)b.click()}});
setInterval(()=>{const n=24892+Math.round(Math.sin(Date.now()/9e4)*420+Math.random()*40);$('#online').textContent=n.toLocaleString()},3000);
if(S.me&&!S.users[S.me])S.me=null;
save();ui();
