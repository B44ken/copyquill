const fieldElement = document.querySelector('.field')

const MQ = MathQuill.getInterface(2)
const field = MQ.MathField(document.querySelector('.field'))
field.focus()

const buttons = {
    copyLatex: document.querySelector('.a-copy-latex'),
    copyImage: document.querySelector('.a-copy-image'),
    saveImage: document.querySelector('.a-save-image')
}

let controlDown = false
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape')
        field.focus()

    if(e.key == 'Control') {
        controlDown = true
        buttons.copyLatex.textContent = 'copy latex (L)'
        buttons.copyImage.textContent = 'copy image (I)'
        buttons.saveImage.textContent = 'save image (S)'
    }

    if(controlDown) {
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
    navigator.clipboard.writeText(field.latex())
})

buttons.copyImage.addEventListener('click', () => {
    html2canvas(fieldElement).then(canvas => {
        canvas.toBlob(blob => {
            navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ])
        })
        // field.focus()
    })
})

buttons.saveImage.addEventListener('click', async () => {
    html2canvas(fieldElement).then(canvas => {
        const uri = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = uri
        link.download = 'equation.png'
        link.click()
        // field.focus()
    })
})