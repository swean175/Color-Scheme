
const dropBtn = document.getElementById('drop')
const getBtn = document.getElementById('get')
const colorInp = document.getElementById('color')
const main = document.getElementById('main')
const hOne = document.getElementById('1')
const hTwo = document.getElementById('2')
const hThree = document.getElementById('3')
const hFour = document.getElementById('4')
const hFive = document.getElementById('5')
const modal = document.getElementById('modal')
const strong = document.getElementById('strong')
const mono = "Monochrome"
const monoDark = "Monochrome-dark"
const monoLight = "Monochrome-light"
const analogic = "Analogic"
const compl ="Complement"
const analogCompl = "Analogic-complement"
const triad ="Triad"

let schemes = [mono, monoDark, monoLight, analogic, compl, analogCompl, triad ] //  ------ Array of colour schemes available
let colors = ['#F55A5A', '#2B283A', '#FBF3AB', '#AAD1B6', '#A626D3']  //  -------- Array of displayed colours
let colorSeed = colors[0]
let copyCol = '' 
colorInp.value = colors[0]

function dropList(id){ // ---- Brings selected option on the top in drop menu
    let num = Number(id)
    let chosen = schemes[num]
    let first = [schemes[0]]
    schemes.splice(0, 1, chosen)
    schemes.splice(num, 1, first[0])
    return schemes
}

modal.classList.add("hiden")  // ---- Drop menu is inside of modal

getBtn.addEventListener('click', ()=> getColScheme())

function getColScheme(){  // ---- Gets schemes colour from API
    colorSeed = colorInp.value

    fetch (`https://www.thecolorapi.com/scheme?hex=${colorSeed.slice(1)}&mode=${schemes[0].toLowerCase()}&count=6`)
.then(res => res.json())
.then(data => setNewCol(data))
 
}

function setNewCol(data){  //  ------  Switches color array values for new ones from API 
    for (let i= 0; i< colors.length; i++){
        colors.push(data.colors[i].hex.value)
        colors.shift()}
render()
}

function render(){
  
    dropBtn.innerHTML= `<h3>${schemes[0]}</h3> <img class="arrow" src="/arow-down..svg">`

    let mainHtml =`
        <div id="bar1" style="background-color: ${colors[0]};"></div>
        <div id="bar2" style="background-color: ${colors[1]};"></div>
        <div id="bar3" style="background-color: ${colors[2]};"></div>
        <div id="bar4" style="background-color:${colors[3]} ;"></div>
        <div id="bar5" style="background-color: ${colors[4]}";></div>`

        modal.innerHTML=`
            <div class="selected">
            <h3><strong id="0">${schemes[0]}</strong></h3>
            <h3>✔</h3>
            </div>
            <button id = "1" name ="drop-menu">${schemes[1]}</button>
            <button id = "2" name ="drop-menu">${schemes[2]}</button>
            <button id = "3" name ="drop-menu">${schemes[3]}</button>
            <button id = "4" name ="drop-menu">${schemes[4]}</button>
            <button id = "5" name ="drop-menu">${schemes[5]}</button>
            <button id = "6" name ="drop-menu">${schemes[6]}</button>`

                 main.innerHTML = mainHtml

                    hOne.innerText = colors[0]
                    hTwo.innerText = colors[1]
                    hThree.innerText = colors[2]
                    hFour.innerText = colors[3]
                    hFive.innerText = colors[4]
}

render()

dropBtn.addEventListener('click', () =>{  
modal.classList.remove("hiden")
})

document.addEventListener('click', function(e){
    if (e.target.getAttribute('name') === "drop-menu"){ //---------- Trigers dropList funtion on selected option
        dropList(e.target.id)
    }
    render()
})

document.addEventListener('click', function(e) {
    if (e.target.name === "drop-menu"){
    modal.classList.add("hiden")
    render()
}})

document.querySelector('footer').addEventListener('click', function(e){ //  --------  Copy hex name under color palette
    copyCol = colors[e.target.id - 1]
    copyToClipboard(copyCol)

        async function copyToClipboard(copyCol){
        await navigator.clipboard.writeText(copyCol)}
})





