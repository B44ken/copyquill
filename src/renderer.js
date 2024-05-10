const fieldElement = document.querySelector('.fields')

const MQ = MathQuill.getInterface(2)

let fieldIndex = 0
const fields = []

const addField = () => {
    const div = document.createElement('div')
    div.className = 'field'
    const field = MQ.MathField(div)
    fieldElement.appendChild(div)
    fields.push(field)
    field.focus()
}

addField()

const buttons = {
    copyLatex: document.querySelector('.a-copy-latex'),
    copyImage: document.querySelector('.a-copy-image'),
    saveImage: document.querySelector('.a-save-image')
}
let controlDown = false
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape')
        fields[fieldIndex].focus()

    else if(e.key == 'Enter')
        addField()

    else if(e.key == 'Delete') {
        if(fields.length === 1)
            return
        const active = document.activeElement.parentElement.parentElement
        if(!active)
            return
        const index = Array.from(fieldElement.children).indexOf(active)
        fieldElement.removeChild(active)
        fields.splice(index, 1)
    }

    else if(e.key == 'Control') {
        controlDown = true
        buttons.copyLatex.textContent = 'copy latex (L)'
        buttons.copyImage.textContent = 'copy image (I)'
        buttons.saveImage.textContent = 'save image (S)'
    }
    
    else if(controlDown) {
        if(e.key == 'l')
            buttons.copyLatex.click()
        if(e.key == 'i')
            buttons.copyImage.click()
        if(e.key == 's')
            buttons.saveImage.click()
    }
})

document.addEventListener('keyup', (e) => {
    if(e.key == 'Control') {
        controlDown = false
        buttons.copyLatex.textContent = 'copy latex'
        buttons.copyImage.textContent = 'copy image'
        buttons.saveImage.textContent = 'save image'
    }
})

buttons.copyLatex.addEventListener('click', () => {
    let latex = fields.map(f => f.latex()).join('\n')
    navigator.clipboard.writeText(latex)
})

buttons.copyImage.addEventListener('click', () => {
    html2canvas(fieldElement).then(canvas => {
        canvas.toBlob(blob => {
            navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ])
        })
        // fields[fieldIndex].focus()
    })
})

buttons.saveImage.addEventListener('click', async () => {
    html2canvas(fieldElement).then(canvas => {
        const uri = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = uri
        link.download = 'equation.png'
        link.click()
        // fields[fieldIndex].focus()
    })
})