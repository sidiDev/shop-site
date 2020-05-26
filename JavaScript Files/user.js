// get inputs from edit-forms class
let inputs = document.querySelectorAll('.edit-forms .input');

// get input upload
let inputOfUpload = document.getElementById('upload-image');

// get textarea
let textarea = document.querySelector('.edit-forms .textarea');

// Get Edit Profile button
let editProfileBtn = document.querySelector('.edit-forms button');

// get profile image URL from localstorage
let profileImage = localStorage.getItem('profileImage');

// get User Data from localstorage
let profileData = localStorage.getItem('profileData');

// get image of edut
let imageEdit = document.querySelector('.edit-forms label img');
let profileImg = document.querySelector('.profile-image img');
// get profileElsOutput
let profileElsOutput = document.querySelectorAll('.profile-info-container p');


// when choose a image change profile image

inputOfUpload.addEventListener('change', function () {

    let imageUrl = this.files[0];
    let reader = new FileReader();

    if (imageUrl) {

        //document.querySelector('.edit-forms label img').src = 'channels-images/'+imageUrl;
        document.querySelector('.note').textContent = '';

        reader.addEventListener('load', function () {

            var image = this.result;

            document.querySelector('.edit-forms label img').src = image;
            profileImg.src = image;
            localStorage.setItem('profileImage', image)
        })

        reader.readAsDataURL(imageUrl);

        editProfileBtn.onclick = function () {
           
            if (inputs[0].value != '' && inputs[1].value != '' && textarea.value != '') {

                let profileData = {
                    name: inputs[0].value,
                    countryName: inputs[1].value,
                    aboutUser: textarea.value
                }
                
                localStorage.setItem('profileData',JSON.stringify(profileData))

                profileElsOutput[0].textContent = inputs[0].value;
                profileElsOutput[1].textContent = inputs[1].value;
                profileElsOutput[2].textContent = textarea.value;

                inputs[0].value = '';
                inputs[1].value = '';
                textarea.value = '';

                document.querySelector('.edit-forms label img').src = 'icons/profile.png'
        }

    }

    } else {

        document.querySelector('.note').textContent = 'please choose image';
    }
})


editProfileBtn.onclick = function () {

    if (inputs[0].value != '' && inputs[1].value != '' && textarea.value != '') {

        let profileData = {
            name: inputs[0].value,
            countryName: inputs[1].value,
            aboutUser: textarea.value
        }

        localStorage.setItem('profileData',JSON.stringify(profileData))

        profileElsOutput[0].textContent = inputs[0].value;
        profileElsOutput[1].textContent = inputs[1].value;
        profileElsOutput[2].textContent = textarea.value;

        inputs[0].value = '';
        inputs[1].value = '';
        textarea.value = '';
        document.querySelector('.note').textContent = '';
    }   
    
    else {
        
        document.querySelector('.note').textContent = 'you have empty input';

    }
}

if (profileData != null) {

    let getProfileData = JSON.parse(profileData);
    
    profileElsOutput[0].textContent = getProfileData.name;
    profileElsOutput[1].textContent = getProfileData.countryName;
    profileElsOutput[2].textContent = getProfileData.aboutUser;
    profileImg.src = localStorage.getItem('profileImage');
}

// when click on menu button first time open menu and second time close

// Get navigation links class

let navigationLinks = document.querySelector('.navigation-links');

function openClaoseMenu () {

    navigationLinks.classList.toggle('open-and-close-menu')

}


// when click show search form
function showSearch () {

    document.querySelector('.search-container-in-small-devices')
    .classList.add('show-search-form');

    // Get hidden button class // when click hide search form
    document.querySelector('.search-container-in-small-devices-container img')
    .addEventListener('click' , () => {

        document.querySelector('.search-container-in-small-devices')
        .classList.remove('show-search-form');
    })
}