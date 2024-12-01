const loadAllData = async (isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await response.json();
    displayItems(data?.data?.tools, isShowAll);
    // console.log(data.data.tools);
}
loadAllData();

const displayItems = (data, isShowAll) => {
    toggleLoadingSpinner(true);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    const seeMoreBtn = document.getElementById('see-more-btn');

    // show fixed number items
    if (!isShowAll) {
        data = data.slice(0, 6);
    }
    // show and hide see more button
    if (data.length === 6) {
        seeMoreBtn.classList.remove('hidden');
    }
    else {
        seeMoreBtn.classList.add('hidden');
    }

    data.forEach(element => {
        console.log(element)
        const cardDiv = document.createElement('div');
        cardDiv.classList = "bg-base-100 shadow-xl p-5 card card-compact";
        cardDiv.innerHTML = `
                        <img src="${element?.image}"
                            alt="image" class="rounded-xl h-[300px]" />
                        <div class="text-[#585858] text-base">
                            <h2 class="mt-4 card-title">Features</h2>
                            <p>1. <span>${element?.features[0]}</span></p>
                            <p>2. <span>${element?.features[1]}</span></p>
                            <p>3. <span>${element?.features[2]}</span></p>
                        </div>
                        <div class="divider"></div>
                        <h2 class="card-title">${element?.name}</h2>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2 text-[#585858] text-base">
                                <i class="fa-calendar-days fa-solid"></i>
                                <p>${element?.published_in}</p>
                            </div>
                            <div class="justify-end card-actions">
                                <button class="bg-[#FFF] hover:bg-red-50 border-none rounded-full text-red-400 btn"><i
                                        class="fa-arrow-right fa-solid"></i></button>
                            </div>
                        </div>
        `

        cardContainer.appendChild(cardDiv)
    });
    toggleLoadingSpinner(false);

}
// loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');
    }

}

const showAllItem = () => {
    loadAllData(true);
}