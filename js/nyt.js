/* script.js */
const key = 'YOURKEYHERE'
const sectionsURL = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${key}`
const container = document.querySelector('#container')
const sectionTitle = document.querySelector('.sectionTitle')
const noStoriesDiv = document.querySelector('.noStories')
const col1 = document.querySelector('#leftCol')
const col2 = document.querySelector('#centerLeft')
const col3 = document.querySelector('#centerRight')
const col4 = document.querySelector('#rightCol')
const firstStory = document.querySelector('#firstStory')

let url
let sectionSelect = document.querySelector('#sectionSelect')
let sectionList = sectionSelect.querySelector('#section')
let articles
getStories()

fetch(sectionsURL)
    .then(res => res.json())
    .then(data => {
        sectionList.innerHTML = '<li class="optionSelect" data-section="all">Top Stories</li>'
        data.results.forEach(item => {
            if (item.section != 'admin') {
                let line = document.createElement('li')
                line.classList = 'optionSelect'
                line.innerHTML = item.display_name
                line.setAttribute('data-section', item.section)
                sectionList.appendChild(line)
            }
        })
        sectionSelect.addEventListener('click', (event)=>{
            event.target.tagName == 'SPAN' ? sectionList.classList.toggle('hide') : 
                event.target.tagName == 'LI' ? getStories(event.target.dataset.section) : ''
        })
        document.addEventListener('click', (event) => {
            let parent = event.target.parentElement.id
            parent == 'sectionSelect' || parent == 'section' ? '' : sectionList.classList.contains('hide') ? '' : sectionList.classList.add('hide')
        })
    })

function showStories(section) {
    const firstHeadline = document.querySelector('#firstHeadline')
    clearStories()
    let count = 0
    let after3Count = 0
    firstHeadline.innerHTML = section == 'all' ? articles[0].title : section
    articles.forEach(item => {
        let cardLink = document.createElement('a')
        cardLink.classList = 'cardLink'
        cardLink.href = item.url
        let div = document.createElement('div')
        div.classList = 'card'
        cardLink.appendChild(div)
        let image = document.createElement('img')
        let cardBody = document.createElement('div')
        let imgA = document.createElement('a')
        if (section != 'all' || (section == 'all' && count > 0)) {
            let h2 = document.createElement('h2')
            h2.innerHTML = item.title
            div.appendChild(h2)
        } 
        
        if (item.byline != '') {
            let byLineRaw = item.byline.startsWith('By') ? item.byline.slice(3) : item.byline
            let byLineSplit = byLineRaw.split(' ')
            let byLineText = ''
            byLineSplit.forEach(name => {
                byLineText += name == 'and' ? `${name} ` : `${name.toUpperCase()} `
            })
            let byLine = document.createElement('p')
            byLine.classList = 'byLine'
            byLine.innerHTML = `By ${byLineText}`
            cardBody.appendChild(byLine)
        }
            let abstract = document.createElement('p')
            abstract.classList = 'abstract'
            abstract.innerHTML = item.abstract
            cardBody.appendChild(abstract)

            let dateOptions = {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: "numeric",
                minute: "numeric",
                hour12: "false"
            }
            let dateLine = document.createElement('p')
            dateLine.classList = 'pubDate'
            let date = new Date(item.published_date).getTime()
            let dateOffset = new Date(item.published_date).getTimezoneOffset()
            date =  new Date(date - (dateOffset * 100))
            dateLine.innerHTML = `Published <span>${new Intl.DateTimeFormat("en-US", dateOptions).format(date)}</span>`
            cardBody.appendChild(dateLine)
            div.appendChild(cardBody)

        if (item.multimedia) {
            let captionText
            let creditText
            let caption = document.createElement('div')
            let credit = document.createElement('p')
            credit.classList = 'photoCredit'
            caption.classList = 'caption'
            if (section == 'all' && count == 0) {
                image.src = item.multimedia[0].url
                image.alt = item.multimedia[0].caption != '' ? item.multimedia[0].caption.substring(0, 50) : 
                    item.title.substring(0, 50)
                captionText = item.multimedia[0].caption
                creditText = item.multimedia[0].copyright
            } else if (section == 'all' && count > 0) {
                image.src = item.multimedia[1].url
                image.alt = item.multimedia[1].caption != '' ? item.multimedia[1].caption.substring(0, 50) : 
                    item.title.substring(0, 50)
                captionText = item.multimedia[1].caption
                creditText = item.multimedia[1].copyright
            } else {
                container.classList.add('section')
                let largest = 0
                for(let i = 0; i < item.multimedia.length; i++) {
                    let img = item.multimedia[i]
                    if (img.width > largest && img.width < 1500) {
                        image.src = img.url
                        image.alt = img.caption != '' ? img.caption.substring(0, 50) : item.title.substring(0, 50)
                        captionText = img.caption
                        largest = img.width
                        creditText = img.copyright
                    }
                }
            }
            caption.innerHTML = `<p>${captionText}</p>`
            credit.innerHTML = creditText
            div.appendChild(image)
            div.appendChild(credit)
            div.appendChild(caption)

            if (section == 'all') {
                let p =  document.createElement('p')
                let sectionText = item.section == 'us' ? 'u.s.' : item.section
                p.classList = 'storySection'
                p.innerHTML = `Read more from the <span class='sectionLink'>${sectionText} section</span>`
                div.appendChild(p)
            }
            
        } else {
            div.classList.add('noImg')
        }

        if (section == 'all') {
            if (count == 0) {
                firstStory.appendChild(cardLink)
            } else if (count == 1) {
                col1.appendChild(cardLink)
            } else if (count == 2) {
                col4.appendChild(cardLink)
            } else {
                let row = after3Count % 4
                switch(row) {
                case 0:
                    col1.appendChild(cardLink)
                    break
                case 1:
                    col2.appendChild(cardLink)
                    break
                case 2:
                    col3.appendChild(cardLink)
                    break
                case 3:
                    col4.appendChild(cardLink)
                    break
                }
            }
            count < 3 ? count++ : after3Count++
        } else {
            let row = count % 4
            switch(row) {
                case 0:
                    col1.appendChild(cardLink)
                    break
                case 1:
                    col2.appendChild(cardLink)
                    break
                case 2:
                    col3.appendChild(cardLink)
                    break
                case 3:
                    col4.appendChild(cardLink)
                    break
            }
            count++
        }
       
    })

    let bottomDiv = document.createElement('div')
        bottomDiv.classList = 'bottomDiv'
        col1.appendChild(bottomDiv)
        col2.appendChild(bottomDiv.cloneNode())
        col3.appendChild(bottomDiv.cloneNode())
        col4.appendChild(bottomDiv.cloneNode())
}


function noStories(section, reason) {
    clearStories()
    noStoriesDiv.innerHTML = 
        reason == 'error' ? `<p>Could not retrieve stories for the "${section}" section</p><p>Please try again later, the API may not be behaving properly</p>` : ''
    
    firstHeadline.innerHTML = ''
    sectionTitle.innerHTML = section == 'all' ? 'Top Stories' : section
}

function getStories(section = 'all') {
    let encodedSection = section.replace('&', '	%26').replace('/', '%2F')
    url = section == 'all' ? `http://api.nytimes.com/svc/topstories/v2/home.json?api-key=${key}` : `https://api.nytimes.com/svc/news/v3/content/nyt/${encodedSection}.json?api-key=${key}`

    fetch(url)
        .then(res=>res.json())
        .then(data => {
            articles = data.results
            data.results.length > 0 ? showStories(section) : noStories(section, 'zero count')
        }).catch(error => {
            console.log(error)
            noStories(section, 'error')
        })
}

function clearStories() {
    col1.innerHTML = ''
    col2.innerHTML = ''
    col3.innerHTML = ''
    col4.innerHTML = ''
    firstStory.innerHTML = ''
    noStoriesDiv.innerHTML = ''
    sectionList.classList.contains('hide') ? '' : sectionList.classList.add('hide')
    container.classList.contains('section') ? container.classList.remove('section') : ''
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(()=>{
        let links = document.querySelectorAll('.sectionLink')
        links.forEach(link => {
            link.addEventListener('click', ()=>{
                getStories(link.innerHTML)
            })
        })
    }, 100)

    let barDate = document.querySelector('.todayDate')
    let today = new Date()
    let dateOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }
    barDate.innerHTML = new Intl.DateTimeFormat("en-US", dateOptions).format(today)
})