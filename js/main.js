const search = document.getElementById('search');
const match = document.getElementById('match-list');


//search data.json and filter it
const searchStates = async searchText =>{
    const res = await fetch('../data/data.json');
    const data = await res.json();

    //console.log(data);

    let matching = data.filter(matchData=>{
        let stringId = matchData.id.toString();
        const regex = new RegExp(`${searchText}`, 'gi');
        return matchData.surahNameEng.match(regex) || stringId.match(regex)
    });

    if(searchText.length === 0){
        matching = [];
        match.innerHTML = '';
    }

    //console.log(matching);
    outPut(matching)
};

// Show Result in Html
const outPut = matchingData => {
    if(matchingData.length > 0){
        const html = matchingData.map(data => `
            <div class ="card card-body mb-1 shadow animated pulse faster">
                <h4>
                    ${data.surahNameEng} (${data.surahNameArb}) <span class="text-primary">
                        ${data.englishTitle}
                    </span>
                </h4>
                <small>Details: ${data.details} / Ayat: ${data.totalAyat} / Num: ${data.id}</small>
            </div>
        `).join('');
        match.innerHTML = html;
    };
};



search.addEventListener('input', ()=> searchStates(search.value));