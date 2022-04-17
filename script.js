const form = document.querySelector('#form')
const inputText = document.querySelector('#input_text')
const loadPage = document.querySelector('#load_page')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let word = inputText.value

    if(word === ''){
        alert('Please enter a word :)')
        return
    }

    loadPage.style.display = 'none'

    getDef(word)
})

const notFoundBox = document.querySelector('#not_found_box')
const loading = document.querySelector('#loading')

async function getDef(word){
    loading.style.display = 'block'
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    const data = await res.json()

    notFoundBox.style.display = 'none'
    loading.style.display = 'none'
    // If meaning not found
    if(typeof data.title === 'string'){
        notFoundBox.style.display = 'block'
        return
    }

    let audioFile = data[0].phonetics[0].audio
    let meanings = data[0].meanings.pop().definitions[0]
    
    // If example not available
    if(meanings.example == undefined){
        meanings.example = 'No Example...'
    }

    setInfo(audioFile, meanings)
}

const wordPronunciation = document.querySelector('#word_pronunciation')
const audioFile = document.querySelector('#audio_file')
const resultBox = document.querySelector('#result_box')
const definition = document.querySelector('#definition')
const example = document.querySelector('#example_box')

function setInfo(audio, meaning){
    wordPronunciation.style.display = 'block'
    resultBox.style.display = 'block'
    audioFile.src = audio
    definition.innerText = meaning.definition
    example.innerText = meaning.example
}