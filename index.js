
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

function changeColor(event) {
    console.log(event.target.id);
    event.target.classList.toggle("colored-in");
}

