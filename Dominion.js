let generate=document.getElementById("generate")
var element = document.getElementById("main")
let divSetup=document.getElementById("setup")
let divCards=document.getElementById("cards")
let divExtras=document.getElementById("extras")


let card=[]
let figure=[]
let figcaption=[]

let extras=[]
let figureExtras=[]
let extrasCaption=[]

let setupList=[]

let rand=[]
let cardSelection=[]
let extrasSelection=[]

let cardNum=338
let extrasNum=84
let total=cardNum+extrasNum
let extrasUsed=0

let bigChance=.3
let shelterChance=.3

let cheapActions=['Acting Troupe','Ambassador','Amulet','Beggar','Black Cat','Black Market','Border Guard','Camel Train','Candlestick Maker','Caravan Guard','Cargo Ship','Catapult','Cellar','Chancellor', 'Chapel','Chariot Race','Courtyard','Crossroads','Develop','Doctor','Druid','Duchess','Dungeon','Embargo','Encampment','Enchantress','Experiment','Faithful Hound','Farmer’s Market','Fishing Village','Fool','Forager','Fortune Teller','Gear','Gladiator','Goatherd','Great Hall','Guide','Hamlet','Harbinger','Haven','Herbalist','Hermit','Improve','Lackeys','Leprechaun','Lighthouse','Lookout','Lurker','Market Square','Masquerade','Menagerie','Merchant','Moat','Native Village','Oasis','Page','Patrician','Pawn','Pearl Diver','Peasant','Pixie','Ratcatcher','Raze','Sage','Scheme','Scrap','Secret Cave','Secret Chamber','Settlers','Shanty Town','Sheepdog','Sleigh','Smugglers','Snowy Village','Squire','Steward','Stonemason','Storeroom','Swindler','Trade Room','Tracker','Transmute','Urchin','Vagrant','Vassal','Village','Warehouse','Watchtower','Wishing Well','Woodcutter','Workshop']
let cheapOther=['Changeling','Coin of the Realm','Ducat','Fool’s Gold','Ghost Town','Guardian','Masterpiece','Monastery','Night Watchman','Stockpile','Supplies','Tunnel','Vineyard']


//to-do list: image sizing, black market, obelisk as any card (including bane, etc.)

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

function howManyExtras() {
    let num=0
    let looks=0
    let workingTotal=total
    do{
        rand=Math.floor(Math.random() * workingTotal)
        if(rand>cardNum){
            num++
        }else{
            looks+=num+1
        }
    }while(looks<10)
    return num
}

//Pick a cheap card
function generateCheap(reason){
    let options
    if(reason==='Bane'){
        options=cheapActions.concat(cheapOther)
    }else if(reason==='Mouse'){
        options=cheapActions
    }else{
        //break
    }
    
    let len=options.length
    let rand=Math.floor(Math.random() * len);
    let cheapFig=document.createElement("figure")
    
    divCards.appendChild(cheapFig)
    cheapImg=document.createElement("img")
    cheapImg.className='domCard'
    cheapImg.style.width='100%'
    cheapImg.style.borderRadius='7%'
    cheapImg.src=`./Resources/Dominion/${options[rand]}.jpg`
    cheapFig.appendChild(cheapImg);
    cheapFigCap=document.createElement("figcaption")
    cheapFigCap.className='centeredDom'
    cheapFigCap.innerHTML=`${reason}: ${options[rand]}`
    cheapFig.appendChild(cheapFigCap)
    let current=cardList.find(item => item.name === options[rand])
    if(current.setup){            
        let unique=true
        for(k=0;k<10;k++){
            if(current.setup===cardSelection[k].setup){
                unique=false
                k=10
            }
        }
        if(unique){
            let setupListCheap=document.createElement("li")
            divSetup.appendChild(setupListCheap)
            setupListCheap.innerHTML=current.setup

        }
    }
}

