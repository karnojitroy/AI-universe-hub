const loadAllData = async (isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tools`);
    const data = await response.json();
    displayItems(data?.data?.tools, isShowAll);
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
        // console.log(element?.image)
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
                                <button onclick="handleDetailsModal('${element?.id}')" class="bg-[#FFF] hover:bg-red-50 border-none rounded-full text-red-400 btn"><i
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

const handleDetailsModal = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await response.json();
    showDetailsModal(data?.data);
    // console.log(data.data);
}

const showDetailsModal = (data) => {
    details_modal.showModal();
    const modalBodyContent = document.getElementById('modal-body-content');
    modalBodyContent.textContent = '';
    const modalContentDiv = document.createElement('div');
    modalContentDiv.classList = "flex p-14 gap-4";
    modalContentDiv.innerHTML = `
                            <div class="flex-1 space-y-5">
                                <h4 class="font-semibold text-2xl">${data?.description}</h4>
                                <div class="flex justify-between items-center font-extrabold text-base text-center">
                                    <p class="flex-1 text-[#03A30A]"><span>${data?.pricing[0]?.price}</span><br>${data?.pricing[0]?.plan}</p>
                                    <p class="flex-1 text-[#F28927]"><span>${data?.pricing[1]?.price}</span><br>${data?.pricing[1]?.plan}</p>
                                    <p class="flex-1 text-[#EB5757]"><span>${data?.pricing[2]?.price}</span><br>${data?.pricing[2]?.plan}</p>
                                </div>
                                <div class="flex justify-between gap-4">
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-2xl">Features</h4>
                                        <ul class="ml-5 text-[#585858] text-sm list-disc">
                                            <li>${data?.features[1]?.feature_name}</li>
                                            <li>${data?.features[2]?.feature_name}</li>
                                            <li>${data?.features[3]?.feature_name}</li>
                                        </ul>
                                    </div>
                                    <div class="flex-1">
                                        <h4 class="font-semibold text-2xl">Integrations</h4>
                                        <ul class="ml-5 text-[#585858] text-sm list-disc">
                                            <li>${data?.integrations[0]}</li>
                                            <li>${data?.integrations[1]}</li>
                                            <li>${data?.integrations[2]}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="flex-1 space-y-5 text-center">
                                <img src="${data?.image_link[0]}"
                                    alt="image">
                                <h4 class="font-semibold text-2xl">${data?.input_output_examples[0]?.input}</h4>
                                <p class="text-base">${data?.input_output_examples[0]?.output}</p>

                            </div>
                                
    `;
    modalBodyContent.appendChild(modalContentDiv);
}

const showAllItem = () => {
    loadAllData(true);
}