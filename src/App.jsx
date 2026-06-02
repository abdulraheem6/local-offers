
import {useEffect,useState} from "react";
export default function App(){
 const [ads,setAds]=useState([]);
 const [cat,setCat]=useState("All");
 useEffect(()=>{fetch("./ads.json").then(r=>r.json()).then(setAds)},[]);
 const cats=["All",...new Set(ads.map(a=>a.category))];
 const filtered=cat==="All"?ads:ads.filter(a=>a.category===cat);
 return <div style={{fontFamily:"Arial",padding:20,maxWidth:1000,margin:"auto"}}>
 <h1>📍 Nearby Offers Hub</h1>
 <div>{cats.map(c=><button key={c} onClick={()=>setCat(c)} style={{margin:4}}>{c}</button>)}</div>
 {filtered.sort((a,b)=>(b.featured?1:0)-(a.featured?1:0)).map(ad=>
 <div key={ad.id} style={{border:"1px solid #ddd",padding:15,marginTop:15,borderRadius:10}}>
 <h2>{ad.featured?"⭐ ":""}{ad.title}</h2>
 <p>{ad.category}</p>
 {ad.type==="image" && <div style={{display:"flex",overflowX:"auto"}}>{ad.images.map((i,n)=><img key={n} src={i} style={{width:300,marginRight:10}}/>)}</div>}
 {ad.type==="youtube" && <iframe width="100%" height="400" src={`https://www.youtube.com/embed/${ad.youtubeId}`} allowFullScreen/>}
 {ad.type==="video" && <video width="100%" controls autoPlay muted><source src={ad.video}/></video>}
 <a href={`https://wa.me/${ad.whatsapp}`} target="_blank">Contact on WhatsApp</a>
 </div>)}
 </div>
}
