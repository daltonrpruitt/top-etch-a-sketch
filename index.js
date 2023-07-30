
let numRows = 16;
let numColumns = numRows;

const body = document.querySelector('body');


const resizeButton = document.getElementById('resize-button');
resizeButton.textContent = "Resize";
resizeButton.addEventListener("click", e => {
    let size = parseInt(prompt('How many rows/columns (2-100):'));
    while(Number.isNaN(size) || size < 2 || size > 100) {
        size = parseInt(prompt('Invalid size. Enter a number between 2 and 100:'));
    }
    numRows = numColumns = size;
    createGrid(size);

});

// body.appendChild(resizeButton);

function createGrid(size) {
    let gridBase = document.getElementById('grid');
    if(gridBase != null) {
        gridBase.remove();
    }

    gridBase = document.createElement('div');
    gridBase.id = 'grid';

    gridBase.classList.add("grid-base");
    body.appendChild(gridBase);

    function squareId(column, row) {
        return "square-" + column+"."+row;
    }

    for(let column=0; column < size; column++) {
        const gridColumn = document.createElement('div');
        gridColumn.classList.add('grid-column');
        gridBase.appendChild(gridColumn);
        
        for(let row=0; row < size; row++) {
            const singleSquare = document.createElement('div');
            singleSquare.classList.add("grid-square");
            singleSquare.id = squareId(column, row);
            singleSquare.addEventListener("mouseover", changeColor); 
            gridColumn.appendChild(singleSquare);
        }
    }

}

createGrid(16, 16);

function rgbToArray(rgb) {
    return rgb.split("(")[1].split(")")[0].split(",").map(i=>parseInt(i));
}

function arrayToRgb(array) {
    return "rgb(" + array[0] + "," + array[1] + "," + array[2] + ")";
}



function changeColor(event) {
    console.log(event.target.id);
    // event.target.classList.toggle("colored-in");
    // let computedStyle = window.getComputedStyle(event.target, null);
    let currentColor = event.target.style.backgroundColor; //computedStyle.getPropertyValue('background-color');
    if(currentColor == "") {
        currentColor = arrayToRgb([255,255,255]);
    } else if (rgbToArray(currentColor)[0] == 0) {
        event.target.style.backgroundColor = arrayToRgb([255,255,255]);
        return;
    }
    
        const darkenFactor = -255/9;
    let newColorArray = rgbToArray(currentColor).map(i=>Math.round((i+darkenFactor)));
    console.log(newColorArray[0]);
    if(newColorArray[0] < 0) { newColorArray = [0,0,0]; }
    console.log(newColorArray[0]);
    let newColorRgb = arrayToRgb(newColorArray); 
    
    event.target.style.backgroundColor = newColorRgb;
}

