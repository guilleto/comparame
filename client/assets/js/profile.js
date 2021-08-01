import {
  getUserData,
  redirectToHome,
  updateUser,
} from "./actions/userActions.js";
import { config } from "../../config/index.js";

const addEventPreview = () => {
  const getInputReference = document.getElementById("preview_image_input");
  const getImageReference = document.getElementById("profile_image");
  if (getInputReference) {
    getInputReference.addEventListener("change", (e) => {
      const [file] = getInputReference.files;
      if (file) {
        if (file.size > 1000000) {
          alert("La imagen no puede pesar mas de 1MB");
          getInputReference.value = "";
          return;
        }
        if (getImageReference) {
          getImageReference.src = URL.createObjectURL(file);
        }
      }
    });
  }
};

const profileImage = (user) => {
  return `
    <img
        class="rounded-circle me-4"
        width="60"
        height="60"
        src="${
          user.photo
            ? config.API_URL + user.photo.path + user.photo.name
            : "assets/img/imgProfile/77030476.png"
        }"
        id="profile_image"
        alt="profile image"
    />
    <div class="w-75">
        <div class="btn btn-outline-primary w-25 button_upload">
            Subir foto
            <input 
                class="input_photo" 
                id="preview_image_input" 
                accept="image/*" 
                name="photo" 
                type="file" 
            />
        </div>
    </div>
    `;
};

const setProfileData = (data) => {
  const getProfileContainer = document.getElementById("form_profile_data");
  const getSupermarketTrigger = document.getElementById("v-pills-profile-tab");
  const getLoader = document.getElementById("loader");
  if (!getProfileContainer) {
    redirectToHome("Ha ocurrido un error");
  }
  const user = data.data;

  const profileTemplate = `
    <h4>Avatar</h4>
    <div class="d-flex w-100 align-items-center mb-3">
      ${profileImage(user)}
    </div>

    <div class="mb-3 row">
        <div class="col-6">
          <label for="name" class="form-label">Nombre</label>
          <input type="text" name="first_name" class="form-control" value="${
            user.first_name ? user.first_name : ""
          }" />
        </div>
        <div class="col-6">
          <label for="name" class="form-label">Apellido</label>
          <input type="text" name="last_name" class="form-control" value="${
            user.last_name ? user.last_name : ""
          }" />
        </div>
    </div>

    <div class="mb-3 row">
      <div class="col-12">
        <label for="name" class="form-label">Email</label>
        <input type="text" name="email" class="form-control" value="${
          user.email ? user.email : ""
        }" />
      </div>
    </div>

    <div class="form-group row mb-3">
      <div class="col-6">
        <label for="name" class="form-label">Username</label>
        <input type="text" name="username" class="form-control" value="${
          user.username ? user.username : ""
        }" />
      </div>
      <div class="col-6">
        <label for="name" class="form-label">Edad</label>
        <input type="number" name="age" class="form-control" value="${
          user.age ? user.age : 0
        }" />
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" type="submit">
        Guardar cambios
      </button>
    </div>
  `;

  if(getSupermarketTrigger) {
      if(user.rol.rolName == "supermarket") {
        getSupermarketTrigger.style.display = "block"
        document.getElementById('btn-create-pyshical-point').style.display="inline-block"
      }
  }

  getProfileContainer.innerHTML = profileTemplate;
  addEventPreview();
  getLoader.style.display = "none";
};

const handleProfileUpdate = () => {
  const getFormReference = document.getElementById("form_profile_data");
  const getFormHandleMessage = document.getElementById("form_submit_messages");
  if (getFormReference) {
    getFormReference.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(getFormReference);
      const updateUserData = await updateUser(formData);
      if (getFormHandleMessage) {
        if (updateUserData.status) {
          getFormHandleMessage.className = "alert alert-success";
          getFormHandleMessage.innerHTML = updateUserData.message;
        } else {
          getFormHandleMessage.className = "alert alert-danger";
          getFormHandleMessage.innerHTML = updateUserData.message;
        }

        setTimeout(() => {
          getFormHandleMessage.innerHTML = "";
          getFormHandleMessage.className = "";
        }, 2000);
      }
    });
  }
};

(async () => {
  const userData = await getUserData();
  handleProfileUpdate();
  setProfileData(userData);
})();


