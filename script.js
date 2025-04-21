window.onload = function() {
    headlines();
};

async function apiresponse() {
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=5da4dcc2cd6d4195834d7dcab906bac0');
        return await response.json();
    } catch (error) {
        console.log('Error fetching data:', error);
    }
}

async function headlines() {
    const thepromise = await apiresponse();
    const articlefield = document.querySelector('.articles');
    const articles = thepromise.articles;
    articles.forEach(article => {
        if (!article.urlToImage || !article.title || !article.description) {
            return;
        }
        const card = document.createElement('div');
        const img = document.createElement('img');
        const imgdiv = document.createElement('div');
        const title = document.createElement('h2');
        const des = document.createElement('p');

        card.classList.add('card');
        img.classList.add('img');
        imgdiv.classList.add('imgdiv');
        card.append(imgdiv);
        card.append(title);
        card.append(des);
        imgdiv.append(img);
        card.addEventListener('click', ()=>{
            window.open(article.url, '_blank');
        })
        img.src = article.urlToImage;
        title.textContent = article.title;
        des.textContent = article.description;

        articlefield.append(card);
    });
}