//build 10 card elements
for (i = 0; i < 10; i++) {
    figure[i]=document.createElement("figure")
    //figure[i].style.width='15.5%'
    divCards.appendChild(figure[i])
    card[i]=document.createElement("img")
    card[i].src="./Resources/Dominion/Dominion_Card_back.jpg"
    card[i].className='domCard'
    card[i].style.width='100%'
    card[i].style.borderRadius='7%'
    figure[i].appendChild(card[i]);
    figcaption[i]=document.createElement("figcaption")
    figcaption[i].className='centeredDom'
    figure[i].appendChild(figcaption[i])
}
generate.onclick=()=>{
    /* simple random generator
    for (i = 0; i < 10; i++) {
        let num=Math.floor(Math.random()*cardList.length)
        rand[i]=num  
        cardSelection[i]=cardList[num].name
    }*/

    //clear previous elements
    while (divCards.childElementCount>10) {
        divCards.removeChild(divCards.lastChild);
    }
    while (divSetup.firstChild) {
        divSetup.removeChild(divSetup.lastChild);
      }
    while (divExtras.firstChild) {
        divExtras.removeChild(divExtras.lastChild);
    }

    //use bigs 
    if(Math.random()<bigChance){
        let bigs=document.createElement("li")
        divSetup.appendChild(bigs)
        bigs.innerHTML='Colony and Platinum'      
    }

    //use shelters 
    if(Math.random()<shelterChance){
        let shelters=document.createElement("li")
        divSetup.appendChild(shelters)
        shelters.innerHTML='Shelters'      
    }

    //pick kingdom cards
    cardSelection=getRandom(cardList, 10)
    /*use this to force a specific card
    cardSelection=getRandom(cardList, 9)
    cardSelection[9]=cardList.find(item => item.name === 'Young Witch')*/
    cardSelection.sort((a, b) => (a.name > b.name) ? 1 : -1)
    for (i = 0; i < 10; i++) {
        card[i].src=`./Resources/Dominion/${cardSelection[i].name}.jpg`
        figcaption[i].innerHTML=cardSelection[i].name
        if(cardSelection[i].name==='Young Witch'){
            generateCheap('Bane')
        }
        if(cardSelection[i].setup){            
            let unique=true
            for(k=0;k<i;k++){
                if(cardSelection[i].setup===cardSelection[k].setup){
                    unique=false
                    k=i
                }
            }
            if(unique){
                setupList[i]=document.createElement("li")
                divSetup.appendChild(setupList[i])
                setupList[i].innerHTML=cardSelection[i].setup

            }
        }
    }

    //select how many noncards and generate elements
    extrasUsed=howManyExtras()
    for (i = 0; i < extrasUsed; i++) {
        figureExtras[i]=document.createElement("figure")
        divExtras.appendChild(figureExtras[i])
        extras[i]=document.createElement("img")
        extras[i].src="./Resources/Dominion/Dominion_Card_back - sideways.jpg"
        extras[i].className='DomCard'
        //extras[i].style.height='150px'
        extras[i].style.width='100%'
        extras[i].style.borderRadius='15px'
        figureExtras[i].appendChild(extras[i]);
        extrasCaption[i]=document.createElement("figcaption")
        extrasCaption[i].className='centeredDom'
        figureExtras[i].appendChild(extrasCaption[i])
    }

    //pick noncards
    extrasSelection=getRandom(extrasList, extrasUsed-1)
    //force a particular extra
    extrasSelection[extrasUsed-1]=extrasList.find(item => item.name === 'Obelisk')
    extrasSelection.sort((a, b) => (a.name > b.name) ? 1 : -1)
    for (i = 0; i < extrasUsed; i++) {
        extras[i].src=`./Resources/Dominion/${extrasSelection[i].name}.jpg`
        //extras[i].style.filter='blur(1px)'
        extrasCaption[i].innerHTML=extrasSelection[i].name+" ("+extrasSelection[i].type+')'
        if(extrasSelection[i].name==='Way of the Mouse'){
            generateCheap('Mouse')
        }
        if(extrasSelection[i].name==='Obelisk'){
            let obCard=Math.floor(Math.random() * 10)
            extrasCaption[i].innerHTML+=' '+figcaption[obCard].innerHTML
        }       
        if(extrasSelection[i].setup){            
            let unique=true
            for(k=0;k<i;k++){
                if(extrasSelection[i].setup===extrasSelection[k].setup){
                    unique=false
                    k=i
                }
            }
            for(k=0;k<10;k++){
                if(extrasSelection[i].setup===cardSelection[k].setup){
                    unique=false
                    k=i
                }
            }
            if(unique){
                setupList[i]=document.createElement("li")
                divSetup.appendChild(setupList[i])
                setupList[i].innerHTML=extrasSelection[i].setup
            }
        }        
    }
    

}

//generate.innerHTML=cardList[0].name
/*
generate.onclick=()=>{
    for (i = 0; i < 10; i++) {
        card[i].src="./Resources/Dominion/SeawayBackground.jpg"

    }
}*/

/*

generate.onclick=()=>{
    //let sortedRand=rand.sort()
    for (i = 0; i < 10; i++) {
        card[i].src="./Resources/Dominion/SeawayBackground.jpg"
        //figcaption[i].innerHTML=list[rand[i]].name
    }
}
*/


/*
let generate=document.getElementById("generate")
var element = document.getElementById("main")


let card=[]
let figure=[]
let figcaption=[]
const list=cardList


for (i = 0; i < 10; i++) {
    figure[i]=document.createElement("figure")
    element.appendChild(figure[i])
    card[i]=document.createElement("img")
    card[i].src="./Resources/Dominion/Dominion_Card_back.jpg"
    card[i].className='DomCard'
    figure[i].appendChild(card[i]);
    figcaption[i]=document.createElement("figcaption")
    figcaption[i].className='centered'
    figure[i].appendChild(figcaption[i])
}

//generate.innerHTML=cardList[0].name


function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}
*/