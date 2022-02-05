const word = document.querySelector('#word');
const searchButton = document.querySelector('#search-btn');
const definition = document.querySelector('.definition');
const notFound = document.querySelector('.not-found');
const loading = document.querySelector('#loading');

searchButton.addEventListener('click', () => {
    const getWord = word.value;
    
    if(getWord == ''){
        alert('Enter a word :)');
        return;
    }

    getDef(getWord);
})

const getDef = async (getWord) => {
    loading.style.display = 'block';
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${getWord}`);
    const data = await response.json();
    loading.style.display = 'none';
    // console.log(data[0].meanings[0].definitions[0].definition); --> Definition
    const noResult = data.title;
    if(typeof noResult == 'string'){
        notFound.innerText = noResult;
        notFound.style.display = 'block';
        return;
    }

    const def = data[0].meanings[0].definitions[0].definition;
    definition.innerText = def;
    definition.style.display = 'block';
}