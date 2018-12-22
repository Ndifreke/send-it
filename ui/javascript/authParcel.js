document.addEventListener('DOMContentLoaded', function () {
    document.body.addEventListener('click', handleClicks, true);
    option.renderOnSuccess = true;
    option.locationOnError = host + "/ui/pages/login.html";
    option.locationOnFail = host + "/ui/pages/login.html";
    initPage(option);
    SendIt.get(`${remote}/api/v1/users/null/parcels`).then(function (resonse) {
        return resonse.json();
    }).then(function (json) {
        console.log(json)
        buildParcel(json.response);
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
    const target = event.target;
    switch (target.dataset.response) {
        //click from parcel form action to either cancel or edit the parcel
        case 'accept':
        case 'reject':
            const parcelId = target.parentElement.dataset.actionId;
            executeAction(target.parentElement.dataset.action, parcelId, target.dataset.response);
            toggleDisplay(target.parentElement);
            break;
        default:
            document.querySelector("form[name='action-prompt'").style.display = 'none';
    }
}

function executeAction(actionType, parcelId, acceptance) {
    console.log(actionType, parcelId, acceptance);
    switch (actionType) {
        case "cancel-prompt":
            showSpinner();
            if (acceptance === 'accept') {
                SendIt.put(`${remote}/api/v1/parcels/${parcelId}/cancel`).
                then(function (response) {
                    if (response.status === 201) {
                        response.json().then(function (json) {
                            hideSpinner()
                            alertMessage(json.message, 'success')
                        })
                    } else {
                        hideSpinner()
                        alertMessage(json.message, 'fail')
                    }
                })
            } else {
                hideSpinner()
                alertMessage('rejected', 'fail')
            }
            break;
        case "edit-prompt":
        //tochange in server implementation
        window.localStorage.setItem('')
            window.location = host + '/ui/pages/create.html'; 
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
    const actionForm = document.forms['action-prompt'];
    const action = this.dataset.action;

    switch (action) {
        //Edit message that will be displayed in the promp
        case 'cancel-prompt':
            actionForm.querySelector('.action-message').innerText = 'cancel';
            break;
        case 'edit-prompt':
            actionForm.querySelector('.action-message').innerText = 'edit';
            break;
    }
    actionForm.dataset.actionId = this.dataset.actionId;
    actionForm.dataset.action = action;
    actionForm.querySelector('.parcel-name').innerText = this.dataset.actionId;

    const parcelPosition = this.parentElement.parentElement.getBoundingClientRect();
    const parcelCenter = (parcelPosition.x + (parcelPosition.width / 2)) - 125 /* half of prompt */ ;
    actionForm.style.top = parcelPosition.y + window.pageYOffset + 55 + 'px';
    actionForm.style.left = parcelCenter + 'px';
    actionForm.style.display = 'block';
}

function buildParcel(json) {
    const packages = document.getElementById('packages');
    const parcelTemplate = document.getElementById('parcelTemplate').cloneNode(true);

    const parcelElements = json.map(function (parcelObject) {
        const parcel = buildParcels(parcelObject, parcelTemplate.cloneNode(true));
        packages.appendChild(parcel);
        return parcel;
    })
    const previews = parcelElements.map(function (parcel) {
        return parcel.querySelector('.package-preview');
    })
    setPreviewFocus(previews);
}

function buildParcels(parcelJson, template) {
    const parcelPreview = template.querySelector('.package-preview');
    parcelPreview.dataset.parcelId = parcelJson.id;
    parcelPreview.querySelector('.title').textContent = parcelJson.shortname || parcelJson.id;
    const parcelViews = template.querySelector('.parcel-views');
    parcelViews.setAttribute('id', parcelJson.id);
    const content = parcelViews.querySelector('.package-content');
    content.querySelector('.package-description').textContent = parcelJson.description;
    const meta = content.querySelector('div.meta');
    meta.querySelector('.from').textContent = parcelJson.origin;
    meta.querySelector('.destination').textContent = parcelJson.destination;
    meta.querySelector('.sender').textContent = parcelJson.owner;
    meta.querySelector('.date').textContent = parcelJson.created_at;
    meta.querySelector('.location').textContent = parcelJson.location;
    meta.querySelector('.status').textContent = parcelJson.status;

    const actionButtons = parcelViews.querySelectorAll('.steer-cancel-icon, .steer-icon');
    actionButtons[0].dataset.actionId = parcelJson.id;
    actionButtons[0].dataset.name = parcelJson.shortname || parcelJson.id;
    actionButtons[1].dataset.actionId = parcelJson.id;
    actionButtons[1].dataset.name = parcelJson.shortname || parcelJson.id;
    editEvent(actionButtons);
    return template;
}