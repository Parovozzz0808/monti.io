const getCards = () => {

    document.addEventListener('DOMContentLoaded', () => {
        getData();
    })

    const categoryArr = [];

    const categoryBtn = document.querySelectorAll('.btn_category');

    const renderCards = (cards) => {
        if (categoryArr.length === 0) {
            const cardsContainer = document.querySelector('.cards_container');

            cardsContainer.innerHTML = '';

            cards.forEach(card => {
                const goodCard = document.createElement('div');

                goodCard.innerHTML = `
                    <div class="card_main">
                        <img class="card_img img" alt="${card.img}" src="./db/${card.img}">
                        <h3 class="card_name name">${card.name}</h3>
                        <p class="card_description description">${card.description}</p>
                        <span class="card_price price">от ${card.price} руб. / сутки</span>
                        <button class="btn btn_active btn_rent">ВЗЯТЬ В АРЕНДУ</button>
                    </div>
                `
                cardsContainer.append(goodCard);
            });
        }
    };

    const reRenderCards = (cards) => {
        const cardsContainer = document.querySelector('.cards_container');

        cardsContainer.innerHTML = '';

        cards.forEach(card => {
            const goodCard = document.createElement('div');

            goodCard.innerHTML = `
                <div class="card_main">
                    <img class="card_img img" alt="${card.img}" src="./db/${card.img}">
                    <h3 class="card_name name">${card.name}</h3>
                    <p class="card_description description">${card.description}</p>
                    <span class="card_price price">от ${card.price} руб. / сутки</span>
                    <button class="btn btn_active btn_rent">ВЗЯТЬ В АРЕНДУ</button>
                </div>
            `
            cardsContainer.append(goodCard);
        });
    }

    categoryBtn.forEach((category) => {
        category.addEventListener('click', (e) => {
            
            e.preventDefault;
            
            !e.target.classList.contains('btn_active') ? 
                (e.target.classList.add('btn_active')) & (categoryArr.push(e.target.dataset.filter)) :
                (e.target.classList.remove('btn_active')) & (filterCatArr(categoryArr, e.target.dataset.filter));

            if(categoryArr.length === 0) {
                getData();
            };

            getFilterData(categoryArr);
        })
    });

    const filterCatArr = (arr, filterEl) => {
        let index = arr.indexOf(filterEl);
        if(index > -1) {
            arr.splice(index, 1)
        }    
    }

    const getData = () => {
        
        fetch("db/products.json")
            .then((res) => res.json())
            .then((data) => {
                    renderCards(data);
            });
    };
    
    const getFilterData = (arr) => {
        
        fetch("db/products.json")
            .then((res) => res.json())
            .then((data) => {

                let filterData = []
                
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if(arr[i] === data[j].category) {
                            filterData.push(data[j])
                        }                            
                    }   
                }

                reRenderCards(filterData)
                    
                });
    };




}

getCards();