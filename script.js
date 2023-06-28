//console.log("script");

const state = {
    teendok: [],
    szures: {          //objektum{} a staten belul
        userId:"",      //felveszem, de meg nem csinalom meg...?""
        title:"",
        completed:null
    },
    isPending: false
};

document.getElementById('loaddoc').onclick=loadDoc;
document.getElementById('urlap').onsubmit=function(event){
    event.preventDefault();
    state.szures.userId=event.target.elements.userid.value;
    state.szures.title=event.target.elements.title.value;
    loadDoc();

};

function szures(){
    state.isPending=true; //nehogy rendereles legyen
    state.teendok=state.teendok.filter(function(item){
        return (state.szures.userId?item.userId==state.szures.userId:true)
        &&(state.szures.title?item.title.includes(state.szures.title):true);       //egyenloseg teljesul....................30:00perc a videon.

    });                       //objektumokat tartalmazo tombbrol beszelunk, filter-eljaras amely kivalogatja az a mi altalunk megadott fuggvenz szerinti objektumokat...?
        
    state.isPending=false;   //veget ert a szures
}; //igy definialt a szures, megha nincs benne semmi.??




function render()
{
  let adatok =  document.getElementById('adatok');
  adatok.innerHTML="";                   //kitoroli a HTML tartalmat
  state.teendok.forEach(function(item){           //ciklus a state tomjen vegigmegy
    let sor=document.createElement('div');
    sor.className="sor";
    sor.innerHTML=`userId: ${item.userId},title: ${item.title} 
    (${item.completed})`; //tombbol szedi ki az objektumokat az item ezert kell oda....?

    adatok.appendChild(sor); //adatokhoz hozzafuzik a sort!

  });
}; //render vege


function loadDoc(){
    //console.log("loadDoc");
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        console.log("Statusz: ",xhttp.readyState,";", xhttp.status)
        if (xhttp.readyState==4 && xhttp.status==200)
        {
            console.log("minden OK! ");
        }
        else{
            state.isPending = true;
            console.log("toltodik", this.readyState);
        }
    };
    xhttp.onloadstart = function(){
        console.log("onloadestart");
    };
    xhttp.onloadend = function(){
        console.log("onloadend");
    };
    xhttp.onerror = function()
    {
        console.log("hiba ", xhttp.status)
    };

    xhttp.onload = function(){

        if (xhttp.status==200)
        {
            state.teendok=JSON.parse(this.responseText);

            console.log(state.teendok);
            state.isPending=false;
            szures();                      //eljarasok
            render();
        }
        //console.log("onload");
       // console.log("megvan az adat");
       // console.log(xhttp.responseText);
    };

    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();

}; //loadDoc vege