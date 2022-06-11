window.onload = async (e) => {
    try {
        const result = await axios.get('/slide');
        const slides = result.data;
        let ol = document.querySelector('.carousel-indicators');
        ol.innerHTML = '';
        let mainDiv = document.querySelector('.carousel-inner');
        mainDiv.innerHTML = '';
        slides.map((slide, index) => {
            let li = document.createElement('li');
            if (index == 0) {
                li.className = 'active'
            }
            li.setAttribute('data-target', '#myCarousel')
            li.setAttribute('data-slide-to', `${index}`);
            ol.appendChild(li);
            let div = document.createElement('div');
            if (index == 0) {
                div.className = 'carousel-item active';
            } else {
                div.className = 'carousel-item';
            }
            div.innerHTML = `<iframe id="videoIn" width="100%" height="720px" src="${slide.url}" title="YouTube video player"
                                           frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

            mainDiv.appendChild(div);
        });
    } catch (err) {
        console.error(err);
    }
}
