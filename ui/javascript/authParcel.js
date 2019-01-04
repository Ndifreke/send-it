document.addEventListener('DOMContentLoaded', function () {

    document.body.addEventListener('click', handleClicks, true);
    option.renderOnSuccess = true;
    option.locationOnError = host + "/ui/login.html";
    option.locationOnFail = host + "/ui/login.html";
    initPage(option);
    SendIt.get(`${remote}/api/v1/users/null/parcels`).then(function (resonse) {
        return resonse.json();
    }).then(function (json) {
        parseParcel(json.response);
    })
});


function setPreviewFocus(previewList) {
    for (const preview of previewList) {
        preview.onclick = function () {
            // reset other headers colors to dark blue
            for (const otherPreview of previewList) {
                if (preview !== otherPreview) {
                    otherPreview.style['background-color'] = '#323544';
                }
            }
            toggleDisplayContent.call(this, preview.dataset.parcelId);
        }
    }
}

/*
handle different kinds of clicks that originate from the document body
*/
function handleClicks(event) {
    const clickedTarget = event.target;
    switch (clickedTarget.dataset.response) {
        //click from parcel form action to either cancel or edit the parcel
        case 'accept':
        case 'reject':
            const parcelId = clickedTarget.parentElement.dataset.actionId;
            executeAction(clickedTarget.parentElement, parcelId, clickedTarget.dataset.response);
            toggleDisplay(clickedTarget.parentElement);
            break;
        default:
            document.querySelector("form[name='action-prompt'").style.display = 'none';
    }
}

function changeStatus(id, status){
    parcelIndex[id].status = status;
    const parcelPreview = document.querySelector("#preview"+id);
    parcelPreview.querySelector('#preview-status').textContent = status;
    parcelPreview.querySelector('.status').textContent = status;
}

function executeAction(element, parcelId, acceptance) { 
    const action = element.dataset.action;
    console.log(element)
    switch (action) {
        case "cancel-prompt":
            showSpinner();
            if (acceptance === 'accept') {
                SendIt.put(`${remote}/api/v1/parcels/${parcelId}/cancel`).
                then(function (response) {
                    response.json().then(function (json) {
                        hideSpinner();
                        response.status == 201 ? changeStatus(parcelId, STATUS.CANCEL) : null;
                        alertMessage(json.message, (response.status === 201) ? 'success' : 'fail');
                    })
                })
            }
            break;
        case "edit-prompt":
            //to change in server implementation
            if (acceptance == 'accept') {
                showSpinner();
                window.sessionStorage.setItem('update', JSON.stringify(parcelIndex[parcelId]));
                window.location = host + `/ui/${sessionStorage.getItem('path')}/update.html`;
            } else {
                hideSpinner()
                alertMessage('rejected', 'inform')
            }
    }
}

function toggleDisplayContent(parcelId) {
    toggleDisplay(parcelId);
    const contentContainer = document.getElementById(parcelId);
    (contentContainer.style.display === 'block') ?
    this.style['background-color'] = '#FF5722': this.style['background-color'] = '#323544';
}

function editEvent(actionButtons) {
    actionButtons.forEach(function (action) {
        action.addEventListener('click', promptAction);
    })
}

/*
Displays a view that prompts the user to either cancel or edit a parcel
The type of action to be taken derived from the clicked button is stored in 
the form where the user will either acccept or reject the action from executeAction()
*/
function promptAction() {
    //this == promptAction Buttons
    const promptButton = this;
    const actionForm = document.forms['action-prompt'];
    const actionType = promptButton.dataset.action;

    switch (actionType) {
        //Edit message that will be displayed in the promp
        case 'cancel-prompt':
            actionForm.querySelector('.action-message').innerText = 'cancel';
            break;
        case 'edit-prompt':
            actionForm.querySelector('.action-message').innerText = 'edit';
            break;
    }
    actionForm.dataset.actionId = promptButton.dataset.actionId;
    actionForm.dataset.action = actionType;
    actionForm.querySelector('.parcel-name').innerText = promptButton.dataset.name;

    const parcelPosition = promptButton.parentElement.parentElement.getBoundingClientRect();
    const parcelCenter = (parcelPosition.x + (parcelPosition.width / 2)) - 125 /* half of prompt */ ;
    actionForm.style.top = parcelPosition.y + window.pageYOffset + 55 + 'px';
    actionForm.style.left = parcelCenter + 'px';
    actionForm.style.display = 'block';
}

let parcelIndex = [];

function parseParcel(json) {
    const packages = document.getElementById('packages');
    const template = document.getElementById('parcelTemplate');
    templateClone = template.cloneNode(true);
    template.remove();
    templateClone.setAttribute('id','');
    const parcelElements = json.map(function (parcelObject) {
        parcelIndex[parcelObject.id] = parcelObject;
        const parcel = buildParcels(parcelObject, templateClone.cloneNode(true));
        packages.appendChild(parcel);
        return parcel;
    })
    const previews = parcelElements.map(function (parcel) {
        return parcel.querySelector('.package-preview');
    })
    setPreviewFocus(previews);
}

function buildParcels(parcelJson, template) {
    template.id = 'preview'+parcelJson.id;
    const parcelPreview = template.querySelector('.package-preview');
    parcelPreview.dataset.parcelId = parcelJson.id;
    parcelPreview.querySelector('#preview-title').textContent = " #" + parcelJson.id + " " + parcelJson.shortname;
    parcelPreview.querySelector('#preview-date').textContent = new Date(parcelJson.created_at).toDateString();
    parcelPreview.querySelector('#preview-status').textContent = parcelJson.status;
    const parcelViews = template.querySelector('.parcel-views');
    parcelViews.setAttribute('id', parcelJson.id);
    const content = parcelViews.querySelector('.package-content');
    content.querySelector('.package-description').textContent = parcelJson.description;
    const meta = content.querySelector('div.meta');

    meta.querySelector('.from').textContent = parcelJson.origin;
    meta.querySelector('.destination').textContent = parcelJson.destination;
    meta.querySelector('.sender').textContent = parcelJson.owner;
    meta.querySelector('.date').textContent = parcelJson.created_at;
    meta.querySelector('.charges').textContent = "$" + parcelJson.price;
    meta.querySelector('.location').textContent = parcelJson.location;
    meta.querySelector('.status').textContent = parcelJson.status;

    const actionButtons = parcelViews.querySelectorAll('.steer-cancel-icon, .steer-icon');
    actionButtons[0].dataset.actionId = parcelJson.id;
    actionButtons[0].dataset.name = parcelJson.shortname || parcelJson.id;
    if (actionButtons[1]) { //admin does not have this feature
        actionButtons[1].dataset.actionId = parcelJson.id;
        actionButtons[1].dataset.name = parcelJson.shortname || parcelJson.id;
    }
    editEvent(actionButtons);
    return template;
}